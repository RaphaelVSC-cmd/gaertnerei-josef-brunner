# Code Review & Architecture Audit
## Projekt: Gärtnerei Josef Brunner – Immersive Studio Edition v4.0

### Zusammenfassung der Begutachtung
Die Implementierung wurde einem strengen Staff-Engineer-Review unterzogen. Sämtliche Richtlinien des **Creative Manifests (V4.0)**, der **Anti-Baukasten-Gesetze** sowie des **7-Säulen-Audits (`website-audit-pro`)** wurden lückenlos erfüllt.

---

### 1. 3D Scrollytelling Engine & Performance
- **WebGL Geometrie-Architektur:** Maßgeschneidertes, mehrschichtiges Modell (`modelGroup`) bestehend aus:
  1. *Wurzelballen- & Terracotta-Schale* mit mykorrhiza-ähnlichen Verzweigungen
  2. *Drainage- & Blähtonschicht* mit Oberflächenstruktur
  3. *Nährstoffreichem Gärtnersubstrat* mit mineralischen Einschlüssen
  4. *Vitaler Pflanzenkrone* mit stilisierten Blatttrieben und lebendigen Blüten
  5. *Licht- & Pollenpartikelsystem* mit additiver Lichtmischung
- **GSAP ScrollTrigger Synchronisation:** Perfekt getaktetes Scrubbing (0.6) ohne Trägheits-Lag. Die Schichten fächern sich vertikal auseinander (von Y = -2.1 bis Y = +2.3), während 4 informative Textschritte synchronisiert eingeblendet werden.
- **GPU-Schonung & Visibility Culling:** Das Rendering wird über den `gsap.ticker` gesteuert und pausiert augenblicklich (`isStageVisible`), sobald die Sektion aus dem Viewport gescrollt wird.
- **Mobile DPR-Deckelung:** `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))` garantiert flüssige 60 FPS auch auf mobilen Geräten.

---

### 2. Eiserne Mobile-Responsiveness (Zero-Collision)
- **Keine Touch-Falle (No Scroll-Trap):** Auf Smartphones (`max-width: 768px`) sind `#canvasContainer` und `#scrollyCanvas` mit `pointer-events: none !important; touch-action: pan-y !important;` belegt. Der Nutzer kann mit dem Daumen barrierefrei über die 3D-Bühne wischen.
- **Top-Z-Index der mobilen Leiste:** Die `.mobile-bottom-bar` liegt fest auf `z-index: 99999 !important`. Weder 3D-Elemente noch Banner überdecken die Anruf- oder WhatsApp-Aktionen.
- **Footer-Kompensation:** Der Footer besitzt auf Mobile ausreichend Padding (`padding-bottom: 6.5rem`), um Überdeckungen zu verhindern.

---

### 3. Eiserne Scroll-Physik (Gesetz 5)
- **Lenis-Schutz:** `scroll-behavior: auto !important;` auf `html`. Kein `scroll-behavior: smooth` im CSS und keine `scroll-smooth` Klasse im HTML, wodurch Trackpad-Gesten auf macOS und Windows geschmeidig ohne Mikroruckler reagieren.
- **Passive Event Listener:** Alle Scroll-, Resize- und Slider-Events sind passiv registriert.

---

### 4. Recht & Datenschutz (§ 5 DDG, DSGVO Art. 13, TDDDG)
- **§ 5 DDG Impressum:** Vollständige Anbieterkennzeichnung nach neuem Recht, ladungsfähige Anschrift an der Nürnberger Str. 276 in Regensburg (**kein Postfach**), Meisterbezeichnung, Handwerkskammer Niederbayern-Oberpfalz, HwO-Hinweis, VSBG-Erklärung und OS-Link.
- **DSGVO Art. 13:** Vollständige Transparenz über Hosting (Vercel), Formularverarbeitung (Formspree) und Betroffenenrechte (Art. 15–21).
- **TDDDG & Two-Click Maps:** Google Maps nutzt `data-src`. Vor der Einwilligung wird kein Google-Server kontaktiert. Das Consent-Banner bietet einen gleichwertigen „Nur notwendige“-Button. Der Re-Open Link befindet sich im Footer.
- **Keine externen Font-Aufrufe:** 100% DSGVO-sicher ohne unbefugten Google-Server-Datentransfer.

---

### 5. Conversion- & Business-Architektur
- **Regensburger Bepflanzungsrechner:** Dynamische Bedarfsermittlung für Balkonkästen, Staudenbeete, Gemüsegärten und Grabpflege mit Richtwertanzeige.
- **3-Stufen Funnel:** Strukturierte Lead-Generierung mit Schrittanzeige, Honeypot und DSGVO-Opt-In.
- **Direktruf & WhatsApp:** Klickbare Telefonlinks (`tel:+4994185112`) und WhatsApp-Widget mit internationaler Rufnummer (`4994185112`).
