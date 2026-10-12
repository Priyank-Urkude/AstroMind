/**
 * AstroMind Main Application Controller
 * Coordinates Three.js 3D viewport, dossier drawers, AI chat,
 * quiz interactions, guided tours, and comparison matrices.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Subsystems
  const solarApp = new SolarSystemApp('canvas-container');
  const flightSystem = new CameraFlightSystem(solarApp);
  solarApp.flightSystem = flightSystem; // Link flightSystem to solarApp animation loop
  const aiEngine = new AstroMindAIEngine();
  const quizEngine = new QuizEngine();
  const tourDirector = new TourDirector(flightSystem, aiEngine);

  // Active state
  let currentSelectedId = 'earth';

  // 2. Wire Up Planet Selection
  solarApp.onPlanetSelected = (planetId) => {
    selectCelestialBody(planetId);
  };

  flightSystem.onFlightComplete = (planetId) => {
    updateDossierUI(planetId);
    aiEngine.setPlanetContext(planetId);
    updateAIContextPill(planetId);
  };

  // Function to select, warp to, and follow a celestial body in orbit
  function selectCelestialBody(id) {
    if (!CELESTIAL_DATA[id]) return;
    currentSelectedId = id;
    if (window.astroAudio) window.astroAudio.playClick();

    // Highlight dock card
    document.querySelectorAll('.dock-card').forEach(card => {
      card.classList.toggle('active', card.dataset.id === id);
    });

    // Update Follow Target button in top bar
    const followLabel = document.getElementById('camera-target-label');
    const followBtn = document.getElementById('btn-camera-target');
    if (followLabel) followLabel.textContent = `Follow: ${CELESTIAL_DATA[id].name}`;
    if (followBtn) followBtn.classList.add('active');

    // Fly camera and lock continuous follow tracking
    flightSystem.flyTo(id);

    // Open/Update dossier
    updateDossierUI(id);
    aiEngine.setPlanetContext(id);
    updateAIContextPill(id);

    // Ensure left dossier drawer is open
    const dossierPanel = document.getElementById('dossier-panel');
    if (dossierPanel) dossierPanel.classList.remove('collapsed');
  }

  // 3. Render Bottom Dock Cards
  const dockContainer = document.getElementById('dock-cards');
  if (dockContainer) {
    Object.keys(CELESTIAL_DATA).forEach(id => {
      const data = CELESTIAL_DATA[id];
      const card = document.createElement('button');
      card.className = `dock-card ${id === currentSelectedId ? 'active' : ''}`;
      card.dataset.id = id;

      const iconMap = {
        sun: 'fa-sun text-amber-400',
        mercury: 'fa-circle text-gray-400',
        venus: 'fa-circle text-yellow-500',
        earth: 'fa-earth-americas text-blue-400',
        moon: 'fa-moon text-gray-300',
        mars: 'fa-circle text-red-500',
        jupiter: 'fa-circle text-amber-600',
        saturn: 'fa-ring text-yellow-300',
        uranus: 'fa-circle text-cyan-300',
        neptune: 'fa-circle text-blue-500',
        pluto: 'fa-circle text-amber-700'
      };

      const iconClass = iconMap[id] || 'fa-circle';

      card.innerHTML = `
        <div class="dock-card-icon"><i class="fa-solid ${iconClass}"></i></div>
        <div class="dock-card-info">
          <span class="dock-card-name">${data.name}</span>
          <span class="dock-card-type">${data.category.split(' ')[0]}</span>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        if (window.astroAudio) window.astroAudio.playHover();
      });

      card.addEventListener('click', () => {
        selectCelestialBody(id);
      });

      dockContainer.appendChild(card);
    });
  }

  // 4. Update Celestial Body Dossier UI
  function updateDossierUI(id) {
    const data = CELESTIAL_DATA[id];
    if (!data) return;

    // Header
    const nameEl = document.getElementById('dossier-name');
    const latinEl = document.getElementById('dossier-latin');
    const catEl = document.getElementById('dossier-category');
    const tagEl = document.getElementById('dossier-tagline');
    const overviewEl = document.getElementById('dossier-overview');

    if (nameEl) nameEl.textContent = data.name;
    if (latinEl) latinEl.textContent = data.latinName ? `(${data.latinName})` : '';
    if (catEl) catEl.textContent = data.category;
    if (tagEl) tagEl.textContent = data.tagline;
    if (overviewEl) overviewEl.textContent = data.overview;

    // Key metrics grid
    const m = data.metrics;
    document.getElementById('metric-radius').textContent = `${m.radius_km.toLocaleString()} km`;
    document.getElementById('metric-gravity').textContent = `${m.surface_gravity} m/s² (${m.gravity_earth_ratio || 1}x)`;
    document.getElementById('metric-temp').textContent = `${m.avg_temp_c}°C`;
    document.getElementById('metric-orbit').textContent = m.orbital_period;
    document.getElementById('metric-rotation').textContent = m.rotation_period;
    document.getElementById('metric-moons').textContent = m.moons_count;

    // Atmospheric Composition Bars
    const atmoContainer = document.getElementById('atmo-bars');
    if (atmoContainer) {
      atmoContainer.innerHTML = '';
      data.atmosphere.forEach(gas => {
        const row = document.createElement('div');
        row.className = 'atmo-row';
        row.innerHTML = `
          <div class="atmo-header">
            <span>${gas.gas}</span>
            <span class="font-mono text-cyan-400">${gas.percent}%</span>
          </div>
          <div class="atmo-track">
            <div class="atmo-fill" style="width: ${gas.percent}%; background-color: ${gas.color}"></div>
          </div>
        `;
        atmoContainer.appendChild(row);
      });
    }

    // Physiological Survival Simulation Box
    const survivalBox = document.getElementById('survival-box');
    if (survivalBox) {
      survivalBox.innerHTML = `
        <div class="survival-status">
          <span class="survival-time">${data.survival.time}</span>
          <span class="survival-tag">${data.survival.rating}</span>
        </div>
        <p class="survival-desc">${data.survival.verdict}</p>
      `;
    }

    // Internal Structure Cross-Section
    const structContainer = document.getElementById('structure-layers');
    if (structContainer) {
      structContainer.innerHTML = '';
      data.structure.forEach((l, idx) => {
        const item = document.createElement('div');
        item.className = 'layer-card';
        item.innerHTML = `
          <div class="layer-indicator" style="background-color: ${l.color}"></div>
          <div class="layer-content">
            <div class="layer-title font-mono">${l.layer} <span class="layer-depth text-xs text-gray-400">(${l.thickness})</span></div>
            <div class="layer-desc text-xs text-gray-300 mt-1">${l.desc}</div>
          </div>
        `;
        structContainer.appendChild(item);
      });
    }

    // Historical Missions Timeline
    const missionContainer = document.getElementById('missions-timeline');
    if (missionContainer) {
      missionContainer.innerHTML = '';
      data.missions.forEach(m => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-year font-mono">${m.year}</span>
              <span class="timeline-name font-semibold text-cyan-400">${m.name}</span>
              <span class="timeline-agency text-xs text-gray-400">(${m.agency})</span>
            </div>
            <p class="timeline-milestone text-xs text-gray-300 mt-1">${m.milestone}</p>
          </div>
        `;
        missionContainer.appendChild(item);
      });
    }

    // Fun facts
    const factsList = document.getElementById('fun-facts-list');
    if (factsList) {
      factsList.innerHTML = '';
      data.funFacts.forEach(fact => {
        const li = document.createElement('li');
        li.className = 'fun-fact-item';
        li.innerHTML = `<i class="fa-solid fa-sparkles text-amber-400 mr-2"></i> ${fact}`;
        factsList.appendChild(li);
      });
    }

    // Recalculate Weight & Age live
    calcWeight(data);
    calcAge(data);
  }

  // Interactive Calculators
  function calcWeight(data) {
    const input = document.getElementById('input-earth-weight');
    const result = document.getElementById('output-calc-weight');
    if (!input || !result || !data) return;

    const val = parseFloat(input.value) || 70;
    const ratio = data.metrics.gravity_earth_ratio || (data.metrics.surface_gravity / 9.807);
    const converted = (val * ratio).toFixed(1);
    result.textContent = `${converted} kg (${(ratio).toFixed(2)}x Earth)`;
  }

  function calcAge(data) {
    const input = document.getElementById('input-earth-age');
    const result = document.getElementById('output-calc-age');
    if (!input || !result || !data) return;

    const earthAge = parseFloat(input.value) || 25;
    let localAge = earthAge;

    if (data.id === 'mercury') localAge = (earthAge * 365.25 / 88).toFixed(1);
    else if (data.id === 'venus') localAge = (earthAge * 365.25 / 224.7).toFixed(1);
    else if (data.id === 'earth') localAge = earthAge.toFixed(1);
    else if (data.id === 'mars') localAge = (earthAge * 365.25 / 687).toFixed(1);
    else if (data.id === 'jupiter') localAge = (earthAge / 11.86).toFixed(2);
    else if (data.id === 'saturn') localAge = (earthAge / 29.45).toFixed(2);
    else if (data.id === 'uranus') localAge = (earthAge / 84.0).toFixed(2);
    else if (data.id === 'neptune') localAge = (earthAge / 164.8).toFixed(2);
    else if (data.id === 'pluto') localAge = (earthAge / 248.0).toFixed(2);

    result.textContent = `${localAge} ${data.name} years old`;
  }

  const weightInput = document.getElementById('input-earth-weight');
  if (weightInput) {
    weightInput.addEventListener('input', () => {
      calcWeight(CELESTIAL_DATA[currentSelectedId]);
    });
  }

  const ageInput = document.getElementById('input-earth-age');
  if (ageInput) {
    ageInput.addEventListener('input', () => {
      calcAge(CELESTIAL_DATA[currentSelectedId]);
    });
  }

  // Dossier Internal Tabs (Specs, Atmosphere, Structure, Missions, Tools)
  document.querySelectorAll('.dossier-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.astroAudio) window.astroAudio.playClick();
      const targetTab = btn.dataset.tab;

      document.querySelectorAll('.dossier-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.dossier-tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = document.getElementById(`tab-${targetTab}`);
      if (content) content.classList.add('active');
    });
  });

  // Panel Hide & Show Controls
  const dossierPanel = document.getElementById('dossier-panel');
  const commandPanel = document.getElementById('command-panel');
  const floatingDossierBtn = document.getElementById('btn-open-dossier-floating');
  const floatingCommandBtn = document.getElementById('btn-open-command-floating');
  const navCommandBtn = document.getElementById('btn-toggle-command-nav');

  function toggleDossier(show) {
    if (!dossierPanel) return;
    const isCurrentlyCollapsed = dossierPanel.classList.contains('collapsed');
    const targetState = (show !== undefined) ? show : isCurrentlyCollapsed;

    dossierPanel.classList.toggle('collapsed', !targetState);
    if (floatingDossierBtn) {
      floatingDossierBtn.classList.toggle('visible', !targetState);
    }
  }

  function toggleCommandPanel(show) {
    if (!commandPanel) return;
    const isCurrentlyCollapsed = commandPanel.classList.contains('collapsed');
    const targetState = (show !== undefined) ? show : isCurrentlyCollapsed;

    commandPanel.classList.toggle('collapsed', !targetState);
    if (floatingCommandBtn) {
      floatingCommandBtn.classList.toggle('visible', !targetState);
    }
    if (navCommandBtn) {
      navCommandBtn.classList.toggle('active', targetState);
    }
    if (window.astroAudio) window.astroAudio.playClick();
  }

  // Left Dossier Collapse / Open Buttons
  const btnCollapseDossier = document.getElementById('btn-collapse-dossier');
  if (btnCollapseDossier) {
    btnCollapseDossier.addEventListener('click', () => {
      toggleDossier(false);
      if (window.astroAudio) window.astroAudio.playClick();
    });
  }
  if (floatingDossierBtn) {
    floatingDossierBtn.addEventListener('click', () => {
      toggleDossier(true);
      if (window.astroAudio) window.astroAudio.playClick();
    });
  }

  // Right Command Center (AI, Quiz, Tours, Compare) Hide & Show Buttons
  const btnCollapseCommand = document.getElementById('btn-collapse-command');
  if (btnCollapseCommand) {
    btnCollapseCommand.addEventListener('click', () => {
      toggleCommandPanel(false);
    });
  }
  if (floatingCommandBtn) {
    floatingCommandBtn.addEventListener('click', () => {
      toggleCommandPanel(true);
    });
  }
  if (navCommandBtn) {
    navCommandBtn.addEventListener('click', () => {
      toggleCommandPanel();
    });
  }

  // 5. Right Panel Tabs (AI Chat, Quiz, Tours, Compare)
  document.querySelectorAll('.right-nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (window.astroAudio) window.astroAudio.playClick();
      const targetId = tab.dataset.target;

      document.querySelectorAll('.right-nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.right-tab-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
    });
  });

  // 6. AstroMind AI Chat Assistant UI
  const chatMessagesContainer = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnChatSend = document.getElementById('btn-chat-send');
  const contextPill = document.getElementById('ai-current-context');
  const suggestedChipsContainer = document.getElementById('ai-prompt-chips');
  const btnTtsToggle = document.getElementById('btn-tts-toggle');

  function updateAIContextPill(id) {
    const data = CELESTIAL_DATA[id] || { name: 'Deep Space' };
    if (contextPill) {
      contextPill.innerHTML = `<i class="fa-solid fa-location-crosshairs text-cyan-400 mr-1.5"></i> Orbiting ${data.name}`;
    }
    renderSuggestedChips(data.starterPrompts || []);
  }

  function renderSuggestedChips(prompts) {
    if (!suggestedChipsContainer) return;
    suggestedChipsContainer.innerHTML = '';
    prompts.forEach(p => {
      const chip = document.createElement('button');
      chip.className = 'prompt-chip';
      chip.textContent = p;
      chip.addEventListener('click', () => {
        chatInput.value = p;
        handleSendMessage();
      });
      suggestedChipsContainer.appendChild(chip);
    });
  }

  async function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    if (window.astroAudio) window.astroAudio.playClick();

    // Append User Message
    appendChatMessage('user', text);
    chatInput.value = '';

    // Show AI typing indicator
    const typingId = appendTypingIndicator();

    // Call AI Engine
    try {
      const aiResponse = await aiEngine.askQuestion(text);
      removeTypingIndicator(typingId);

      if (aiResponse) {
        appendChatMessage('assistant', aiResponse.text, aiResponse.source);
        if (aiResponse.suggestedPrompts && aiResponse.suggestedPrompts.length > 0) {
          renderSuggestedChips(aiResponse.suggestedPrompts);
        }
      }
    } catch (e) {
      removeTypingIndicator(typingId);
      appendChatMessage('assistant', "⚠️ Celestial communications glitch. Please ask again.");
    }
  }

  function appendChatMessage(role, text, source = null) {
    if (!chatMessagesContainer) return;
    const msg = document.createElement('div');
    msg.className = `chat-bubble ${role}`;

    let badge = '';
    if (role === 'assistant') {
      badge = `<div class="chat-sender-badge">
        <i class="fa-solid fa-robot text-cyan-400 mr-1"></i> NOVA AI 
        <span class="source-tag text-xs font-mono ml-2">${source === 'gemini-live' ? '⚡ LIVE GEMINI' : '🧠 OFFLINE NEURAL'}</span>
      </div>`;
    }

    // Convert markdown into simple HTML
    const formattedHtml = formatMarkdown(text);
    msg.innerHTML = `${badge}<div class="chat-bubble-content">${formattedHtml}</div>`;
    chatMessagesContainer.appendChild(msg);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  function formatMarkdown(text) {
    return text
      .replace(/### (.*?)\n/g, '<h4 class="font-bold text-cyan-300 mt-2 mb-1">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\* (.*?)$/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n\n/g, '<p class="mt-2"></p>')
      .replace(/\n/g, '<br>');
  }

  function appendTypingIndicator() {
    const id = 'typing-' + Date.now();
    const ind = document.createElement('div');
    ind.id = id;
    ind.className = 'chat-bubble assistant typing';
    ind.innerHTML = `
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    chatMessagesContainer.appendChild(ind);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  if (btnChatSend) {
    btnChatSend.addEventListener('click', handleSendMessage);
  }
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSendMessage();
    });
  }

  // TTS Toggle
  if (btnTtsToggle) {
    btnTtsToggle.addEventListener('click', () => {
      const enabled = aiEngine.toggleVoice();
      btnTtsToggle.classList.toggle('active', enabled);
      btnTtsToggle.title = enabled ? "Voice Synthesis: ON" : "Voice Synthesis: OFF";
    });
  }

  // Initial welcome message from AI
  appendChatMessage('assistant', "Greetings, Commander. I am **NOVA**, your AstroMind orbital flight intelligence. Select any celestial body to warp into orbit, or ask me anything regarding astrophysics, celestial mechanics, and deep space exploration.");

  // 7. Dynamic AI Quiz Generator UI
  const quizDiffSelect = document.getElementById('quiz-difficulty-select');
  const quizQuestionEl = document.getElementById('quiz-question-text');
  const quizCategoryEl = document.getElementById('quiz-category-tag');
  const quizDiffBadge = document.getElementById('quiz-difficulty-tag');
  const quizOptionsContainer = document.getElementById('quiz-options');
  const quizExplanationBox = document.getElementById('quiz-explanation');
  const btnNextQuestion = document.getElementById('btn-quiz-next');

  // Stats badges
  const quizScoreEl = document.getElementById('quiz-xp-val');
  const quizStreakEl = document.getElementById('quiz-streak-val');
  const quizRankTitle = document.getElementById('quiz-rank-name');

  function renderQuizStats() {
    if (quizScoreEl) quizScoreEl.textContent = `${quizEngine.stats.xp} XP`;
    if (quizStreakEl) quizStreakEl.textContent = `${quizEngine.stats.currentStreak} 🔥`;
    if (quizRankTitle) quizRankTitle.textContent = quizEngine.getCurrentRank().name;
  }

  function loadNextQuizQuestion() {
    const q = quizEngine.generateQuestion(currentSelectedId);
    if (!q) return;

    if (quizQuestionEl) quizQuestionEl.textContent = q.question;
    if (quizCategoryEl) quizCategoryEl.textContent = q.category.toUpperCase().replace('_', ' ');
    if (quizDiffBadge) {
      quizDiffBadge.textContent = q.difficulty.toUpperCase();
      quizDiffBadge.className = `badge-diff badge-${q.difficulty}`;
    }

    if (quizExplanationBox) {
      quizExplanationBox.classList.remove('active');
      quizExplanationBox.innerHTML = '';
    }

    if (btnNextQuestion) {
      btnNextQuestion.style.display = 'none';
    }

    // Render options
    if (quizOptionsContainer) {
      quizOptionsContainer.innerHTML = '';
      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        const letters = ['A', 'B', 'C', 'D'];
        btn.innerHTML = `
          <span class="option-letter font-mono font-bold">${letters[idx]}</span>
          <span class="option-text">${optText}</span>
        `;

        btn.addEventListener('mouseenter', () => {
          if (window.astroAudio) window.astroAudio.playHover();
        });

        btn.addEventListener('click', () => {
          handleQuizAnswer(idx, btn);
        });

        quizOptionsContainer.appendChild(btn);
      });
    }
  }

  function handleQuizAnswer(selectedIndex, clickedBtn) {
    const result = quizEngine.submitAnswer(selectedIndex);
    if (!result) return;

    // Disable all options
    const allBtns = quizOptionsContainer.querySelectorAll('.quiz-option-btn');
    allBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === result.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex && !result.isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    // Show Explanation
    if (quizExplanationBox) {
      quizExplanationBox.classList.add('active');
      quizExplanationBox.innerHTML = `
        <div class="explanation-title font-semibold ${result.isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
          ${result.isCorrect ? `✓ Correct! (+${result.xpGained} XP)` : '✗ Incorrect'}
        </div>
        <p class="explanation-text text-sm mt-1 text-gray-300">${result.explanation}</p>
      `;
    }

    // Show Next button
    if (btnNextQuestion) {
      btnNextQuestion.style.display = 'inline-flex';
    }

    renderQuizStats();
  }

  if (btnNextQuestion) {
    btnNextQuestion.addEventListener('click', () => {
      if (window.astroAudio) window.astroAudio.playClick();
      loadNextQuizQuestion();
    });
  }

  if (quizDiffSelect) {
    quizDiffSelect.addEventListener('change', (e) => {
      quizEngine.setDifficulty(e.target.value);
      loadNextQuizQuestion();
    });
  }

  renderQuizStats();
  loadNextQuizQuestion();

  // 8. Guided Cosmic Tours Setup
  const toursListContainer = document.getElementById('tours-list');
  if (toursListContainer) {
    GUIDED_TOURS.forEach(tour => {
      const card = document.createElement('div');
      card.className = 'tour-card';
      card.innerHTML = `
        <div class="tour-card-header">
          <h4 class="font-bold text-cyan-400">${tour.title}</h4>
          <span class="tour-badge text-xs font-mono">${tour.duration}</span>
        </div>
        <p class="tour-card-desc text-xs text-gray-300 mt-2">${tour.description}</p>
        <button class="btn-start-tour mt-3" data-tour-id="${tour.id}">
          <i class="fa-solid fa-play mr-2"></i> Launch Journey
        </button>
      `;

      card.querySelector('.btn-start-tour').addEventListener('click', () => {
        tourDirector.startTour(tour.id);
      });

      toursListContainer.appendChild(card);
    });
  }

  // 9. Planet Comparison Matrix
  const selectComp1 = document.getElementById('select-compare-1');
  const selectComp2 = document.getElementById('select-compare-2');
  const compOutput = document.getElementById('compare-matrix-output');

  function populateCompareDropdowns() {
    if (!selectComp1 || !selectComp2) return;
    selectComp1.innerHTML = '';
    selectComp2.innerHTML = '';

    Object.keys(CELESTIAL_DATA).forEach(id => {
      const opt1 = document.createElement('option');
      opt1.value = id;
      opt1.textContent = CELESTIAL_DATA[id].name;
      if (id === 'earth') opt1.selected = true;

      const opt2 = document.createElement('option');
      opt2.value = id;
      opt2.textContent = CELESTIAL_DATA[id].name;
      if (id === 'mars') opt2.selected = true;

      selectComp1.appendChild(opt1);
      selectComp2.appendChild(opt2);
    });

    renderComparison();
  }

  function renderComparison() {
    if (!compOutput || !selectComp1 || !selectComp2) return;
    const p1 = CELESTIAL_DATA[selectComp1.value];
    const p2 = CELESTIAL_DATA[selectComp2.value];
    if (!p1 || !p2) return;

    const metricsToCompare = [
      { label: "Radius (km)", val1: p1.metrics.radius_km, val2: p2.metrics.radius_km, unit: "km" },
      { label: "Surface Gravity", val1: p1.metrics.surface_gravity, val2: p2.metrics.surface_gravity, unit: "m/s²" },
      { label: "Avg Temp (°C)", val1: p1.metrics.avg_temp_c, val2: p2.metrics.avg_temp_c, unit: "°C" },
      { label: "Distance from Sun", val1: p1.metrics.distance_from_sun_mkm, val2: p2.metrics.distance_from_sun_mkm, unit: "M km" },
      { label: "Moons Count", val1: p1.metrics.moons_count, val2: p2.metrics.moons_count, unit: "" }
    ];

    let rowsHtml = '';
    metricsToCompare.forEach(m => {
      const maxVal = Math.max(Math.abs(m.val1), Math.abs(m.val2)) || 1;
      const bar1Pct = Math.min(100, (Math.abs(m.val1) / maxVal) * 100);
      const bar2Pct = Math.min(100, (Math.abs(m.val2) / maxVal) * 100);

      rowsHtml += `
        <div class="comp-row">
          <div class="comp-label font-mono text-xs text-gray-300">${m.label}</div>
          <div class="comp-comparison-grid">
            <div class="comp-col col-1">
              <span class="font-bold text-cyan-400 font-mono text-xs">${m.val1.toLocaleString()} ${m.unit}</span>
              <div class="comp-bar"><div class="fill bg-cyan-400" style="width: ${bar1Pct}%"></div></div>
            </div>
            <div class="comp-col col-2">
              <span class="font-bold text-amber-400 font-mono text-xs">${m.val2.toLocaleString()} ${m.unit}</span>
              <div class="comp-bar"><div class="fill bg-amber-400" style="width: ${bar2Pct}%"></div></div>
            </div>
          </div>
        </div>
      `;
    });

    compOutput.innerHTML = `
      <div class="comp-header-grid">
        <div class="comp-col-header text-cyan-400 font-bold">${p1.name}</div>
        <div class="comp-col-header text-amber-400 font-bold">${p2.name}</div>
      </div>
      <div class="comp-body-list mt-3">${rowsHtml}</div>
    `;
  }

  if (selectComp1) selectComp1.addEventListener('change', renderComparison);
  if (selectComp2) selectComp2.addEventListener('change', renderComparison);
  populateCompareDropdowns();

  // 10. Top Bar Controls (Simulation, Scale, Audio, Overview, Settings)
  const btnPlayPause = document.getElementById('btn-play-pause');
  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', () => {
      const isPlaying = !solarApp.isPlaying;
      solarApp.setPlayPause(isPlaying);
      btnPlayPause.innerHTML = isPlaying
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';
    });
  }

  const speedSlider = document.getElementById('speed-slider');
  const speedLabel = document.getElementById('speed-label');
  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      solarApp.setTimeScale(val);
      if (speedLabel) speedLabel.textContent = `${val.toFixed(1)}x`;
    });
  }

  const toggleScaleBtn = document.getElementById('btn-toggle-scale');
  if (toggleScaleBtn) {
    toggleScaleBtn.addEventListener('click', () => {
      if (window.astroAudio) window.astroAudio.playClick();
      const newMode = solarApp.scaleMode === 'visual' ? 'true' : 'visual';
      solarApp.setScaleMode(newMode);
      toggleScaleBtn.classList.toggle('active', newMode === 'true');
      toggleScaleBtn.textContent = newMode === 'true' ? "Scale: True" : "Scale: Visual";
    });
  }

  const toggleOrbitsBtn = document.getElementById('btn-toggle-orbits');
  if (toggleOrbitsBtn) {
    toggleOrbitsBtn.addEventListener('click', () => {
      if (window.astroAudio) window.astroAudio.playClick();
      const show = !solarApp.showOrbits;
      solarApp.toggleOrbits(show);
      toggleOrbitsBtn.classList.toggle('active', show);
    });
  }

  const toggleAudioBtn = document.getElementById('btn-toggle-audio');
  if (toggleAudioBtn) {
    toggleAudioBtn.addEventListener('click', () => {
      const muted = window.astroAudio.toggleMute();
      toggleAudioBtn.classList.toggle('muted', muted);
      toggleAudioBtn.innerHTML = muted
        ? '<i class="fa-solid fa-volume-xmark"></i>'
        : '<i class="fa-solid fa-volume-high"></i>';
    });
  }

  const btnCameraTarget = document.getElementById('btn-camera-target');
  if (btnCameraTarget) {
    btnCameraTarget.addEventListener('click', () => {
      if (window.astroAudio) window.astroAudio.playClick();
      if (currentSelectedId) {
        flightSystem.flyTo(currentSelectedId);
      }
    });
  }

  const btnResetOverview = document.getElementById('btn-reset-overview');
  if (btnResetOverview) {
    btnResetOverview.addEventListener('click', () => {
      if (window.astroAudio) window.astroAudio.playClick();
      flightSystem.viewOverview();

      // Deactivate dock cards and update follow indicator to Overview
      document.querySelectorAll('.dock-card').forEach(c => c.classList.remove('active'));
      const followLabel = document.getElementById('camera-target-label');
      const followBtn = document.getElementById('btn-camera-target');
      if (followLabel) followLabel.textContent = 'Free Camera (Overview)';
      if (followBtn) followBtn.classList.remove('active');
    });
  }

  // Settings Modal (Gemini API Key configuration)
  const btnOpenSettings = document.getElementById('btn-open-settings');
  const settingsModal = document.getElementById('settings-modal');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const inputGeminiKey = document.getElementById('input-gemini-key');
  const selectGeminiModel = document.getElementById('select-gemini-model');
  const btnSaveSettings = document.getElementById('btn-save-settings');

  if (btnOpenSettings && settingsModal) {
    btnOpenSettings.addEventListener('click', () => {
      if (window.astroAudio) window.astroAudio.playClick();
      if (inputGeminiKey) inputGeminiKey.value = aiEngine.apiKey;
      if (selectGeminiModel) selectGeminiModel.value = aiEngine.activeModel;
      settingsModal.classList.add('active');
    });
  }

  if (btnCloseSettings && settingsModal) {
    btnCloseSettings.addEventListener('click', () => {
      settingsModal.classList.remove('active');
    });
  }

  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
      const key = inputGeminiKey.value;
      const model = selectGeminiModel.value;
      aiEngine.setApiKey(key, model);
      if (window.astroAudio) window.astroAudio.playCorrect();
      settingsModal.classList.remove('active');
      appendChatMessage('assistant', `Settings updated. Connected to: **${aiEngine.getIsLiveGemini() ? 'Google Gemini Live API (' + model + ')' : 'Built-in AstroMind Offline Engine'}**.`);
    });
  }

  // Initialize Dossier and Camera with default selected body (Earth)
  updateDossierUI('earth');
  updateAIContextPill('earth');
});
