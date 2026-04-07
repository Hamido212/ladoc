'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';

interface AwarenessUser {
  name: string;
  color: string;
}

interface UseCollaborationOptions {
  documentId: string | null;
  token?: string;
  userName?: string;
  userColor?: string;
}

// Generate a random color for cursor
function randomColor() {
  const colors = [
    '#958DF1', '#F98181', '#FBBC88', '#FAF594',
    '#70CFF8', '#94FADB', '#B9F18D', '#E8A0BF',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function useCollaboration({
  documentId,
  token,
  userName = 'Anonymous',
  userColor,
}: UseCollaborationOptions) {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [connectedUsers, setConnectedUsers] = useState<number>(0);
  const [awarenessUsers, setAwarenessUsers] = useState<AwarenessUser[]>([]);
  const color = useMemo(() => userColor || randomColor(), [userColor]);
  const indexeddbProviderRef = useRef<unknown>(null);

  const ydoc = useMemo(() => new Y.Doc(), []);

  // Set up IndexedDB offline persistence
  useEffect(() => {
    if (!documentId) return;

    let idbProvider: { destroy: () => void } | null = null;

    import('y-indexeddb').then(({ IndexeddbPersistence }) => {
      idbProvider = new IndexeddbPersistence(`ladoc-${documentId}`, ydoc);
      indexeddbProviderRef.current = idbProvider;
    }).catch(() => {
      // y-indexeddb not available, skip offline persistence
    });

    return () => {
      idbProvider?.destroy();
      indexeddbProviderRef.current = null;
    };
  }, [documentId, ydoc]);

  const provider = useMemo(() => {
    if (!documentId || !token) return null;

    const wsUrl = process.env.NEXT_PUBLIC_COLLAB_URL || 'ws://localhost:1234';

    return new HocuspocusProvider({
      url: wsUrl,
      name: documentId,
      document: ydoc,
      token,
      onStatus({ status: s }) {
        setStatus(s as 'connecting' | 'connected' | 'disconnected');
      },
      onAwarenessUpdate({ states }) {
        setConnectedUsers(states.length);
        // Extract user info from awareness states
        const users: AwarenessUser[] = [];
        for (const state of states) {
          const user = (state as Record<string, unknown>)?.user as AwarenessUser | undefined;
          if (user?.name) {
            users.push({ name: user.name, color: user.color || '#888' });
          }
        }
        setAwarenessUsers(users);
      },
    });
  }, [documentId, token, ydoc]);

  // Set awareness user info
  useEffect(() => {
    if (!provider) return;
    provider.setAwarenessField('user', {
      name: userName,
      color,
    });
  }, [provider, userName, color]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      provider?.destroy();
    };
  }, [provider]);

  return {
    ydoc,
    provider,
    status,
    connectedUsers,
    awarenessUsers,
  };
}
