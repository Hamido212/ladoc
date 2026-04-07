import type { Template } from './types';

export const minutesTemplate: Template = {
  id: 'minutes',
  nameKey: 'minutes',
  descriptionKey: 'minutesDesc',
  icon: 'ClipboardList',
  category: 'professional',
  documentMeta: {
    fontFamily: 'sans-serif',
    fontSize: '11pt',
  },
  content: {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1, textAlign: 'center' },
        content: [{ type: 'text', text: 'Sitzungsprotokoll' }],
      },
      {
        type: 'heading',
        attrs: { level: 2, textAlign: 'center' },
        content: [{ type: 'text', text: 'Projektbesprechung Q1 2026' }],
      },
      { type: 'horizontalRule' },
      // Meeting info table
      {
        type: 'table',
        content: [
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Datum', marks: [{ type: 'bold' }] }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '15. März 2026, 10:00 – 11:30 Uhr' }] }] },
            ],
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ort', marks: [{ type: 'bold' }] }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Konferenzraum A, 3. OG / Microsoft Teams' }] }] },
            ],
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Leitung', marks: [{ type: 'bold' }] }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Dr. Maria Schmidt (Projektleitung)' }] }] },
            ],
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Protokoll', marks: [{ type: 'bold' }] }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Thomas Weber' }] }] },
            ],
          },
        ],
      },
      { type: 'paragraph' },
      // Participants
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Teilnehmer' }],
      },
      {
        type: 'bulletList',
        content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Dr. Maria Schmidt (Projektleitung)' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Thomas Weber (Entwicklung)' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Lisa Müller (Design)' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Stefan Koch (QA)' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Anna Bauer (Kundenbetreuung) — online zugeschaltet' }] }] },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Entschuldigt: ', marks: [{ type: 'italic' }] },
          { type: 'text', text: 'Markus Fischer (Geschäftsführung)', marks: [{ type: 'italic' }] },
        ],
      },
      { type: 'horizontalRule' },
      // Agenda item 1
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'TOP 1: Projektstatusüberblick' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Dr. Schmidt gibt einen Überblick über den aktuellen Projektstand. Das Projekt liegt im Zeitplan. Die Meilensteine für Phase 2 wurden fristgerecht erreicht. Das Budget ist zu 67% ausgeschöpft.' }],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Beschluss: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Der Statusbericht wird an die Geschäftsführung weitergeleitet.' },
        ],
      },
      { type: 'paragraph' },
      // Agenda item 2
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'TOP 2: Technische Herausforderungen' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Thomas Weber berichtet über die technischen Herausforderungen der letzten Sprintphase. Die Migration der Datenbank hat sich als komplexer erwiesen als geplant. Zusätzliche Tests sind erforderlich.' }],
      },
      {
        type: 'bulletList',
        content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Datenbankmigration benötigt 2 zusätzliche Tage' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Performance-Tests müssen vor dem Release durchgeführt werden' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'API-Dokumentation wird bis Freitag aktualisiert' }] }] },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Beschluss: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Release wird um eine Woche auf den 28. März verschoben.' },
        ],
      },
      { type: 'paragraph' },
      // Agenda item 3
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'TOP 3: Kundenfeedback & nächste Schritte' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Anna Bauer präsentiert die Ergebnisse der letzten Kundenbefragung. Die allgemeine Zufriedenheit liegt bei 4,2 von 5 Sternen. Verbesserungspotenzial besteht bei der Benutzerführung im Onboarding-Prozess.' }],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Beschluss: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Lisa Müller erstellt bis zum 22. März einen Redesign-Vorschlag für das Onboarding.' },
        ],
      },
      { type: 'horizontalRule' },
      // Action items
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Aufgaben & Verantwortlichkeiten' }],
      },
      {
        type: 'taskList',
        content: [
          {
            type: 'taskItem',
            attrs: { checked: false },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Thomas: Datenbankmigration abschließen (bis 20. März)' }] }],
          },
          {
            type: 'taskItem',
            attrs: { checked: false },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Stefan: Performance-Tests durchführen (bis 25. März)' }] }],
          },
          {
            type: 'taskItem',
            attrs: { checked: false },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Lisa: Onboarding-Redesign Entwurf (bis 22. März)' }] }],
          },
          {
            type: 'taskItem',
            attrs: { checked: false },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Dr. Schmidt: Statusbericht an Geschäftsführung (bis 17. März)' }] }],
          },
          {
            type: 'taskItem',
            attrs: { checked: false },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Thomas: API-Dokumentation aktualisieren (bis 19. März)' }] }],
          },
        ],
      },
      { type: 'horizontalRule' },
      // Next meeting
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Nächster Termin: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: '29. März 2026, 10:00 Uhr, Konferenzraum A' },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Protokoll erstellt von Thomas Weber, 15. März 2026', marks: [{ type: 'italic' }] },
        ],
      },
    ],
  },
};
