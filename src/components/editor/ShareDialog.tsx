'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import * as Dialog from '@radix-ui/react-dialog';
import { X, UserPlus, Trash2, Crown, Loader2 } from 'lucide-react';

interface Collaborator {
  id: string;
  role: string;
  user: { id: string; name: string | null; email: string | null; image: string | null };
}

interface ShareDialogProps {
  documentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareDialog({ documentId, open, onOpenChange }: ShareDialogProps) {
  const t = useTranslations('collaboration');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [owner, setOwner] = useState<{ id: string; name: string | null; email: string | null; image: string | null } | null>(null);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const loadCollaborators = useCallback(async () => {
    try {
      const res = await fetch(`/api/documents/${documentId}/collaborators`);
      if (res.ok) {
        const data = await res.json();
        setOwner(data.owner);
        setCollaborators(data.collaborators);
      }
    } catch {
      // ignore
    }
  }, [documentId]);

  useEffect(() => {
    if (open) {
      loadCollaborators();
    }
  }, [open, loadCollaborators]);

  const handleAdd = useCallback(async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/documents/${documentId}/collaborators`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), role }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || t('addError'));
        return;
      }

      setEmail('');
      loadCollaborators();
    } catch {
      setError(t('addError'));
    } finally {
      setLoading(false);
    }
  }, [email, role, documentId, loadCollaborators, t]);

  const handleRemove = useCallback(async (collaboratorId: string) => {
    try {
      await fetch(`/api/documents/${documentId}/collaborators?collaboratorId=${collaboratorId}`, {
        method: 'DELETE',
      });
      setCollaborators((prev) => prev.filter((c) => c.id !== collaboratorId));
    } catch {
      // ignore
    }
  }, [documentId]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl p-6 w-[480px] max-w-[95vw]">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-base font-semibold text-gray-900">
              {t('shareTitle')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Add collaborator form */}
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder={t('emailPlaceholder')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="editor">{t('roleEditor')}</option>
              <option value="viewer">{t('roleViewer')}</option>
            </select>
            <button
              onClick={handleAdd}
              disabled={loading || !email.trim()}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 mb-3">{error}</p>
          )}

          {/* Members list */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {/* Owner */}
            {owner && (
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                  {(owner.name || owner.email || '?')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{owner.name || owner.email}</p>
                  {owner.name && <p className="text-xs text-gray-500 truncate">{owner.email}</p>}
                </div>
                <span className="flex items-center gap-1 text-xs text-amber-600">
                  <Crown className="w-3 h-3" />
                  {t('roleOwner')}
                </span>
              </div>
            )}

            {/* Collaborators */}
            {collaborators.map((collab) => (
              <div key={collab.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-medium">
                  {(collab.user.name || collab.user.email || '?')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{collab.user.name || collab.user.email}</p>
                  {collab.user.name && <p className="text-xs text-gray-500 truncate">{collab.user.email}</p>}
                </div>
                <span className="text-xs text-gray-400 capitalize">{collab.role === 'editor' ? t('roleEditor') : t('roleViewer')}</span>
                <button
                  onClick={() => handleRemove(collab.id)}
                  className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  title={t('remove')}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {collaborators.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">{t('noCollaborators')}</p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
