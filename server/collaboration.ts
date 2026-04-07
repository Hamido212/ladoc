import { Server } from '@hocuspocus/server';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { decode } from 'next-auth/jwt';
import * as Y from 'yjs';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL!;
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const server = new Server({
  port: 1234,

  async onAuthenticate({ token, documentName }) {
    if (!token) {
      throw new Error('Not authorized');
    }

    // Decode the JWT token from NextAuth
    let decoded: { sub?: string; name?: string; email?: string } | null = null;
    try {
      decoded = await decode({
        token,
        secret: process.env.AUTH_SECRET || '',
        salt: 'authjs.session-token',
      });
    } catch {
      // Fallback: treat token as user identifier for dev
      console.warn('JWT decode failed, using token as-is');
      return { user: { id: token, name: 'User' } };
    }

    if (!decoded?.sub) {
      throw new Error('Invalid token');
    }

    // Check document access
    const doc = await prisma.document.findFirst({
      where: {
        id: documentName,
        deletedAt: null,
        OR: [
          { ownerId: decoded.sub },
          { collaborators: { some: { userId: decoded.sub } } },
        ],
      },
    });

    if (!doc) {
      throw new Error('Document not found or no access');
    }

    return {
      user: {
        id: decoded.sub,
        name: decoded.name || decoded.email || 'Anonymous',
      },
    };
  },

  async onLoadDocument({ document, documentName }) {
    console.log(`Loading document: ${documentName}`);

    // Load Yjs state from database
    const doc = await prisma.document.findUnique({
      where: { id: documentName },
      select: { yjsState: true },
    });

    if (doc?.yjsState) {
      const state = new Uint8Array(doc.yjsState);
      Y.applyUpdate(document, state);
      console.log(`Restored Yjs state for ${documentName} (${state.length} bytes)`);
    }

    return document;
  },

  async onStoreDocument({ document, documentName }) {
    // Encode the full Yjs state and persist to database
    const state = Y.encodeStateAsUpdate(document);
    console.log(`Storing document: ${documentName} (${state.length} bytes)`);

    try {
      await prisma.document.update({
        where: { id: documentName },
        data: {
          yjsState: Buffer.from(state),
        },
      });
    } catch (err) {
      console.error(`Failed to store Yjs state for ${documentName}:`, err);
    }
  },

  async onDisconnect({ documentName, clientsCount }) {
    console.log(`Client disconnected from ${documentName}. Remaining: ${clientsCount}`);
  },
});

server.listen();
