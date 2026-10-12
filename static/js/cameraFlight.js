/**
 * AstroMind Cinematic Camera Flight & Warp Navigation System
 * Handles smooth spline transitions, hyperspace warp streak VFX,
 * flight telemetry HUD, and continuous real-time orbital body tracking.
 */

class CameraFlightSystem {
  constructor(solarApp) {
    this.app = solarApp;
    this.isFlying = false;
    this.currentTrackedId = null;
    this.lastTrackedPosition = null;
    this.originId = 'earth';
    this.targetId = null;
    this.warpParticles = null;
    this.activeTween = null;

    this.hudElement = document.getElementById('flight-hud');
    this.originLabel = document.getElementById('hud-origin');
    this.targetLabel = document.getElementById('hud-target');
    this.distanceLabel = document.getElementById('hud-distance');
    this.lightTimeLabel = document.getElementById('hud-light-time');
    this.progressBar = document.getElementById('hud-progress-fill');
    this.warpFactorLabel = document.getElementById('hud-warp-factor');

    this.onFlightComplete = null;
    this.buildWarpVFX();
  }

  // 3D Warp Streaks Geometry
  buildWarpVFX() {
    const streakCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(streakCount * 3);
    const colors = new Float32Array(streakCount * 3);

    for (let i = 0; i < streakCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150;

      // Cyan to blue-white warp streaks
      colors[i * 3] = 0.2 + Math.random() * 0.5;
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 2] = 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    this.warpParticles = new THREE.Points(geometry, material);
    this.app.scene.add(this.warpParticles);
  }

  // Fly to target celestial body and follow it continuously
  flyTo(destinationId, durationMs = 2400) {
    const data = CELESTIAL_DATA[destinationId];
    if (!data) return;

    // Stop any existing tween
    if (this.activeTween) {
      this.activeTween.stop();
      this.activeTween = null;
    }

    this.originId = this.currentTrackedId || 'sun';
    this.targetId = destinationId;
    this.isFlying = true;
    this.currentTrackedId = destinationId;

    // Play warp sound
    if (window.astroAudio) {
      window.astroAudio.playWarpStart();
    }

    // Show HUD Telemetry
    this.showFlightHUD(this.originId, destinationId);

    // Fade in warp particle streaks
    if (this.warpParticles) {
      this.warpParticles.material.opacity = 0.9;
    }

    const vis = data.visual;
    const bodyRadius = vis.radius || 2.5;

    // Calculate ideal orbital viewing distance based on body size
    let cameraOffsetDistance = bodyRadius * 3.4 + 4.0;
    if (destinationId === 'sun') cameraOffsetDistance = 45.0;
    if (destinationId === 'saturn') cameraOffsetDistance = 35.0; // Extra room for rings
    if (destinationId === 'uranus') cameraOffsetDistance = 18.0;

    const startPos = this.app.camera.position.clone();
    const startTarget = this.app.controls.target.clone();

    // Relative offset vector from planet center
    const relativeOffset = new THREE.Vector3(
      cameraOffsetDistance * 0.7,
      cameraOffsetDistance * 0.45,
      cameraOffsetDistance * 0.85
    );

    const progress = { t: 0 };

    // Dynamic real-time interception tween:
    // Tracks the planet's world coordinates as it orbits during the flight!
    this.activeTween = new TWEEN.Tween(progress)
      .to({ t: 1 }, durationMs)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => {
        // Read current real-time world position of destination
        const currentTargetPos = this.app.getBodyWorldPosition(destinationId);
        const currentEndCam = currentTargetPos.clone().add(relativeOffset);

        this.app.camera.position.lerpVectors(startPos, currentEndCam, progress.t);
        this.app.controls.target.lerpVectors(startTarget, currentTargetPos, progress.t);

        // Warp particles follow camera
        if (this.warpParticles) {
          this.warpParticles.position.copy(this.app.camera.position);
          this.warpParticles.rotation.y += 0.08;
        }
      })
      .onComplete(() => {
        this.activeTween = null;
        this.lastTrackedPosition = this.app.getBodyWorldPosition(destinationId).clone();
        this.onArrival(destinationId);
      });

    this.activeTween.start();

