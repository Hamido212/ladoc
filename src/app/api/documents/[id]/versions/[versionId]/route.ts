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

// GET /api/documents/[id]/versions/[versionId] — get version detail
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; versionId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, versionId } = await params;
  const doc = await hasAccess(id, session.user.id);
  if (!doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const version = await prisma.documentVersion.findFirst({
    where: { id: versionId, documentId: id },
  });

  if (!version) {
    return NextResponse.json({ error: 'Version not found' }, { status: 404 });
  }

  return NextResponse.json(version);
}

// DELETE /api/documents/[id]/versions/[versionId] — delete a version
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; versionId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, versionId } = await params;

  // Only owner can delete versions
  const doc = await prisma.document.findFirst({
    where: { id, ownerId: session.user.id },
  });
  if (!doc) {
    return NextResponse.json({ error: 'Not found or not owner' }, { status: 404 });
  }

  await prisma.documentVersion.delete({ where: { id: versionId } });

  return NextResponse.json({ success: true });
}

// PUT /api/documents/[id]/versions/[versionId] — restore version
export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string; versionId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, versionId } = await params;
  const doc = await hasAccess(id, session.user.id);
  if (!doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const version = await prisma.documentVersion.findFirst({
    where: { id: versionId, documentId: id },
  });

  if (!version) {
    return NextResponse.json({ error: 'Version not found' }, { status: 404 });
  }

  // Restore the version content to the document
  const updated = await prisma.document.update({
    where: { id },
    data: {
      content: version.content ?? {},
      typstSource: version.typstSource,
    },
  });

  return NextResponse.json(updated);
}
