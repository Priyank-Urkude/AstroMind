# AstroMind — Your AI Space Explorer 🚀

AstroMind is an interactive 3D WebGL solar system explorer and AI learning platform designed to make astronomy, planetary science, and cosmology visually captivating and deeply educational.

![AstroMind Banner](https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

### 1. 🪐 High-Fidelity 3D Solar System (Three.js)
- **Central Star (The Sun):** Dynamic animated thermonuclear plasma texture, glowing corona aura, dynamic PointLight illuminating planets with day/night terminators.
- **Major Celestial Bodies:** Mercury, Venus, Earth (with rotating clouds & Moon), Mars, Jupiter (with Great Red Spot), Saturn (with double-sided rings & Cassini division), Uranus (with axial tilt of 97.8°), Neptune (with supersonic storm spots), and Pluto (with Sputnik Planitia heart).
- **Deep Space Environment:** 10,000 spectral stars (O, B, A, F, G, K, M types), cosmic nebulae dust clouds, an asteroid belt with 3,200+ rotating rocky bodies, and outer Kuiper Belt icy particles.
- **Keplerian Orbital Motion:** Realistic relative orbital velocities, real-time axial rotation, and toggleable glowing orbital tracks.
- **Simulation Time Controls:** Play/Pause, 0.1x to 10.0x time dilation slider, and camera overview reset.
- **Dual Scale Modes:**
  - *Visual Scale:* Harmonized logarithmic radii and orbital spacing for smooth navigation.
  - *True Scale:* Proportional true relative sizes showing astronomical scale.

### 2. ⚡ Interplanetary Warp Navigation & Flight HUD
- **Cinematic Hyperspace Warp:** Click any celestial body or dock card to trigger an automated camera warp with velocity streaks and procedural warp audio.
- **Telemetry Readouts:** Displays origin $\rightarrow$ destination, transit distance in Millions of km and Astronomical Units (AU), light-time propagation delay, and warp factor progress.

### 3. 🔬 Comprehensive Celestial Dossier
- **Physical & Orbital Metrics:** Diameter, mass, surface gravity, day length, orbital period, temperature range, and confirmed moon count.
- **Atmospheric Composition Bar Charts:** Interactive gas percentages and color-coded breakdowns.
- **Physiological Survival Simulator:** Real-time survival prognosis without a spacesuit (e.g. vacuum depressurization, thermal shock, atmospheric crushing).
- **Internal Anatomy Cross-Section:** Layered cutaway (Core, Mantle, Crust, Atmosphere) with scientific descriptions.
- **Exploration Timeline:** Historical missions (Mariner, Viking, Apollo, Voyager, Cassini, New Horizons, JWST, Artemis).
- **Interactive Calculators:**
  - *Your Weight on This Planet:* Computes mass under local surface gravity.
  - *Your Age on This Planet:* Computes age in local planetary years.

### 4. 🤖 AstroMind AI Companion ("NOVA")
- **Space Explainer:** Answers inquiries about planetary geology, black holes, light-time, solar flares, terraforming, and relativity.
- **Context-Aware Intelligence:** Automatically detects the currently orbited planet and primes contextual follow-up prompts.
- **Dual Engine Architecture:**
  - *AstroMind Offline Neural Knowledge Engine:* 100% offline astrophysics database with zero latency.
  - *Live Google Gemini LLM Mode:* Option to enter a personal Gemini API key in Settings for open-ended AI conversation.
- **Voice HUD (Text-to-Speech):** Web Speech API integration reads AI explanations out loud in a futuristic computer assistant voice.

### 5. 🎓 AI Quiz Lab & Gamified Ranks
- **Adaptive Difficulty:** Stargazer (Novice), Cosmonaut (Intermediate), and Astrophysicist (Expert).
- **Instant Educational Feedback:** Explains the scientific reasoning behind every answer.
- **Progression System:** Earn XP, build question streaks, and climb ranks from *Orbital Cadet* to *Galactic Mastermind*.
- **Unlockable Badges:** Achievements for streaks, first answers, and expert mastery.

### 6. 🧭 Guided Interplanetary Tours
- **The Grand Planetary Odyssey:** Sun $\rightarrow$ Mercury $\rightarrow$ Earth $\rightarrow$ Mars $\rightarrow$ Jupiter $\rightarrow$ Saturn.
- **The Search for Alien Oceans:** Earth $\rightarrow$ Europa $\rightarrow$ Enceladus / Titan.
- **Rocky World Geological Wonders:** Mercury $\rightarrow$ Venus $\rightarrow$ Earth $\rightarrow$ Mars.
- Includes automatic camera choreography and narrative voiceovers.

### 7. ⚖️ Planet Comparison Matrix
- Side-by-side comparison of any two celestial bodies with comparative difference bars for gravity, temperature, radius, and distance.

### 8. 🔊 Web Audio Procedural Synthesizer
- Zero audio file downloads required: uses the HTML5 Web Audio API to procedurally generate warp drive whooshes, ambient cosmic hum, click chimes, and quiz victory chords.

---

## 🛠️ Project Structure

```
AstroMind/
├── server.py              # Flask server (API endpoints & static file serving)
├── requirements.txt       # Dependencies (flask, requests)
├── run.bat                # 1-Click Windows execution script
├── static/
│   ├── index.html         # Main application interface
│   ├── css/
│   │   ├── style.css      # Glassmorphic sci-fi UI styling
│   │   └── hud.css        # Flight HUD & telemetry overlay
│   └── js/
│       ├── libs/          # Offline Three.js, OrbitControls, Tween.js
│       ├── data.js        # Celestial database, quiz bank, tour scripts
│       ├── audio.js       # Web Audio API sound synthesizer
│       ├── solarSystem.js # Three.js 3D solar system engine
│       ├── cameraFlight.js# Warp navigation & camera flight system
│       ├── aiEngine.js    # AstroMind AI companion (NOVA)
│       ├── quizEngine.js  # Dynamic quiz generator & rank engine
│       ├── tours.js       # Guided cosmic tour director
│       └── app.js         # Main UI controller & event binder
└── README.md              # Project documentation
```

---

## 🚀 How to Run

1. **Quick Start (Windows):**
   Double-click `run.bat` or run:
   ```powershell
   python server.py
   ```
2. **Open in Browser:**
   Navigate to:
   ```
   http://localhost:5000
   ```

3. **Offline Capability:**
   All 3D libraries (`Three.js`, `OrbitControls`, `Tween.js`) and audio synthesizers are packaged locally. AstroMind runs without an active internet connection.
