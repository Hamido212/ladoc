<div align="center">

# ladoc

**Collaborative writing, structured documents, and Typst-powered export in one browser-based editor.**

Write in a familiar visual interface. Produce professional, print-ready documents without leaving the browser.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

[Overview](#overview) · [Why ladoc](#why-ladoc) · [Features](#features) · [Architecture](#architecture) · [Quick start](#quick-start) · [Roadmap](#roadmap) · [Contributing](#contributing)

</div>

---

## Overview

**ladoc** is an open-source collaborative document editor built for the browser.

It combines the usability of a modern visual editor with the output quality of a structured typesetting system. Instead of forcing users to choose between ease of use and professional layout, ladoc brings both into a single workflow:

- write in a familiar editor
- collaborate in real time
- preview changes instantly
- export polished, print-ready documents

Under the hood, ladoc uses **TipTap** for editing, **Typst** for document rendering and export, and **Yjs/Hocuspocus** for collaborative editing.

## Why ladoc

Most document tools still force a tradeoff.

Visual editors are easy to use, but often weak when it comes to structure, typography, and reliable export. Typesetting systems produce excellent output, but they are too technical for many users and teams.

ladoc is built to bridge that gap.

It provides a browser-based editing experience for people who want:

- a Word-like writing workflow
- collaborative editing in real time
- structured, reusable document templates
- high-quality PDF and document export
- a modern open-source foundation for professional writing tools

## Features

### Visual editing

- Visual editor built with **TipTap**
- Multiple working modes: **visual**, **split**, and **Typst source**
- Support for headings, lists, tables, images, formulas, and code blocks
- Footnotes, citations, and automatic table of contents
- Rich text formatting, highlighting, and layout controls

### Document workflows

- Template-based document creation
- Autosave by default
- Version history with restore support
- Soft delete and recovery
- Export to **PDF**, **SVG**, **Typst**, **plain text**, and **LaTeX**

### Collaboration

- Real-time collaboration with **Yjs**
- Sync server powered by **Hocuspocus**
- Live cursors for active collaborators
- Offline persistence with IndexedDB

### Authentication and persistence

- Email/password authentication
- GitHub and Google sign-in
- Role-based sharing per document
- PostgreSQL-backed persistence with Prisma

### Internationalization

- English
- German

Additional languages can be added through `messages/*.json`.

## Demo

### Home

![ladoc home screen](./public/home.png)

### Editor

![ladoc editor screen](./public/editor.png)

> A live demo is planned. Screenshots currently provide a preview of the interface and editing experience.

## Architecture

ladoc is built around a simple idea:

> **Keep writing approachable at the surface, and structured underneath.**

### Core components

- **TipTap** provides the browser editing experience
- **Typst** powers structured document rendering and export
- **Yjs + Hocuspocus** enable collaborative editing
- **Next.js** provides the application framework
- **Prisma + PostgreSQL** handle persistence and data access

### Document pipeline


TipTap JSON -> serializer -> Typst source -> WASM worker -> preview/export

1. The editor produces structured document content.


2. ladoc serializes that content into Typst.


3. Typst is compiled in the browser through WASM.


4. The output is used for preview and export.



This architecture makes it possible to preserve a visual editing workflow while still producing high-quality documents.

Tech stack

Area	Technology

Framework	Next.js 16
UI	React 19
Language	TypeScript 5
Styling	Tailwind CSS 4
Editor	TipTap v3
Typesetting	Typst via @myriaddreamin/typst.ts
Collaboration	Yjs + Hocuspocus
Database	PostgreSQL
ORM	Prisma 7
Authentication	Auth.js / NextAuth v5
State	Zustand
i18n	next-intl
Testing	Vitest + Testing Library


Templates

ladoc includes templates for common professional document types:

Thesis

Resume

Letter

Report

Presentation

Book

Invoice

Meeting minutes


Custom templates can be added in src/lib/templates/.

Quick start

Requirements

Node.js >= 20

PostgreSQL >= 14

npm, pnpm, or yarn


Clone the repository

git clone https://github.com/Hamido212/ladoc.git
cd ladoc

Install dependencies

npm install

Configure environment variables

cp .env.example .env

Set at least the following values:

DATABASE_URL="postgresql://ladoc:ladoc_dev@localhost:5432/ladoc"
AUTH_SECRET="<generate-with-openssl-rand-hex-32>"
NEXTAUTH_URL="http://localhost:3000"

Generate a secure secret with:

openssl rand -hex 32

Initialize the database

npx prisma migrate dev
npx prisma generate

Start the development server

npm run dev

Open http://localhost:3000.

Start the collaboration server (optional)

npm run collab

The collaboration server listens on ws://localhost:1234 by default.

Configuration

A complete environment template is available in .env.example.

Variable	Description	Example

DATABASE_URL	PostgreSQL connection string	postgresql://user:pass@localhost:5432/ladoc
AUTH_SECRET	Secret used for authentication	openssl rand -hex 32
NEXTAUTH_URL	Base URL of the application	http://localhost:3000
AUTH_GITHUB_ID / AUTH_GITHUB_SECRET	GitHub OAuth credentials	—
AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET	Google OAuth credentials	—
NEXT_PUBLIC_COLLAB_URL	Hocuspocus WebSocket endpoint	ws://localhost:1234
S3_ENDPOINT	S3-compatible storage endpoint	http://localhost:9000
S3_ACCESS_KEY	Storage access key	—
S3_SECRET_KEY	Storage secret key	—
S3_BUCKET	Storage bucket name	ladoc-assets
S3_PUBLIC_URL	Public asset base URL	http://localhost:9000/ladoc-assets


Scripts

Command	Description

npm run dev	Start the development server
npm run build	Build for production
npm run start	Start the production server
npm run lint	Run ESLint
npm run format	Format the codebase
npm run format:check	Check formatting
npm run test	Run tests
npm run test:coverage	Run tests with coverage
npm run collab	Start the collaboration server


Project structure

ladoc/
├── src/
│   ├── app/                  # Next.js App Router
│   ├── components/           # UI components
│   ├── hooks/                # Editor and app hooks
│   ├── lib/                  # Auth, db, editor, templates, typst
│   ├── stores/               # Zustand stores
│   └── generated/            # Generated code
├── server/                   # Collaboration server
├── prisma/                   # Database schema
├── messages/                 # i18n messages
└── public/                   # Static assets

Roadmap

[x] Visual editor with live Typst preview

[x] Template-based document creation

[x] Autosave, version history, and restore

[x] Authentication with email/password and OAuth

[x] German and English localization

[x] Real-time collaboration with live cursors

[x] Export to PDF, SVG, Typst, plain text, and LaTeX

[ ] Comments and review mode

[ ] Improved bibliography and citation workflows

[ ] Better asset handling for preview and export

[ ] PWA support and mobile polish

[ ] AI-assisted writing tools

[ ] More languages

[ ] LaTeX import

[ ] Custom theme editor

[ ] Cloud storage integrations


Contributing

Contributions are welcome.

1. Fork the repository


2. Create a feature branch


3. Commit your changes


4. Push the branch


5. Open a pull request



Before submitting changes:

run formatting with npm run format

run linting with npm run lint

run tests with npm run test


License

This project is licensed under the MIT License. See LICENSE for details.

Acknowledgements

ladoc builds on top of excellent open-source tools, especially:

Typst

TipTap

Yjs

Hocuspocus

Next.js

Prisma

Auth.js


<div align="center">If you find ladoc useful, consider giving it a star.

</div>
