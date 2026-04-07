'use client';

import { useTranslations } from 'next-intl';
import { Users, Share2 } from 'lucide-react';
import { useState } from 'react';
import { ShareDialog } from './ShareDialog';

interface AwarenessUser {
  name: string;
  color: string;
}

interface CollaborationBarProps {
  documentId: string;
  status: 'connecting' | 'connected' | 'disconnected';
  connectedUsers: number;
  awarenessUsers?: AwarenessUser[];
}

export function CollaborationBar({
  documentId,
  status,
  connectedUsers,
  awarenessUsers = [],
}: CollaborationBarProps) {
  const t = useTranslations('collaboration');
  const [shareOpen, setShareOpen] = useState(false);

  if (status === 'disconnected') return null;

  return (
    <>
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-gray-100 bg-white/80">
        {/* Connection status */}
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              status === 'connected' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'
            }`}
          />
          <span className="text-xs text-gray-500">
            {status === 'connected' ? t('connected') : t('connecting')}
          </span>
        </span>

        {/* User avatars */}
        {awarenessUsers.length > 0 && (
          <div className="flex items-center -space-x-1.5 ml-2">
            {awarenessUsers.slice(0, 5).map((user, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white border-2 border-white"
                style={{ backgroundColor: user.color }}
                title={user.name}
              >
                {user.name[0]?.toUpperCase() || '?'}
              </div>
            ))}
            {awarenessUsers.length > 5 && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-gray-600 bg-gray-100 border-2 border-white">
                +{awarenessUsers.length - 5}
              </div>
            )}
          </div>
        )}

        {/* User count */}
        {connectedUsers > 1 && (
          <span className="flex items-center gap-1 text-xs text-gray-400 ml-1">
            <Users className="w-3 h-3" />
            {connectedUsers}
          </span>
        )}

        <div className="flex-1" />

        {/* Share button */}
        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          {t('share')}
        </button>
      </div>

      <ShareDialog
        documentId={documentId}
        open={shareOpen}
        onOpenChange={setShareOpen}
      />
    </>
  );
}
