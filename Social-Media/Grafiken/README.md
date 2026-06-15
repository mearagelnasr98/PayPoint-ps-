# 🖼️ PayPoint – Grafik-Vorlagen (HTML → PNG)

Fertige, markengerechte Social-Grafiken. Du bearbeitest den **Text im HTML**
und renderst daraus ein **scharfes PNG** (@2x) – ganz ohne Photoshop.

## 📂 Inhalt
| Ordner | Inhalt |
|---|---|
| `Vorlagen-HTML/` | Bearbeitbare Vorlagen + gemeinsames `_style.css` |
| `PNG/` | Fertig gerenderte Bilder (sofort postbar) |
| `render.mjs` | Skript, das alle HTML-Vorlagen zu PNG macht |

## 🎨 Vorhandene Vorlagen
| Datei | Format | Passt zu |
|---|---|---|
| `post-01-tablet-chaos.html` | 1080×1080 | Instagram/Facebook 01 |
| `post-02-tse.html` | 1080×1080 | Instagram/Facebook 03 (TSE) |
| `post-03-30-tage.html` | 1080×1080 | Instagram/Facebook 04 (Test) |
| `story-01-umfrage.html` | 1080×1920 | Instagram Story 06 |
| `story-02-loesung.html` | 1080×1920 | Story-Folge / TikTok-Cover |

> Format wird automatisch erkannt: `class="frame post"` = 1080×1080,
> `class="frame story"` = 1080×1920. PNGs werden in **2× Auflösung** gerendert
> (2160 px breit) – sieht auf Handys gestochen scharf aus.

## ✍️ Text ändern
1. Öffne die `.html`-Datei in `Vorlagen-HTML/`.
2. Ändere nur den **Text zwischen den Tags** (Headline, Aufzählung, CTA).
3. Neu rendern (siehe unten). Fertig.

Schnell-Vorschau ohne Rendern: HTML-Datei einfach **im Browser öffnen**
(Doppelklick). So sieht man Änderungen sofort.

## 🚀 Rendern (PNG erzeugen)
Einmalig vorbereiten:
```bash
cd Social-Media/Grafiken
npm install puppeteer
# (lädt automatisch eine passende Chrome-Version)
```
Dann rendern:
```bash
node render.mjs
```
Alle PNGs landen in `PNG/`.

## 🎨 Eigene neue Grafik
1. Kopiere eine vorhandene `.html` und benenne sie um.
2. Behalte oben `<link rel="stylesheet" href="_style.css">`.
3. Nutze die fertigen CSS-Bausteine aus `_style.css`:
   `bg-light` / `bg-blue` / `bg-cyan`, `headline`, `list` + `check`,
   `cta`, `eyebrow`, `tag`, `foot`.
4. `node render.mjs` – die neue Datei wird automatisch mitgerendert.

## Markenfarben
- Cyan `#00afef` · Dunkelblau `#183e93` · Text `#0f172b` · Grün (Häkchen) `#16a34a`
