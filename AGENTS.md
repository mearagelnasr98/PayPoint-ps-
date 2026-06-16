# AGENTS.md – Anleitung für Codex & andere KI-Agenten

Diese Datei wird von **OpenAI Codex** (und kompatiblen Agenten) automatisch
geladen. Sie verbindet das **Design-Engineering-Skill** mit dem Projekt.

## Projektüberblick

PayPoint Kasse ist ein **Kassensystem (POS)** für Gastronomie & Café. Die
**komplette App steckt in einer einzigen Datei**: [`index.html`](./index.html)
(HTML + CSS + JavaScript, Daten im `localStorage`). Keine Build-Tools, keine
Abhängigkeiten – einfach im Browser öffnen.

**Beim Bearbeiten beachten:**

- Alles bleibt in `index.html` – keine externen Dateien/Frameworks einführen,
  ohne dass es ausdrücklich gewünscht ist.
- Vanilla JS/CSS, keine zusätzlichen Dependencies.
- Texte und UI sind auf **Deutsch**.
- Daten liegen im `localStorage` – Schema nicht ohne Migration brechen.

## Design-Engineering-Skill (Pflichtlektüre bei UI-Arbeit)

Für **jede Arbeit an der Oberfläche** (Layout, Animationen, Buttons, Übergänge,
Komponenten) gilt die Design-Philosophie aus:

➡️ **[`skills/emil-design-eng/SKILL.md`](./skills/emil-design-eng/SKILL.md)**

Lies diese Datei und wende ihre Prinzipien an, u. a.:

- **Animation Decision Framework** – erst fragen *ob* etwas animiert werden soll,
  dann Zweck, Easing und Dauer.
- **Nur `transform` und `opacity` animieren** (GPU, kein Layout-Thrash).
- **UI-Animationen unter 300 ms**, niemals `ease-in`, niemals `transition: all`.
- **Buttons:** `transform: scale(0.97)` auf `:active` für Druck-Feedback.
- **Nie von `scale(0)` einblenden** – ab `scale(0.95)` + `opacity`.
- **`prefers-reduced-motion`** respektieren.

Beim **Review von UI-Code** das vorgeschriebene Format einhalten: eine
Markdown-Tabelle mit den Spalten **| Before | After | Why |** (siehe Skill).

## Eigener Codex-Befehl

Unter [`.codex/prompts/design-eng.md`](./.codex/prompts/design-eng.md) liegt ein
Slash-Prompt. Nach dem Verlinken (siehe README) im Codex per `/design-eng`
aufrufbar.
