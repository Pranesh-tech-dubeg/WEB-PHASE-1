/**
 * NEW GOLDEN ENTERPRISES — 3D WINDOW ENGINE
 * Advanced architectural 3D product visualizer built with Three.js.
 * Supports all 8 distinct window and door systems with realistic procedural geometry,
 * physical open/close animations, 360° OrbitControls, and real-time finishes and glass tints.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';

export class WindowVisualizer {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) {
      console.error(`WindowVisualizer: Container #${canvasContainerId} not found.`);
      return;
    }

    // State
    this.currentModelType = 'casement-windows';
    this.currentFinish = 'matte-white';
    this.currentGlass = 'clear';
    this.isSashOpen = false;
    this.isAutoRotating = true;

    // Animation interpolation states
    this.sashAngle = 0;
    this.sashCurrentAngle = 0;
    this.sashAngle2 = 0;
    this.sashCurrentAngle2 = 0;
    this.slideOffset = 0;
    this.slideCurrentOffset = 0;
    this.tiltAngle = 0;
    this.tiltCurrentAngle = 0;
    this.louverAngle = 0;
    this.louverCurrentAngle = 0;
    this.bifoldAngle = 0;
    this.bifoldCurrentAngle = 0;

    // Finish palette definitions
    this.finishes = {
      'matte-white': {
        name: 'Matte White (RAL 9016)',
        color: 0xF3F3F1,
        roughness: 0.45,
        metalness: 0.05,
        clearcoat: 0.1
      },
      'anthracite': {
        name: 'Anthracite Grey (RAL 7016)',
        color: 0x2E3338,
        roughness: 0.35,
        metalness: 0.15,
        clearcoat: 0.15
      },
      'black': {
        name: 'Obsidian Black Anodized',
        color: 0x161616,
        roughness: 0.28,
        metalness: 0.25,
        clearcoat: 0.15
      },
      'aluminium': {
        name: 'Natural Brushed Aluminium',
        color: 0xC8CDD3,
        roughness: 0.22,
        metalness: 0.88,
        clearcoat: 0.3
      },
      'wood': {
        name: 'Architectural Warm Walnut',
        color: 0x5C3B23,
        roughness: 0.58,
        metalness: 0.02,
        clearcoat: 0.05
      },
      'gold': {
        name: 'Satin Champagne Gold',
        color: 0xB99A5B,
        roughness: 0.32,
        metalness: 0.82,
        clearcoat: 0.35
      }
    };

    // Glass palette definitions
    this.glasses = {
      'clear': {
        name: 'Ultra-Clear Insulated Double Glazing',
        color: 0xE8F4F8,
        roughness: 0.04,
        transmission: 0.92,
        opacity: 0.25,
        transparent: true
      },
      'acoustic-lowe': {
        name: 'Acoustic Low-E Thermal Tint',
        color: 0xB8DFD6,
        roughness: 0.06,
        transmission: 0.86,
        opacity: 0.38,
        transparent: true
      },
      'bronze': {
        name: 'Solar Control Bronze Guard',
        color: 0xB69D83,
        roughness: 0.08,
        transmission: 0.78,
        opacity: 0.48,
        transparent: true
      },
      'frosted': {
        name: 'Satin Architectural Frosted Privacy',
        color: 0xE9EFF2,
        roughness: 0.65,
        transmission: 0.42,
        opacity: 0.82,
        transparent: true
      }
    };

    // Materials cache
    this.materials = {};

    this.init();
  }

  init() {
    try {
      this.initRenderer();
      this.initScene();
      this.initCamera();
      this.initLighting();
      this.initMaterials();
      this.initFloorShadow();
      this.buildModel(this.currentModelType);
      this.initControls();
      this.initEventListeners();
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);

      // Hide loading indicator
      const loader = document.getElementById('viewport-loader');
      if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 350);
      }
    } catch (err) {
      console.error('WindowVisualizer initialization error:', err);
      this.showWebGLFallback();
    }
  }

  initRenderer() {
    let canvas = this.container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'three-canvas';
      this.container.appendChild(canvas);
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xF7F7F5);
    this.modelGroup = new THREE.Group();
    this.scene.add(this.modelGroup);
  }

  initCamera() {
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    this.defaultCameraPos = new THREE.Vector3(0, 0.25, 4.2);
    this.defaultTargetPos = new THREE.Vector3(0, 0.05, 0);
    this.camera.position.copy(this.defaultCameraPos);
  }

  initLighting() {
    // 1. Soft Ambient Sky Light
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.85);
    this.scene.add(ambientLight);

    // 2. Key Architectural Sun Light
    const keyLight = new THREE.DirectionalLight(0xFFFBF4, 1.6);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    this.scene.add(keyLight);

    // 3. Fill Studio Light
    const fillLight = new THREE.DirectionalLight(0xEAF0F6, 0.7);
    fillLight.position.set(-4, 2, 3);
    this.scene.add(fillLight);

    // 4. Subtle Back Rim Light
    const rimLight = new THREE.DirectionalLight(0xB99A5B, 0.45);
    rimLight.position.set(0, 4, -4);
    this.scene.add(rimLight);
  }

  initMaterials() {
    const fConfig = this.finishes[this.currentFinish];
    this.materials.frame = new THREE.MeshStandardMaterial({
      color: new THREE.Color(fConfig.color),
      roughness: fConfig.roughness,
      metalness: fConfig.metalness,
      envMapIntensity: 1.0
    });

    const gConfig = this.glasses[this.currentGlass];
    this.materials.glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(gConfig.color),
      roughness: gConfig.roughness,
      transmission: gConfig.transmission,
      opacity: gConfig.opacity,
      transparent: true,
      ior: 1.52,
      thickness: 0.04,
      envMapIntensity: 1.2
    });

    this.materials.gasket = new THREE.MeshStandardMaterial({
      color: 0x1A1A1A,
      roughness: 0.9,
      metalness: 0.05
    });

    this.materials.hardware = new THREE.MeshStandardMaterial({
      color: 0xB99A5B,
      roughness: 0.28,
      metalness: 0.92
    });

    this.materials.track = new THREE.MeshStandardMaterial({
      color: 0xC0C5CA,
      roughness: 0.25,
      metalness: 0.95
    });
  }

  initFloorShadow() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(256, 256, 40, 256, 256, 230);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.32)');
    gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.16)');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(256, 256, 230, 150, 0, 0, Math.PI * 2);
    ctx.fill();

    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(4.4, 3.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false
    });

    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.2;
    this.scene.add(shadowMesh);
  }

  createBox(width, height, depth, material, receiveShadow = true, castShadow = true) {
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    return mesh;
  }

  createCylinder(radiusTop, radiusBottom, height, radialSegments, material) {
    const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    const mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  /**
   * Builds the selected architectural window or door model
   */
  buildModel(type) {
    while (this.modelGroup.children.length > 0) {
      const obj = this.modelGroup.children[0];
      this.modelGroup.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
    }

    this.currentModelType = type;
    this.operablePivot = null;
    this.operablePivot2 = null;
    this.slidingSash = null;
    this.awningPivot = null;
    this.louverSlats = [];
    this.bifoldPivot1 = null;
    this.bifoldPivot2 = null;

    this.sashAngle = 0;
    this.sashCurrentAngle = 0;
    this.sashAngle2 = 0;
    this.sashCurrentAngle2 = 0;
    this.slideOffset = 0;
    this.slideCurrentOffset = 0;
    this.tiltAngle = 0;
    this.tiltCurrentAngle = 0;
    this.louverAngle = 0;
    this.louverCurrentAngle = 0;
    this.bifoldAngle = 0;
    this.bifoldCurrentAngle = 0;
    this.isSashOpen = false;

    const m = type.toLowerCase();
    if (m.includes('ventilator')) {
      this.buildBathroomVentilator();
    } else if (m.includes('sliding')) {
      this.buildSlidingWindow();
    } else if (m.includes('fixed')) {
      this.buildFixedWindow();
    } else if (m.includes('french')) {
      this.buildFrenchWindow();
    } else if (m.includes('awning')) {
      this.buildAwningWindow();
    } else if (m.includes('tilt')) {
      this.buildTiltTurnWindow();
    } else if (m.includes('architectural') || m.includes('bifold')) {
      this.buildArchitecturalBifold();
    } else {
      this.buildCasementWindow();
    }

    this.updateSashButtonLabel();
  }

  /**
   * 01. Bathroom Ventilator Model
   * Features: Louvered glass slats in bottom bay + top-hung awning exhaust light
   */
  buildBathroomVentilator() {
    const totalW = 1.4;
    const totalH = 1.8;
    const frameD = 0.12;
    const profileT = 0.08;
    const group = new THREE.Group();

    // Outer perimeter
    const head = this.createBox(totalW, profileT, frameD, this.materials.frame);
    head.position.set(0, totalH / 2 - profileT / 2, 0);
    group.add(head);

    const sill = this.createBox(totalW + 0.1, profileT * 1.2, frameD + 0.04, this.materials.frame);
    sill.position.set(0, -totalH / 2 + (profileT * 1.2) / 2, 0.02);
    group.add(sill);

    const leftJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    leftJamb.position.set(-totalW / 2 + profileT / 2, 0, 0);
    group.add(leftJamb);

    const rightJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    rightJamb.position.set(totalW / 2 - profileT / 2, 0, 0);
    group.add(rightJamb);

    // Mid Transom bar separating top awning vent from bottom louvers
    const transomY = 0.15;
    const transom = this.createBox(totalW - profileT * 2, profileT * 0.9, frameD, this.materials.frame);
    transom.position.set(0, transomY, 0);
    group.add(transom);

    // Top Section: Awning Vent Sash (Hinged at top)
    const topBayH = (totalH / 2 - profileT) - transomY - (profileT * 0.45);
    const topBayW = totalW - profileT * 2 - 0.02;

    this.awningPivot = new THREE.Group();
    this.awningPivot.position.set(0, totalH / 2 - profileT, 0.02);

    const awningInner = new THREE.Group();
    awningInner.position.set(0, -topBayH / 2, 0);

    const sashProfileT = 0.06;
    const aTop = this.createBox(topBayW, sashProfileT, frameD * 0.8, this.materials.frame);
    aTop.position.set(0, topBayH / 2 - sashProfileT / 2, 0);
    awningInner.add(aTop);

    const aBottom = this.createBox(topBayW, sashProfileT, frameD * 0.8, this.materials.frame);
    aBottom.position.set(0, -topBayH / 2 + sashProfileT / 2, 0);
    awningInner.add(aBottom);

    const aLeft = this.createBox(sashProfileT, topBayH - sashProfileT * 2, frameD * 0.8, this.materials.frame);
    aLeft.position.set(-topBayW / 2 + sashProfileT / 2, 0, 0);
    awningInner.add(aLeft);

    const aRight = this.createBox(sashProfileT, topBayH - sashProfileT * 2, frameD * 0.8, this.materials.frame);
    aRight.position.set(topBayW / 2 - sashProfileT / 2, 0, 0);
    awningInner.add(aRight);

    // Frosted privacy glass
    const aGlass = this.createBox(topBayW - sashProfileT * 2, topBayH - sashProfileT * 2, 0.015, this.materials.glass);
    aGlass.position.set(0, 0, 0);
    awningInner.add(aGlass);

    this.awningPivot.add(awningInner);
    group.add(this.awningPivot);

    // Bottom Section: 5 Louver Blades with pivots
    const botBayH = totalH / 2 + transomY - profileT - 0.08;
    const botBayW = totalW - profileT * 2 - 0.04;
    const louverCount = 5;
    const louverStep = botBayH / (louverCount + 0.3);
    const startY = -totalH / 2 + profileT + 0.12;

    this.louverSlats = [];
    for (let i = 0; i < louverCount; i++) {
      const louverPivot = new THREE.Group();
      louverPivot.position.set(0, startY + i * louverStep, 0);

      // Louver glass blade tilted ~35 degrees
      const blade = this.createBox(botBayW, 0.14, 0.012, this.materials.glass);
      blade.rotation.x = -0.6; // ~35 degrees default tilt
      louverPivot.add(blade);

      // Metal pivot brackets on sides
      const pinLeft = this.createCylinder(0.012, 0.012, 0.03, 16, this.materials.hardware);
      pinLeft.rotation.z = Math.PI / 2;
      pinLeft.position.set(-botBayW / 2, 0, 0);
      louverPivot.add(pinLeft);

      const pinRight = this.createCylinder(0.012, 0.012, 0.03, 16, this.materials.hardware);
      pinRight.rotation.z = Math.PI / 2;
      pinRight.position.set(botBayW / 2, 0, 0);
      louverPivot.add(pinRight);

      group.add(louverPivot);
      this.louverSlats.push(louverPivot);
    }

    this.modelGroup.add(group);
  }

  /**
   * 02. Panoramic Multi-Track Sliding Window & Door Model
   */
  buildSlidingWindow() {
    const totalW = 2.8;
    const totalH = 2.2;
    const frameD = 0.14;
    const profileT = 0.085;
    const group = new THREE.Group();

    // Outer frame
    const head = this.createBox(totalW, profileT, frameD, this.materials.frame);
    head.position.set(0, totalH / 2 - profileT / 2, 0);
    group.add(head);

    const sill = this.createBox(totalW + 0.14, profileT * 1.3, frameD + 0.05, this.materials.frame);
    sill.position.set(0, -totalH / 2 + (profileT * 1.3) / 2, 0.02);
    group.add(sill);

    // Floor track runners
    const track1 = this.createBox(totalW - profileT * 2, 0.012, 0.018, this.materials.track);
    track1.position.set(0, -totalH / 2 + profileT * 1.3 + 0.006, 0.03);
    group.add(track1);

    const track2 = this.createBox(totalW - profileT * 2, 0.012, 0.018, this.materials.track);
    track2.position.set(0, -totalH / 2 + profileT * 1.3 + 0.006, -0.03);
    group.add(track2);

    const leftJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    leftJamb.position.set(-totalW / 2 + profileT / 2, 0, 0);
    group.add(leftJamb);

    const rightJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    rightJamb.position.set(totalW / 2 - profileT / 2, 0, 0);
    group.add(rightJamb);

    // Panels
    const panelW = (totalW - profileT * 2) / 2 + 0.04;
    const panelH = totalH - profileT * 2 - 0.03;
    const pProfileT = 0.07;
    const pDepth = 0.055;

    // Fixed Left Panel (Rear Track at Z = -0.03)
    const fixedPanel = new THREE.Group();
    fixedPanel.position.set(-totalW / 4 + profileT / 4, 0, -0.03);

    const fTop = this.createBox(panelW, pProfileT, pDepth, this.materials.frame);
    fTop.position.set(0, panelH / 2 - pProfileT / 2, 0);
    fixedPanel.add(fTop);

    const fBottom = this.createBox(panelW, pProfileT, pDepth, this.materials.frame);
    fBottom.position.set(0, -panelH / 2 + pProfileT / 2, 0);
    fixedPanel.add(fBottom);

    const fLeft = this.createBox(pProfileT, panelH - pProfileT * 2, pDepth, this.materials.frame);
    fLeft.position.set(-panelW / 2 + pProfileT / 2, 0, 0);
    fixedPanel.add(fLeft);

    const fRight = this.createBox(pProfileT, panelH - pProfileT * 2, pDepth, this.materials.frame);
    fRight.position.set(panelW / 2 - pProfileT / 2, 0, 0);
    fixedPanel.add(fRight);

    const fGlass = this.createBox(panelW - pProfileT * 2, panelH - pProfileT * 2, 0.02, this.materials.glass);
    fixedPanel.add(fGlass);
    group.add(fixedPanel);

    // Active Sliding Panel (Front Track at Z = 0.03)
    this.slidingSash = new THREE.Group();
    this.slidingBaseX = totalW / 4 - profileT / 4;
    this.slidingSash.position.set(this.slidingBaseX, 0, 0.03);

    const sTop = this.createBox(panelW, pProfileT, pDepth, this.materials.frame);
    sTop.position.set(0, panelH / 2 - pProfileT / 2, 0);
    this.slidingSash.add(sTop);

    const sBottom = this.createBox(panelW, pProfileT, pDepth, this.materials.frame);
    sBottom.position.set(0, -panelH / 2 + pProfileT / 2, 0);
    this.slidingSash.add(sBottom);

    const sLeft = this.createBox(pProfileT, panelH - pProfileT * 2, pDepth, this.materials.frame);
    sLeft.position.set(-panelW / 2 + pProfileT / 2, 0, 0);
    this.slidingSash.add(sLeft);

    const sRight = this.createBox(pProfileT, panelH - pProfileT * 2, pDepth, this.materials.frame);
    sRight.position.set(panelW / 2 - pProfileT / 2, 0, 0);
    this.slidingSash.add(sRight);

    const sGlass = this.createBox(panelW - pProfileT * 2, panelH - pProfileT * 2, 0.02, this.materials.glass);
    this.slidingSash.add(sGlass);

    // Architectural D-Handle
    const handleBar = this.createBox(0.02, 0.38, 0.02, this.materials.hardware);
    handleBar.position.set(-panelW / 2 + 0.12, 0, 0.04);
    this.slidingSash.add(handleBar);

    group.add(this.slidingSash);
    this.modelGroup.add(group);
  }

  /**
   * 03. Minimalist Architectural Picture / Fixed Window Model
   */
  buildFixedWindow() {
    const totalW = 2.5;
    const totalH = 2.3;
    const frameD = 0.10;
    const profileT = 0.045; // Ultra-slim 35-45mm
    const group = new THREE.Group();

    const head = this.createBox(totalW, profileT, frameD, this.materials.frame);
    head.position.set(0, totalH / 2 - profileT / 2, 0);
    group.add(head);

    const sill = this.createBox(totalW + 0.08, profileT * 1.2, frameD + 0.03, this.materials.frame);
    sill.position.set(0, -totalH / 2 + (profileT * 1.2) / 2, 0.015);
    group.add(sill);

    const leftJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    leftJamb.position.set(-totalW / 2 + profileT / 2, 0, 0);
    group.add(leftJamb);

    const rightJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    rightJamb.position.set(totalW / 2 - profileT / 2, 0, 0);
    group.add(rightJamb);

    // Slim interior gasket bead
    const bead = this.createBox(totalW - profileT * 2, 0.015, 0.015, this.materials.gasket);
    bead.position.set(0, totalH / 2 - profileT - 0.008, 0.01);
    group.add(bead);

    // Expansive uninterrupted double glazed pane
    const glass = this.createBox(totalW - profileT * 2 - 0.01, totalH - profileT * 2 - 0.01, 0.025, this.materials.glass);
    glass.position.set(0, 0, 0);
    group.add(glass);

    this.modelGroup.add(group);
  }

  /**
   * 04. French Windows & Doors Model
   * Features: Dual outward-swinging casement leaves with Georgian grid muntins & arched fanlight
   */
  buildFrenchWindow() {
    const totalW = 2.2;
    const totalH = 2.4;
    const frameD = 0.14;
    const profileT = 0.085;
    const group = new THREE.Group();

    // Outer frame
    const head = this.createBox(totalW, profileT, frameD, this.materials.frame);
    head.position.set(0, totalH / 2 - profileT / 2, 0);
    group.add(head);

    const sill = this.createBox(totalW + 0.12, profileT * 1.2, frameD + 0.05, this.materials.frame);
    sill.position.set(0, -totalH / 2 + (profileT * 1.2) / 2, 0.02);
    group.add(sill);

    const leftJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    leftJamb.position.set(-totalW / 2 + profileT / 2, 0, 0);
    group.add(leftJamb);

    const rightJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    rightJamb.position.set(totalW / 2 - profileT / 2, 0, 0);
    group.add(rightJamb);

    // Transom bar dividing arched fanlight and dual doors
    const transomY = 0.45;
    const transom = this.createBox(totalW - profileT * 2, profileT * 0.9, frameD, this.materials.frame);
    transom.position.set(0, transomY, 0);
    group.add(transom);

    // Arched Top Transom Glass with sunburst radial muntins
    const archW = totalW - profileT * 2;
    const archH = (totalH / 2 - profileT) - transomY - profileT * 0.45;
    const archGlass = this.createBox(archW, archH, 0.02, this.materials.glass);
    archGlass.position.set(0, transomY + profileT * 0.45 + archH / 2, 0);
    group.add(archGlass);

    // Sunburst radial muntins in arch
    for (let angle = -45; angle <= 45; angle += 30) {
      if (angle === 0) continue;
      const rad = (angle * Math.PI) / 180;
      const rib = this.createBox(0.018, archH * 0.85, 0.025, this.materials.frame);
      rib.position.set(Math.sin(rad) * 0.25, transomY + archH / 2 + 0.05, 0);
      rib.rotation.z = -rad;
      group.add(rib);
    }

    // Lower Dual French Doors (Left Leaf & Right Leaf)
    const doorH = totalH / 2 + transomY - profileT - 0.04;
    const doorW = (totalW - profileT * 2 - 0.02) / 2;
    const dProfileT = 0.07;
    const dDepth = frameD * 0.85;

    // LEFT FRENCH LEAF (Pivot on Left)
    this.operablePivot = new THREE.Group();
    this.operablePivot.position.set(-totalW / 2 + profileT, -totalH / 2 + profileT + doorH / 2, 0.02);

    const leftInner = new THREE.Group();
    leftInner.position.set(doorW / 2, 0, 0);
    this.buildFrenchLeaf(leftInner, doorW, doorH, dProfileT, dDepth, 'left');
    this.operablePivot.add(leftInner);
    group.add(this.operablePivot);

    // RIGHT FRENCH LEAF (Pivot on Right)
    this.operablePivot2 = new THREE.Group();
    this.operablePivot2.position.set(totalW / 2 - profileT, -totalH / 2 + profileT + doorH / 2, 0.02);

    const rightInner = new THREE.Group();
    rightInner.position.set(-doorW / 2, 0, 0);
    this.buildFrenchLeaf(rightInner, doorW, doorH, dProfileT, dDepth, 'right');
    this.operablePivot2.add(rightInner);
    group.add(this.operablePivot2);

    this.modelGroup.add(group);
  }

  buildFrenchLeaf(parentGroup, width, height, profileT, depth, side) {
    const top = this.createBox(width, profileT, depth, this.materials.frame);
    top.position.set(0, height / 2 - profileT / 2, 0);
    parentGroup.add(top);

    const bottom = this.createBox(width, profileT * 1.4, depth, this.materials.frame);
    bottom.position.set(0, -height / 2 + (profileT * 1.4) / 2, 0);
    parentGroup.add(bottom);

    const left = this.createBox(profileT, height - profileT * 2.4, depth, this.materials.frame);
    left.position.set(-width / 2 + profileT / 2, 0, 0);
    parentGroup.add(left);

    const right = this.createBox(profileT, height - profileT * 2.4, depth, this.materials.frame);
    right.position.set(width / 2 - profileT / 2, 0, 0);
    parentGroup.add(right);

    // Glass panel
    const glass = this.createBox(width - profileT * 2, height - profileT * 2.4, 0.02, this.materials.glass);
    parentGroup.add(glass);

    // Georgian Muntin Grid (2 horizontal bars, 1 vertical bar)
    const mVert = this.createBox(0.02, height - profileT * 2.4, 0.025, this.materials.frame);
    parentGroup.add(mVert);

    const mHoriz1 = this.createBox(width - profileT * 2, 0.02, 0.025, this.materials.frame);
    mHoriz1.position.y = 0.22;
    parentGroup.add(mHoriz1);

    const mHoriz2 = this.createBox(width - profileT * 2, 0.02, 0.025, this.materials.frame);
    mHoriz2.position.y = -0.22;
    parentGroup.add(mHoriz2);

    // Cremone bolt lever handle
    const cremoneX = (side === 'left') ? (width / 2 - 0.05) : (-width / 2 + 0.05);
    const cremoneRod = this.createBox(0.015, height * 0.65, 0.02, this.materials.hardware);
    cremoneRod.position.set(cremoneX, 0, depth / 2 + 0.01);
    parentGroup.add(cremoneRod);

    const cremoneHandle = this.createBox(0.03, 0.12, 0.05, this.materials.hardware);
    cremoneHandle.position.set(cremoneX, 0, depth / 2 + 0.035);
    parentGroup.add(cremoneHandle);
  }

  /**
   * 05. Architectural Casement Window Model
   */
  buildCasementWindow() {
    const totalW = 2.4;
    const totalH = 2.1;
    const frameD = 0.14;
    const profileT = 0.085;
    const group = new THREE.Group();

    // Outer frame
    const head = this.createBox(totalW, profileT, frameD, this.materials.frame);
    head.position.set(0, totalH / 2 - profileT / 2, 0);
    group.add(head);

    const sill = this.createBox(totalW + 0.16, profileT * 1.2, frameD + 0.06, this.materials.frame);
    sill.position.set(0, -totalH / 2 + (profileT * 1.2) / 2, 0.03);
    group.add(sill);

    const leftJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    leftJamb.position.set(-totalW / 2 + profileT / 2, 0, 0);
    group.add(leftJamb);

    const rightJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    rightJamb.position.set(totalW / 2 - profileT / 2, 0, 0);
    group.add(rightJamb);

    const mullion = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    mullion.position.set(0, 0, 0);
    group.add(mullion);

    // Left Bay: Fixed Glazed Panel
    const bayW = (totalW - profileT * 3) / 2;
    const bayH = totalH - profileT * 2;
    const leftCenterX = -totalW / 4 + profileT / 4;

    const fixedGlass = this.createBox(bayW - 0.02, bayH - 0.02, 0.02, this.materials.glass);
    fixedGlass.position.set(leftCenterX, 0, 0);
    group.add(fixedGlass);

    // Right Bay: Operable Casement Sash
    const sashW = bayW - 0.02;
    const sashH = bayH - 0.02;
    const sashProfileT = 0.07;
    const sashD = frameD * 0.85;

    const hingePivotX = totalW / 2 - profileT;
    this.operablePivot = new THREE.Group();
    this.operablePivot.position.set(hingePivotX, 0, 0.02);

    const sashInner = new THREE.Group();
    sashInner.position.set(-sashW / 2, 0, 0);

    const sTop = this.createBox(sashW, sashProfileT, sashD, this.materials.frame);
    sTop.position.set(0, sashH / 2 - sashProfileT / 2, 0);
    sashInner.add(sTop);

    const sBottom = this.createBox(sashW, sashProfileT, sashD, this.materials.frame);
    sBottom.position.set(0, -sashH / 2 + sashProfileT / 2, 0);
    sashInner.add(sBottom);

    const sLeft = this.createBox(sashProfileT, sashH - sashProfileT * 2, sashD, this.materials.frame);
    sLeft.position.set(-sashW / 2 + sashProfileT / 2, 0, 0);
    sashInner.add(sLeft);

    const sRight = this.createBox(sashProfileT, sashH - sashProfileT * 2, sashD, this.materials.frame);
    sRight.position.set(sashW / 2 - sashProfileT / 2, 0, 0);
    sashInner.add(sRight);

    const sGlass = this.createBox(sashW - sashProfileT * 2, sashH - sashProfileT * 2, 0.02, this.materials.glass);
    sashInner.add(sGlass);

    // Lever Handle
    const handle = this.createBox(0.022, 0.16, 0.05, this.materials.hardware);
    handle.position.set(-sashW / 2 + 0.045, -0.05, sashD / 2 + 0.02);
    sashInner.add(handle);

    this.operablePivot.add(sashInner);
    group.add(this.operablePivot);

    this.modelGroup.add(group);
  }

  /**
   * 06. Awning / Top-Hung Window Model
   */
  buildAwningWindow() {
    const totalW = 2.0;
    const totalH = 1.8;
    const frameD = 0.13;
    const profileT = 0.085;
    const group = new THREE.Group();

    // Outer frame
    const head = this.createBox(totalW, profileT, frameD, this.materials.frame);
    head.position.set(0, totalH / 2 - profileT / 2, 0);
    group.add(head);

    const sill = this.createBox(totalW + 0.14, profileT * 1.3, frameD + 0.05, this.materials.frame);
    sill.position.set(0, -totalH / 2 + (profileT * 1.3) / 2, 0.025);
    group.add(sill);

    const leftJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    leftJamb.position.set(-totalW / 2 + profileT / 2, 0, 0);
    group.add(leftJamb);

    const rightJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    rightJamb.position.set(totalW / 2 - profileT / 2, 0, 0);
    group.add(rightJamb);

    // Top-hung pivot (Hinged at top head rail, swings outward from bottom)
    const sashW = totalW - profileT * 2 - 0.02;
    const sashH = totalH - profileT * 2 - 0.02;
    const sashProfileT = 0.07;
    const sashD = frameD * 0.85;

    this.awningPivot = new THREE.Group();
    this.awningPivot.position.set(0, totalH / 2 - profileT, 0.02);

    const sashInner = new THREE.Group();
    sashInner.position.set(0, -sashH / 2, 0);

    const sTop = this.createBox(sashW, sashProfileT, sashD, this.materials.frame);
    sTop.position.set(0, sashH / 2 - sashProfileT / 2, 0);
    sashInner.add(sTop);

    const sBottom = this.createBox(sashW, sashProfileT, sashD, this.materials.frame);
    sBottom.position.set(0, -sashH / 2 + sashProfileT / 2, 0);
    sashInner.add(sBottom);

    const sLeft = this.createBox(sashProfileT, sashH - sashProfileT * 2, sashD, this.materials.frame);
    sLeft.position.set(-sashW / 2 + sashProfileT / 2, 0, 0);
    sashInner.add(sLeft);

    const sRight = this.createBox(sashProfileT, sashH - sashProfileT * 2, sashD, this.materials.frame);
    sRight.position.set(sashW / 2 - sashProfileT / 2, 0, 0);
    sashInner.add(sRight);

    const sGlass = this.createBox(sashW - sashProfileT * 2, sashH - sashProfileT * 2, 0.02, this.materials.glass);
    sashInner.add(sGlass);

    // Bottom architectural cam handle
    const handle = this.createBox(0.14, 0.025, 0.05, this.materials.hardware);
    handle.position.set(0, -sashH / 2 + 0.045, sashD / 2 + 0.02);
    sashInner.add(handle);

    this.awningPivot.add(sashInner);
    group.add(this.awningPivot);

    this.modelGroup.add(group);
  }

  /**
   * 07. European Tilt-and-Turn Window Model
   */
  buildTiltTurnWindow() {
    const totalW = 1.8;
    const totalH = 2.1;
    const frameD = 0.14;
    const profileT = 0.09;
    const group = new THREE.Group();

    // Outer frame
    const head = this.createBox(totalW, profileT, frameD, this.materials.frame);
    head.position.set(0, totalH / 2 - profileT / 2, 0);
    group.add(head);

    const sill = this.createBox(totalW + 0.14, profileT * 1.25, frameD + 0.05, this.materials.frame);
    sill.position.set(0, -totalH / 2 + (profileT * 1.25) / 2, 0.02);
    group.add(sill);

    const leftJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    leftJamb.position.set(-totalW / 2 + profileT / 2, 0, 0);
    group.add(leftJamb);

    const rightJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    rightJamb.position.set(totalW / 2 - profileT / 2, 0, 0);
    group.add(rightJamb);

    // Inward Operable Sash
    const sashW = totalW - profileT * 2 - 0.03;
    const sashH = totalH - profileT * 2 - 0.03;
    const sashProfileT = 0.08;
    const sashD = frameD * 0.82;

    this.operablePivot = new THREE.Group();
    this.operablePivot.position.set(-totalW / 2 + profileT, -totalH / 2 + profileT, 0.02);

    const sashInner = new THREE.Group();
    sashInner.position.set(sashW / 2, sashH / 2, 0);

    const sTop = this.createBox(sashW, sashProfileT, sashD, this.materials.frame);
    sTop.position.set(0, sashH / 2 - sashProfileT / 2, 0);
    sashInner.add(sTop);

    const sBottom = this.createBox(sashW, sashProfileT, sashD, this.materials.frame);
    sBottom.position.set(0, -sashH / 2 + sashProfileT / 2, 0);
    sashInner.add(sBottom);

    const sLeft = this.createBox(sashProfileT, sashH - sashProfileT * 2, sashD, this.materials.frame);
    sLeft.position.set(-sashW / 2 + sashProfileT / 2, 0, 0);
    sashInner.add(sLeft);

    const sRight = this.createBox(sashProfileT, sashH - sashProfileT * 2, sashD, this.materials.frame);
    sRight.position.set(sashW / 2 - sashProfileT / 2, 0, 0);
    sashInner.add(sRight);

    const sGlass = this.createBox(sashW - sashProfileT * 2, sashH - sashProfileT * 2, 0.025, this.materials.glass);
    sashInner.add(sGlass);

    // Precision German Architectural Handle
    const handle = this.createBox(0.024, 0.18, 0.05, this.materials.hardware);
    handle.position.set(sashW / 2 - 0.045, 0, sashD / 2 + 0.02);
    sashInner.add(handle);

    this.operablePivot.add(sashInner);
    group.add(this.operablePivot);

    this.modelGroup.add(group);
  }

  /**
   * 08. Architectural Bi-Fold Concertina Folding System
   */
  buildArchitecturalBifold() {
    const totalW = 3.2;
    const totalH = 2.2;
    const frameD = 0.15;
    const profileT = 0.085;
    const group = new THREE.Group();

    // Outer frame
    const head = this.createBox(totalW, profileT, frameD, this.materials.frame);
    head.position.set(0, totalH / 2 - profileT / 2, 0);
    group.add(head);

    const sill = this.createBox(totalW + 0.14, profileT * 1.3, frameD + 0.05, this.materials.frame);
    sill.position.set(0, -totalH / 2 + (profileT * 1.3) / 2, 0.02);
    group.add(sill);

    const leftJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    leftJamb.position.set(-totalW / 2 + profileT / 2, 0, 0);
    group.add(leftJamb);

    const rightJamb = this.createBox(profileT, totalH - profileT * 2, frameD, this.materials.frame);
    rightJamb.position.set(totalW / 2 - profileT / 2, 0, 0);
    group.add(rightJamb);

    // 3 Concertina Folding Panels
    const leafCount = 3;
    const leafW = (totalW - profileT * 2 - 0.04) / leafCount;
    const leafH = totalH - profileT * 2 - 0.04;
    const lProfileT = 0.065;
    const lDepth = 0.06;

    // Panel 1 (Hinged at left jamb)
    this.bifoldPivot1 = new THREE.Group();
    this.bifoldPivot1.position.set(-totalW / 2 + profileT, 0, 0);

    const leaf1 = this.createBifoldLeaf(leafW, leafH, lProfileT, lDepth);
    leaf1.position.set(leafW / 2, 0, 0);
    this.bifoldPivot1.add(leaf1);

    // Panel 2 (Hinged at end of panel 1)
    this.bifoldPivot2 = new THREE.Group();
    this.bifoldPivot2.position.set(leafW, 0, 0);

    const leaf2 = this.createBifoldLeaf(leafW, leafH, lProfileT, lDepth);
    leaf2.position.set(leafW / 2, 0, 0);
    this.bifoldPivot2.add(leaf2);
    this.bifoldPivot1.add(this.bifoldPivot2);

    // Panel 3 (Standard pass door hinged on right jamb)
    const leaf3Group = new THREE.Group();
    leaf3Group.position.set(totalW / 2 - profileT - leafW / 2, 0, 0);
    const leaf3 = this.createBifoldLeaf(leafW, leafH, lProfileT, lDepth);
    leaf3Group.add(leaf3);
    group.add(leaf3Group);

    group.add(this.bifoldPivot1);
    this.modelGroup.add(group);
  }

  createBifoldLeaf(width, height, profileT, depth) {
    const g = new THREE.Group();

    const top = this.createBox(width, profileT, depth, this.materials.frame);
    top.position.set(0, height / 2 - profileT / 2, 0);
    g.add(top);

    const bottom = this.createBox(width, profileT, depth, this.materials.frame);
    bottom.position.set(0, -height / 2 + profileT / 2, 0);
    g.add(bottom);

    const left = this.createBox(profileT, height - profileT * 2, depth, this.materials.frame);
    left.position.set(-width / 2 + profileT / 2, 0, 0);
    g.add(left);

    const right = this.createBox(profileT, height - profileT * 2, depth, this.materials.frame);
    right.position.set(width / 2 - profileT / 2, 0, 0);
    g.add(right);

    const glass = this.createBox(width - profileT * 2, height - profileT * 2, 0.02, this.materials.glass);
    g.add(glass);

    return g;
  }

  /**
   * Updates sash operation button label based on active model and state
   */
  updateSashButtonLabel() {
    const btnText = document.getElementById('sash-action-text');
    if (!btnText) return;

    const m = this.currentModelType.toLowerCase();
    if (m.includes('ventilator')) {
      btnText.textContent = this.isSashOpen ? 'Close Ventilator' : 'Adjust Louvers & Sash';
    } else if (m.includes('sliding')) {
      btnText.textContent = this.isSashOpen ? 'Close Sliding Sash' : 'Slide Sash Open (1.2m)';
    } else if (m.includes('fixed')) {
      btnText.textContent = 'Hermetic Seal (Fixed)';
    } else if (m.includes('french')) {
      btnText.textContent = this.isSashOpen ? 'Close French Doors' : 'Open French Doors (65°)';
    } else if (m.includes('awning')) {
      btnText.textContent = this.isSashOpen ? 'Close Awning' : 'Swing Awning Out (40°)';
    } else if (m.includes('tilt')) {
      btnText.textContent = this.isSashOpen ? 'Close Window' : 'Tilt / Turn Window';
    } else if (m.includes('bifold') || m.includes('architectural')) {
      btnText.textContent = this.isSashOpen ? 'Close Bi-Fold Doors' : 'Fold Bi-Fold Doors';
    } else {
      btnText.textContent = this.isSashOpen ? 'Close Casement' : 'Open Casement (55°)';
    }
  }

  /**
   * Toggles the physical open/close state of the active model
   */
  toggleSash() {
    this.isSashOpen = !this.isSashOpen;
    const m = this.currentModelType.toLowerCase();

    if (m.includes('ventilator')) {
      this.louverAngle = this.isSashOpen ? 0.75 : 0;
      this.sashAngle = this.isSashOpen ? -0.55 : 0;
    } else if (m.includes('sliding')) {
      this.slideOffset = this.isSashOpen ? -1.15 : 0;
    } else if (m.includes('french')) {
      this.sashAngle = this.isSashOpen ? -1.15 : 0;
      this.sashAngle2 = this.isSashOpen ? 1.15 : 0;
    } else if (m.includes('awning')) {
      this.sashAngle = this.isSashOpen ? -0.65 : 0;
    } else if (m.includes('tilt')) {
      // Toggle inward turn
      this.sashAngle = this.isSashOpen ? 1.25 : 0;
    } else if (m.includes('bifold') || m.includes('architectural')) {
      this.bifoldAngle = this.isSashOpen ? 1.35 : 0;
    } else {
      // Casement
      this.sashAngle = this.isSashOpen ? 0.95 : 0;
    }

    this.updateSashButtonLabel();
  }

  /**
   * Real-time material finish updater
   */
  setFrameFinish(finishKey) {
    const fConfig = this.finishes[finishKey];
    if (!fConfig) return;

    this.currentFinish = finishKey;
    this.materials.frame.color.setHex(fConfig.color);
    this.materials.frame.roughness = fConfig.roughness;
    this.materials.frame.metalness = fConfig.metalness;
    this.materials.frame.needsUpdate = true;
  }

  /**
   * Real-time glass tint updater
   */
  setGlassOption(glassKey) {
    const gConfig = this.glasses[glassKey];
    if (!gConfig) return;

    this.currentGlass = glassKey;
    this.materials.glass.color.setHex(gConfig.color);
    this.materials.glass.roughness = gConfig.roughness;
    this.materials.glass.transmission = gConfig.transmission;
    this.materials.glass.opacity = gConfig.opacity;
    this.materials.glass.needsUpdate = true;
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    // CRITICAL: Set enableZoom to false to prevent trackpad wheel event hijacking on laptops!
    // Users can now scroll comfortably down the webpage without wild camera zooming.
    this.controls.enableZoom = false;
    this.controls.minDistance = 1.8;
    this.controls.maxDistance = 7.5;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent camera sinking under floor
    this.controls.minPolarAngle = 0.2;
    this.controls.target.copy(this.defaultTargetPos);
    this.controls.autoRotate = this.isAutoRotating;
    this.controls.autoRotateSpeed = 0.7;

    this.controls.addEventListener('start', () => {
      this.isAutoRotating = false;
      this.controls.autoRotate = false;
      const btn = document.getElementById('btn-toggle-rotate');
      if (btn) btn.classList.remove('active');
    });

    // Power-user zoom: Only intercept wheel if Ctrl or Cmd key is explicitly held.
    // Regular trackpad/mouse wheel will naturally and comfortably scroll the webpage!
    this.renderer.domElement.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          this.zoomIn();
        } else {
          this.zoomOut();
        }
      }
    }, { passive: false });
  }

  zoomIn() {
    const factor = 0.85;
    const offset = this.camera.position.clone().sub(this.controls.target);
    if (offset.length() * factor >= this.controls.minDistance) {
      offset.multiplyScalar(factor);
      this.camera.position.copy(this.controls.target).add(offset);
      this.controls.update();
    }
  }

  zoomOut() {
    const factor = 1.18;
    const offset = this.camera.position.clone().sub(this.controls.target);
    if (offset.length() * factor <= this.controls.maxDistance) {
      offset.multiplyScalar(factor);
      this.camera.position.copy(this.controls.target).add(offset);
      this.controls.update();
    }
  }

  resetView() {
    const startPos = this.camera.position.clone();
    const targetPos = this.defaultCameraPos.clone();
    const duration = 800;
    const startTime = performance.now();

    const tweenCamera = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      this.camera.position.lerpVectors(startPos, targetPos, ease);
      this.controls.target.copy(this.defaultTargetPos);
      this.controls.update();

      if (progress < 1) {
        requestAnimationFrame(tweenCamera);
      }
    };

    requestAnimationFrame(tweenCamera);
  }

  toggleAutoRotate() {
    this.isAutoRotating = !this.isAutoRotating;
    this.controls.autoRotate = this.isAutoRotating;
    const btn = document.getElementById('btn-toggle-rotate');
    if (btn) btn.classList.toggle('active', this.isAutoRotating);
  }

  toggleFullscreen() {
    const card = document.getElementById('viewport-card') || this.container;
    if (!card) return;

    if (!document.fullscreenElement) {
      if (card.requestFullscreen) card.requestFullscreen();
      else if (card.webkitRequestFullscreen) card.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  initEventListeners() {
    window.addEventListener('resize', () => this.onResize());
    const resizeObserver = new ResizeObserver(() => this.onResize());
    resizeObserver.observe(this.container);

    const zoomInBtn = document.getElementById('btn-zoom-in');
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.zoomIn());

    const zoomOutBtn = document.getElementById('btn-zoom-out');
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.zoomOut());

    const resetBtn = document.getElementById('btn-reset-view');
    if (resetBtn) resetBtn.addEventListener('click', () => this.resetView());

    const rotateBtn = document.getElementById('btn-toggle-rotate');
    if (rotateBtn) rotateBtn.addEventListener('click', () => this.toggleAutoRotate());

    const fsBtn = document.getElementById('btn-fullscreen');
    if (fsBtn) fsBtn.addEventListener('click', () => this.toggleFullscreen());

    const sashBtn = document.getElementById('btn-sash-action');
    if (sashBtn) sashBtn.addEventListener('click', () => this.toggleSash());
  }

  animate(timestamp) {
    requestAnimationFrame(this.animate);

    // 1. Operable pivot single / primary (casement, tilt-turn)
    if (this.operablePivot) {
      this.sashCurrentAngle += (this.sashAngle - this.sashCurrentAngle) * 0.08;
      this.operablePivot.rotation.y = this.sashCurrentAngle;
    }

    // 2. Operable pivot 2 (French doors right leaf)
    if (this.operablePivot2) {
      this.sashCurrentAngle2 += (this.sashAngle2 - this.sashCurrentAngle2) * 0.08;
      this.operablePivot2.rotation.y = this.sashCurrentAngle2;
    }

    // 3. Sliding sash
    if (this.slidingSash) {
      this.slideCurrentOffset += (this.slideOffset - this.slideCurrentOffset) * 0.08;
      this.slidingSash.position.x = this.slidingBaseX + this.slideCurrentOffset;
    }

    // 4. Awning pivot (rotates around X axis)
    if (this.awningPivot) {
      this.sashCurrentAngle += (this.sashAngle - this.sashCurrentAngle) * 0.08;
      this.awningPivot.rotation.x = this.sashCurrentAngle;
    }

    // 5. Louver slats
    if (this.louverSlats && this.louverSlats.length > 0) {
      this.louverCurrentAngle += (this.louverAngle - this.louverCurrentAngle) * 0.08;
      this.louverSlats.forEach(slat => {
        slat.rotation.x = this.louverCurrentAngle;
      });
    }

    // 6. Bi-fold panels
    if (this.bifoldPivot1 && this.bifoldPivot2) {
      this.bifoldCurrentAngle += (this.bifoldAngle - this.bifoldCurrentAngle) * 0.08;
      this.bifoldPivot1.rotation.y = -this.bifoldCurrentAngle;
      this.bifoldPivot2.rotation.y = this.bifoldCurrentAngle * 1.85;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  showWebGLFallback() {
    const fallback = document.getElementById('webgl-fallback');
    if (fallback) fallback.classList.add('active');
  }
}

export function init3DStudio(containerId = 'canvas-container') {
  return new WindowVisualizer(containerId);
}
