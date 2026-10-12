/**
 * AstroMind Three.js 3D Solar System Engine
 * High-performance WebGL solar system with procedural canvas textures,
 * dynamic lighting, asteroid belts, orbital tracks, and interactive raycasting.
 */

class SolarSystemApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    // Simulation states
    this.isPlaying = true;
    this.timeScale = 1.0;
    this.simTime = 0;
    this.scaleMode = 'visual'; // 'visual' or 'true'
    this.showOrbits = true;
    this.showLabels = true;
    this.showAsteroids = true;

    // Celestial objects registry
    this.planets = {};
    this.orbitLines = [];
    this.labels = [];
    this.asteroidGroup = null;
    this.kuiperGroup = null;
    this.sunLight = null;
    this.sunMesh = null;
    this.sunGlow = null;
    this.earthClouds = null;

    // Raycasting
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Callbacks & references
    this.onPlanetSelected = null;
    this.selectedBodyId = null;
    this.flightSystem = null;

    // Pointer drag vs click detection
    this.pointerDownPos = { x: 0, y: 0 };
    this.pointerDownTime = 0;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030712, 0.0006);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 8000);
    this.camera.position.set(0, 140, 240);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 3500;
    this.controls.minDistance = 3;

    // 5. Environment & Lights
    this.setupLighting();
    this.buildStarfield();
    this.buildNebulaClouds();

    // 6. Build Celestial Bodies
    this.buildSolarSystem();
    this.buildAsteroidBelt();
    this.buildKuiperBelt();

    // 7. Event Listeners
    window.addEventListener('resize', () => this.onWindowResize());
    this.renderer.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.renderer.domElement.addEventListener('pointerup', (e) => this.onPointerUp(e));
    this.renderer.domElement.addEventListener('pointermove', (e) => this.onPointerMove(e));

    // 8. Start Animation Loop
    this.animate();
  }

  setupLighting() {
    // Ambient light - deep space ambient so shadow sides have subtle visibility
    const ambientLight = new THREE.AmbientLight(0x1e1b4b, 0.35);
    this.scene.add(ambientLight);

    // Sun point light - casts realistic light onto all planets
    this.sunLight = new THREE.PointLight(0xfff7ed, 2.5, 4000, 0.25);
    this.sunLight.position.set(0, 0, 0);
    this.scene.add(this.sunLight);

    // Secondary subtle directional fill
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.15);
    fillLight.position.set(300, 200, 300);
    this.scene.add(fillLight);
  }

  // Multi-spectral starfield
  buildStarfield() {
    const starCount = 10000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    // Star temperature color palette (O, B, A, F, G, K, M)
    const starColors = [
      new THREE.Color(0x93c5fd), // Blue-white
      new THREE.Color(0xffffff), // White
      new THREE.Color(0xfef08a), // Pale Yellow
      new THREE.Color(0xfb923c), // Orange
      new THREE.Color(0xf87171)  // Red
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 2500 + Math.random() * 2000;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = starColors[Math.floor(Math.random() * starColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: false
    });

    const starField = new THREE.Points(geometry, material);
    this.scene.add(starField);
  }

  // Cosmic Nebula dust
  buildNebulaClouds() {
    const cloudCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(cloudCount * 3);
    const colors = new Float32Array(cloudCount * 3);

    const nebulaPalette = [
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xec4899)  // Pink
    ];

    for (let i = 0; i < cloudCount; i++) {
      const radius = 1800 + Math.random() * 1200;
      const theta = 2 * Math.PI * Math.random();
      const phi = (Math.PI / 2) + (Math.random() - 0.5) * 0.4; // Clustered near galactic plane

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.3;
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const col = nebulaPalette[Math.floor(Math.random() * nebulaPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 18,
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const nebula = new THREE.Points(geometry, material);
    this.scene.add(nebula);
  }

  // Procedural 2D Canvas Planet Textures
  generatePlanetTexture(id) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    switch (id) {
      case 'sun': {
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#ffaa00');
        grad.addColorStop(0.3, '#ff5500');
        grad.addColorStop(0.6, '#ffcc00');
        grad.addColorStop(1, '#ff3300');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Solar turbulence cells
        for (let i = 0; i < 400; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const r = 20 + Math.random() * 80;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, ${Math.floor(150 + Math.random() * 105)}, 0, 0.15)`;
          ctx.fill();
        }
        break;
      }

      case 'mercury': {
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(0, 0, w, h);
        // Craters & impact rays
        for (let i = 0; i < 500; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const r = 2 + Math.random() * 25;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(30, 41, 59, 0.4)' : 'rgba(203, 213, 225, 0.35)';
          ctx.fill();
        }
        break;
      }

      case 'venus': {
        // Swirling golden-pale sulfuric clouds
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, '#eab308');
        grad.addColorStop(0.5, '#fef08a');
        grad.addColorStop(1, '#ca8a04');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        for (let y = 0; y < h; y += 4) {
          ctx.fillStyle = `rgba(217, 119, 6, ${0.1 + Math.sin(y * 0.08) * 0.1})`;
          ctx.fillRect(0, y, w, 4);
        }
        // Swirl patches
        for (let i = 0; i < 80; i++) {
          ctx.beginPath();
          ctx.ellipse(Math.random() * w, Math.random() * h, 120, 30, Math.random() * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
          ctx.fill();
        }
        break;
      }

      case 'earth': {
        // Oceans
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(0, 0, w, h);

        // Continents
        ctx.fillStyle = '#15803d';
        const drawContinent = (cx, cy, rx, ry) => {
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx, ry, 0.2, 0, Math.PI * 2);
          ctx.fill();
          // Mountains / arid deserts
          ctx.fillStyle = '#ca8a04';
          ctx.beginPath();
          ctx.ellipse(cx + 10, cy, rx * 0.4, ry * 0.4, 0.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#15803d';
        };

        // Eurasia & Africa
        drawContinent(w * 0.55, h * 0.35, 140, 80);
        drawContinent(w * 0.52, h * 0.6, 90, 100);
        // Americas
        drawContinent(w * 0.22, h * 0.35, 80, 90);
        drawContinent(w * 0.28, h * 0.65, 70, 110);
        // Australia
        drawContinent(w * 0.8, h * 0.7, 50, 40);

        // Polar ice caps
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, w, 35);
        ctx.fillRect(0, h - 45, w, 45);
        break;
      }

      case 'moon': {
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, 0, w, h);
        // Lunar maria (dark basalt plains)
        ctx.fillStyle = '#475569';
        for (let i = 0; i < 12; i++) {
          ctx.beginPath();
          ctx.arc(w * 0.2 + Math.random() * (w * 0.6), h * 0.2 + Math.random() * (h * 0.6), 40 + Math.random() * 70, 0, Math.PI * 2);
          ctx.fill();
        }
        // Craters
        for (let i = 0; i < 350; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * w, Math.random() * h, 3 + Math.random() * 14, 0, Math.PI * 2);
          ctx.fillStyle = Math.random() > 0.6 ? 'rgba(255,255,255,0.4)' : 'rgba(15,23,42,0.3)';
          ctx.fill();
        }
        break;
      }

      case 'mars': {
        // Red planet terrain
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#c2410c');
        grad.addColorStop(0.5, '#ea580c');
        grad.addColorStop(1, '#9a3412');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Dark volcanic basalt regions (Syrtis Major)
        ctx.fillStyle = 'rgba(67, 20, 7, 0.45)';
        for (let i = 0; i < 15; i++) {
          ctx.beginPath();
          ctx.ellipse(Math.random() * w, Math.random() * h, 80 + Math.random() * 100, 30 + Math.random() * 40, 0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Valles Marineris canyon scratch
        ctx.strokeStyle = '#431407';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(w * 0.3, h * 0.52);
        ctx.lineTo(w * 0.55, h * 0.55);
        ctx.stroke();

        // Polar ice caps
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, 25);
        ctx.fillRect(0, h - 30, w, 30);
        break;
      }

      case 'jupiter': {
        // Multi-colored gas bands
        const bandColors = ['#fde68a', '#d97706', '#fef3c7', '#ea580c', '#b45309', '#fde68a', '#c2410c', '#fed7aa'];
        const bandHeight = h / bandColors.length;
        bandColors.forEach((color, i) => {
          ctx.fillStyle = color;
          ctx.fillRect(0, i * bandHeight, w, bandHeight);
          // Wave turbulence
          for (let x = 0; x < w; x += 30) {
            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            ctx.fillRect(x, i * bandHeight + Math.sin(x * 0.05) * 6, 20, bandHeight * 0.5);
          }
        });

        // The Great Red Spot
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.ellipse(w * 0.65, h * 0.65, 80, 45, 0, 0, Math.PI * 2);
        ctx.fill();
        // Storm core
        ctx.fillStyle = '#7f1d1d';
        ctx.beginPath();
        ctx.ellipse(w * 0.65, h * 0.65, 45, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'saturn': {
        // Golden-ochre atmospheric stripes
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#fef08a');
        grad.addColorStop(0.3, '#fde047');
        grad.addColorStop(0.5, '#eab308');
        grad.addColorStop(0.7, '#ca8a04');
        grad.addColorStop(1, '#a16207');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        for (let y = 0; y < h; y += 3) {
          ctx.fillStyle = `rgba(254, 240, 138, ${Math.sin(y * 0.1) * 0.15})`;
          ctx.fillRect(0, y, w, 3);
        }
        break;
      }

      case 'uranus': {
        // Pale cyan ice giant
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#a5f3fc');
        grad.addColorStop(0.5, '#67e8f9');
        grad.addColorStop(1, '#22d3ee');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        break;
      }

      case 'neptune': {
        // Deep vibrant blue with white streaks
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#2563eb');
        grad.addColorStop(0.5, '#1d4ed8');
        grad.addColorStop(1, '#1e40af');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Supersonic methane cirrus streaks
        ctx.fillStyle = 'rgba(191, 219, 254, 0.35)';
        for (let i = 0; i < 20; i++) {
          ctx.fillRect(Math.random() * w, Math.random() * h, 120 + Math.random() * 200, 3 + Math.random() * 4);
        }

        // Great Dark Spot
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.beginPath();
        ctx.ellipse(w * 0.4, h * 0.4, 50, 30, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'pluto': {
        // Mottled reddish brown
        ctx.fillStyle = '#ca8a04';
        ctx.fillRect(0, 0, w, h);

        // Sputnik Planitia (Heart shape)
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.ellipse(w * 0.5, h * 0.5, 90, 60, 0.2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      default: {
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, 0, w, h);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // Saturn's Ring Texture
  generateRingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;

    ctx.clearRect(0, 0, w, 64);
    // Draw concentric bands with Cassini division gap
    for (let x = 0; x < w; x++) {
      const pos = x / w;
      let alpha = 0.85;

      // Cassini Division (dark gap around 70-75% out)
      if (pos > 0.68 && pos < 0.74) {
        alpha = 0.05;
      } else if (pos < 0.1 || pos > 0.95) {
        alpha = 0.15; // Ring edges fade
      } else {
        alpha = 0.6 + Math.sin(x * 0.2) * 0.35;
      }

      ctx.fillStyle = `rgba(226, 214, 185, ${alpha})`;
      ctx.fillRect(x, 0, 1, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  // Build Solar System Objects
  buildSolarSystem() {
    Object.keys(CELESTIAL_DATA).forEach(id => {
      const data = CELESTIAL_DATA[id];
      const vis = data.visual;

      const group = new THREE.Group();
      group.name = id;

      // Sun vs Planets
      if (id === 'sun') {
        const geometry = new THREE.SphereGeometry(vis.radius, 64, 64);
        const texture = this.generatePlanetTexture('sun');
        const material = new THREE.MeshBasicMaterial({
          map: texture
        });
        const sun = new THREE.Mesh(geometry, material);
        sun.userData = { id, data };
        this.sunMesh = sun;
        group.add(sun);

        // Sun Corona Glow Mesh (Additive blending)
        const glowGeo = new THREE.SphereGeometry(vis.radius * 1.25, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({
          color: 0xffaa00,
          transparent: true,
          opacity: 0.35,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide
        });
        this.sunGlow = new THREE.Mesh(glowGeo, glowMat);
        group.add(this.sunGlow);

        this.scene.add(group);
        this.planets[id] = { group, mesh: sun, data };
        return;
      }

      // Standard Planet / Moon Mesh
      const geometry = new THREE.SphereGeometry(vis.radius, 48, 48);
      const texture = this.generatePlanetTexture(id);

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.75,
        metalness: 0.1
      });

      const planetMesh = new THREE.Mesh(geometry, material);
      planetMesh.rotation.z = vis.tilt || 0;
      planetMesh.userData = { id, data };
      group.add(planetMesh);

      // Earth independent rotating cloud layer
      if (id === 'earth' && vis.hasClouds) {
        const cloudCanvas = document.createElement('canvas');
        cloudCanvas.width = 1024;
        cloudCanvas.height = 512;
        const cctx = cloudCanvas.getContext('2d');
        cctx.clearRect(0, 0, 1024, 512);
        // Swirling white clouds
        for (let i = 0; i < 150; i++) {
          cctx.beginPath();
          cctx.ellipse(Math.random() * 1024, Math.random() * 512, 60 + Math.random() * 80, 20 + Math.random() * 30, Math.random(), 0, Math.PI * 2);
          cctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          cctx.fill();
        }
        const cloudTex = new THREE.CanvasTexture(cloudCanvas);
        const cloudGeo = new THREE.SphereGeometry(vis.radius * 1.025, 48, 48);
        const cloudMat = new THREE.MeshStandardMaterial({
          map: cloudTex,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending
        });
        this.earthClouds = new THREE.Mesh(cloudGeo, cloudMat);
        group.add(this.earthClouds);
      }

      // Saturn & Uranus Rings
      if (vis.rings) {
        const ringGeo = new THREE.RingGeometry(vis.rings.innerRadius, vis.rings.outerRadius, 64);
        const ringTex = this.generateRingTexture();
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: vis.rings.opacity || 0.85,
          roughness: 0.6
        });

        // Align rings to equator
        ringGeo.rotateX(Math.PI / 2);
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.z = vis.tilt || 0;
        group.add(ringMesh);
      }

      // Moon orbits its parent Earth
      if (id === 'moon') {
        // Moon will be positioned relative to Earth in animation loop
        this.scene.add(group);
        this.planets[id] = { group, mesh: planetMesh, data, angle: Math.random() * Math.PI * 2 };
        return;
      }

      // Add Orbit Path Track
      this.createOrbitPath(vis.distance);

      // Random initial orbital position angle
      const initialAngle = Math.random() * Math.PI * 2;
      group.position.x = Math.cos(initialAngle) * vis.distance;
      group.position.z = Math.sin(initialAngle) * vis.distance;

      this.scene.add(group);
      this.planets[id] = { group, mesh: planetMesh, data, angle: initialAngle };
    });
  }

  // Glowing Orbital Spline Ring
  createOrbitPath(radius) {
    if (radius <= 0) return;
    const segments = 128;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array((segments + 1) * 3);

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });

    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
    this.orbitLines.push(line);
  }

  // Asteroid Belt between Mars (68) and Jupiter (98) -> ~78 to ~88 radius
  buildAsteroidBelt() {
    this.asteroidGroup = new THREE.Group();
    const count = 3200;
    const geometry = new THREE.DodecahedronGeometry(0.3, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.9,
      metalness: 0.1
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const radius = 76 + Math.random() * 16;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 5.0;
      const scale = 0.4 + Math.random() * 1.2;

      dummy.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    this.asteroidGroup.add(instancedMesh);
    this.scene.add(this.asteroidGroup);
  }

  // Kuiper Belt beyond Neptune (~200 to ~250 radius)
  buildKuiperBelt() {
    this.kuiperGroup = new THREE.Group();
    const count = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 205 + Math.random() * 45;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 12.0;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = yOffset;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Icy bluish-gray particles
      colors[i * 3] = 0.7;
      colors[i * 3 + 1] = 0.85;
      colors[i * 3 + 2] = 0.95;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    this.kuiperGroup.add(points);
    this.scene.add(this.kuiperGroup);
  }

  // Raycasting for planet & sun clicks
  onPointerDown(event) {
    this.pointerDownPos = { x: event.clientX, y: event.clientY };
    this.pointerDownTime = performance.now();
  }

  onPointerUp(event) {
    if (!this.pointerDownPos) return;

    // Distinguish click from camera orbit drag (must be < 6px movement and < 600ms press)
    const dist = Math.hypot(event.clientX - this.pointerDownPos.x, event.clientY - this.pointerDownPos.y);
    const duration = performance.now() - this.pointerDownTime;
    if (dist > 6 || duration > 600) {
      return;
    }

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const hitObjects = [];
    Object.values(this.planets).forEach(p => {
      if (p.mesh) hitObjects.push(p.mesh);
    });

    const intersects = this.raycaster.intersectObjects(hitObjects, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const planetData = hit.object.userData;
      if (planetData && planetData.id && this.onPlanetSelected) {
        this.onPlanetSelected(planetData.id);
      }
    }
  }

  onPointerMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const hitObjects = [];
    Object.values(this.planets).forEach(p => {
      if (p.mesh) hitObjects.push(p.mesh);
    });

    const intersects = this.raycaster.intersectObjects(hitObjects, false);
    if (intersects.length > 0) {
      this.renderer.domElement.style.cursor = 'pointer';
    } else {
      this.renderer.domElement.style.cursor = 'default';
    }
  }

  // Scale Mode Toggle (Visual vs True Scale)
  setScaleMode(mode) {
    this.scaleMode = mode;
    // In visual mode: balanced sizes and distances for navigation
    // In true mode: scale planets down proportionally and distance outwards
    Object.keys(this.planets).forEach(id => {
      const p = this.planets[id];
      if (id === 'sun') return;
      if (mode === 'true') {
        const ratio = p.data.metrics.radius_earth_ratio || 1.0;
        p.mesh.scale.setScalar(Math.max(0.2, ratio * 0.4));
      } else {
        p.mesh.scale.setScalar(1.0);
      }
    });
  }

  // Visibility Toggles
  toggleOrbits(visible) {
    this.showOrbits = visible;
    this.orbitLines.forEach(line => line.visible = visible);
  }

  toggleAsteroids(visible) {
    this.showAsteroids = visible;
    if (this.asteroidGroup) this.asteroidGroup.visible = visible;
    if (this.kuiperGroup) this.kuiperGroup.visible = visible;
  }

  setTimeScale(scale) {
    this.timeScale = scale;
  }

  setPlayPause(play) {
    this.isPlaying = play;
  }

  // Get current world position of any celestial body
  getBodyWorldPosition(id) {
    if (id === 'sun') return new THREE.Vector3(0, 0, 0);
    const p = this.planets[id];
    if (!p) return new THREE.Vector3(0, 0, 0);

    const worldPos = new THREE.Vector3();
    p.group.getWorldPosition(worldPos);
    return worldPos;
  }

  onWindowResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // Animation Frame
  animate() {
    requestAnimationFrame(() => this.animate());

    // Update TWEEN animations (for camera flight & transitions)
    if (window.TWEEN) {
      window.TWEEN.update();
    }

    const delta = 0.016;

    if (this.isPlaying) {
      const step = delta * this.timeScale;
      this.simTime += step;

      // Rotate the Sun
      if (this.sunMesh) {
        this.sunMesh.rotation.y += 0.002 * this.timeScale;
      }
      if (this.sunGlow) {
        this.sunGlow.rotation.y -= 0.001 * this.timeScale;
      }

      // Rotate and orbit all planets
      Object.keys(this.planets).forEach(id => {
        if (id === 'sun') return;
        const p = this.planets[id];
        const vis = p.data.visual;

        // Axial spin
        p.mesh.rotation.y += (vis.rotationSpeed || 0.01) * this.timeScale;

        // Earth clouds spin
        if (id === 'earth' && this.earthClouds) {
          this.earthClouds.rotation.y += 0.018 * this.timeScale;
        }

        // Moon orbits Earth
        if (id === 'moon') {
          const earth = this.planets['earth'];
          if (earth) {
            p.angle += (vis.orbitSpeed || 0.05) * this.timeScale;
            const earthPos = earth.group.position;
            p.group.position.set(
              earthPos.x + Math.cos(p.angle) * vis.distance,
              earthPos.y + Math.sin(p.angle * 0.5) * 1.2,
              earthPos.z + Math.sin(p.angle) * vis.distance
            );
          }
          return;
        }

        // Planetary orbit around the Sun
        p.angle += (vis.orbitSpeed || 0.01) * this.timeScale;
        p.group.position.x = Math.cos(p.angle) * vis.distance;
        p.group.position.z = Math.sin(p.angle) * vis.distance;
      });

      // Slowly rotate Asteroid Belt and Kuiper Belt
      if (this.asteroidGroup) {
        this.asteroidGroup.rotation.y += 0.0015 * this.timeScale;
      }
      if (this.kuiperGroup) {
        this.kuiperGroup.rotation.y += 0.0005 * this.timeScale;
      }
    }

    // Continuously follow the active planet or sun in its real-time orbit
    if (this.flightSystem && typeof this.flightSystem.updateTracking === 'function') {
      this.flightSystem.updateTracking();
    }

    // Update orbit controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);
  }
}
