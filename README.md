<div align="center">

# ladoc

**The collaborative document editor for the browser.**

Write professional documents with a Word-like interface and get print-ready output powered by [Typst](https://typst.app).

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)

[Features](#-features) · [Demo](#-demo) · [Quick Start](#-quick-start) · [Architecture](#-architecture) · [Contributing](#-contributing)

</div>

---

## 📖 Table Of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Demo](#-demo)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Scripts](#-scripts)
- [Architecture](#-architecture)
- [Templates](#-templates)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ About

**ladoc** combines the simplicity of a WYSIWYG editor with the typographic quality of a professional typesetting system. Instead of dealing with LaTeX syntax or fragile Word layouts, you write in a familiar visual interface while ladoc translates your content into [Typst](https://typst.app) in the background.

The goal is simple: **professional documents without friction.** Whether you are writing a thesis, a DIN 5008 business letter, a resume, or an invoice, ladoc provides ready-to-use templates, live preview, version history, and optional real-time collaboration.

> **Why not just use Typst directly?**
> Typst is powerful, but it still expects users to write code. ladoc is the visual layer on top for people who want a Word-like workflow without giving up typographic quality.

---

## 🚀 Features

### Editor

- 📝 **Visual WYSIWYG editor** built with [TipTap v3](https://tiptap.dev)
- 👀 **Live Typst preview** compiled client-side via Typst WASM
- 🔀 **Three view modes**: visual, split, and Typst code
- 📐 **Mathematical formulas** with inline and block support
- 📚 **Footnotes, citations, and reference-friendly document flow**
- 📑 **Automatic table of contents**
- 🖼️ **Images, tables, lists, and code blocks**
- 🎨 **Fonts, font sizes, colors, and highlighting**

### Document Management

- 🗂️ **Dashboard** with search and document overview
- 💾 **Autosave** with no manual save required
- 🕑 **Version history** with restore support
- 📤 **Export** as PDF, SVG, Typst source, plain text, or LaTeX
- 🗑️ **Soft delete** with trash restore

### Collaboration

- 👥 **Real-time collaboration** via Yjs and Hocuspocus
- 🎯 **Live cursors** for active collaborators
- 🌐 **Offline persistence** via IndexedDB

### Authentication And Security

- 🔐 **NextAuth v5** with email/password, GitHub, and Google login
- 🔑 **bcrypt** for password hashing
- 🛡️ **Role-based sharing** per document

### Internationalization

- 🇩🇪 German
- 🇬🇧 English
- Additional languages can be added through `messages/*.json`

---

## 🛠️ Tech Stack

| Area                   | Technology                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| **Frontend framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack)                                               |
| **UI library**         | [React 19](https://react.dev)                                                                          |
| **Language**           | [TypeScript 5](https://www.typescriptlang.org)                                                         |
| **Styling**            | [Tailwind CSS 4](https://tailwindcss.com)                                                              |
| **UI primitives**      | [Radix UI](https://www.radix-ui.com)                                                                   |
| **Icons**              | [Lucide](https://lucide.dev)                                                                           |
| **Editor**             | [TipTap v3](https://tiptap.dev) (ProseMirror)                                                          |
| **Typesetting**        | [Typst](https://typst.app) via [`@myriaddreamin/typst.ts`](https://github.com/Myriad-Dreamin/typst.ts) |
| **Database**           | [PostgreSQL](https://www.postgresql.org)                                                               |
| **ORM**                | [Prisma 7](https://www.prisma.io) with `@prisma/adapter-pg`                                            |
| **Authentication**     | [NextAuth v5](https://authjs.dev)                                                                      |
| **Collaboration**      | [Yjs](https://yjs.dev) + [Hocuspocus](https://tiptap.dev/hocuspocus)                                   |
| **State management**   | [Zustand](https://zustand.docs.pmnd.rs)                                                                |
| **i18n**               | [next-intl](https://next-intl.dev)                                                                     |
| **Object storage**     | S3-compatible storage (for example MinIO) for images                                                   |
| **Testing**            | [Vitest](https://vitest.dev) + Testing Library                                                         |

---

## 🎬 Demo

> _Screenshots and a live demo are coming soon._

```
┌────────────────────────────────────────────────────────────┐
│  ladoc  │  My Documents   🔍 Search   + New Document      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│   📄 Thesis             📄 Resume          📄 Invoice      │
│   Last: today           Last: yesterday    Last: 2d ago    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start

### Requirements

- **Node.js** >= 20
- **PostgreSQL** >= 14
- **npm**, **pnpm**, or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/<your-user>/ladoc.git
cd ladoc
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and provide at least the following values:

```env
DATABASE_URL="postgresql://ladoc:ladoc_dev@localhost:5432/ladoc"
AUTH_SECRET="<generate-with-openssl-rand-hex-32>"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secure `AUTH_SECRET` with:

```bash
openssl rand -hex 32
```

### 4. Initialize the database

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start writing.

### 6. (Optional) Start the collaboration server

For real-time collaboration, run this in a second terminal:

```bash
npm run collab
```

The Hocuspocus server listens on `ws://localhost:1234` by default.

---

## 🔧 Configuration

All environment variables are defined in `.env`. A complete template is available in [`.env.example`](./.env.example).

| Variable                                | Description                               | Example                                       |
| --------------------------------------- | ----------------------------------------- | --------------------------------------------- |
| `DATABASE_URL`                          | PostgreSQL connection string              | `postgresql://user:pass@localhost:5432/ladoc` |
| `AUTH_SECRET`                           | Secret used to sign NextAuth JWTs         | `openssl rand -hex 32`                        |
| `NEXTAUTH_URL`                          | Base URL of the application               | `http://localhost:3000`                       |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | GitHub OAuth credentials (optional)       | —                                             |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth credentials (optional)       | —                                             |
| `NEXT_PUBLIC_COLLAB_URL`                | WebSocket URL for the Hocuspocus server   | `ws://localhost:1234`                         |
| `S3_ENDPOINT`                           | Endpoint for S3-compatible object storage | `http://localhost:9000`                       |
| `S3_ACCESS_KEY`                         | S3 access key                             | —                                             |
| `S3_SECRET_KEY`                         | S3 secret key                             | —                                             |
| `S3_BUCKET`                             | S3 bucket name                            | `ladoc-assets`                                |
| `S3_PUBLIC_URL`                         | Public base URL for uploaded assets       | `http://localhost:9000/ladoc-assets`          |

> ⚠️ **Never commit `.env`.** The file is already listed in `.gitignore`.

---

## 📜 Scripts

| Command                 | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start the Next.js development server with Turbopack |
| `npm run build`         | Create a production build                           |
| `npm run start`         | Start the built application                         |
| `npm run lint`          | Run ESLint across the project                       |
| `npm run format`        | Format the codebase with Prettier                   |
| `npm run format:check`  | Check formatting without changing files             |
| `npm run test`          | Run unit tests with Vitest                          |
| `npm run test:coverage` | Run tests with coverage reporting                   |
| `npm run collab`        | Start the Hocuspocus collaboration server           |

---

## 🏗️ Architecture

```
ladoc/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Login and register
│   │   ├── api/                # API routes (documents, auth, uploads)
│   │   ├── dashboard/          # Document overview
│   │   ├── editor/[id]/        # Editor page
│   │   └── page.tsx            # Landing page
│   │
│   ├── components/
│   │   ├── editor/             # Editor container, toolbar, dialogs
│   │   ├── dashboard/          # Dashboard UI
│   │   ├── templates/          # Template gallery
│   │   ├── math/               # Formula editor
│   │   └── citations/          # Citation search
│   │
│   ├── hooks/                  # useEditor, useAutoSave, useCollaboration, ...
│   ├── lib/
│   │   ├── auth.ts             # NextAuth configuration
│   │   ├── db.ts               # Prisma client
│   │   ├── editor/extensions/  # Custom TipTap extensions
│   │   ├── templates/          # Document templates
│   │   └── typst/              # Serializer and WASM worker
│   ├── stores/                 # Zustand stores
│   └── generated/prisma/       # Prisma-generated client
│
├── server/
│   └── collaboration.ts        # Hocuspocus WebSocket server
│
├── prisma/
│   └── schema.prisma           # Database schema
│
├── messages/                   # i18n messages (de, en)
└── public/                     # Static assets and WASM files
```

### Data Model

```mermaid
erDiagram
    User ||--o{ Document : owns
    User ||--o{ DocumentCollaborator : collaborates
    Document ||--o{ DocumentVersion : has
    Document ||--o{ DocumentAsset : has
    Document ||--o{ DocumentCollaborator : shared_with

    User {
        string id PK
        string email UK
        string name
        string password
    }
    Document {
        string id PK
        string title
        json content
        string typstSource
        string ownerId FK
        datetime updatedAt
    }
    DocumentVersion {
        string id PK
        string documentId FK
        json content
        datetime createdAt
    }
```

### Data Flow: Editor To Preview And Export

```
TipTap JSON ──► serializer.ts ──► Typst source ──► WASM worker ──► SVG/PDF output
```

1. The **editor** produces ProseMirror JSON on every change.
2. The **serializer** (`src/lib/typst/serializer.ts`) converts that JSON into Typst.
3. A **Web Worker** compiles the Typst source through WASM without a server roundtrip.
4. The **preview and export layer** renders SVG for live preview and PDF for export.

---

## 📚 Templates

ladoc currently ships with **8 professional templates**, localized and ready to use:

| Template               | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| 🎓 **Thesis**          | Title page, abstract, six chapters, references                  |
| 👤 **Resume**          | Profile, work experience, education, skills, certifications     |
| ✉️ **Letter**          | DIN 5008-style business letter with reference line              |
| 📊 **Report**          | Executive summary, table of contents, analysis, recommendations |
| 🎤 **Presentation**    | Landscape slides with agenda and content sections               |
| 📖 **Book**            | Half-title, main title, dedication, chapters, afterword         |
| 🧾 **Invoice**         | Sender, recipient, line items, VAT, bank details                |
| 📋 **Meeting Minutes** | Participants, agenda items, decisions, action list              |

Want to add your own template? Create a new file in `src/lib/templates/` and register it in `src/lib/templates/index.ts`.

---

## 🗺️ Roadmap

- [x] Visual editor with live Typst preview
- [x] Eight professional document templates
- [x] Autosave, version history, and soft delete with restore
- [x] Authentication with email/password and OAuth providers
- [x] German and English localization
- [x] Real-time collaboration with live cursors
- [x] PDF, SVG, Typst, plain text, and LaTeX export
- [ ] Comments and review mode
- [ ] Proper bibliography support for Typst citations
- [ ] Stronger asset pipeline for uploaded images across preview and export
- [ ] PWA support and mobile polish
- [ ] AI-assisted writing tools
- [ ] More languages (FR, ES, IT)
- [ ] LaTeX import
- [ ] Custom theme editor for templates
- [ ] Cloud storage integrations (Dropbox, Google Drive)

---

## 🤝 Contributing

Contributions are welcome. A typical workflow looks like this:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Code Style

- Format code with **Prettier** (`npm run format`)
- Run **ESLint** before submitting (`npm run lint`)
- Run **Vitest** for tests (`npm run test`)
- Commits follow [Conventional Commits](https://www.conventionalcommits.org)

### Reporting Bugs

Open a [GitHub Issue](https://github.com/<your-user>/ladoc/issues) and include:

- a short problem description
- steps to reproduce
- expected behavior and actual behavior
- screenshots if relevant

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

## 🙏 Acknowledgements

ladoc stands on the shoulders of great open-source projects:

- [Typst](https://typst.app) for the modern typesetting engine
- [TipTap](https://tiptap.dev) for the headless ProseMirror-based editor
- [Next.js](https://nextjs.org) for the application framework
- [Yjs](https://yjs.dev) for CRDT-based real-time collaboration
- [@myriaddreamin/typst.ts](https://github.com/Myriad-Dreamin/typst.ts) for running Typst in the browser
- [Prisma](https://www.prisma.io), [NextAuth](https://authjs.dev), [Radix UI](https://www.radix-ui.com), and many more

<div align="center">

**If you like ladoc, give the project a star on GitHub.**

Made with love in Germany

</div>
