/**
 * AstroMind AI Space Explorer Engine (NOVA)
 * Provides context-aware astrophysics explanations, procedural intelligence,
 * optional Gemini API bridge, and Web Speech API voice narration.
 */

class AstroMindAIEngine {
  constructor() {
    this.currentPlanetId = 'earth';
    this.isSpeaking = false;
    this.speechSynth = window.speechSynthesis || null;
    this.speechUtterance = null;
    this.voiceEnabled = true;
    this.conversationHistory = [];

    // Load custom API key from localStorage if saved
    this.apiKey = localStorage.getItem('astromind_gemini_key') || '';
    this.activeModel = localStorage.getItem('astromind_gemini_model') || 'gemini-1.5-flash';
  }

  setPlanetContext(planetId) {
    this.currentPlanetId = planetId;
  }

  setApiKey(key, model = 'gemini-1.5-flash') {
    this.apiKey = key.trim();
    this.activeModel = model;
    localStorage.setItem('astromind_gemini_key', this.apiKey);
    localStorage.setItem('astromind_gemini_model', this.activeModel);
  }

  getIsLiveGemini() {
    return Boolean(this.apiKey && this.apiKey.length > 10);
  }

  // Main question answering pipeline
  async askQuestion(userPrompt) {
    const cleanPrompt = userPrompt.trim();
    if (!cleanPrompt) return null;

    const currentPlanet = CELESTIAL_DATA[this.currentPlanetId] || CELESTIAL_DATA['earth'];

    // If Gemini API Key is configured, attempt live call first
    if (this.getIsLiveGemini()) {
      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: cleanPrompt,
            apiKey: this.apiKey,
            model: this.activeModel,
            context: {
              id: currentPlanet.id,
              name: currentPlanet.name,
              category: currentPlanet.category,
              gravity: currentPlanet.metrics.surface_gravity,
              temperature: currentPlanet.metrics.avg_temp_c,
              moons: currentPlanet.metrics.moons_count
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.reply) {
            const answer = {
              source: 'gemini-live',
              text: data.reply,
              suggestedPrompts: this.generateFollowUpSuggestions(this.currentPlanetId)
            };
            this.handleSpeech(data.reply);
            return answer;
          }
        }
      } catch (err) {
        console.warn("Live Gemini request failed, using offline AstroMind Neural Engine:", err);
      }
    }

    // Built-in Offline AstroMind Neural Knowledge Engine
    const offlineReply = this.generateOfflineResponse(cleanPrompt, currentPlanet);
    this.handleSpeech(offlineReply.text);
    return offlineReply;
  }

  // Built-in AstroMind Offline Neural Response Generator
  generateOfflineResponse(prompt, planet) {
    const pLower = prompt.toLowerCase();

    // 1. Check exact intent knowledge base
    for (const item of AI_KNOWLEDGE_BASE.intents) {
      const match = item.keywords.some(kw => pLower.includes(kw));
      if (match) {
        return {
          source: 'offline-neural',
          text: item.answer,
          suggestedPrompts: this.generateFollowUpSuggestions(planet.id)
        };
      }
    }

    // 2. Context-aware inquiries about current or mentioned planet
    let targetPlanet = planet;
    Object.keys(CELESTIAL_DATA).forEach(id => {
      if (pLower.includes(id) || pLower.includes(CELESTIAL_DATA[id].name.toLowerCase())) {
        targetPlanet = CELESTIAL_DATA[id];
      }
    });

    const metrics = targetPlanet.metrics;

    // Atmosphere inquiry
    if (pLower.includes('atmosphere') || pLower.includes('air') || pLower.includes('breathe') || pLower.includes('gas')) {
      const gList = targetPlanet.atmosphere.map(g => `* **${g.gas}**: ${g.percent}%`).join('\n');
      return {
        source: 'offline-neural',
        text: `### Atmospheric Profile: ${targetPlanet.name}\n\n${targetPlanet.name}'s atmospheric envelope is classified as **${targetPlanet.category}**.\n\n${gList}\n\n**Scientific Assessment:** ${targetPlanet.survival.verdict}`,
        suggestedPrompts: [
          `Can humans ever terraform ${targetPlanet.name}?`,
          `What is the surface pressure on ${targetPlanet.name}?`,
          `What missions have visited ${targetPlanet.name}?`
        ]
      };
    }

    // Temperature inquiry
    if (pLower.includes('temperature') || pLower.includes('hot') || pLower.includes('cold') || pLower.includes('weather')) {
      return {
        source: 'offline-neural',
        text: `### Thermal Telemetry: ${targetPlanet.name}\n\n* **Average Surface Temperature:** **${metrics.avg_temp_c}°C**\n* **Minimum Recorded:** **${metrics.min_temp_c}°C**\n* **Maximum Recorded:** **${metrics.max_temp_c}°C**\n\n**Thermal Dynamics:** ${targetPlanet.overview}`,
        suggestedPrompts: [
          `How does ${targetPlanet.name}'s distance from the Sun affect its climate?`,
          `Does ${targetPlanet.name} experience seasonal cycles?`
        ]
      };
    }

    // Gravity / Weight inquiry
    if (pLower.includes('gravity') || pLower.includes('weight') || pLower.includes('jump') || pLower.includes('mass')) {
      return {
        source: 'offline-neural',
        text: `### Gravitational Profile: ${targetPlanet.name}\n\n* **Surface Gravity:** **${metrics.surface_gravity} m/s²** (roughly **${metrics.gravity_earth_ratio}x** Earth's gravity).\n* **Total Mass:** **${metrics.mass_kg} kg** (${metrics.mass_earth_ratio}x Earth).\n* **Escape Velocity:** **${metrics.escape_velocity_km_s} km/s**.\n\n*If you weigh 70 kg on Earth, your effective weight on ${targetPlanet.name} would be **${Math.round(70 * metrics.gravity_earth_ratio)} kg**!*`,
        suggestedPrompts: [
          `How fast would a rocket have to fly to escape ${targetPlanet.name}?`,
          `What are the internal layers of ${targetPlanet.name}?`
        ]
      };
    }

    // Internal Structure inquiry
    if (pLower.includes('inside') || pLower.includes('core') || pLower.includes('structure') || pLower.includes('layer') || pLower.includes('mantle')) {
      const layers = targetPlanet.structure.map(l => `* **${l.layer}** (${l.thickness}): ${l.desc}`).join('\n\n');
      return {
        source: 'offline-neural',
        text: `### Internal Planetary Anatomy: ${targetPlanet.name}\n\n${layers}`,
        suggestedPrompts: [
          `Does ${targetPlanet.name} possess an active magnetic geodynamo?`,
          `Is ${targetPlanet.name} geologically active today?`
        ]
      };
    }

    // Survival inquiry
    if (pLower.includes('survive') || pLower.includes('live') || pLower.includes('die') || pLower.includes('suit') || pLower.includes('spacesuit')) {
      return {
        source: 'offline-neural',
        text: `### Human Survival Simulation: ${targetPlanet.name}\n\n* **Estimated Survival Time:** **${targetPlanet.survival.time}**\n* **Threat Level:** **${targetPlanet.survival.rating}**\n\n**Physiological Verdict:** ${targetPlanet.survival.verdict}`,
        suggestedPrompts: [
          `What protective life-support technology is required on ${targetPlanet.name}?`,
          `How long does it take to travel from Earth to ${targetPlanet.name}?`
        ]
      };
    }

    // Exploration missions inquiry
    if (pLower.includes('mission') || pLower.includes('spacecraft') || pLower.includes('probe') || pLower.includes('lander') || pLower.includes('rover')) {
      const mList = targetPlanet.missions.map(m => `* **${m.year} — ${m.name}** (${m.agency}): ${m.milestone}`).join('\n');
      return {
        source: 'offline-neural',
        text: `### Human Exploration Milestones: ${targetPlanet.name}\n\n${mList}`,
        suggestedPrompts: [
          `What are the upcoming planned missions to ${targetPlanet.name}?`,
          `What was the greatest scientific discovery made at ${targetPlanet.name}?`
        ]
      };
    }

    // Moons inquiry
    if (pLower.includes('moon') || pLower.includes('satellite')) {
      return {
        source: 'offline-neural',
        text: `### Satellite Census: ${targetPlanet.name}\n\n* **Confirmed Moons Count:** **${metrics.moons_count}**\n* **Primary Details:** ${targetPlanet.tagline}\n\n${targetPlanet.funFacts[1] || targetPlanet.overview}`,
        suggestedPrompts: [
          `Which moon of ${targetPlanet.name} is the most scientifically intriguing?`,
          `Could life exist in oceans beneath icy moons?`
        ]
      };
    }

    // Default intelligent astrophysical synthesis
    return {
      source: 'offline-neural',
      text: `### Astrophysical Briefing: ${targetPlanet.name}\n\n${targetPlanet.overview}\n\n**Key Characteristics:**\n* **Classification:** ${targetPlanet.category}\n* **Orbital Period:** ${metrics.orbital_period}\n* **Surface Gravity:** ${metrics.surface_gravity} m/s²\n* **Atmospheric Nature:** Primary component is ${targetPlanet.atmosphere[0].gas} (${targetPlanet.atmosphere[0].percent}%).\n\n**Fascinating Insight:** ${targetPlanet.funFacts[0]}`,
      suggestedPrompts: targetPlanet.starterPrompts
    };
  }

  // Dynamic contextual suggestions based on current planet
  generateFollowUpSuggestions(planetId) {
    const planet = CELESTIAL_DATA[planetId] || CELESTIAL_DATA['earth'];
    return [
      `What is inside ${planet.name}'s core?`,
      `How long could a human survive on ${planet.name}?`,
      `What spacecraft have explored ${planet.name}?`
    ];
  }

  // Voice Narration (Text-to-Speech)
  handleSpeech(markdownText) {
    if (!this.voiceEnabled || !this.speechSynth) return;

    // Stop existing speech
    this.stopSpeech();

    // Strip markdown formatting for natural voice reading
    const cleanSpeech = markdownText
      .replace(/[#*_`]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .slice(0, 350); // Read first concise summary paragraph

    try {
      this.speechUtterance = new SpeechSynthesisUtterance(cleanSpeech);
      this.speechUtterance.rate = 1.05;
      this.speechUtterance.pitch = 1.0;

      // Select high-quality English voice if available
      const voices = this.speechSynth.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David')));
      if (preferredVoice) {
        this.speechUtterance.voice = preferredVoice;
      }

      this.speechUtterance.onstart = () => {
        this.isSpeaking = true;
        this.updateVoiceButtonState(true);
      };

      this.speechUtterance.onend = () => {
        this.isSpeaking = false;
        this.updateVoiceButtonState(false);
      };

      this.speechUtterance.onerror = () => {
        this.isSpeaking = false;
        this.updateVoiceButtonState(false);
      };

      this.speechSynth.speak(this.speechUtterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }

  stopSpeech() {
    if (this.speechSynth && this.speechSynth.speaking) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
      this.updateVoiceButtonState(false);
    }
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    if (!this.voiceEnabled) {
      this.stopSpeech();
    }
    return this.voiceEnabled;
  }

  updateVoiceButtonState(speaking) {
    const btn = document.getElementById('btn-tts-toggle');
    if (!btn) return;
    if (speaking) {
      btn.classList.add('speaking');
    } else {
      btn.classList.remove('speaking');
    }
  }
}
