/**
 * GÄRTNEREI JOSEF BRUNNER – IMMERSIVE STUDIO EDITION V4.0
 * 3D Botanical Layer Scrollytelling, Lenis + GSAP Sync, Bedarfsrechner & Legal Compliance
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. LENIS SMOOTH SCROLL & GSAP SYNC (GESETZ 5) ───────────────
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false // Natives Touch auf Smartphones erhalten!
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ─── 2. 3D BOTANICAL LAYER SCROLLYTELLING ENGINE (THREE.JS) ───────
  const canvas = document.getElementById('scrollyCanvas');
  const container = document.getElementById('canvasContainer');

  if (canvas && container && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();

    // Kamera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 9);
    camera.lookAt(0, 0, 0);

    // WebGL Renderer mit mobiler DPR-Drosselung (GESETZ 3)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Beleuchtung (Warmes Studio- & Sonnenlicht)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.8);
    sunLight.position.set(8, 12, 7);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x3ea066, 1.1);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    // ═══ 3D BOTANICAL LAYER MODELL ═══
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // SCHICHT 1: Wurzelballen & Basis (Unten)
    const rootGroup = new THREE.Group();

    // Terracotta-Pflanzschale
    const potGeo = new THREE.CylinderGeometry(2.3, 1.8, 0.7, 32);
    const potMat = new THREE.MeshStandardMaterial({
      color: 0xb5532b,
      roughness: 0.7,
      metalness: 0.1
    });
    const potMesh = new THREE.Mesh(potGeo, potMat);
    potMesh.position.y = -0.4;
    rootGroup.add(potMesh);

    // Wurzelfundament (Erdreich mit Tiefenstruktur)
    const rootSoilGeo = new THREE.CylinderGeometry(2.2, 1.9, 0.6, 24);
    const rootSoilMat = new THREE.MeshStandardMaterial({
      color: 0x24170d,
      roughness: 0.95
    });
    const rootSoilMesh = new THREE.Mesh(rootSoilGeo, rootSoilMat);
    rootSoilMesh.position.y = 0.1;
    rootGroup.add(rootSoilMesh);

    // Zarte Wurzelstränge (Verzweigungen)
    const rootMat = new THREE.MeshStandardMaterial({
      color: 0xdfcbb5,
      roughness: 0.6
    });
    for (let r = 0; r < 14; r++) {
      const angle = (r / 14) * Math.PI * 2;
      const rootStrandGeo = new THREE.CylinderGeometry(0.04, 0.01, 0.9 + Math.random() * 0.4, 6);
      const strand = new THREE.Mesh(rootStrandGeo, rootMat);
      strand.position.set(
        Math.cos(angle) * (1.2 + Math.random() * 0.5),
        -0.5 - Math.random() * 0.3,
        Math.sin(angle) * (1.2 + Math.random() * 0.5)
      );
      strand.rotation.z = (Math.random() - 0.5) * 0.6;
      strand.rotation.x = (Math.random() - 0.5) * 0.6;
      rootGroup.add(strand);
    }
    modelGroup.add(rootGroup);

    // SCHICHT 2: Drainage & Filtervlies (Mitte-Unten)
    const drainageGroup = new THREE.Group();
    const drainageBaseGeo = new THREE.CylinderGeometry(2.25, 2.25, 0.35, 28);
    const drainageBaseMat = new THREE.MeshStandardMaterial({
      color: 0x8a4b2c,
      roughness: 0.85
    });
    const drainageBaseMesh = new THREE.Mesh(drainageBaseGeo, drainageBaseMat);
    drainageGroup.add(drainageBaseMesh);

    // Blähton-Kügelchen als Oberflächenstruktur
    const beadGeo = new THREE.DodecahedronGeometry(0.14, 0);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xa8552f,
      roughness: 0.8
    });
    for (let b = 0; b < 28; b++) {
      const bAngle = Math.random() * Math.PI * 2;
      const bDist = Math.random() * 1.9;
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.position.set(
        Math.cos(bAngle) * bDist,
        0.18 + Math.random() * 0.06,
        Math.sin(bAngle) * bDist
      );
      bead.scale.setScalar(0.8 + Math.random() * 0.6);
      drainageGroup.add(bead);
    }
    modelGroup.add(drainageGroup);

    // SCHICHT 3: Nährstoffreiches Gärtnersubstrat (Mitte-Oben)
    const soilGroup = new THREE.Group();
    const soilGeo = new THREE.CylinderGeometry(2.3, 2.3, 0.45, 32);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x18241b,
      roughness: 0.9
    });
    const soilMesh = new THREE.Mesh(soilGeo, soilMat);
    soilGroup.add(soilMesh);

    // Mineralische Nährstoff-Einschlüsse
    const nutrientGeo = new THREE.TetrahedronGeometry(0.08, 0);
    const nutrientMat = new THREE.MeshStandardMaterial({
      color: 0xd9a74a,
      roughness: 0.4
    });
    for (let n = 0; n < 20; n++) {
      const nAngle = Math.random() * Math.PI * 2;
      const nDist = Math.random() * 1.9;
      const nut = new THREE.Mesh(nutrientGeo, nutrientMat);
      nut.position.set(
        Math.cos(nAngle) * nDist,
        0.22,
        Math.sin(nAngle) * nDist
      );
      soilGroup.add(nut);
    }
    modelGroup.add(soilGroup);

    // SCHICHT 4: Pflanzenkrone, Blätter & Blüten (Oben)
    const floraGroup = new THREE.Group();

    // Grüne Deckschicht / Rasen- & Kräuterschnitt
    const turfGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.15, 32);
    const turfMat = new THREE.MeshStandardMaterial({
      color: 0x2b523d,
      roughness: 0.6
    });
    const turfMesh = new THREE.Mesh(turfGeo, turfMat);
    turfMesh.position.y = -0.1;
    floraGroup.add(turfMesh);

    // Blatttriebe (Moderne stilisierte Botanik)
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x3ea066,
      roughness: 0.45,
      metalness: 0.05
    });
    const darkLeafMat = new THREE.MeshStandardMaterial({
      color: 0x1f4730,
      roughness: 0.5
    });

    for (let l = 0; l < 16; l++) {
      const lAngle = (l / 16) * Math.PI * 2;
      const lDist = 0.8 + (l % 3) * 0.45;
      const leafGeo = new THREE.ConeGeometry(0.35, 0.85, 5);
      const leaf = new THREE.Mesh(leafGeo, l % 2 === 0 ? leafMat : darkLeafMat);
      leaf.position.set(
        Math.cos(lAngle) * lDist,
        0.35 + (l % 2) * 0.2,
        Math.sin(lAngle) * lDist
      );
      leaf.rotation.x = 0.3 + (l % 3) * 0.15;
      leaf.rotation.z = Math.sin(lAngle) * 0.4;
      floraGroup.add(leaf);
    }

    // Prachtvolle Blüten (Terracotta, Gold & Rosé)
    const flowerGeo = new THREE.DodecahedronGeometry(0.32, 1);
    const flowerColors = [0xdf7c4e, 0xd9a74a, 0xf472b6, 0xef4444, 0xfbbf24];

    for (let f = 0; f < 7; f++) {
      const fMat = new THREE.MeshStandardMaterial({
        color: flowerColors[f % flowerColors.length],
        roughness: 0.3,
        metalness: 0.1
      });
      const flower = new THREE.Mesh(flowerGeo, fMat);
      const fAngle = (f / 7) * Math.PI * 2 + 0.2;
      flower.position.set(
        Math.cos(fAngle) * 1.1,
        0.8 + (f % 3) * 0.25,
        Math.sin(fAngle) * 1.1
      );
      flower.scale.set(1.1, 0.8, 1.1);
      floraGroup.add(flower);
    }
    modelGroup.add(floraGroup);

    // SCHICHT 5: Schwebende Licht- und Pollenpartikel
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 8;
      particlePositions[p + 1] = (Math.random() - 0.5) * 6;
      particlePositions[p + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd9a74a,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // ═══ VISIBILITY CULLING (GPU-SCHONUNG GEMÄSS GESETZ 5) ═══
    let isStageVisible = true;
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: '#scrollyStage',
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          isStageVisible = self.isActive;
        }
      });
    }

    // GSAP Ticker Render Loop (Kein unkontrolliertes separates RAF!)
    if (typeof gsap !== 'undefined') {
      gsap.ticker.add(() => {
        if (!isStageVisible) return; // 0% GPU-Last außerhalb der 3D-Bühne!
        modelGroup.rotation.y += 0.0015;
        particlePoints.rotation.y += 0.0006;
        renderer.render(scene, camera);
      });
    } else {
      const renderLoop = () => {
        requestAnimationFrame(renderLoop);
        if (isStageVisible) {
          modelGroup.rotation.y += 0.0015;
          particlePoints.rotation.y += 0.0006;
          renderer.render(scene, camera);
        }
      };
      renderLoop();
    }

    // Resize Handler
    window.addEventListener('resize', () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }, { passive: true });

    // ═══ GSAP SCROLLTRIGGER SCROLLYTELLING TIMELINE ═══
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const scrollyTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#scrollyStage',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        }
      });

      // Explosion der 3D-Schichten beim Scrollen
      scrollyTL
        // Phase 1 -> 2: Schichten beginnen sich zu trennen
        .to(rootGroup.position, { y: -2.1, ease: 'none' }, 0)
        .to(drainageGroup.position, { y: -0.7, ease: 'none' }, 0)
        .to(soilGroup.position, { y: 0.7, ease: 'none' }, 0)
        .to(floraGroup.position, { y: 2.3, ease: 'none' }, 0)
        .to(camera.position, { y: 2.2, z: 8.2, ease: 'none' }, 0)

        // Text Overlay Switcher
        .to('#scrollyStep1', { opacity: 0, y: -20, duration: 0.15 }, 0.2)
        .set('#scrollyStep1', { display: 'none' }, 0.25)
        .set('#scrollyStep2', { display: 'block' }, 0.25)
        .to('#scrollyStep2', { opacity: 1, y: 0, duration: 0.15 }, 0.28)

        .to('#scrollyStep2', { opacity: 0, y: -20, duration: 0.15 }, 0.5)
        .set('#scrollyStep2', { display: 'none' }, 0.55)
        .set('#scrollyStep3', { display: 'block' }, 0.55)
        .to('#scrollyStep3', { opacity: 1, y: 0, duration: 0.15 }, 0.58)

        .to('#scrollyStep3', { opacity: 0, y: -20, duration: 0.15 }, 0.78)
        .set('#scrollyStep3', { display: 'none' }, 0.82)
        .set('#scrollyStep4', { display: 'block' }, 0.82)
        .to('#scrollyStep4', { opacity: 1, y: 0, duration: 0.15 }, 0.85);
    }
  }

  // ─── 3. REGENSBURGER PFLANZ- & BEDARFSRECHNER ──────────────────────
  const rangeInput = document.getElementById('calcRangeInput');
  const rangeValDisplay = document.getElementById('calcRangeValueDisplay');
  const rangeUnitDisplay = document.getElementById('calcRangeUnitDisplay');
  const plantsResultEl = document.getElementById('calcPlantsResult');
  const soilResultEl = document.getElementById('calcSoilResult');
  const costResultEl = document.getElementById('calcCostResult');
  const projectRadios = document.querySelectorAll('input[name="calcProject"]');

  const minScaleEl = document.getElementById('calcMinScale');
  const midScaleEl = document.getElementById('calcMidScale');
  const maxScaleEl = document.getElementById('calcMaxScale');

  const calcConfig = {
    balkon: {
      unit: 'Meter',
      min: 1, max: 20, default: 4,
      plantsPerUnit: 4,
      soilPerUnit: 20, // Liter
      costMinPerUnit: 14,
      costMaxPerUnit: 22
    },
    stauden: {
      unit: 'm²',
      min: 2, max: 50, default: 8,
      plantsPerUnit: 6,
      soilPerUnit: 18,
      costMinPerUnit: 25,
      costMaxPerUnit: 42
    },
    gemuese: {
      unit: 'm²',
      min: 2, max: 30, default: 6,
      plantsPerUnit: 5,
      soilPerUnit: 25,
      costMinPerUnit: 12,
      costMaxPerUnit: 24
    },
    grab: {
      unit: 'm²',
      min: 1, max: 8, default: 2,
      plantsPerUnit: 10,
      soilPerUnit: 35,
      costMinPerUnit: 35,
      costMaxPerUnit: 65
    }
  };

  function updateCalculator() {
    const selectedProject = document.querySelector('input[name="calcProject"]:checked')?.value || 'balkon';
    const cfg = calcConfig[selectedProject];
    if (!cfg || !rangeInput) return;

    const val = parseInt(rangeInput.value, 10);
    if (rangeValDisplay) rangeValDisplay.textContent = val;
    if (rangeUnitDisplay) rangeUnitDisplay.textContent = cfg.unit;

    const totalPlants = Math.round(val * cfg.plantsPerUnit);
    const totalSoil = Math.round(val * cfg.soilPerUnit);
    const minCost = Math.round(val * cfg.costMinPerUnit);
    const maxCost = Math.round(val * cfg.costMaxPerUnit);

    if (plantsResultEl) plantsResultEl.textContent = `ca. ${totalPlants} Stück`;
    if (soilResultEl) soilResultEl.textContent = `ca. ${totalSoil} Liter`;
    if (costResultEl) costResultEl.textContent = `${minCost} – ${maxCost} €`;
  }

  function handleProjectChange() {
    const selectedProject = document.querySelector('input[name="calcProject"]:checked')?.value || 'balkon';
    const cfg = calcConfig[selectedProject];
    if (!cfg || !rangeInput) return;

    rangeInput.min = cfg.min;
    rangeInput.max = cfg.max;
    rangeInput.value = cfg.default;

    if (minScaleEl) minScaleEl.textContent = `${cfg.min} ${cfg.unit === 'Meter' ? 'm' : 'm²'}`;
    if (midScaleEl) midScaleEl.textContent = `${Math.round((cfg.min + cfg.max) / 2)} ${cfg.unit === 'Meter' ? 'm' : 'm²'}`;
    if (maxScaleEl) maxScaleEl.textContent = `${cfg.max} ${cfg.unit === 'Meter' ? 'm' : 'm²'}`;

    updateCalculator();
  }

  projectRadios.forEach(radio => {
    radio.addEventListener('change', handleProjectChange);
  });

  if (rangeInput) {
    rangeInput.addEventListener('input', updateCalculator, { passive: true });
  }
  updateCalculator();

  // ─── 4. MULTI-STEP FUNNEL LOGIK ──────────────────────────────────
  window.currentFunnelStep = 1;
  const totalFunnelSteps = 3;

  window.funnelNext = function(step) {
    const currentEl = document.getElementById(`funnelStep${step}`);
    if (!currentEl) return;

    // Validierung der Pflichtfelder
    const requiredInputs = currentEl.querySelectorAll('[required]');
    let valid = true;
    requiredInputs.forEach(input => {
      if (input.type === 'checkbox' && !input.checked) {
        valid = false;
        input.focus();
      } else if (!input.value.trim()) {
        valid = false;
        input.classList.add('border-red-500');
        input.focus();
      } else {
        input.classList.remove('border-red-500');
      }
    });

    if (!valid) return;

    currentEl.classList.remove('active');
    window.currentFunnelStep = step + 1;
    const nextEl = document.getElementById(`funnelStep${window.currentFunnelStep}`);
    if (nextEl) nextEl.classList.add('active');

    updateFunnelProgress();
  };

  window.funnelBack = function(step) {
    const currentEl = document.getElementById(`funnelStep${step}`);
    if (!currentEl) return;

    currentEl.classList.remove('active');
    window.currentFunnelStep = step - 1;
    const prevEl = document.getElementById(`funnelStep${window.currentFunnelStep}`);
    if (prevEl) prevEl.classList.add('active');

    updateFunnelProgress();
  };

  function updateFunnelProgress() {
    const pct = (window.currentFunnelStep / totalFunnelSteps) * 100;
    const bar = document.getElementById('funnelProgressBar');
    const label = document.getElementById('funnelStepLabel');
    if (bar) bar.style.width = `${pct}%`;
    if (label) label.textContent = `Schritt ${window.currentFunnelStep} von ${totalFunnelSteps}`;
    document.querySelector('.funnel-progress')?.setAttribute('aria-valuenow', String(window.currentFunnelStep));
  }

  // Formular-Submit
  const multistepForm = document.getElementById('multistepForm');
  if (multistepForm) {
    multistepForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Verstecke aktiven Schritt
      document.querySelectorAll('.funnel-step').forEach(s => s.classList.remove('active'));
      const successEl = document.getElementById('funnelSuccess');
      if (successEl) successEl.classList.remove('hidden');

      const statusEl = document.getElementById('formStatus');
      if (statusEl) statusEl.textContent = 'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.';
    });
  }

  // ─── 5. DSGVO CONSENT MANAGEMENT & TWO-CLICK MAPS ─────────────────
  const CONSENT_KEY = 'consent_brunner_v1';
  const consentBanner = document.getElementById('consentBanner');
  const storedConsent = localStorage.getItem(CONSENT_KEY);

  function applyConsent(accepted) {
    if (accepted) {
      // Maps iframes aktivieren
      document.querySelectorAll('iframe[data-src]').forEach(iframe => {
        iframe.src = iframe.dataset.src;
        delete iframe.dataset.src;
      });
      const placeholder = document.getElementById('mapsPlaceholder');
      if (placeholder) placeholder.style.display = 'none';
    }
    if (consentBanner) consentBanner.classList.add('hidden');
  }

  if (storedConsent === 'accepted') {
    applyConsent(true);
  } else if (storedConsent === 'rejected') {
    applyConsent(false);
  } else {
    if (consentBanner) consentBanner.classList.remove('hidden');
  }

  document.getElementById('consentAccept')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('consentReject')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    applyConsent(false);
  });

  document.getElementById('consentSettings')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(CONSENT_KEY);
    if (consentBanner) consentBanner.classList.remove('hidden');
  });

  document.getElementById('btnActivateMaps')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    applyConsent(true);
  });

  // ─── 6. LEGAL MODAL SYSTEM (IMPRESSUM & DATENSCHUTZ) ──────────────
  window.openLegalModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.stop(); // PFLICHT: Lenis stoppen, damit das Modal frei scrollt
    }
    modal.querySelector('.legal-modal-close')?.focus();
  };

  window.closeLegalModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.start(); // PFLICHT: Lenis wieder aktivieren
    }
  };

  document.querySelectorAll('a[href="#impressum"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('impressumModal');
    });
  });

  document.querySelectorAll('a[href="#datenschutz"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('datenschutzModal');
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeLegalModal(btn.getAttribute('data-close-modal'));
    });
  });

  document.querySelectorAll('.legal-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeLegalModal(backdrop.id);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.legal-modal-backdrop.open').forEach(m => closeLegalModal(m.id));
    }
  });

  if (window.location.hash === '#impressum') openLegalModal('impressumModal');
  if (window.location.hash === '#datenschutz') openLegalModal('datenschutzModal');

  // ─── 7. MOBILE MENU TOGGLE ────────────────────────────────────────
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.remove('hidden');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

});
