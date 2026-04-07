'use client';

import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DocumentList } from './DocumentList';

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  documents: Array<{
    id: string;
    title: string;
    updatedAt: string | Date;
  }>;
}

export function DashboardContent({ user, documents }: DashboardContentProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardHeader
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <DocumentList documents={documents} searchQuery={searchQuery} />
      </main>
    </div>
  );
}
