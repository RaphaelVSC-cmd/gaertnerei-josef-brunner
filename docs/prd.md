# Product Requirements Document (PRD) & Creative Concept
## Projekt: Gärtnerei Josef Brunner – Immersive Studio Edition v4.0

### 1. Vision & Leitidee
Die **Gärtnerei Josef Brunner** ist ein alteingesessener Regensburger Meisterbetrieb an der Nürnberger Straße 276. Während Discounter und Baumärkte importierte, schnell hochgezüchtete Wegwerfpflanzen verkaufen, steht Josef Brunner für **echte gärtnerische Handwerkskultur**: Eigene Anzucht, gesunde Wurzelbildung, widerstandsfähige Freiland-Gewöhnung und persönliche Fachberatung.

Das digitale Erlebnis bricht radikal mit dem Einheitsbrei standardisierter Webseiten. Auf Basis von **Three.js, GSAP ScrollTrigger und Lenis** inszenieren wir die vitale Kraft der Pflanzen als **kinoreifes 3D Scrollytelling**.

---

### 2. Das Immersive 3D-Konzept: „Botanical Layer Architecture“ (Exploded View)
- **Mechanismus:** 3D Exploded View mit scroll-gekoppelter Höhenverschiebung, kontinuierlicher sanfter Raumdrehung und schwebenden Lichtpartikeln.
- **Storyline beim Scrollen:**
  - **Phase 1 (0–25% Scroll):** *Kompakter Pflanzkörper* – Der geschlossene, voll vitale Wurzel- und Erdballen dreht sich im Studio-Licht.
  - **Phase 2 (25–55% Scroll):** *Tiefenbelüftung & Drainage* – Die Schichten fächern sich nach oben und unten auf. Sichtbar wird das gesunde Wurzelgeflecht und der Feuchtigkeitsspeicher.
  - **Phase 3 (55–80% Scroll):** *Nährstoffreiches Regensburger Gärtnersubstrat* – Zeigt die meisterliche Bodenmischung ohne chemische Schnelltreiber.
  - **Phase 4 (80–100% Scroll):** *Prachtvolle Blüten- & Blattkrone* – Die oberste Schicht entfaltet ihre Blüten- und Blattgeometrie, goldene Pollen- und Lichtreflexe umspielen die Szenerie.
- **Mobile-Guard:** Auf Bildschirmen `<= 768px` wird die Interaktion rein scroll-gesteuert (`pointer-events: none` auf dem Canvas). Kein Daumen-Blockieren, 60 FPS Garantie.

---

### 3. Navigations-Architektur: „The Editorial Botanical Hairline Nav“
- **Logo / Brandmark:** Großzügiges typografisches Signet „GÄRTNEREI BRUNNER“ mit Subtitel „Regensburg • Meisterbetrieb“.
- **Status-Modul:** Live-Anzeige („🌱 Heute geöffnet bis 18:00 Uhr | Nürnberger Str. 276“).
- **Direkt-Aktion:** Klickbarer Direktruf-Button `0941 85112` mit sanft pulsierendem Live-Indikator.
- **Hairline:** Elegante, hauchdünne Trennlinie mit dezentem Transparenz-Verlauf.

---

### 4. Farbklima & Typografie-Persona
- **Farbpalette:**
  - Primär: Deep Botanical Forest (`#112218`) & Forest Moss (`#1a3325`)
  - Sekundär: Salbei & Flachsgrün (`#3a614a`, `#e7ede8`)
  - Akzent warm: Terracotta & Erd-Ocker (`#c86438`, `#df7c4e`)
  - Akzent edel: Sonnenblumen-Gold / Messing (`#d9a74a`)
  - Text: Lichtgrau/Off-White (`#fbfbf9`) und feines Salbeigrau (`#a3b8aa`)
- **Typografie:**
  - Display & Headlines: *Fraunces* (Google Font, elegante Serif-Klasse für meisterliche Tradition)
  - Fließtext & Zahlen: *Plus Jakarta Sans* (hochpräzise geometrische Grotesk)

---

### 5. Sektions-Architektur
1. **Hero Stage:** Großer Markenaufschlag, 4.7-Sterne Google-Zertifikat, Kernversprechen & Sofort-Direktruf.
2. **Immersive 3D Scrollytelling:** Die Pflanz- & Bodenarchitektur (Schicht für Schicht).
3. **Meisterliche Sortimente (Asymmetrisches Studio-Grid):**
   - Beet- & Balkonpflanzen (Frühjahr bis Herbst)
   - Gemüse- & Kräutersetzlinge für den Nutzgarten
   - Winterharte Blütenstauden & Ziergehölze
   - Festliche Floristik & Grabpflege
4. **Interaktiver Regensburger Bepflanzungs-Rechner:** Ermittelt Bedarf an Pflanzen & Substrat je nach Fläche (Balkonkasten, Beet, Hecke, Garten).
5. **Authentischer Social Proof:** Kundenstimmen aus Regensburg im Original-Wortlaut.
6. **3-Stufen Kontakt- & Anfrage-Funnel:** Gezielte Bedarfsabfrage mit Terminvorschlag.
7. **Standort & Anfahrt (Two-Click Maps):** Nürnberger Str. 276, Parkplätze direkt vor der Gärtnerei.
8. **Footer & Rechtsbereich:** Rechtssichere Modals nach § 5 DDG und DSGVO Art. 13.
