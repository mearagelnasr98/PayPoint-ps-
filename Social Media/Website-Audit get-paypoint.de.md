# Website-Audit: get-paypoint.de

Stand: 11. Juni 2026 · Geprüfte Seiten: Startseite, Kasse, QR-Code, Fahrer Terminal, PayPoint Drive, Webshop & App, Restaurant Management, Preise, Kontakt, Datenschutz, Impressum

---

## Teil 1: Priorisierte Fix-Liste

### 🔴 Priorität 1 – Rechtlich / geschäftskritisch

| # | Problem | Seite | Fix |
|---|---------|-------|-----|
| 1 | **„AGB" im Footer verlinkt auf das Impressum** – es gibt keine AGB-Seite. Wer monatliche Verträge verkauft, braucht abrufbare AGB. | Alle Seiten (Footer) | AGB-Seite erstellen und verlinken, oder Link entfernen |
| 2 | **Impressum nennt „§ 5 TMG"** – das TMG wurde im Mai 2024 durch das DDG ersetzt. Korrekt: „§ 5 DDG". Abmahnrisiko gering, aber leicht zu fixen. | /impressum | Text ändern auf „Angaben gemäß § 5 DDG" |
| 3 | **Datenschutzerklärung zu dünn.** Die Abschnitte sind Ein-Satz-Zusammenfassungen ohne Rechtsgrundlagen (Art. 6 DSGVO), Speicherdauern, Empfänger und Hosting-Anbieter. Bei Einsatz von Google Analytics, Meta Pixel, TikTok Pixel & Clarity ist das abmahnfähig. | /datenschutz | Vollständige DSGVO-Erklärung erstellen (Generator oder Anwalt), inkl. Hosting, Rechtsgrundlagen je Tool, Speicherdauern, Drittlandtransfer |
| 4 | **Widersprüchliche Kontaktdaten:** Kontaktseite: +49 177 7977028 · Impressum/Datenschutz: +49 176 14592342 · E-Mail mal info@get-paypoint.de, mal kontakt@paypointpos.de | /kontakt, /impressum, /datenschutz | Eine Telefonnummer und eine primäre E-Mail-Adresse überall einheitlich verwenden |

### 🟠 Priorität 2 – Conversion-Killer

