import type { Template } from './types';

export const presentationTemplate: Template = {
  id: 'presentation',
  nameKey: 'presentation',
  descriptionKey: 'presentationDesc',
  icon: 'Presentation',
  category: 'general',
  documentMeta: {
    fontFamily: 'sans-serif',
    fontSize: '14pt',
  },
  pageSettings: {
    orientation: 'landscape',
  },
  content: {
    type: 'doc',
    content: [
      // --- Title Slide ---
      {
        type: 'heading',
        attrs: { level: 1, textAlign: 'center' },
        content: [{ type: 'text', text: 'Projektstatus und strategische Ausrichtung 2026' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          {
            type: 'text',
            text: 'Quartalsbericht und Handlungsempfehlungen',
            marks: [{ type: 'italic' }],
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Vorname Nachname, Abteilung' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'TT.MM.JJJJ' }],
      },
      { type: 'horizontalRule' },

      // --- Agenda Slide ---
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Agenda' }],
      },
      {
        type: 'orderedList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ausgangslage und Zielsetzung' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Analyse der aktuellen Situation' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ergebnisse und Erkenntnisse' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Handlungsempfehlungen' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Zusammenfassung und Ausblick' }] }],
          },
        ],
      },
      { type: 'horizontalRule' },

      // --- Content Slide 1: Ausgangslage ---
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Ausgangslage und Zielsetzung' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Im Rahmen der diesjährigen Strategieplanung wurden zentrale Herausforderungen identifiziert, die eine Neuausrichtung unserer Kernprozesse erfordern.',
          },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Marktanalyse: ', marks: [{ type: 'bold' }] },
                  { type: 'text', text: 'Veränderungen im Wettbewerbsumfeld und neue Marktanforderungen' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Technologie: ', marks: [{ type: 'bold' }] },
                  { type: 'text', text: 'Modernisierung der bestehenden Infrastruktur und Systemlandschaft' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Organisation: ', marks: [{ type: 'bold' }] },
                  { type: 'text', text: 'Optimierung der Zusammenarbeit zwischen den Fachbereichen' },
                ],
              },
            ],
          },
        ],
      },
      { type: 'horizontalRule' },

      // --- Content Slide 2: Analyse ---
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Analyse der aktuellen Situation' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die Auswertung der erhobenen Daten zeigt deutliche Potenziale in mehreren Schlüsselbereichen auf.',
          },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Prozesseffizienz: ', marks: [{ type: 'bold' }] },
                  { type: 'text', text: 'Durchlaufzeiten konnten um 15 % reduziert werden' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Kundenzufriedenheit: ', marks: [{ type: 'bold' }] },
                  { type: 'text', text: 'Steigerung des Net Promoter Score um 12 Punkte im Vergleich zum Vorjahr' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Ressourcenauslastung: ', marks: [{ type: 'bold' }] },
                  { type: 'text', text: 'Identifikation von Engpässen in der Kapazitätsplanung' },
                ],
              },
            ],
          },
        ],
      },
      { type: 'horizontalRule' },

      // --- Content Slide 3: Ergebnisse ---
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Ergebnisse' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die wichtigsten Ergebnisse der Untersuchung bestätigen den eingeschlagenen Kurs. Die umgesetzten Maßnahmen zeigen messbare Fortschritte in allen definierten Zielgrößen. Besonders hervorzuheben ist die erfolgreiche Integration neuer Arbeitsmethoden, die zu einer nachhaltigen Verbesserung der Teamproduktivität geführt hat.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // --- Summary Slide ---
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Zusammenfassung & Ausblick' }],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Die strategische Neuausrichtung schreitet planmäßig voran' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Erste Pilotprojekte liefern vielversprechende Ergebnisse' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Im nächsten Quartal erfolgt der Rollout auf weitere Geschäftsbereiche' },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Kontinuierliches Monitoring der KPIs zur Erfolgskontrolle' },
                ],
              },
            ],
          },
        ],
      },
      { type: 'horizontalRule' },

      // --- Thank You Slide ---
      {
        type: 'heading',
        attrs: { level: 1, textAlign: 'center' },
        content: [{ type: 'text', text: 'Vielen Dank!' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          {
            type: 'text',
            text: 'Fragen & Diskussion',
            marks: [{ type: 'bold' }],
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'vorname.nachname@unternehmen.de' }],
      },
    ],
  },
};
