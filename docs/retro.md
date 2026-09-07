# Retrospektive & Designentscheidungen
## Projekt: Gärtnerei Josef Brunner – Immersive Studio Edition v4.0

### 1. Ausgangslage & Herausforderung
Die Gärtnerei Josef Brunner an der Nürnberger Str. 276 in Regensburg ist ein erstklassig bewerteter lokaler Handwerksbetrieb (4.7 Sterne), verfügte jedoch bislang über keinerlei eigene Webpräsenz. Die Gefahr bei traditionellen KMU-Gärtnereien besteht darin, dass Agenturen generische, altbackene Baukasten-Websites erstellen, die wie Friedhofsgärtnereien der 90er Jahre wirken.

### 2. Der gewählte Ansatz: Immersive Botanical Luxury
Statt generischer Bento-Grids oder verstaubter Stockfotos wurde ein **kinoreifes Scrollytelling-Erlebnis** erschaffen:
- **Die stärkste Waffe:** Das Geheimnis gesunder Pflanzenqualität liegt im Verborgenen – in der meisterlichen Schichtung von Wurzelgeflecht, Drainage, nährstoffreichem Substrat und vitaler Blütenkrone.
- **Three.js WebGL Exploded View:** Die Schichten fächern sich beim Scrollen plastisch auf. Der Nutzer versteht instinktiv, warum eine Brunner-Pflanze den ganzen Sommer übersteht, während Supermarkt-Pflanzen nach zwei Wochen vergehen.
- **Farben & Typografie:** Deep Forest Green (`#0a140e`), warmes Terracotta (`#c86438`) und Sonnenblumengold (`#d9a74a`) vermitteln Erdung, Frische und Wertigkeit.

### 3. Technische Meilensteine
1. **Zero-Collision Garantie:** Kein Touch-Lag auf Mobilgeräten durch gezieltes `pointer-events: none` auf dem 3D-Canvas bei schmalen Bildschirmen.
2. **Trackpad-Scroll Perfektion:** Eiserne Vermeidung von `scroll-behavior: smooth` zur Erhaltung nativer 2-Finger-Gesten mit Lenis.
3. **100% Rechtskonformität:** Vollständiges Impressum nach aktuellem **§ 5 DDG**, DSGVO Art. 13 Modal, blockierte Google Maps vor Einwilligung und Ausschluss externer Font-CDNs.