    // Animate progress bar in HUD
    this.animateHUDProgress(durationMs);
  }

  // Called on each animation frame by SolarSystemApp to smoothly follow the body around its orbit
  updateTracking() {
    if (!this.currentTrackedId || this.isFlying) return;

    const currentPos = this.app.getBodyWorldPosition(this.currentTrackedId);
    if (!currentPos) return;

    if (this.lastTrackedPosition) {
      // Calculate how much the planet moved along its orbit since last frame
      const delta = currentPos.clone().sub(this.lastTrackedPosition);

      // Translate camera and controls target by the exact same delta
      // This locks the planet in the center of the screen while preserving
      // whatever rotation angle and zoom distance the user set with their mouse!
      this.app.camera.position.add(delta);
      this.app.controls.target.add(delta);
    }

    this.lastTrackedPosition = currentPos.clone();
  }

  showFlightHUD(originId, destinationId) {
    if (!this.hudElement) return;

    const originData = CELESTIAL_DATA[originId] || { name: 'Deep Space' };
    const destData = CELESTIAL_DATA[destinationId] || { name: 'Unknown' };

    if (this.originLabel) this.originLabel.textContent = originData.name.toUpperCase();
    if (this.targetLabel) this.targetLabel.textContent = destData.name.toUpperCase();

    // Calculate astronomical distance in millions of km
    const distSunOrigin = originData.metrics ? originData.metrics.distance_from_sun_mkm : 0;
    const distSunDest = destData.metrics ? destData.metrics.distance_from_sun_mkm : 0;
    const approxDist = Math.abs(distSunDest - distSunOrigin);
    const approxAU = (approxDist / 149.6).toFixed(2);

    if (this.distanceLabel) {
      this.distanceLabel.textContent = approxDist > 0 
        ? `${approxDist.toLocaleString()} M km (~${approxAU} AU)` 
        : `Orbiting ${destData.name}`;
    }

    // Light time calculation
    const lightSeconds = (approxDist * 1000000) / 300000;
    let lightTimeStr = "";
    if (lightSeconds < 60) {
      lightTimeStr = `${Math.round(lightSeconds)} seconds`;
    } else if (lightSeconds < 3600) {
      lightTimeStr = `${(lightSeconds / 60).toFixed(1)} minutes`;
    } else {
      lightTimeStr = `${(lightSeconds / 3600).toFixed(1)} hours`;
    }

    if (this.lightTimeLabel) {
      this.lightTimeLabel.textContent = lightTimeStr || "< 1s";
    }

    if (this.warpFactorLabel) {
      this.warpFactorLabel.textContent = `WARP ${ (2.5 + Math.random() * 5).toFixed(1) }`;
    }

    this.hudElement.classList.add('active');
  }

  animateHUDProgress(durationMs) {
    if (!this.progressBar) return;
    this.progressBar.style.width = '0%';
    const startTime = performance.now();

    const updateBar = () => {
      if (!this.isFlying) return;
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      this.progressBar.style.width = `${pct}%`;

      if (elapsed < durationMs) {
        requestAnimationFrame(updateBar);
      }
    };
    requestAnimationFrame(updateBar);
  }

  onArrival(destinationId) {
    this.isFlying = false;
    this.currentTrackedId = destinationId;
    this.lastTrackedPosition = this.app.getBodyWorldPosition(destinationId).clone();

    // Arrival deceleration audio
    if (window.astroAudio) {
      window.astroAudio.playWarpArrival();
    }

    // Fade out warp streaks
    if (this.warpParticles) {
      new TWEEN.Tween(this.warpParticles.material)
        .to({ opacity: 0.0 }, 600)
        .start();
    }

    // Hide HUD after brief arrival confirmation
    setTimeout(() => {
      if (this.hudElement) {
        this.hudElement.classList.remove('active');
      }
    }, 800);

    // Notify listener (updates planet info card & AI chat)
    if (this.onFlightComplete) {
      this.onFlightComplete(destinationId);
    }
  }

  // Smoothly reset view to overall Solar System overview and unlock camera
  viewOverview() {
    if (this.activeTween) {
      this.activeTween.stop();
      this.activeTween = null;
    }

    this.isFlying = false;
    this.currentTrackedId = null;
    this.lastTrackedPosition = null;
    this.targetId = null;

    new TWEEN.Tween(this.app.camera.position)
      .to({ x: 0, y: 180, z: 260 }, 1800)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();

    new TWEEN.Tween(this.app.controls.target)
      .to({ x: 0, y: 0, z: 0 }, 1800)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();
  }
}
