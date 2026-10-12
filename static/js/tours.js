/**
 * AstroMind Guided Cosmic Tour Director
 * Coordinates automated interplanetary journeys, narrative sequencing,
 * camera transit, and multimedia storytelling.
 */

class TourDirector {
  constructor(flightSystem, aiEngine) {
    this.flightSystem = flightSystem;
    this.aiEngine = aiEngine;
    this.activeTour = null;
    this.currentStopIndex = 0;
    this.isRunning = false;

    // Tour modal / UI elements
    this.banner = document.getElementById('tour-banner');
    this.titleEl = document.getElementById('tour-title');
    this.stepEl = document.getElementById('tour-step-info');
    this.narrativeEl = document.getElementById('tour-narrative');
    this.btnPrev = document.getElementById('btn-tour-prev');
    this.btnNext = document.getElementById('btn-tour-next');
    this.btnExit = document.getElementById('btn-tour-exit');

    this.bindEvents();
  }

  bindEvents() {
    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        if (window.astroAudio) window.astroAudio.playClick();
        this.nextStop();
      });
    }
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => {
        if (window.astroAudio) window.astroAudio.playClick();
        this.prevStop();
      });
    }
    if (this.btnExit) {
      this.btnExit.addEventListener('click', () => {
        if (window.astroAudio) window.astroAudio.playClick();
        this.endTour();
      });
    }
  }

  startTour(tourId) {
    const tour = GUIDED_TOURS.find(t => t.id === tourId);
    if (!tour || tour.stops.length === 0) return;

    this.activeTour = tour;
    this.currentStopIndex = 0;
    this.isRunning = true;

    if (this.banner) {
      this.banner.classList.add('active');
    }

    this.executeCurrentStop();
  }

  executeCurrentStop() {
    if (!this.activeTour || !this.isRunning) return;

    const stop = this.activeTour.stops[this.currentStopIndex];
    if (!stop) return;

    const totalStops = this.activeTour.stops.length;
    const bodyData = CELESTIAL_DATA[stop.target] || { name: stop.target };

    // Update UI elements
    if (this.titleEl) this.titleEl.textContent = this.activeTour.title;
    if (this.stepEl) {
      this.stepEl.textContent = `Stop ${this.currentStopIndex + 1} of ${totalStops}: ${bodyData.name}`;
    }
    if (this.narrativeEl) {
      this.narrativeEl.textContent = stop.narrative;
    }

    // Update button states
    if (this.btnPrev) {
      this.btnPrev.disabled = this.currentStopIndex === 0;
    }
    if (this.btnNext) {
      this.btnNext.innerHTML = (this.currentStopIndex === totalStops - 1)
        ? '<i class="fa-solid fa-flag-checkered"></i> Finish Tour'
        : 'Next Stop <i class="fa-solid fa-forward"></i>';
    }

    // Warp camera to this body
    this.flightSystem.flyTo(stop.target, 2400);

    // AI Voice narration
    if (this.aiEngine) {
      this.aiEngine.handleSpeech(stop.narrative);
    }
  }

  nextStop() {
    if (!this.activeTour) return;

    if (this.currentStopIndex < this.activeTour.stops.length - 1) {
      this.currentStopIndex += 1;
      this.executeCurrentStop();
    } else {
      // Completed tour!
      this.completeTour();
    }
  }

  prevStop() {
    if (!this.activeTour) return;
    if (this.currentStopIndex > 0) {
      this.currentStopIndex -= 1;
      this.executeCurrentStop();
    }
  }

  completeTour() {
    if (this.narrativeEl) {
      this.narrativeEl.textContent = `🎉 You have completed "${this.activeTour.title}"! Test your knowledge in the AI Quiz Generator or continue free exploration!`;
    }
    if (this.btnNext) {
      this.btnNext.style.display = 'none';
    }

    if (window.astroAudio) window.astroAudio.playCorrect();

    setTimeout(() => {
      this.endTour();
    }, 4500);
  }

  endTour() {
    this.isRunning = false;
    this.activeTour = null;
    this.currentStopIndex = 0;

    if (this.banner) {
      this.banner.classList.remove('active');
    }
    if (this.btnNext) {
      this.btnNext.style.display = 'inline-flex';
    }

    if (this.aiEngine) {
      this.aiEngine.stopSpeech();
    }
  }
}
