import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { encode } from 'next-auth/jwt';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const document = await prisma.document.findFirst({
    where: {
      id,
      deletedAt: null,
      OR: [{ ownerId: session.user.id }, { collaborators: { some: { userId: session.user.id } } }],
    },
    select: { id: true },
  });

  if (!document) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const token = await encode({
    secret,
    salt: 'authjs.session-token',
    token: {
      sub: session.user.id,
      name: session.user.name ?? undefined,
      email: session.user.email ?? undefined,
    },
  });

  return NextResponse.json({ token });
}
