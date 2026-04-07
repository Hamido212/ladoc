import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET /api/documents/[id]/collaborators — List collaborators
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // Only owner or existing collaborator can see the list
  const doc = await prisma.document.findFirst({
    where: {
      id,
      deletedAt: null,
      OR: [
        { ownerId: session.user.id },
        { collaborators: { some: { userId: session.user.id } } },
      ],
    },
    select: { ownerId: true },
  });

  if (!doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const collaborators = await prisma.documentCollaborator.findMany({
    where: { documentId: id },
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  // Also include owner info
  const owner = await prisma.user.findUnique({
    where: { id: doc.ownerId },
    select: { id: true, name: true, email: true, image: true },
  });

  return NextResponse.json({
    owner,
    collaborators: collaborators.map((c) => ({
      id: c.id,
      role: c.role,
      createdAt: c.createdAt,
      user: c.user,
    })),
  });
}

// POST /api/documents/[id]/collaborators — Add collaborator by email
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // Only owner can add collaborators
  const doc = await prisma.document.findFirst({
    where: { id, ownerId: session.user.id, deletedAt: null },
  });

  if (!doc) {
    return NextResponse.json({ error: 'Not found or not owner' }, { status: 404 });
  }

  const body = await request.json();
  const { email, role = 'editor' } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (user.id === session.user.id) {
    return NextResponse.json({ error: 'Cannot add yourself' }, { status: 400 });
  }

  // Upsert collaborator
  const collaborator = await prisma.documentCollaborator.upsert({
    where: { documentId_userId: { documentId: id, userId: user.id } },
    update: { role },
    create: { documentId: id, userId: user.id, role },
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
    },
  });

  return NextResponse.json({
    id: collaborator.id,
    role: collaborator.role,
    createdAt: collaborator.createdAt,
    user: collaborator.user,
  });
}

// DELETE /api/documents/[id]/collaborators — Remove collaborator
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // Only owner can remove collaborators
  const doc = await prisma.document.findFirst({
    where: { id, ownerId: session.user.id, deletedAt: null },
  });

  if (!doc) {
    return NextResponse.json({ error: 'Not found or not owner' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const collaboratorId = searchParams.get('collaboratorId');

  if (!collaboratorId) {
    return NextResponse.json({ error: 'collaboratorId required' }, { status: 400 });
  }

  await prisma.documentCollaborator.delete({
    where: { id: collaboratorId, documentId: id },
  });

  return NextResponse.json({ success: true });
}
