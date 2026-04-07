import type { Template } from './types';

export const thesisTemplate: Template = {
  id: 'thesis',
  nameKey: 'thesis',
  descriptionKey: 'thesisDesc',
  icon: 'GraduationCap',
  category: 'academic',
  documentMeta: {
    fontFamily: 'serif',
    fontSize: '12pt',
  },
  content: {
    type: 'doc',
    content: [
      // ── Titelseite ──
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Technische Universität Berlin' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Fakultät IV — Elektrotechnik und Informatik' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Institut für Softwaretechnik und Theoretische Informatik' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: '\u00A0' }],
      },
      {
        type: 'heading',
        attrs: { level: 1, textAlign: 'center' },
        content: [{ type: 'text', text: 'Adaptive Optimierungsverfahren für verteilte Datenströme in heterogenen Cloud-Umgebungen' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: '\u00A0' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'Masterarbeit', marks: [{ type: 'bold' }] },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'zur Erlangung des akademischen Grades' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'Master of Science (M.Sc.)', marks: [{ type: 'italic' }] },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'im Studiengang Informatik' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: '\u00A0' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'vorgelegt von' },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'Anna Maria Lehmann', marks: [{ type: 'bold' }] },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Matrikelnummer: 0398217' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: '\u00A0' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'Erstgutachter: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Prof. Dr. Klaus-Peter Wagner' },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [
          { type: 'text', text: 'Zweitgutachter: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Dr. Sabine Hoffmann' },
        ],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: '\u00A0' }],
      },
      {
        type: 'paragraph',
        attrs: { textAlign: 'center' },
        content: [{ type: 'text', text: 'Berlin, März 2026' }],
      },
      { type: 'horizontalRule' },

      // ── Abstract ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Abstract' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die vorliegende Arbeit untersucht adaptive Optimierungsverfahren für die Verarbeitung verteilter Datenströme in heterogenen Cloud-Umgebungen. Angesichts der steigenden Anforderungen an Echtzeitdatenverarbeitung und der zunehmenden Komplexität moderner Cloud-Infrastrukturen besteht ein wachsender Bedarf an intelligenten Strategien zur Ressourcenallokation und Lastverteilung. Im Rahmen dieser Arbeit wird ein neuartiger Ansatz vorgestellt, der maschinelles Lernen mit klassischen Optimierungsverfahren kombiniert, um die Verarbeitungseffizienz dynamisch an wechselnde Lastmuster anzupassen. Die experimentelle Evaluation auf einem realen Cloud-Testbed zeigt, dass der vorgeschlagene Ansatz die durchschnittliche Latenz um 35 % reduziert und gleichzeitig den Ressourcenverbrauch um 22 % senkt.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Schlüsselwörter: ', marks: [{ type: 'bold' }] },
          { type: 'text', text: 'Verteilte Systeme, Datenstromverarbeitung, Cloud Computing, Maschinelles Lernen, Ressourcenoptimierung, Lastverteilung', marks: [{ type: 'italic' }] },
        ],
      },
      { type: 'horizontalRule' },

      // ── Kapitel 1: Einleitung ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '1. Einleitung' }],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '1.1 Motivation und Problemstellung' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die rasante Zunahme datenintensiver Anwendungen in Bereichen wie dem Internet der Dinge (IoT), der Finanzanalyse und der industriellen Prozesssteuerung stellt moderne Datenverarbeitungssysteme vor erhebliche Herausforderungen. Traditionelle Batch-Verarbeitungsansätze können den Anforderungen an niedrige Latenzzeiten und hohen Durchsatz nicht mehr gerecht werden. Gleichzeitig führt die Heterogenität moderner Cloud-Infrastrukturen — mit unterschiedlichen Rechenknoten, Netzwerkkapazitäten und Speichertechnologien — zu einer erhöhten Komplexität bei der effizienten Ressourcennutzung.',
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '1.2 Zielsetzung der Arbeit' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Ziel dieser Arbeit ist die Entwicklung und Evaluation eines adaptiven Optimierungsverfahrens, das die Verarbeitungseffizienz verteilter Datenströme in heterogenen Cloud-Umgebungen signifikant verbessert. Im Einzelnen werden folgende Forschungsziele verfolgt:',
          },
        ],
      },
      {
        type: 'orderedList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Analyse bestehender Optimierungsstrategien und Identifikation ihrer Limitierungen in heterogenen Umgebungen' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Entwurf eines ML-gestützten Optimierungsframeworks zur dynamischen Ressourcenallokation' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Prototypische Implementierung und experimentelle Evaluation auf einem realen Cloud-Testbed' }] }],
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '1.3 Aufbau der Arbeit' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die Arbeit gliedert sich in sechs Kapitel. Nach dieser Einleitung werden in Kapitel 2 die theoretischen Grundlagen erläutert. Kapitel 3 beschreibt die angewandte Methodik und den Systementwurf. In Kapitel 4 werden die experimentellen Ergebnisse dargestellt und analysiert. Kapitel 5 diskutiert die Ergebnisse im Kontext verwandter Arbeiten, bevor Kapitel 6 die Arbeit zusammenfasst und einen Ausblick auf zukünftige Forschungsrichtungen gibt.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // ── Kapitel 2: Theoretische Grundlagen ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '2. Theoretische Grundlagen' }],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '2.1 Verteilte Datenstromverarbeitung' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Datenstromverarbeitungssysteme wie Apache Flink, Apache Kafka Streams und Google Cloud Dataflow ermöglichen die kontinuierliche Verarbeitung von Daten in Echtzeit. Im Gegensatz zur klassischen Batch-Verarbeitung werden Datensätze unmittelbar nach ihrem Eintreffen verarbeitet, was eine deutlich geringere End-to-End-Latenz ermöglicht.',
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '2.2 Ressourcenoptimierung in Cloud-Umgebungen' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die Ressourcenoptimierung in Cloud-Umgebungen lässt sich formal als ein Optimierungsproblem beschreiben. Gegeben sei eine Menge von Verarbeitungsoperatoren O = {o₁, o₂, ..., oₙ} und eine Menge verfügbarer Ressourcen R = {r₁, r₂, ..., rₘ}, so sucht man eine Zuordnungsfunktion f: O → R, die eine gegebene Zielfunktion minimiert. [Formel-Platzhalter: Hier die formale Zielfunktion mit Nebenbedingungen einfügen, z. B. Minimierung der gewichteten Latenz unter Berücksichtigung der Ressourcenkapazitäten.]',
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '2.3 Maschinelles Lernen für Systemoptimierung' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Der Einsatz von Verfahren des maschinellen Lernens — insbesondere Reinforcement Learning und Zeitreihenprognosen — zur dynamischen Optimierung verteilter Systeme hat in den letzten Jahren zunehmend an Bedeutung gewonnen. Bestehende Ansätze nutzen neuronale Netze, um Lastmuster vorherzusagen und Ressourcen proaktiv zu skalieren, bevor Engpässe auftreten.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // ── Kapitel 3: Methodik ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '3. Methodik' }],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '3.1 Systementwurf' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Das vorgeschlagene System besteht aus drei Hauptkomponenten: (1) einem Monitoring-Modul zur Erfassung von Systemmetriken in Echtzeit, (2) einem Prognosemodell auf Basis eines LSTM-Netzwerks zur Vorhersage zukünftiger Lastmuster und (3) einem Optimierungsmodul, das auf Grundlage der Prognosen die Ressourcenallokation dynamisch anpasst.',
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '3.2 Experimentelles Setup' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die experimentelle Evaluation wurde auf einem heterogenen Cloud-Testbed durchgeführt, bestehend aus 12 virtuellen Maschinen mit unterschiedlichen Konfigurationen (4–32 vCPUs, 8–128 GB RAM) auf einer OpenStack-Infrastruktur. Als Datenstromverarbeitungsframework wurde Apache Flink in Version 1.18 eingesetzt.',
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '3.3 Evaluationsmetriken' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Zur Bewertung des vorgeschlagenen Ansatzes wurden folgende Metriken herangezogen:',
          },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Durchschnittliche Verarbeitungslatenz', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' — Zeitspanne zwischen Eintreffen und vollständiger Verarbeitung eines Datensatzes' },
            ] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Durchsatz', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' — Anzahl der verarbeiteten Datensätze pro Sekunde' },
            ] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Ressourcenauslastung', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' — Prozentuale Auslastung von CPU, Arbeitsspeicher und Netzwerkbandbreite' },
            ] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [
              { type: 'text', text: 'Adaptionsgeschwindigkeit', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' — Zeitdauer bis zur vollständigen Anpassung an veränderte Lastmuster' },
            ] }],
          },
        ],
      },
      { type: 'horizontalRule' },

      // ── Kapitel 4: Ergebnisse ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '4. Ergebnisse' }],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '4.1 Leistungsvergleich' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: '[Tabellen-Platzhalter: Hier eine Vergleichstabelle mit den Ergebnissen der verschiedenen Optimierungsstrategien einfügen — Spalten: Verfahren, Ø-Latenz (ms), Durchsatz (Datensätze/s), CPU-Auslastung (%), Speicherverbrauch (GB).]',
            marks: [{ type: 'italic' }],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die experimentellen Ergebnisse zeigen, dass der vorgeschlagene adaptive Ansatz die durchschnittliche Verarbeitungslatenz im Vergleich zur statischen Ressourcenzuweisung um 35 % reduziert. Besonders unter wechselnden Lastbedingungen konnte eine deutlich höhere Stabilität des Systems beobachtet werden.',
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '4.2 Skalierbarkeitsanalyse' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: '[Abbildungs-Platzhalter: Hier ein Diagramm einfügen, das die Skalierbarkeit des Ansatzes bei steigender Anzahl von Verarbeitungsknoten (4, 8, 12, 16, 24) zeigt.]',
            marks: [{ type: 'italic' }],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die Skalierbarkeitsanalyse bestätigt, dass der vorgeschlagene Ansatz nahezu linear mit der Anzahl der verfügbaren Verarbeitungsknoten skaliert. Ab einer Knotenanzahl von 16 zeigt sich jedoch eine leichte Abflachung der Durchsatzsteigerung, die auf den zunehmenden Kommunikationsaufwand zwischen den Knoten zurückzuführen ist.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // ── Kapitel 5: Diskussion ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '5. Diskussion' }],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '5.1 Interpretation der Ergebnisse' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die erzielten Ergebnisse bestätigen die Hypothese, dass eine Kombination aus prädiktiver Lastmodellierung und dynamischer Ressourcenallokation die Verarbeitungseffizienz in heterogenen Cloud-Umgebungen signifikant steigern kann. Der Vorteil des vorgeschlagenen Ansatzes gegenüber rein reaktiven Skalierungsstrategien liegt insbesondere in der Fähigkeit, Lastspitzen frühzeitig zu erkennen und Ressourcen proaktiv bereitzustellen.',
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '5.2 Limitierungen' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Trotz der vielversprechenden Ergebnisse weist der vorgeschlagene Ansatz einige Limitierungen auf. Die Trainingsphase des LSTM-Modells erfordert eine ausreichend große Menge an historischen Lastdaten, was den Einsatz in völlig neuen Szenarien erschwert. Darüber hinaus wurde die Evaluation auf eine einzelne Cloud-Infrastruktur beschränkt, sodass die Übertragbarkeit auf andere Plattformen (z. B. AWS, Google Cloud) noch zu überprüfen ist.',
          },
        ],
      },

      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: '5.3 Einordnung in verwandte Arbeiten' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Im Vergleich zu den Arbeiten von Müller et al. (2023) und Chen & Park (2024), die ähnliche Optimierungsstrategien untersuchen, bietet der hier vorgestellte Ansatz den Vorteil einer vollständig automatisierten Anpassung ohne manuelle Konfiguration von Schwellwerten. Die Integration von Reinforcement Learning zur kontinuierlichen Verbesserung der Optimierungsstrategie stellt eine wesentliche Erweiterung gegenüber bestehenden Ansätzen dar.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // ── Kapitel 6: Fazit und Ausblick ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: '6. Fazit und Ausblick' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Die vorliegende Arbeit hat gezeigt, dass adaptive Optimierungsverfahren, die maschinelles Lernen mit klassischen Optimierungsmethoden kombinieren, die Effizienz verteilter Datenstromverarbeitung in heterogenen Cloud-Umgebungen erheblich verbessern können. Der entwickelte Prototyp reduziert die Verarbeitungslatenz um durchschnittlich 35 % und den Ressourcenverbrauch um 22 % im Vergleich zu statischen Ansätzen.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Zukünftige Arbeiten sollten die Evaluation auf Multi-Cloud-Szenarien ausweiten und den Einsatz von Transfer Learning untersuchen, um die Trainingsphase für neue Anwendungsszenarien zu verkürzen. Darüber hinaus bietet die Integration von energieeffizientem Computing in die Optimierungsstrategie ein vielversprechendes Forschungsfeld, das angesichts wachsender Nachhaltigkeitsanforderungen zunehmend an Bedeutung gewinnt.',
          },
        ],
      },
      { type: 'horizontalRule' },

      // ── Literaturverzeichnis ──
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Literaturverzeichnis' }],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: '[1] Müller, T., Fischer, R. & Bauer, H. (2023). „Dynamische Ressourcenallokation in Cloud-nativen Streaming-Systemen." ', marks: [{ type: 'italic' }] },
          { type: 'text', text: 'Journal of Distributed Computing, 45(3), S. 234–251.' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: '[2] Chen, L. & Park, S. (2024). „Reinforcement Learning for Adaptive Stream Processing." ', marks: [{ type: 'italic' }] },
          { type: 'text', text: 'Proceedings of the IEEE International Conference on Cloud Computing, S. 112–120.' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: '[3] Carbone, P. et al. (2015). „Apache Flink: Stream and Batch Processing in a Single Engine." ', marks: [{ type: 'italic' }] },
          { type: 'text', text: 'Bulletin of the IEEE Computer Society Technical Committee on Data Engineering, 36(4), S. 28–38.' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: '[4] Schwarzkopf, M., Konwinski, A. & Wilkes, J. (2013). „Omega: Flexible, Scalable Schedulers for Large Compute Clusters." ', marks: [{ type: 'italic' }] },
          { type: 'text', text: 'Proceedings of the 8th ACM European Conference on Computer Systems, S. 351–364.' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: '[5] Weber, S. & Neumann, K. (2022). „Prädiktive Autoskalierung für datenintensive Anwendungen in hybriden Cloud-Infrastrukturen." ', marks: [{ type: 'italic' }] },
          { type: 'text', text: 'Informatik Spektrum, 41(2), S. 89–104.' },
        ],
      },
    ],
  },
};
