import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

async function hasAccess(documentId: string, userId: string) {
  return prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [
        { ownerId: userId },
        { collaborators: { some: { userId } } },
      ],
    },
  });
}

// GET /api/documents/[id]/versions — list versions
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const doc = await hasAccess(id, session.user.id);
  if (!doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const versions = await prisma.documentVersion.findMany({
    where: { documentId: id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      label: true,
      createdAt: true,
    },
  });

  return NextResponse.json(versions);
}

// POST /api/documents/[id]/versions — create snapshot
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const doc = await hasAccess(id, session.user.id);
  if (!doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));

  // Snapshot current document state
  const version = await prisma.documentVersion.create({
    data: {
      documentId: id,
      content: doc.content ?? {},
      typstSource: doc.typstSource,
      label: body.label || null,
    },
  });

  return NextResponse.json(version, { status: 201 });
}
