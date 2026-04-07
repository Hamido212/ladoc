import type { Template } from './types';

export const cvTemplate: Template = {
  id: 'cv',
  nameKey: 'cv',
  descriptionKey: 'cvDesc',
  icon: 'User',
  category: 'professional',
  documentMeta: {
    fontFamily: 'sans-serif',
    fontSize: '11pt',
  },
  pageSettings: {
    marginPreset: 'narrow',
    margins: { top: '1.27cm', bottom: '1.27cm', left: '1.27cm', right: '1.27cm' },
  },
  content: {
    type: 'doc',
    content: [
      // ── Name ──
      {
        type: 'heading',
        attrs: { level: 1, textAlign: 'center' },
        content: [{ type: 'text', text: 'Maximilian Schmidt' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'E-Mail: m.schmidt@beispiel.de | Telefon: +49 170 1234567 | München, Deutschland' },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'LinkedIn: linkedin.com/in/mschmidt | GitHub: github.com/mschmidt' },
        ],
      },
      { type: 'horizontalRule' },

      // ── Profil ──
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Profil' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Erfahrener Softwareentwickler mit über 7 Jahren Berufserfahrung in der Konzeption und Umsetzung skalierbarer Webanwendungen. Fundierte Kenntnisse in modernen Frontend- und Backend-Technologien sowie agilen Entwicklungsmethoden. Leidenschaftlich engagiert für sauberen Code, automatisierte Tests und kontinuierliche Verbesserung der Softwarequalität.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // ── Berufserfahrung ──
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Berufserfahrung' }],
      },

      // Job 1
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [
          { type: 'text', text: 'Senior Fullstack-Entwickler', marks: [{ type: 'bold' }] },
          { type: 'text', text: ' — TechVision GmbH, München (2022 – heute)' },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Technische Leitung eines 6-köpfigen Entwicklerteams bei der Neugestaltung der Kundenplattform mit React, TypeScript und Node.js' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Einführung einer Microservices-Architektur, die die Systemverfügbarkeit von 97 % auf 99,8 % verbesserte' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Implementierung einer CI/CD-Pipeline mit GitHub Actions und Docker, wodurch die Deployment-Frequenz um 60 % gesteigert wurde' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Durchführung von Code-Reviews und Mentoring von zwei Junior-Entwicklern im Team' }] }],
          },
        ],
      },

      // Job 2
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [
          { type: 'text', text: 'Fullstack-Entwickler', marks: [{ type: 'bold' }] },
          { type: 'text', text: ' — DataFlow Solutions AG, Berlin (2019 – 2022)' },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Entwicklung und Wartung einer SaaS-Plattform für Datenanalyse mit Vue.js, Python und PostgreSQL' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Optimierung von Datenbankabfragen mit einer Reduzierung der Antwortzeiten um 40 % für kritische Berichte' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Aufbau einer REST-API mit automatisierter Swagger-Dokumentation und umfassenden Integrationstests' }] }],
          },
        ],
      },

      // Job 3
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [
          { type: 'text', text: 'Junior-Webentwickler', marks: [{ type: 'bold' }] },
          { type: 'text', text: ' — Kreativwerk Digitalagentur, Hamburg (2017 – 2019)' },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Umsetzung responsiver Webseiten und Webanwendungen für mittelständische Kunden mit HTML, CSS und JavaScript' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Erstellung und Pflege von WordPress-Themes und -Plugins nach Kundenspezifikation' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Enge Zusammenarbeit mit UX-Designern zur Umsetzung barrierefreier Benutzeroberflächen gemäß WCAG 2.1' }] }],
          },
        ],
      },
      { type: 'horizontalRule' },

      // ── Bildung ──
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Bildung' }],
      },
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [
          { type: 'text', text: 'M.Sc. Informatik', marks: [{ type: 'bold' }] },
          { type: 'text', text: ' — Technische Universität München (2015 – 2017)' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Schwerpunkt: Verteilte Systeme und Softwarearchitektur' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Abschlussnote: 1,3 — Masterarbeit: „Skalierbare Echtzeitdatenverarbeitung in Cloud-Umgebungen"' },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [
          { type: 'text', text: 'B.Sc. Informatik', marks: [{ type: 'bold' }] },
          { type: 'text', text: ' — Ludwig-Maximilians-Universität München (2012 – 2015)' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Schwerpunkt: Software Engineering und Datenbanken' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Abschlussnote: 1,7 — Bachelorarbeit: „Vergleichende Analyse von NoSQL-Datenbanksystemen"' },
        ],
      },
      { type: 'horizontalRule' },

      // ── Kenntnisse ──
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Kenntnisse' }],
      },
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [{ type: 'text', text: 'Technische Kenntnisse' }],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Programmiersprachen: ', marks: [{ type: 'bold' }] },
              { type: 'text', text: 'TypeScript, JavaScript, Python, Java, SQL' },
            ] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Frontend: ', marks: [{ type: 'bold' }] },
              { type: 'text', text: 'React, Vue.js, Next.js, Tailwind CSS, HTML5, CSS3' },
            ] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Backend: ', marks: [{ type: 'bold' }] },
              { type: 'text', text: 'Node.js, Express, FastAPI, Django, GraphQL' },
            ] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Datenbanken: ', marks: [{ type: 'bold' }] },
              { type: 'text', text: 'PostgreSQL, MongoDB, Redis, Elasticsearch' },
            ] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'DevOps & Tools: ', marks: [{ type: 'bold' }] },
              { type: 'text', text: 'Docker, Kubernetes, GitHub Actions, Terraform, AWS, Azure' },
            ] }],
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [{ type: 'text', text: 'Sprachen' }],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Deutsch — Muttersprache' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Englisch — Verhandlungssicher (C1)' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Französisch — Grundkenntnisse (A2)' }] }],
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [{ type: 'text', text: 'Soft Skills' }],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Teamführung und Mentoring' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Agile Methoden (Scrum, Kanban)' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Analytisches Denken und Problemlösung' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Kommunikationsstärke und Präsentationsfähigkeit' }] }],
          },
        ],
      },
      { type: 'horizontalRule' },

      // ── Zertifizierungen ──
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Zertifizierungen' }],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'AWS Certified Solutions Architect – Associate', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' (2023)' },
            ] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Professional Scrum Master I (PSM I)', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' (2021)' },
            ] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Google Cloud Professional Data Engineer', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' (2020)' },
            ] }],
          },
        ],
      },
    ],
  },
};
