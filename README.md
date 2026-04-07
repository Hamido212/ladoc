<div align="center">

# ladoc

**Der kollaborative Dokumenten-Editor für den Browser.**

Schreibe professionelle Dokumente mit einer Word-ähnlichen Oberfläche — und erhalte dank [Typst](https://typst.app) druckreife PDFs in Echtzeit.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#lizenz)

[Features](#-features) · [Demo](#-demo) · [Quick Start](#-quick-start) · [Architektur](#-architektur) · [Mitwirken](#-mitwirken)

</div>

---

## 📖 Inhaltsverzeichnis

- [Über das Projekt](#-über-das-projekt)
- [Features](#-features)
- [Tech-Stack](#-tech-stack)
- [Demo](#-demo)
- [Quick Start](#-quick-start)
- [Konfiguration](#-konfiguration)
- [Skripte](#-skripte)
- [Architektur](#-architektur)
- [Vorlagen](#-vorlagen)
- [Roadmap](#-roadmap)
- [Mitwirken](#-mitwirken)
- [Lizenz](#-lizenz)

---

## ✨ Über das Projekt

**ladoc** verbindet die Einfachheit eines WYSIWYG-Editors mit der typografischen Qualität eines professionellen Satzsystems. Statt dich mit LaTeX-Syntax oder instabilen Word-Layouts herumzuschlagen, schreibst du in einer vertrauten visuellen Oberfläche — und ladoc übersetzt deine Inhalte im Hintergrund nach [Typst](https://typst.app), das wiederum makelloses PDF rendert.

Das Ziel: **Professionelle Dokumente, ohne Hürden.** Egal ob Abschlussarbeit, Geschäftsbrief nach DIN 5008, Lebenslauf oder Rechnung — ladoc liefert fertige Vorlagen, Live-Vorschau, Versionierung und optionale Echtzeit-Zusammenarbeit.

> **Warum nicht einfach Typst nutzen?**
> Typst ist mächtig, verlangt aber Code-Kenntnisse. ladoc ist die visuelle Schicht darüber — für alle, die ein Word-ähnliches Gefühl wollen, ohne auf typografische Qualität zu verzichten.

---

## 🚀 Features

### Editor
- 📝 **Visueller WYSIWYG-Editor** auf Basis von [TipTap v3](https://tiptap.dev)
- 👀 **Live-PDF-Vorschau** — kompiliert clientseitig via Typst WASM
- 🔀 **Drei Ansichtsmodi** — Visuell, Split, Typst-Code
- 📐 **Mathematische Formeln** (LaTeX-Syntax, inline & block)
- 📚 **Fußnoten, Zitate & Literaturverzeichnis**
- 📑 **Automatisches Inhaltsverzeichnis**
- 🖼️ **Bilder, Tabellen, Listen, Code-Blöcke**
- 🎨 **Schriftarten, Schriftgrößen, Farben, Highlighting**

### Dokumenten-Management
- 🗂️ **Dashboard** mit Suche und Dokumentenübersicht
- 💾 **Auto-Save** — kein manuelles Speichern nötig
- 🕑 **Versionshistorie** — zu jedem früheren Stand zurückkehren
- 📤 **Export** als PDF oder Typst-Quellcode
- 🗑️ **Soft-Delete** mit Wiederherstellung

### Zusammenarbeit
- 👥 **Echtzeit-Kollaboration** via Yjs + Hocuspocus (optional)
- 🎯 **Live-Cursor** anderer Teilnehmer
- 🌐 **Offline-Persistenz** via IndexedDB

### Authentifizierung & Sicherheit
- 🔐 **NextAuth v5** mit E-Mail/Passwort-, GitHub- und Google-Login
- 🔑 **bcrypt** für Passwort-Hashing
- 🛡️ **Rollenbasierte Freigaben** pro Dokument

### Internationalisierung
- 🇩🇪 Deutsch
- 🇬🇧 Englisch
- Mehr Sprachen einfach ergänzbar über `messages/*.json`

---

## 🛠️ Tech-Stack

| Bereich | Technologie |
|---|---|
| **Frontend-Framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| **UI-Bibliothek** | [React 19](https://react.dev) |
| **Sprache** | [TypeScript 5](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **UI-Primitives** | [Radix UI](https://www.radix-ui.com) |
| **Icons** | [Lucide](https://lucide.dev) |
| **Editor** | [TipTap v3](https://tiptap.dev) (ProseMirror) |
| **Satzsystem** | [Typst](https://typst.app) via [`@myriaddreamin/typst.ts`](https://github.com/Myriad-Dreamin/typst.ts) |
| **Datenbank** | [PostgreSQL](https://www.postgresql.org) |
| **ORM** | [Prisma 7](https://www.prisma.io) mit `@prisma/adapter-pg` |
| **Authentifizierung** | [NextAuth v5](https://authjs.dev) |
| **Kollaboration** | [Yjs](https://yjs.dev) + [Hocuspocus](https://tiptap.dev/hocuspocus) |
| **State-Management** | [Zustand](https://zustand.docs.pmnd.rs) |
| **i18n** | [next-intl](https://next-intl.dev) |
| **Objektspeicher** | S3-kompatibel (z. B. MinIO) für Bilder |
| **Testing** | [Vitest](https://vitest.dev) + Testing Library |

---

## 🎬 Demo

> _Screenshots und eine Live-Demo folgen._

```
┌────────────────────────────────────────────────────────────┐
│  ladoc  │  Meine Dokumente   🔍 Suche   + Neues Dokument  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│   📄 Abschlussarbeit     📄 Lebenslauf     📄 Rechnung    │
│   Zuletzt: heute         Zuletzt: gestern  Zuletzt: 2d    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start

### Voraussetzungen

- **Node.js** ≥ 20
- **PostgreSQL** ≥ 14
- **npm**, **pnpm** oder **yarn**

### 1. Repository klonen

```bash
git clone https://github.com/<dein-user>/ladoc.git
cd ladoc
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Umgebungsvariablen einrichten

```bash
cp .env.example .env
```

Öffne `.env` und trage mindestens Folgendes ein:

```env
DATABASE_URL="postgresql://ladoc:ladoc_dev@localhost:5432/ladoc"
AUTH_SECRET="<generiere-mit-openssl-rand-hex-32>"
NEXTAUTH_URL="http://localhost:3000"
```

Einen sicheren `AUTH_SECRET` erzeugst du mit:

```bash
openssl rand -hex 32
```

### 4. Datenbank initialisieren

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Dev-Server starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) — fertig! 🎉

### 6. (Optional) Kollaborations-Server starten

Für Echtzeit-Zusammenarbeit in einem zweiten Terminal:

```bash
npm run collab
```

Der Hocuspocus-Server lauscht standardmäßig auf `ws://localhost:1234`.

---

## 🔧 Konfiguration

Alle Umgebungsvariablen werden in `.env` gesetzt. Eine vollständige Vorlage findest du in [`.env.example`](./.env.example).

| Variable | Beschreibung | Beispiel |
|---|---|---|
| `DATABASE_URL` | PostgreSQL-Verbindungsstring | `postgresql://user:pass@localhost:5432/ladoc` |
| `AUTH_SECRET` | Geheimnis für NextAuth-JWT-Signatur | `openssl rand -hex 32` |
| `NEXTAUTH_URL` | Basis-URL der Anwendung | `http://localhost:3000` |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | GitHub-OAuth-Credentials (optional) | — |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google-OAuth-Credentials (optional) | — |
| `NEXT_PUBLIC_COLLAB_URL` | WebSocket-URL des Hocuspocus-Servers | `ws://localhost:1234` |
| `S3_ENDPOINT` | Endpoint des S3-kompatiblen Speichers | `http://localhost:9000` |
| `S3_ACCESS_KEY` | S3-Zugriffsschlüssel | — |
| `S3_SECRET_KEY` | S3-Secret | — |
| `S3_BUCKET` | S3-Bucket-Name | `ladoc-assets` |
| `S3_PUBLIC_URL` | Öffentliche URL für Bild-Assets | `http://localhost:9000/ladoc-assets` |

> ⚠️ **`.env` niemals committen!** Die Datei steht bereits in `.gitignore`.

---

## 📜 Skripte

| Kommando | Beschreibung |
|---|---|
| `npm run dev` | Startet den Next.js-Dev-Server (Turbopack) |
| `npm run build` | Produktions-Build |
| `npm run start` | Startet die gebaute App |
| `npm run lint` | ESLint über das Projekt laufen lassen |
| `npm run format` | Formatierung via Prettier |
| `npm run format:check` | Formatierung prüfen ohne Änderungen |
| `npm run test` | Unit-Tests mit Vitest |
| `npm run test:coverage` | Tests mit Coverage-Report |
| `npm run collab` | Hocuspocus-Kollaborations-Server starten |

---

## 🏗️ Architektur

```
ladoc/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Login & Register
│   │   ├── api/                # API-Routen (Dokumente, Auth, Upload)
│   │   ├── dashboard/          # Dokumentenübersicht
│   │   ├── editor/[id]/        # Editor-Seite
│   │   └── page.tsx            # Landing Page
│   │
│   ├── components/
│   │   ├── editor/             # Editor-Container, Toolbar, Dialoge
│   │   ├── dashboard/          # Dashboard-UI
│   │   ├── templates/          # Vorlagen-Galerie
│   │   ├── math/               # Formel-Editor
│   │   └── citations/          # Zitat-Suche
│   │
│   ├── hooks/                  # useEditor, useAutoSave, useCollaboration, ...
│   ├── lib/
│   │   ├── auth.ts             # NextAuth-Konfiguration
│   │   ├── db.ts               # Prisma Client
│   │   ├── editor/extensions/  # Custom TipTap-Extensions (Math, Footnote, ...)
│   │   ├── templates/          # 8 Dokumentvorlagen
│   │   └── typst/              # Serializer + WASM-Worker
│   ├── stores/                 # Zustand Stores
│   └── generated/prisma/       # Prisma-generierter Client
│
├── server/
│   └── collaboration.ts        # Hocuspocus WebSocket-Server
│
├── prisma/
│   └── schema.prisma           # Datenbankschema
│
├── messages/                   # i18n-Übersetzungen (de, en)
└── public/                     # Statische Assets & WASM-Dateien
```

### Datenmodell

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

### Datenfluss: Editor → PDF

```
TipTap-JSON ──► serializer.ts ──► Typst-Quellcode ──► WASM-Worker ──► SVG/PDF ──► Preview
```

1. Der **Editor** erzeugt bei jeder Änderung ein ProseMirror-JSON
2. Der **Serializer** (`src/lib/typst/serializer.ts`) übersetzt dieses JSON nach Typst
3. Ein **Web Worker** kompiliert den Typst-Quellcode via WASM (kein Server-Roundtrip nötig)
4. Die **Vorschau** zeigt das gerenderte Ergebnis als SVG oder PDF

---

## 📚 Vorlagen

ladoc enthält **8 professionelle Vorlagen**, alle lokalisiert und direkt einsatzbereit:

| Vorlage | Beschreibung |
|---|---|
| 🎓 **Abschlussarbeit** | Titelseite, Abstract, 6 Kapitel, Literaturverzeichnis |
| 👤 **Lebenslauf** | Profil, Berufserfahrung, Ausbildung, Skills, Zertifikate |
| ✉️ **Brief** | DIN-5008-konformer Geschäftsbrief mit Referenzzeile |
| 📊 **Bericht** | Executive Summary, Inhaltsverzeichnis, Analyse, Empfehlungen |
| 🎤 **Präsentation** | Folien im Querformat mit Agenda und Inhaltsfolien |
| 📖 **Buch** | Schmutztitel, Haupttitel, Widmung, Kapitel, Nachwort |
| 🧾 **Rechnung** | Absender, Empfänger, Positionen, USt, Bankverbindung |
| 📋 **Sitzungsprotokoll** | Teilnehmer, TOPs, Beschlüsse, Aufgabenliste |

Eine eigene Vorlage hinzufügen? Lege eine neue Datei unter `src/lib/templates/` an und registriere sie in `src/lib/templates/index.ts`.

---

## 🗺️ Roadmap

- [x] Visueller Editor mit Live-PDF-Vorschau
- [x] 8 professionelle Vorlagen
- [x] Auto-Save & Versionshistorie
- [x] Authentifizierung (E-Mail, GitHub, Google)
- [x] Deutsch & Englisch
- [ ] Mobile-App (PWA)
- [ ] Kommentare & Review-Modus
- [ ] KI-gestütztes Schreiben (Autocomplete, Umformulierung)
- [ ] Mehr Sprachen (FR, ES, IT)
- [ ] LaTeX-Import
- [ ] Custom-Theme-Editor für Vorlagen
- [ ] Integration mit Cloud-Speicher (Dropbox, Google Drive)

---

## 🤝 Mitwirken

Beiträge sind willkommen! So kannst du helfen:

1. **Fork** das Repository
2. Erstelle einen **Feature-Branch** (`git checkout -b feature/AmazingFeature`)
3. **Committe** deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. **Push** den Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen **Pull Request**

### Code-Style

- Code wird mit **Prettier** formatiert (`npm run format`)
- Linting über **ESLint** (`npm run lint`)
- Tests mit **Vitest** (`npm run test`)
- Commits folgen [Conventional Commits](https://www.conventionalcommits.org)

### Fehler melden

Öffne ein [GitHub Issue](https://github.com/<dein-user>/ladoc/issues) mit:
- Kurzer Beschreibung des Problems
- Schritten zur Reproduktion
- Erwartetem & tatsächlichem Verhalten
- Screenshots (falls relevant)

---

## 📄 Lizenz

Verteilt unter der **MIT-Lizenz**. Siehe [`LICENSE`](./LICENSE) für Details.

---

## 🙏 Danksagung

ladoc steht auf den Schultern großartiger Open-Source-Projekte:

- [Typst](https://typst.app) — das moderne Satzsystem, das alles möglich macht
- [TipTap](https://tiptap.dev) — der headless Editor auf ProseMirror-Basis
- [Next.js](https://nextjs.org) — das React-Framework
- [Yjs](https://yjs.dev) — CRDTs für Echtzeit-Kollaboration
- [@myriaddreamin/typst.ts](https://github.com/Myriad-Dreamin/typst.ts) — Typst im Browser
- [Prisma](https://www.prisma.io), [NextAuth](https://authjs.dev), [Radix UI](https://www.radix-ui.com) und viele mehr

<div align="center">

**Wenn dir ladoc gefällt, gib dem Projekt einen ⭐ auf GitHub!**

Made with ❤️ in Deutschland

</div>
