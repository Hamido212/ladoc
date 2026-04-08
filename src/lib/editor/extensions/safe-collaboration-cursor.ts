'use client';

import { Extension } from '@tiptap/core';
import { Plugin, type EditorState } from '@tiptap/pm/state';
import { Decoration, DecorationSet, type DecorationAttrs } from '@tiptap/pm/view';
import {
  absolutePositionToRelativePosition,
  defaultAwarenessStateFilter,
  defaultSelectionBuilder,
  relativePositionToAbsolutePosition,
  setMeta,
  yCursorPluginKey,
  ySyncPluginKey,
} from '@tiptap/y-tiptap';
import * as Y from 'yjs';

type CursorUser = {
  name: string | null;
  color: string | null;
  [key: string]: unknown;
};

type AwarenessState = {
  user?: CursorUser;
  cursor?: {
    anchor: unknown;
    head: unknown;
  };
};

type CursorState = {
  type?: Y.XmlFragment;
  doc?: Y.Doc;
  binding?: {
    mapping: Map<unknown, unknown>;
  };
  snapshot?: unknown;
  prevSnapshot?: unknown;
  isChangeOrigin?: boolean;
};

type SafeCollaborationCursorStorage = {
  users: { clientId: number; [key: string]: unknown }[];
};

export interface SafeCollaborationCursorOptions {
  provider: {
    awareness: {
      getStates(): Map<number, AwarenessState>;
      getLocalState(): AwarenessState | null;
      setLocalStateField(key: string, value: unknown): void;
      on(event: 'update', callback: () => void): void;
      off(event: 'update', callback: () => void): void;
    } | null;
  };
  user: Record<string, unknown>;
  render(user: Record<string, unknown>): HTMLElement;
  selectionRender(user: Record<string, unknown>): DecorationAttrs;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    safeCollaborationCursor: {
      updateUser: (attributes: Record<string, unknown>) => ReturnType;
      user: (attributes: Record<string, unknown>) => ReturnType;
    };
  }

  interface Storage {
    safeCollaborationCursor: SafeCollaborationCursorStorage;
  }
}

const awarenessStatesToArray = (states: Map<number, AwarenessState>) => {
  return Array.from(states.entries()).map(([key, value]) => ({
    clientId: key,
    ...(value.user ?? {}),
  }));
};

const isValidColor = /^#[0-9a-fA-F]{6}$/;

function createSafeDecorations(
  state: EditorState,
  awareness: NonNullable<SafeCollaborationCursorOptions['provider']['awareness']>,
  awarenessFilter: typeof defaultAwarenessStateFilter,
  createCursor: (user: Record<string, unknown>, clientId: number) => HTMLElement,
  createSelection: (user: Record<string, unknown>, clientId: number) => DecorationAttrs
) {
  const ystate = ySyncPluginKey.getState(state) as CursorState | undefined;

  if (!ystate?.doc || !ystate.type || !ystate.binding) {
    return DecorationSet.create(state.doc, []);
  }

  if (ystate.snapshot != null || ystate.prevSnapshot != null || ystate.binding.mapping.size === 0) {
    return DecorationSet.create(state.doc, []);
  }

  const ydoc = ystate.doc;
  const ytype = ystate.type;
  const ymapping = ystate.binding.mapping as never;
  const decorations: Parameters<typeof DecorationSet.create>[1] = [];

  awareness.getStates().forEach((aw, clientId) => {
    if (!awarenessFilter(ydoc.clientID, clientId, aw)) {
      return;
    }

    if (!aw.cursor) {
      return;
    }

    const user = { ...(aw.user ?? {}) } as CursorUser;

    if (user.color == null) {
      user.color = '#ffa500';
    } else if (typeof user.color === 'string' && !isValidColor.test(user.color)) {
      console.warn('A user uses an unsupported color format', user);
    }

    if (user.name == null) {
      user.name = `User: ${clientId}`;
    }

    let anchor = relativePositionToAbsolutePosition(
      ydoc,
      ytype,
      Y.createRelativePositionFromJSON(aw.cursor.anchor),
      ymapping
    );
    let head = relativePositionToAbsolutePosition(
      ydoc,
      ytype,
      Y.createRelativePositionFromJSON(aw.cursor.head),
      ymapping
    );

    if (anchor === null || head === null) {
      return;
    }

    const maxSize = Math.max(state.doc.content.size - 1, 0);
    anchor = Math.min(anchor, maxSize);
    head = Math.min(head, maxSize);

    decorations.push(
      Decoration.widget(head, () => createCursor(user as Record<string, unknown>, clientId), {
        key: String(clientId),
        side: 10,
      })
    );

    decorations.push(
      Decoration.inline(
        Math.min(anchor, head),
        Math.max(anchor, head),
        createSelection(user as Record<string, unknown>, clientId),
        {
          inclusiveEnd: true,
          inclusiveStart: false,
        }
      )
    );
  });

  return DecorationSet.create(state.doc, decorations);
}

