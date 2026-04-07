# ladoc

Ein moderner, kollaborativer Dokumenten-Editor im Browser. Schreibe Abschlussarbeiten, Berichte, Lebensläufe, Rechnungen und mehr mit einer Word-ähnlichen Oberfläche — und erhalte eine professionelle PDF-Ausgabe dank Typst als Rendering-Engine.

## Features

- **Visueller Editor** mit TipTap v3 — Fett, Kursiv, Überschriften, Listen, Tabellen, Bilder, Formeln, Fußnoten, Zitate, Inhaltsverzeichnis
- **Live-PDF-Vorschau** — kompiliert in Echtzeit im Browser via Typst WASM
- **Professionelle Vorlagen** — Abschlussarbeit, Lebenslauf, Brief (DIN 5008), Bericht, Präsentation, Buch, Rechnung, Sitzungsprotokoll
- **Split-Ansicht** — visueller Editor, Typst-Code, oder beides nebeneinander
- **Auto-Save** — Änderungen werden automatisch gespeichert
- **Versionshistorie** — frühere Zustände wiederherstellen
- **Authentifizierung** — E-Mail/Passwort, GitHub, Google (NextAuth v5)
- **Mehrsprachig** — Deutsch & Englisch (next-intl)
- **Export** — PDF, Typst-Quellcode

## Tech-Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **TipTap v3** für den Editor
- **Typst WASM** (`@myriaddreamin/typst.ts`) für die PDF-Kompilierung
- **Prisma 7** + **PostgreSQL**
- **NextAuth v5** für Authentifizierung
- **Yjs** + **Hocuspocus** (optional) für Echtzeit-Kollaboration

## Einrichtung

### Voraussetzungen

- Node.js 20+
- PostgreSQL-Datenbank
- npm, pnpm oder yarn

### Installation

```bash
# Abhängigkeiten installieren
npm install

# Umgebungsvariablen einrichten (.env)
cp .env.example .env
# Dann DATABASE_URL, AUTH_SECRET, etc. eintragen

# Datenbank migrieren
npx prisma migrate dev

# Prisma Client generieren
npx prisma generate
```

### Umgebungsvariablen

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/ladoc"
AUTH_SECRET="dein-geheimer-schluessel"
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
NEXT_PUBLIC_COLLAB_URL="ws://localhost:1234"
```

### Entwicklungsserver starten

```bash
# Next.js Dev-Server (http://localhost:3000)
npm run dev

# Optional: Hocuspocus Kollaborations-Server (ws://localhost:1234)
npm run collab
```

## Projektstruktur

```
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Login, Register
│   ├── api/              # API-Routen
│   ├── dashboard/        # Dokumentenübersicht
│   ├── editor/[id]/      # Editor
│   └── page.tsx          # Landing Page
├── components/
│   ├── editor/           # Editor, Toolbar, Dialoge
│   ├── dashboard/        # Dashboard-UI
│   └── templates/        # Vorlagen-Galerie
├── hooks/                # React Hooks (useEditor, useAutoSave, ...)
├── lib/
│   ├── auth.ts           # NextAuth-Konfiguration
│   ├── db.ts             # Prisma Client
│   ├── editor/           # Custom TipTap-Extensions
│   ├── templates/        # Vorlagen-Inhalte
│   └── typst/            # Typst-Serializer & WASM-Worker
├── stores/               # Zustand Stores
└── generated/prisma/     # Prisma-generierter Client

server/
└── collaboration.ts      # Hocuspocus-Server

messages/                 # i18n (de.json, en.json)
prisma/schema.prisma      # Datenbankschema
```

## Vorlagen

ladoc enthält 8 professionelle Vorlagen:

| Vorlage | Beschreibung |
|---|---|
| **Abschlussarbeit** | Titelseite, Abstract, 6 Kapitel, Literaturverzeichnis |
| **Lebenslauf** | Profil, Berufserfahrung, Ausbildung, Skills, Zertifikate |
| **Brief** | DIN-5008-konformer Geschäftsbrief |
| **Bericht** | Executive Summary, Inhaltsverzeichnis, Analyse, Empfehlungen |
| **Präsentation** | Folien im Querformat mit Agenda und Inhaltsfolien |
| **Buch** | Schmutztitel, Haupttitel, Widmung, Kapitel, Nachwort |
| **Rechnung** | Absender, Empfänger, Positionen, USt, Bankverbindung |
| **Sitzungsprotokoll** | Teilnehmer, TOPs, Beschlüsse, Aufgabenliste |

## Lizenz

MIT
