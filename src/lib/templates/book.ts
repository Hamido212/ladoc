import type { Template } from './types';

export const bookTemplate: Template = {
  id: 'book',
  nameKey: 'book',
  descriptionKey: 'bookDesc',
  icon: 'BookOpen',
  category: 'academic',
  documentMeta: {
    fontFamily: 'serif',
    fontSize: '12pt',
  },
  pageSettings: {
    marginPreset: 'wide',
    margins: { top: '2.54cm', bottom: '2.54cm', left: '3.18cm', right: '3.18cm' },
  },
  content: {
    type: 'doc',
    content: [
      // --- Half-Title Page ---
      { type: 'paragraph' },
      { type: 'paragraph' },
      { type: 'paragraph' },
      {
        type: 'heading',
        attrs: { level: 1, textAlign: 'center' },
        content: [{ type: 'text', text: 'Der Titel des Werkes' }],
      },
      { type: 'paragraph' },
      { type: 'paragraph' },
      { type: 'horizontalRule' },

      // --- Full Title Page ---
      { type: 'paragraph' },
      {
        type: 'heading',
        attrs: { level: 1, textAlign: 'center' },
        content: [{ type: 'text', text: 'Der Titel des Werkes' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          {
            type: 'text',
            text: 'Ein Untertitel oder ergänzende Beschreibung',
            marks: [{ type: 'italic' }],
          },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'Vorname Nachname', marks: [{ type: 'bold' }] },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Verlagsname, Erscheinungsort' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Erscheinungsjahr' }],
      },
      { type: 'horizontalRule' },

      // --- Dedication ---
      { type: 'paragraph' },
      { type: 'paragraph' },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          {
            type: 'text',
            text: 'Für alle, die den Mut haben, neue Wege zu gehen.',
            marks: [{ type: 'italic' }],
          },
        ],
      },
      { type: 'paragraph' },
      { type: 'horizontalRule' },

      // --- Table of Contents ---
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Inhaltsverzeichnis' }],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Vorwort .......................................... 1' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Kapitel 1: Grundlagen und Einführung ............ 5' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: '    1.1 Historischer Kontext .................... 7' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: '    1.2 Theoretischer Rahmen ................... 12' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Kapitel 2: Methodik und Analyse ................ 19' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: '    2.1 Forschungsansatz ....................... 21' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: '    2.2 Datenerhebung und Auswertung .......... 28' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Nachwort ........................................ 35' }],
      },
      { type: 'paragraph' },
      { type: 'horizontalRule' },

      // --- Foreword (Vorwort) ---
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Vorwort' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Dieses Buch entstand aus der Überzeugung, dass komplexe Zusammenhänge verständlich dargestellt werden können, ohne dabei an fachlicher Tiefe einzubüßen. Es richtet sich gleichermaßen an Fachleute, die ihr Wissen vertiefen möchten, wie an interessierte Leser, die einen fundierten Einstieg in die Thematik suchen.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Mein besonderer Dank gilt all jenen, die durch ihre kritischen Anmerkungen, ihre fachliche Expertise und ihre unermüdliche Unterstützung zum Gelingen dieses Werkes beigetragen haben. Ohne den offenen Austausch und die wertvollen Impulse aus Wissenschaft und Praxis wäre dieses Buch in seiner jetzigen Form nicht entstanden.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // --- Chapter 1 ---
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Kapitel 1: Grundlagen und Einführung' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Das erste Kapitel legt die theoretischen Grundlagen dar, auf denen die nachfolgenden Ausführungen aufbauen. Es bietet einen umfassenden Überblick über den aktuellen Forschungsstand und ordnet die zentralen Fragestellungen in den bestehenden wissenschaftlichen Diskurs ein.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '1.1 Historischer Kontext' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die historische Entwicklung des Fachgebiets ist geprägt von bedeutenden Paradigmenwechseln und methodischen Neuorientierungen. Von den frühen Anfängen bis zur heutigen Forschungslandschaft lässt sich eine kontinuierliche Ausdifferenzierung der theoretischen Ansätze beobachten, die das Verständnis grundlegend verändert hat.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '1.2 Theoretischer Rahmen' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Der theoretische Rahmen dieser Arbeit stützt sich auf etablierte Modelle und Konzepte, die in den vergangenen Jahrzehnten entwickelt und empirisch validiert wurden. Durch die Synthese unterschiedlicher Perspektiven entsteht ein differenziertes Analyseinstrument, das sowohl strukturelle als auch dynamische Aspekte berücksichtigt.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // --- Chapter 2 ---
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Kapitel 2: Methodik und Analyse' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'In diesem Kapitel wird die methodische Vorgehensweise erläutert, die den empirischen Untersuchungen zugrunde liegt. Die gewählten Methoden orientieren sich an den spezifischen Anforderungen der Forschungsfragen und ermöglichen eine systematische Auswertung der erhobenen Daten.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '2.1 Forschungsansatz' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Der gewählte Forschungsansatz verbindet qualitative und quantitative Methoden in einem integrativen Design. Diese Triangulation ermöglicht es, die Stärken beider Zugänge zu nutzen und ein umfassendes Bild des Untersuchungsgegenstands zu zeichnen.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '2.2 Datenerhebung und Auswertung' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die Datenerhebung erfolgte in mehreren Phasen unter Einsatz standardisierter Instrumente. Die anschließende Auswertung folgt einem strukturierten Verfahren, das Transparenz und Nachvollziehbarkeit der Ergebnisse gewährleistet.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // --- Epilogue (Nachwort) ---
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Nachwort' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Mit diesem Werk wurde der Versuch unternommen, einen Beitrag zum Verständnis eines vielschichtigen Themenfeldes zu leisten. Die gewonnenen Erkenntnisse werfen zugleich neue Fragen auf, die in zukünftigen Arbeiten vertieft werden sollten. Es bleibt zu hoffen, dass die hier vorgestellten Überlegungen Anregungen für weiterführende Forschung und praktische Anwendung bieten.',
          },
        ],
      },
    ],
  },
};