| # | Problem | Seite | Fix |
|---|---------|-------|-----|
| 5 | **Preise-Seite zeigt überall „0%"** („Bis zu 0% mehr Umsatz", „0x effizientere Lieferung"). Die Zähler-Animation startet offenbar nicht ohne Scroll-Event – Google und viele Besucher sehen wörtlich 0%. | /preise | Echte Zahlen serverseitig rendern, Animation nur als Effekt obendrauf |
| 6 | **QR-Code-Seite hat den falschen Hero-Text** (Fahrer-Terminal-Text: „Alle Fahrer und Bestellungen live im Blick…"). | /produkte/qr-code | Korrigierten Text aus Teil 2 einsetzen |
| 7 | **FAQ auf allen Produktseiten ist auf Englisch.** Wirkt unfertig und unseriös auf einer rein deutschen Seite. | Alle /produkte/* | Deutsche FAQ aus Teil 2 einsetzen |
| 8 | **Instagram-Link führt auf instagram.com** statt auf das Profil @paypointpos.de. | /kontakt | Link auf https://instagram.com/paypointpos.de ändern |

### 🟡 Priorität 3 – SEO

| # | Problem | Seite | Fix |
|---|---------|-------|-----|
| 9 | **Canonical-URLs zeigen auf andere Pfade als verlinkt:** /produkte/qr-code → canonical „qr-code-bestellloesung", /produkte/webshop-app → „webshop-und-app". Google bekommt widersprüchliche Signale. | /produkte/qr-code, /produkte/webshop-app | Canonical = tatsächliche URL setzen (oder 301-Redirects einrichten) |
| 10 | **Meta-Description fast überall identisch** (Homepage-Text auch auf QR-Code, Fahrer Terminal, Drive, Webshop, Restaurant, Datenschutz, Impressum). | Fast alle Seiten | Pro Seite eine eigene Description (Vorschläge in Teil 2) |
| 11 | **Identische Meta-Keywords auf allen Seiten** – Keywords sind für Google irrelevant, schaden aber nicht. Niedrigste Priorität. | Alle Seiten | Optional entfernen |

### 🟢 Priorität 4 – Kosmetik / Konsistenz

| # | Problem | Seite | Fix |
|---|---------|-------|-----|
| 12 | **Du/Sie wild gemischt**, teils im selben Abschnitt („Verkaufen Sie…" vs. „Verwalte deine Speisen…"). | Webshop, Drive, Restaurant, Kasse | Einheitlich „du" (passt zur Zielgruppe und zum restlichen Ton) |
| 13 | **Unsplash-Stockfotos auf der Kontaktseite** statt eigener Bilder; zudem direkt von unsplash.com geladen (Ladezeit, Abhängigkeit). | /kontakt | Eigene Fotos/Screenshots verwenden |
| 14 | **Wiederverwendete Videos:** Webshop-Seite nutzt adjustments.mp4 (Kasse) und webshop_demo.mp4 (QR-Seite). | /produkte/webshop-app | Eigenes Webshop-/App-Video produzieren |
| 15 | **„Häufig gestellte Fragen"-Pfeile zeigen „⌃"** (Caret) – wirkt wie ein Render-Fehler. | Alle Produktseiten | Icon-Font/SVG prüfen |
| 16 | **© „PayPoint POS UG (Haftungsbeschränkt)"** – korrekt klein: „(haftungsbeschränkt)". | Footer, alle Seiten | Schreibweise korrigieren |

---

## Teil 2: Fertige Korrekturtexte

### A) QR-Code-Seite – neuer Hero-Text

> **QR-CODE ORDERING**
>
> Deine Gäste scannen, bestellen und bezahlen direkt am Tisch. Jede Bestellung landet sofort in deiner Kasse – ohne Wartezeit, ohne Personalaufwand, ohne Fehler.

### B) Deutsche FAQ für alle Produktseiten

**Wie unterstützt dich unsere Restaurant-Software?**
Unsere Module decken alle Bereiche deiner Gastronomie ab. PayPoint bildet als Kassensystem den Kern – Module für Lieferung, QR-Bestellung, Webshop und Personal lassen sich flexibel dazubuchen.

**Worauf ist das Kassensystem ausgelegt?**
Auf Geschwindigkeit, fehlerfreie Bestellungen und reibungslose Abläufe zwischen Service, Küche und Lieferung – alles zentral gesteuert.

**Welche Vorteile bieten dir die Module?**
Weniger manuelle Arbeit, mehr Überblick, zentrale Abläufe – und volle Kontrolle über Kosten und Servicequalität.

**Wie funktioniert gutes Restaurant-Marketing?**
Durch die Kombination aus Stammkundenbindung, Sichtbarkeit auf den Lieferplattformen, Auswertungen deiner Verkaufszahlen und gezielten Aktionen über die Kanäle, die deine Gäste ohnehin nutzen.

### C) Meta-Descriptions pro Seite (max. ~155 Zeichen)

| Seite | Vorschlag |
|-------|-----------|
| Kasse | Das Kassensystem für die Gastronomie: Bestellungen erfassen, Bons drucken, kassieren – auf Tablet, Laptop oder Smartphone. Monatlich kündbar. |
| QR-Code | Gäste bestellen per QR-Code direkt vom Tisch – jede Bestellung landet sofort in deiner Kasse. Schneller Service, mehr Umsatz, weniger Personalaufwand. |
| Fahrer Terminal | Alle Fahrer und Lieferungen live im Blick: Echtzeit-Tracking, Schichtverwaltung und klare Abläufe für deinen Lieferdienst. |
| PayPoint Drive | Die Fahrer-App für deinen Lieferdienst: Aufträge, Navigation, Zustellnachweis per Foto und automatische Abrechnung in einer App. |
| Webshop & App | Eigener Webshop und eigene App für dein Restaurant – ohne Provisionen an Lieferplattformen. Bestellungen laufen direkt in dein Kassensystem. |
| Restaurant Management | Tische, Reservierungen und Bestellungen in einer Ansicht: digitaler Tischplan mit Echtzeit-Status für schnelleren Service. |
| Preise | PayPoint Preise: Kassensystem ab 79 €/Monat inkl. Lieferanbindungen für Uber Eats, Wolt & Lieferando. 30 Tage kostenlos testen, monatlich kündbar. |
| Kontakt | Kontaktiere PayPoint per WhatsApp, Telefon oder E-Mail – täglich 8–21 Uhr erreichbar. Kostenlose Beratung und 30 Tage Testphase. |

### D) Impressum – Korrektur

> **Impressum**
> Angaben gemäß § 5 DDG.

(Rest kann bleiben; nur Telefonnummer und E-Mail mit der Kontaktseite vereinheitlichen.)

### E) Einheitliche Anrede – Beispielkorrekturen (Webshop-Seite)

Vorher: „Verkaufen Sie direkt über Ihren eigenen Webshop und Ihre eigene App. Sparen Sie Provisionen…"

Nachher: „Verkaufe direkt über deinen eigenen Webshop und deine eigene App. Spar dir die Provisionen, stärke deine Marke und erhalte alle Bestellungen automatisch in deinem Kassensystem – ohne Drittanbieter, ohne Umwege."

Gleiche Umstellung auf PayPoint Drive („Vermeiden Sie Stornos…" → „Vermeide Stornos und Reklamationen…") und Restaurant Management.

---

## Empfohlene Reihenfolge

1. AGB-Link + Impressum (§ 5 DDG) + Kontaktdaten vereinheitlichen – 30 Minuten, rechtlich relevant
2. Datenschutzerklärung vervollständigen – wichtigster rechtlicher Punkt
3. „0%"-Statistiken auf der Preise-Seite fixen – größter Conversion-Hebel
4. QR-Hero-Text + deutsche FAQ einsetzen – Texte liegen oben fertig vor
5. Canonicals + Meta-Descriptions – SEO
6. Anrede, Videos, Fotos, Kleinigkeiten – nach und nach
