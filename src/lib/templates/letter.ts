import type { Template } from './types';

export const letterTemplate: Template = {
  id: 'letter',
  nameKey: 'letter',
  descriptionKey: 'letterDesc',
  icon: 'Mail',
  category: 'professional',
  documentMeta: {
    fontFamily: 'serif',
    fontSize: '12pt',
  },
  content: {
    type: 'doc',
    content: [
      // Sender block
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Dr. Maria Schneider', marks: [{ type: 'bold' }] },
        ],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Schneider & Partner Consulting GmbH' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Königsallee 42' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: '40212 Düsseldorf' }],
      },
      { type: 'paragraph' },
      // Date aligned right
      {
        type: 'paragraph',
        attrs: { textAlign: 'right' },
        content: [{ type: 'text', text: 'Düsseldorf, den 15. März 2026' }],
      },
      { type: 'paragraph' },
      // Recipient block
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Herrn Thomas Weber' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Geschäftsführer' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Weber Industrietechnik AG' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Industriestraße 15' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: '70469 Stuttgart' }],
      },
      { type: 'paragraph' },
      // Reference line (Bezugszeichen)
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Ihr Zeichen: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'TW/2026-0341' },
          { type: 'text', text: '    ' },
          { type: 'text', text: 'Unser Zeichen: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'MS/PR-2026-087' },
          { type: 'text', text: '    ' },
          { type: 'text', text: 'Datum: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: '15.03.2026' },
        ],
      },
      { type: 'paragraph' },
      // Subject line
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Betreff: Angebot zur strategischen Unternehmensberatung — Projekt Digitalisierung 2026',
            marks: [{ type: 'bold' }],
          },
        ],
      },
      { type: 'paragraph' },
      // Salutation
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Sehr geehrter Herr Weber,' }],
      },
      { type: 'paragraph' },
      // Body paragraph 1
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'vielen Dank für das konstruktive Gespräch am 10. März 2026 in Ihrem Hause, in dem Sie uns Ihre Anforderungen an die geplante Digitalisierungsinitiative ausführlich dargelegt haben. Wir haben Ihre Ausgangslage sorgfältig analysiert und freuen uns, Ihnen hiermit ein maßgeschneidertes Beratungsangebot unterbreiten zu können, das auf die spezifischen Bedürfnisse der Weber Industrietechnik AG zugeschnitten ist.',
          },
        ],
      },
      { type: 'paragraph' },
      // Body paragraph 2
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Unser Leistungsumfang umfasst eine detaillierte Ist-Analyse Ihrer bestehenden Geschäftsprozesse, die Entwicklung einer ganzheitlichen Digitalisierungsstrategie sowie die Begleitung der Umsetzungsphase über einen Zeitraum von zwölf Monaten. Dabei setzen wir auf bewährte Methoden aus über 15 Jahren Branchenerfahrung und passen diese individuell an Ihre Unternehmensstruktur an. Die geschätzten Projektkosten belaufen sich auf 87.500,00 EUR netto, aufgeteilt in drei klar definierte Projektphasen.',
          },
        ],
      },
      { type: 'paragraph' },
      // Body paragraph 3
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Wir sind überzeugt, dass dieses Projekt einen nachhaltigen Wettbewerbsvorteil für Ihr Unternehmen schaffen wird. Gerne stehen wir Ihnen für ein vertiefendes Gespräch zur Verfügung und würden uns freuen, die nächsten Schritte gemeinsam mit Ihnen zu planen. Bitte zögern Sie nicht, uns bei Rückfragen jederzeit zu kontaktieren.',
          },
        ],
      },
      { type: 'paragraph' },
      // Closing
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Mit freundlichen Grüßen' }],
      },
      { type: 'paragraph' },
      { type: 'paragraph' },
      // Signature
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Dr. Maria Schneider', marks: [{ type: 'bold' }] }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Geschäftsführende Gesellschafterin' }],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Tel.: +49 211 123456-0 | E-Mail: m.schneider@schneider-partner.de' },
        ],
      },
      { type: 'paragraph' },
      // Enclosures
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Anlagen:', marks: [{ type: 'bold' }] },
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
                content: [{ type: 'text', text: 'Detailliertes Projektangebot (12 Seiten)' }],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Referenzliste abgeschlossener Digitalisierungsprojekte' }],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Allgemeine Geschäftsbedingungen' }],
              },
            ],
          },
        ],
      },
    ],
  },
};
