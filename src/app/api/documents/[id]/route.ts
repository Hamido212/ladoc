import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

async function hasAccess(documentId: string, userId: string) {
  const doc = await prisma.document.findFirst({
    where: {
      id: documentId,
      deletedAt: null,
      OR: [{ ownerId: userId }, { collaborators: { some: { userId } } }],
    },
  });
  return doc;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const document = await hasAccess(id, session.user.id);

  if (!document) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(document);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  if (body.restore === true) {
    const deletedDocument = await prisma.document.findFirst({
      where: {
        id,
        ownerId: session.user.id,
        deletedAt: { not: null },
      },
    });

    if (!deletedDocument) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const restoredDocument = await prisma.document.update({
      where: { id },
      data: { deletedAt: null },
    });

    return NextResponse.json(restoredDocument);
  }

  const existing = await hasAccess(id, session.user.id);
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const document = await prisma.document.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.typstSource !== undefined && { typstSource: body.typstSource }),
      ...(body.pageSettings !== undefined && { pageSettings: body.pageSettings }),
      ...(body.documentMeta !== undefined && { documentMeta: body.documentMeta }),
    },
  });

  return NextResponse.json(document);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // Only owner can delete
  const document = await prisma.document.findFirst({
    where: { id, ownerId: session.user.id, deletedAt: null },
  });

  if (!document) {
    return NextResponse.json({ error: 'Not found or not owner' }, { status: 404 });
  }

  // Soft delete the document
  await prisma.document.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
