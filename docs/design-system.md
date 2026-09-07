# Design System & Technische Architektur
## Gärtnerei Josef Brunner – Immersive Studio Edition v4.0

### 1. Design Tokens & CSS Custom Properties

```css
:root {
  /* Farbklima: Botanical Heritage & Warm Terracotta */
  --bg-primary: #0f1c14;
  --bg-secondary: #162a1f;
  --bg-card: rgba(22, 42, 31, 0.7);
  --bg-card-hover: rgba(30, 56, 42, 0.85);
  
  --fg-primary: #f6f8f5;
  --fg-secondary: #b8ccbf;
  --fg-muted: #829a8a;
  
  --accent-terracotta: #c86438;
  --accent-terracotta-glow: rgba(200, 100, 56, 0.35);
  --accent-gold: #d9a74a;
  --accent-gold-glow: rgba(217, 167, 74, 0.3);
  --accent-leaf: #3ea066;
  
  --border-subtle: rgba(246, 248, 245, 0.08);
  --border-prominent: rgba(246, 248, 245, 0.16);
  --border-focus: #3ea066;
  
  /* Typografie */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  
  /* Radien */
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-full: 9999px;
  
  /* Schatten & Tiefen */
  --shadow-card: 0 16px 40px -10px rgba(0, 0, 0, 0.5);
  --shadow-elevated: 0 24px 60px -12px rgba(0, 0, 0, 0.7);
}
```

---

### 2. 3D Scrollytelling Blueprint (Three.js + GSAP ScrollTrigger)

#### A. 3D-Bühne & Geometrie-Hierarchie
- **Container:** `#canvasContainer` mit `<canvas id="scrollyCanvas">` in einer sticky Vollbild-Sektion (`min-h-[260vh]`).
- **3D-Meshes:**
  1. `rootBaseMesh`: Wurzel- & Feinerde-Zylinder mit Wurzelverästelungen und Tiefen-Relief.
  2. `drainageLayer`: Poriges Blähton-/Kieselsubstrat mit Partikel-Oberfläche.
  3. `soilNutrientLayer`: Dunkles, nährstoffreiches Gärtnersubstrat mit meisterlicher Dichte.
  4. `foliageFloraLayer`: Geometrisch stilisierte Pflanzentriebe mit Blattkronen und Blütenkelchen.
  5. `ambientDustParticles`: Partikelsystem (schwebende Licht- und Pollenpartikel mit subtilem Sinus-Schweben).
- **Beleuchtung:**
  - Ambient Light: Sanftes diffuses Waldlicht (`#6a8f76`, 1.2 Intensität)
  - Directional Sun Light: Warmes Sonnenlicht von schräg oben (`#fff1d4`, 2.4 Intensität)
  - Spot Accent Light: Terracotta/Gold Gegenlicht für plastische Konturen (`#d9a74a`, 1.8 Intensität)

#### B. ScrollTrigger Scrub Timeline
- **0.00 – 0.20:** Alle Schichten kompakt geschlossen, langsame Rotation um Y-Achse, Zoom von Kameraposition (0, 0, 9) auf (0, 0, 7.5).
- **0.20 – 0.50:** Schichten fächern vertikal auf:
  - `rootBaseMesh` fährt nach Y = -2.4
  - `drainageLayer` bleibt bei Y = -0.9
  - `soilNutrientLayer` fährt nach Y = +0.6
  - `foliageFloraLayer` fährt nach Y = +2.3
  - Schritt-Overlay 1 blendet sanft aus, Schritt 2 blendet ein.
- **0.50 – 0.80:** Kamera neigt sich leicht von schräg oben (Winkel 25°), Blick ins Innere der Schichten. Schritt 2 ➔ Schritt 3.
- **0.80 – 1.00:** Blüten und Triebe entfalten sich (`scale` + 20%, Lichtakzente intensivieren), Schritt 3 ➔ Schritt 4.

---

### 3. Eiserne Mobile-Responsiveness & Trackpad-Garantie
1. **Scroll-Physik:**
   - `html { scroll-behavior: auto !important; }`
   - Kein `scroll-smooth` auf dem HTML-Element.
   - Lenis mit `duration: 0.85`, `wheelMultiplier: 1.0`, `touchMultiplier: 1.5`, `syncTouch: false`.
2. **GPU & Three.js Performance:**
   - Three.js rendert exklusiv im `gsap.ticker` (`gsap.ticker.add(() => renderer.render(scene, camera))`).
   - `gsap.ticker.lagSmoothing(0);`
   - DPR gedeckelt auf `Math.min(window.devicePixelRatio, 1.5)`.
   - Visibility Culling: Rendering stoppt sofort, wenn `#immersiveExperience` außerhalb des Viewports ist.
3. **Zero-Collision & Touch-Schutz:**
   - Mobile: `#canvasContainer` und `#scrollyCanvas` erhalten `pointer-events: none !important; touch-action: pan-y !important;`.
   - Mobile Bottom-Bar: `z-index: 99999 !important;`.
   - Modals: `data-lenis-prevent` mit Body-Lock und Lenis-Stop/Start.

---

### 4. Business Pro Features
- **Rechner:** Bepflanzungs- & Gartenbedarfs-Rechner mit Schieberegler (1 bis 50 m² oder laufende Meter) und Auswahl des Projekttyps (Balkonkasten, Staudenbeet, Hecke/Sichtschutz, Grabpflege).
- **Funnel:** 3 Schritte mit Validierung, Fortschrittsbalken und Barrierefreiheit.
- **Maps:** Two-Click Consent-Blocker via `data-src`.
- **Modals:** Volltext nach § 5 DDG und DSGVO Art. 13.
