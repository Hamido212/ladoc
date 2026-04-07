import type { Template } from './types';

export const invoiceTemplate: Template = {
  id: 'invoice',
  nameKey: 'invoice',
  descriptionKey: 'invoiceDesc',
  icon: 'Receipt',
  category: 'professional',
  documentMeta: {
    fontFamily: 'sans-serif',
    fontSize: '11pt',
  },
  pageSettings: {
    marginPreset: 'narrow',
    margins: { top: '1.5cm', bottom: '1.5cm', left: '2cm', right: '2cm' },
  },
  content: {
    type: 'doc',
    content: [
      // Sender
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Musterfirma GmbH' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Musterstraße 42 | 10115 Berlin | Tel: +49 30 123456-0 | info@musterfirma.de' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'USt-IdNr.: DE123456789 | Amtsgericht Berlin HRB 12345' }],
      },
      { type: 'horizontalRule' },
      // Recipient
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Empfänger:', marks: [{ type: 'bold' }] },
        ],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Beispielkunde AG' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Kundenstraße 7' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: '80331 München' }],
      },
      { type: 'paragraph' },
      // Invoice header
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Rechnung Nr. 2026-0042' }],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Rechnungsdatum: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: '15. März 2026' },
          { type: 'text', text: '    Leistungszeitraum: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: '01.02.2026 – 28.02.2026' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Kundennummer: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'K-2024-0815' },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Sehr geehrte Damen und Herren,' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'für die im oben genannten Zeitraum erbrachten Leistungen erlauben wir uns, wie folgt abzurechnen:' }],
      },
      { type: 'paragraph' },
      // Items table
      {
        type: 'table',
        content: [
          {
            type: 'tableRow',
            content: [
              { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Pos.' }] }] },
              { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Beschreibung' }] }] },
              { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Menge' }] }] },
              { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Einzelpreis' }] }] },
              { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Gesamt' }] }] },
            ],
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '1' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Webentwicklung Frontend (React)' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '40 Std.' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '95,00 €' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '3.800,00 €' }] }] },
            ],
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '2' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'API-Entwicklung & Integration' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '24 Std.' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '105,00 €' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '2.520,00 €' }] }] },
            ],
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '3' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Code-Review & Dokumentation' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '8 Std.' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '85,00 €' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '680,00 €' }] }] },
            ],
          },
        ],
      },
      { type: 'paragraph' },
      // Totals
      {
        type: 'paragraph',
        attrs: { textAlign: 'right' },
        content: [
          { type: 'text', text: 'Zwischensumme (netto): 7.000,00 €' },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'right' },
        content: [
          { type: 'text', text: 'zzgl. 19% USt.: 1.330,00 €' },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'right' },
        content: [
          { type: 'text', text: 'Gesamtbetrag: 8.330,00 €', marks: [{ type: 'bold' }] },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Bitte überweisen Sie den Gesamtbetrag innerhalb von 14 Tagen auf das unten genannte Konto.' }],
      },
      { type: 'horizontalRule' },
      // Bank details
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Bankverbindung: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Musterfirma GmbH | IBAN: DE89 3704 0044 0532 0130 00 | BIC: COBADEFFXXX | Commerzbank Berlin' },
        ],
      },
    ],
  },
};
