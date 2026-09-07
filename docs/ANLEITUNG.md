# Übergabe- & Wartungsanleitung
## Projekt: Gärtnerei Josef Brunner (Regensburg)

Diese Anleitung erklärt dem Inhaber oder technischen Administrator, wie die Website gewartet, konfiguriert und auf Produktionsservern bereitgestellt wird.

---

## 1. Formular-Anbindung (Formspree)
Das mehrstufige Kontaktformular (`#multistepForm` in `index.html`) nutzt Formspree zur zuverlässigen Zustellung von Anfragen an das E-Mail-Postfach der Gärtnerei:
1. Erstellen Sie einen kostenlosen Account auf [formspree.io](https://formspree.io).
2. Erstellen Sie ein neues Formular namens `Gaertnerei-Brunner-Kontakt`.
3. Ersetzen Sie in `index.html` in Zeile `action="https://formspree.io/f/YOUR_FORM_ID"` den Platzhalter `YOUR_FORM_ID` mit Ihrem Formspree-Formular-Code.
4. Eingehende Anfragen werden sofort per E-Mail zugestellt.

---

## 2. Bereitstellung & Hosting (Vercel, Netlify oder Webspace)
Die Website besteht aus reinem HTML5, CSS und modernem Vanilla JavaScript und benötigt kein Node.js-Backend im Betrieb:
- **Hosting auf Vercel (Empfohlen):**
  1. Repository auf GitHub mit Vercel verknüpfen.
  2. Framework Preset: *Other* (statisch).
  3. Deploy klicken – weltweites Hochgeschwindigkeits-CDN ist in 30 Sekunden aktiv.
- **Klassisches Webhosting (Strato, IONOS, Hetzner):**
  Laden Sie alle Dateien (`index.html`, `style.css`, `app.js`, Ordner `docs/`) per SFTP in das Stammverzeichnis (`public_html` oder `htdocs`).

---

## 3. Preise & Bepflanzungsrechner anpassen
Die Berechnungslogik des Rechners befindet sich in `app.js` im Objekt `calcConfig`:
```js
const calcConfig = {
  balkon: {
    unit: 'Meter',
    min: 1, max: 20, default: 4,
    plantsPerUnit: 4,      // Anzahl Pflanzen pro lfm
    soilPerUnit: 20,        // Liter Erde pro lfm
    costMinPerUnit: 14,     // Mindestpreis in €
    costMaxPerUnit: 22      // Höchstpreis in €
  },
  // Weitere Kategorien (stauden, gemuese, grab) können hier angepasst werden
};
```

---

## 4. Rechtliche Aktualisierungen
Die rechtlichen Angaben sind in den Modals `#impressumModal` und `#datenschutzModal` in `index.html` hinterlegt:
- Änderungen der Handwerkskammer, Telefonnummer oder Umsatzsteuer-Identifikationsnummer können direkt im Modal-HTML gepflegt werden.
- Alle Angaben entsprechen dem aktuellen **§ 5 DDG** (abgelöstes TMG) und der DSGVO.
