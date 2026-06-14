# PayPoint Kasse ☕ – Kassensystem für Gastronomie & Café

Ein einfaches, modernes Kassensystem (POS = „Point of Sale") für Cafés und
Restaurants. Es läuft **direkt im Browser** – ohne Installation, ohne Internet,
ohne technisches Vorwissen.

---

## ▶️ So startest du die Kasse

**Variante 1 – Am einfachsten (Doppelklick):**

1. Lade dieses Projekt auf deinen Computer herunter
   (auf GitHub: grüner Button **„Code"** → **„Download ZIP"**, dann entpacken).
2. Öffne den Ordner und mache einen **Doppelklick auf die Datei `index.html`**.
3. Die Kasse öffnet sich in deinem Browser (Chrome, Edge, Firefox …). Fertig! 🎉

> 💡 Tipp: Du kannst die Seite auch als Lesezeichen speichern oder auf einem
> Tablet öffnen – die Bedienung ist für Touchscreens optimiert.

---

## 🧾 Was die Kasse kann

| Bereich | Funktion |
|--------|----------|
| **Kasse** | Tisch wählen, Produkte antippen, Mengen ändern, Gesamtsumme inkl. MwSt. sehen |
| **Bezahlen** | Bar oder Karte (simuliert). Bei Bar: Rückgeld wird automatisch berechnet |
| **Bon** | Nach dem Bezahlen wird ein Kassenbon angezeigt – mit „Drucken"-Knopf |
| **Tagesumsatz** | Übersicht aller heutigen Verkäufe, Umsatz nach Bar/Karte, CSV-Export |
| **Verwaltung** | Eigene Produkte hinzufügen, ändern oder löschen |

---

## 💾 Wo werden meine Daten gespeichert?

Alle Daten (Speisekarte und Verkäufe) werden **lokal in deinem Browser**
gespeichert (sogenannter „localStorage"). Das bedeutet:

- ✅ Nichts wird ins Internet hochgeladen – deine Daten bleiben bei dir.
- ⚠️ Die Daten hängen am jeweiligen Browser/Gerät. Auf einem anderen Computer
  oder nach dem Löschen der Browserdaten sind sie nicht mehr da.
- 💡 Exportiere deinen Tagesumsatz regelmäßig als **CSV** (Knopf im Bereich
  „Tagesumsatz"), wenn du die Zahlen aufbewahren möchtest.

---

## 📂 Aufbau des Projekts (für Neugierige)

```
PayPoint-ps-/
├── index.html        → Die Seite, die du öffnest
└── src/
    ├── styles.css    → Das Aussehen (Farben, Layout)
    ├── data.js       → Die Standard-Speisekarte
    └── app.js        → Die Logik (was beim Klicken passiert)
```

---

## ⚠️ Wichtiger Hinweis

Dies ist ein **Lern- und Demo-Kassensystem**. Die erzeugten Bons sind **keine
steuerlich gültigen Belege** und das System erfüllt **nicht** die deutschen
Vorgaben zur Kassensicherung (KassenSichV / TSE). Für den echten Geschäfts­betrieb
ist eine zertifizierte, TSE-fähige Kassenlösung erforderlich.

Die Kartenzahlung ist aktuell **simuliert**. Eine echte Online-Zahlung (z. B.
über Stripe) kann später ergänzt werden.

---

## 📜 Lizenz

MIT – siehe [LICENSE](LICENSE). Du darfst das Projekt frei nutzen und anpassen.
