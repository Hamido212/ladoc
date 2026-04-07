import type { Template } from './types';

export const reportTemplate: Template = {
  id: 'report',
  nameKey: 'report',
  descriptionKey: 'reportDesc',
  icon: 'FileText',
  category: 'professional',
  documentMeta: {
    fontFamily: 'serif',
    fontSize: '12pt',
  },
  content: {
    type: 'doc',
    content: [
      // ── Title Page ──
      { type: 'paragraph' },
      { type: 'paragraph' },
      {
        type: 'heading',
        attrs: { level: 1, textAlign: 'center' },
        content: [
          {
            type: 'text',
            text: 'Jahresbericht zur Betriebsoptimierung 2025',
          },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'heading',
        attrs: { level: 2, textAlign: 'center' },
        content: [
          {
            type: 'text',
            text: 'Analyse, Ergebnisse und Handlungsempfehlungen',
          },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          {
            type: 'text',
            text: 'Müller & Hoffmann Unternehmensberatung GmbH',
            marks: [{ type: 'bold' }],
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Abteilung Strategie und Prozessmanagement' }],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Erstellt am 15. März 2026' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'Verfasser: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Dipl.-Ing. Klaus Hoffmann, Dr. Sabine Richter' },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'Klassifikation: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Vertraulich' },
        ],
      },
      { type: 'paragraph' },
      { type: 'horizontalRule' },

      // ── Executive Summary ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Zusammenfassung (Executive Summary)' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Der vorliegende Bericht fasst die Ergebnisse der im Geschäftsjahr 2025 durchgeführten Betriebsoptimierungsmaßnahmen zusammen. Im Rahmen einer umfassenden Analyse wurden insgesamt fünf Kernbereiche untersucht: Produktionseffizienz, Lieferkettenmanagement, Energieverbrauch, Personalentwicklung und Digitalisierungsgrad. Die Analyse zeigt, dass durch die eingeleiteten Maßnahmen eine Gesamtkostenreduktion von 12,3 % gegenüber dem Vorjahr erzielt werden konnte, wobei die Produktionseffizienz um 8,7 Prozentpunkte gesteigert wurde. Gleichzeitig wurden Handlungsfelder identifiziert, in denen weiteres Optimierungspotenzial besteht, insbesondere in den Bereichen Digitalisierung und nachhaltige Energieversorgung.',
          },
        ],
      },
      { type: 'paragraph' },

      // ── Table of Contents ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Inhaltsverzeichnis' }],
      },
      {
        type: 'orderedList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Zusammenfassung (Executive Summary)' }],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Hintergrund und Einleitung' }],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Analyse' }],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Ergebnisse' }],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Empfehlungen' }],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Fazit' }],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Anhang' }],
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },
      { type: 'horizontalRule' },

      // ── Chapter 1: Background / Introduction ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '1. Hintergrund und Einleitung' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die Müller & Hoffmann Unternehmensberatung GmbH wurde im Januar 2025 von der Geschäftsleitung der Rheintal Maschinenbau AG beauftragt, eine ganzheitliche Betriebsoptimierung durchzuführen. Hintergrund des Auftrags waren steigende Produktionskosten, zunehmender Wettbewerbsdruck im europäischen Markt sowie regulatorische Anforderungen im Bereich der Nachhaltigkeit. Das Projektziel bestand darin, konkrete Einsparpotenziale zu identifizieren und umsetzbare Maßnahmen zur Effizienzsteigerung zu entwickeln.',
          },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die Untersuchung erstreckte sich über einen Zeitraum von zehn Monaten (Februar bis November 2025) und umfasste qualitative Interviews mit Führungskräften und Mitarbeitenden, quantitative Datenerhebungen aus ERP- und MES-Systemen sowie Benchmarking-Vergleiche mit branchenüblichen Kennzahlen. Insgesamt wurden über 2.400 Datenpunkte erhoben und ausgewertet. Der methodische Ansatz orientierte sich an den Grundsätzen der Lean-Management-Philosophie und wurde durch digitale Analysewerkzeuge unterstützt.',
          },
        ],
      },
      { type: 'paragraph' },

      // ── Chapter 2: Analysis with Table ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '2. Analyse' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die nachfolgende Tabelle stellt die zentralen Leistungskennzahlen im Vergleich zwischen dem erhobenen Ist-Zustand und den definierten Sollwerten dar. Die Abweichungen bilden die Grundlage für die im weiteren Verlauf formulierten Handlungsempfehlungen.',
          },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'table',
        content: [
          // Header row
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableHeader',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Kategorie', marks: [{ type: 'bold' }] },
                    ],
                  },
                ],
              },
              {
                type: 'tableHeader',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Ist-Wert', marks: [{ type: 'bold' }] },
                    ],
                  },
                ],
              },
              {
                type: 'tableHeader',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Soll-Wert', marks: [{ type: 'bold' }] },
                    ],
                  },
                ],
              },
            ],
          },
          // Row 1
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Produktionseffizienz' }],
                  },
                ],
              },
              {
                type: 'tableCell',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '78,4 %' }],
                  },
                ],
              },
              {
                type: 'tableCell',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '85,0 %' }],
                  },
                ],
              },
            ],
          },
          // Row 2
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Energieverbrauch (kWh/Einheit)' }],
                  },
                ],
              },
              {
                type: 'tableCell',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '4,2 kWh' }],
                  },
                ],
              },
              {
                type: 'tableCell',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '3,5 kWh' }],
                  },
                ],
              },
            ],
          },
          // Row 3
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Digitalisierungsgrad' }],
                  },
                ],
              },
              {
                type: 'tableCell',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '41,0 %' }],
                  },
                ],
              },
              {
                type: 'tableCell',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '70,0 %' }],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },

      // ── Chapter 3: Results with Bullet List ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '3. Ergebnisse' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Auf Grundlage der durchgeführten Analyse lassen sich die folgenden zentralen Ergebnisse festhalten:',
          },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Die Gesamtbetriebskosten konnten im Berichtszeitraum um 12,3 % gegenüber dem Vorjahr gesenkt werden, was einer Einsparung von ca. 1,85 Mio. EUR entspricht.',
                  },
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
                  {
                    type: 'text',
                    text: 'Die Produktionseffizienz wurde durch Einführung von Lean-Management-Prinzipien von 69,7 % auf 78,4 % gesteigert, liegt jedoch noch unter dem Branchendurchschnitt von 85 %.',
                  },
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
                  {
                    type: 'text',
                    text: 'Der Energieverbrauch pro Produktionseinheit konnte durch technische Modernisierungen um 14 % reduziert werden, erreicht aber noch nicht den angestrebten Sollwert.',
                  },
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
                  {
                    type: 'text',
                    text: 'Die Mitarbeiterzufriedenheit stieg nach Einführung flexibler Arbeitszeitmodelle um 18 Prozentpunkte auf einen Indexwert von 7,2 (von 10).',
                  },
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
                  {
                    type: 'text',
                    text: 'Der Digitalisierungsgrad bleibt mit 41 % deutlich hinter dem Sollwert von 70 % zurück und stellt das größte verbleibende Optimierungspotenzial dar.',
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },

      // ── Chapter 4: Recommendations with Ordered List ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '4. Empfehlungen' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Basierend auf den Analyseergebnissen empfehlen wir die folgenden Maßnahmen, priorisiert nach erwartetem Wirkungsgrad:',
          },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'orderedList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: 'Digitalisierungsoffensive starten: ', marks: [{ type: 'bold' }] },
                  {
                    type: 'text',
                    text: 'Implementierung eines integrierten ERP/MES-Systems bis Q4 2026, um den Digitalisierungsgrad auf mindestens 65 % anzuheben. Geschätztes Investitionsvolumen: 420.000 EUR.',
                  },
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
                  { type: 'text', text: 'Energiemanagement ausbauen: ', marks: [{ type: 'bold' }] },
                  {
                    type: 'text',
                    text: 'Installation einer Photovoltaikanlage und Umstellung auf energieeffiziente Antriebssysteme, um den Energieverbrauch pro Einheit auf den Sollwert von 3,5 kWh zu senken.',
                  },
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
                  { type: 'text', text: 'Lean-Schulungsprogramm fortsetzen: ', marks: [{ type: 'bold' }] },
                  {
                    type: 'text',
                    text: 'Durchführung von vertiefenden Lean-Six-Sigma-Schulungen für alle Produktionsleiter, um die Produktionseffizienz auf den Zielwert von 85 % zu steigern.',
                  },
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
                  { type: 'text', text: 'Lieferketten diversifizieren: ', marks: [{ type: 'bold' }] },
                  {
                    type: 'text',
                    text: 'Aufbau alternativer Bezugsquellen für kritische Rohstoffe zur Reduzierung von Lieferengpässen und Verhandlung verbesserter Rahmenverträge.',
                  },
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
                  { type: 'text', text: 'Quartalsmäßiges Monitoring etablieren: ', marks: [{ type: 'bold' }] },
                  {
                    type: 'text',
                    text: 'Einführung eines KPI-Dashboards mit vierteljährlicher Berichterstattung an die Geschäftsleitung zur laufenden Erfolgskontrolle.',
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },

      // ── Chapter 5: Conclusion ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '5. Fazit' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die im Geschäftsjahr 2025 durchgeführten Optimierungsmaßnahmen haben zu messbaren Verbesserungen in den Bereichen Kostenstruktur, Produktionseffizienz und Mitarbeiterzufriedenheit geführt. Die erreichte Gesamtkostenreduktion von 12,3 % übertrifft die ursprünglich angestrebte Zielvorgabe von 10 %. Gleichzeitig zeigt die Analyse deutlich auf, dass insbesondere im Bereich der digitalen Transformation erheblicher Nachholbedarf besteht. Die konsequente Umsetzung der oben formulierten Empfehlungen ist entscheidend, um die Wettbewerbsfähigkeit der Rheintal Maschinenbau AG langfristig zu sichern und die strategischen Unternehmensziele bis 2028 zu erreichen.',
          },
        ],
      },
      { type: 'paragraph' },
      { type: 'horizontalRule' },

      // ── Appendix ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Anhang' }],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Anhang A: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Vollständige Datentabellen und statistische Auswertungen' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Anhang B: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Interviewprotokolle und Gesprächsleitfäden' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Anhang C: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Benchmarking-Vergleichsdaten der Branche' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Anhang D: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Detaillierte Kostenaufstellung nach Projektphasen' },
        ],
      },
    ],
  },
};
