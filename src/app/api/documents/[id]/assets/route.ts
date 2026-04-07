import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { uploadFile } from '@/lib/s3';
import crypto from 'crypto';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // Check access
  const document = await prisma.document.findFirst({
    where: {
      id,
      OR: [
        { ownerId: session.user.id },
        { collaborators: { some: { userId: session.user.id } } },
      ],
    },
  });

  if (!document) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split('.').pop() || 'bin';
  const uniqueId = crypto.randomUUID();
  const s3Key = `documents/${id}/${uniqueId}.${ext}`;

  const url = await uploadFile(s3Key, buffer, file.type);

  const asset = await prisma.documentAsset.create({
    data: {
      documentId: id,
      fileName: file.name,
      mimeType: file.type,
      s3Key,
      size: buffer.length,
      url,
    },
  });

  return NextResponse.json(asset, { status: 201 });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const assets = await prisma.documentAsset.findMany({
    where: { documentId: id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ assets });
}