function createSafeCursorPlugin(
  awareness: NonNullable<SafeCollaborationCursorOptions['provider']['awareness']>,
  createCursor: (user: Record<string, unknown>, clientId: number) => HTMLElement,
  createSelection: (user: Record<string, unknown>, clientId: number) => DecorationAttrs
) {
  return new Plugin({
    key: yCursorPluginKey,
    state: {
      init(_, state) {
        return createSafeDecorations(
          state,
          awareness,
          defaultAwarenessStateFilter,
          createCursor,
          createSelection
        );
      },
      apply(tr, prevState, _oldState, newState) {
        const ystate = ySyncPluginKey.getState(newState) as CursorState | undefined;
        const yCursorState = tr.getMeta(yCursorPluginKey) as
          | { awarenessUpdated?: boolean }
          | undefined;

        if ((ystate && ystate.isChangeOrigin) || yCursorState?.awarenessUpdated) {
          return createSafeDecorations(
            newState,
            awareness,
            defaultAwarenessStateFilter,
            createCursor,
            createSelection
          );
        }

        return prevState.map(tr.mapping, tr.doc);
      },
    },
    props: {
      decorations(state) {
        return yCursorPluginKey.getState(state);
      },
    },
    view: (view) => {
      const awarenessListener = () => {
        // @ts-expect-error ProseMirror internal property
        if (view.docView) {
          setMeta(view, yCursorPluginKey, { awarenessUpdated: true });
        }
      };

      const updateCursorInfo = () => {
        const ystate = ySyncPluginKey.getState(view.state) as CursorState | undefined;

        if (!ystate?.type || !ystate.binding) {
          return;
        }

        const current = awareness.getLocalState() ?? {};

        if (view.hasFocus()) {
          const selection = view.state.selection;
          const mapping = ystate.binding.mapping as never;
          const anchor = absolutePositionToRelativePosition(selection.anchor, ystate.type, mapping);
          const head = absolutePositionToRelativePosition(selection.head, ystate.type, mapping);

          const prev = current.cursor as { anchor?: unknown; head?: unknown } | null | undefined;
          const prevAnchorJson = prev?.anchor ? JSON.stringify(prev.anchor) : null;
          const prevHeadJson = prev?.head ? JSON.stringify(prev.head) : null;
          const nextAnchorJson = JSON.stringify(anchor);
          const nextHeadJson = JSON.stringify(head);

          if (prevAnchorJson !== nextAnchorJson || prevHeadJson !== nextHeadJson) {
            awareness.setLocalStateField('cursor', {
              anchor,
              head,
            });
          }
        } else if (current.cursor != null) {
          awareness.setLocalStateField('cursor', null);
        }
      };

      awareness.on('update', awarenessListener);
      updateCursorInfo();

      return {
        update: updateCursorInfo,
        destroy: () => {
          awareness.off('update', awarenessListener);
          if (awareness.getLocalState()?.cursor != null) {
            awareness.setLocalStateField('cursor', null);
          }
        },
      };
    },
  });
}

export const SafeCollaborationCursor = Extension.create<
  SafeCollaborationCursorOptions,
  SafeCollaborationCursorStorage
>({
  name: 'safeCollaborationCursor',

  priority: 999,

  addOptions() {
    return {
      provider: null as never,
      user: {
        name: null,
        color: null,
      },
      render: (user) => {
        const cursor = document.createElement('span');
        cursor.classList.add('collaboration-cursor__caret');
        cursor.setAttribute('style', `border-color: ${user.color}`);

        const label = document.createElement('div');
        label.classList.add('collaboration-cursor__label');
        label.setAttribute('style', `background-color: ${user.color}`);
        label.insertBefore(document.createTextNode(String(user.name ?? 'Anonymous')), null);
        cursor.insertBefore(label, null);

        return cursor;
      },
      selectionRender: defaultSelectionBuilder,
    };
  },

  onCreate() {
    if (!this.options.provider?.awareness) {
      throw new Error(
        'The "provider" option is required for the SafeCollaborationCursor extension'
      );
    }
  },

  addStorage() {
    return {
      users: [],
    };
  },

  addCommands() {
    return {
      updateUser: (attributes) => () => {
        this.options.user = attributes;
        if (!this.options.provider.awareness) {
          return false;
        }
        this.options.provider.awareness.setLocalStateField('user', this.options.user);
        return true;
      },
      user:
        (attributes) =>
        ({ editor }) =>
          editor.commands.updateUser(attributes),
    };
  },

  addProseMirrorPlugins() {
    const awareness = this.options.provider.awareness;
    if (!awareness) {
      return [];
    }

    awareness.setLocalStateField('user', this.options.user);
    this.storage.users = awarenessStatesToArray(awareness.getStates());

    const awarenessUpdateListener = () => {
      this.storage.users = awarenessStatesToArray(awareness.getStates());
    };

    awareness.on('update', awarenessUpdateListener);

    const plugin = createSafeCursorPlugin(
      awareness,
      this.options.render,
      this.options.selectionRender
    );

    const originalView = plugin.spec.view;
    plugin.spec.view = (view) => {
      const pluginView = originalView?.(view);

      return {
        update: pluginView?.update,
        destroy: () => {
          awareness.off('update', awarenessUpdateListener);
          pluginView?.destroy?.();
        },
      };
    };

    return [plugin];
  },
});

export default SafeCollaborationCursor;
