/**
 * AstroMind Interactive Quiz Generator & Gamification Engine
 * Generates tailored multiple-choice challenges across difficulty levels,
 * calculates XP, manages cosmic ranks, and tracks achievements.
 */

class QuizEngine {
  constructor() {
    this.currentDifficulty = 'all'; // 'all', 'novice', 'intermediate', 'expert'
    this.currentCategory = 'all';
    this.currentQuestion = null;
    this.questionHistory = [];

    // Player stats loaded from localStorage
    this.stats = {
      xp: parseInt(localStorage.getItem('astromind_quiz_xp') || '0', 10),
      correctAnswers: parseInt(localStorage.getItem('astromind_quiz_correct') || '0', 10),
      totalAnswered: parseInt(localStorage.getItem('astromind_quiz_total') || '0', 10),
      currentStreak: 0,
      bestStreak: parseInt(localStorage.getItem('astromind_quiz_best_streak') || '0', 10),
      unlockedBadges: JSON.parse(localStorage.getItem('astromind_quiz_badges') || '[]')
    };

    this.ranks = [
      { name: "Orbital Cadet", minXp: 0, icon: "fa-satellite" },
      { name: "Lunar Specialist", minXp: 300, icon: "fa-moon" },
      { name: "Martian Pioneer", minXp: 700, icon: "fa-meteor" },
      { name: "Jovian Navigator", minXp: 1200, icon: "fa-compass" },
      { name: "Ring System Scholar", minXp: 1800, icon: "fa-ring" },
      { name: "Cosmic Commander", minXp: 2600, icon: "fa-rocket" },
      { name: "Galactic Mastermind", minXp: 3600, icon: "fa-atom" }
    ];

    this.badges = [
      { id: "first_answer", name: "First Light", desc: "Answered your first astronomy question", icon: "fa-star" },
      { id: "streak_3", name: "Orbital Resonance", desc: "Achieved a 3-question streak", icon: "fa-fire" },
      { id: "streak_5", name: "Cosmic Velocity", desc: "Achieved a 5-question streak", icon: "fa-bolt" },
      { id: "expert_correct", name: "Astrophysicist Mind", desc: "Correctly answered an expert-level question", icon: "fa-brain" }
    ];
  }

  saveStats() {
    localStorage.setItem('astromind_quiz_xp', this.stats.xp);
    localStorage.setItem('astromind_quiz_correct', this.stats.correctAnswers);
    localStorage.setItem('astromind_quiz_total', this.stats.totalAnswered);
    localStorage.setItem('astromind_quiz_best_streak', this.stats.bestStreak);
    localStorage.setItem('astromind_quiz_badges', JSON.stringify(this.stats.unlockedBadges));
  }

  getCurrentRank() {
    let current = this.ranks[0];
    for (const r of this.ranks) {
      if (this.stats.xp >= r.minXp) {
        current = r;
      }
    }
    return current;
  }

  getNextRank() {
    for (const r of this.ranks) {
      if (this.stats.xp < r.minXp) {
        return r;
      }
    }
    return null; // Top rank
  }

  setDifficulty(diff) {
    this.currentDifficulty = diff;
  }

  setCategory(cat) {
    this.currentCategory = cat;
  }

  // Generate next question
  generateQuestion(targetPlanetId = null) {
    let pool = [...QUIZ_QUESTIONS];

    // Filter by difficulty if selected
    if (this.currentDifficulty && this.currentDifficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === this.currentDifficulty);
    }

    // Filter by planet or category if specified
    if (targetPlanetId && targetPlanetId !== 'sun' && targetPlanetId !== 'all') {
      const planetMatches = pool.filter(q => q.category.includes(targetPlanetId) || q.question.toLowerCase().includes(targetPlanetId));
      if (planetMatches.length > 0) {
        pool = planetMatches;
      }
    }

    if (pool.length === 0) {
      pool = [...QUIZ_QUESTIONS];
    }

    // Pick random question not matching current
    let candidates = pool.filter(q => !this.currentQuestion || q.id !== this.currentQuestion.id);
    if (candidates.length === 0) candidates = pool;

    const randomIndex = Math.floor(Math.random() * candidates.length);
    this.currentQuestion = candidates[randomIndex];
    return this.currentQuestion;
  }

  // Submit answer
  submitAnswer(selectedIndex) {
    if (!this.currentQuestion) return null;

    const isCorrect = selectedIndex === this.currentQuestion.answerIndex;
    this.stats.totalAnswered += 1;

    let xpGained = 0;
    if (isCorrect) {
      this.stats.correctAnswers += 1;
      this.stats.currentStreak += 1;
      if (this.stats.currentStreak > this.stats.bestStreak) {
        this.stats.bestStreak = this.stats.currentStreak;
      }

      // Base XP based on difficulty
      if (this.currentQuestion.difficulty === 'expert') xpGained = 150;
      else if (this.currentQuestion.difficulty === 'intermediate') xpGained = 100;
      else xpGained = 60;

      // Streak multiplier bonus
      if (this.stats.currentStreak >= 3) {
        xpGained = Math.round(xpGained * 1.5);
      }

      this.stats.xp += xpGained;

      // Check badges
      this.checkBadges(this.currentQuestion.difficulty);

      if (window.astroAudio) window.astroAudio.playCorrect();
    } else {
      this.stats.currentStreak = 0;
      if (window.astroAudio) window.astroAudio.playWrong();
    }

    this.saveStats();

    return {
      isCorrect,
      correctIndex: this.currentQuestion.answerIndex,
      explanation: this.currentQuestion.explanation,
      xpGained,
      currentXp: this.stats.xp,
      currentStreak: this.stats.currentStreak,
      rank: this.getCurrentRank()
    };
  }

  checkBadges(difficulty) {
    const newlyUnlocked = [];

    if (!this.stats.unlockedBadges.includes('first_answer')) {
      this.stats.unlockedBadges.push('first_answer');
      newlyUnlocked.push('first_answer');
    }
    if (this.stats.currentStreak >= 3 && !this.stats.unlockedBadges.includes('streak_3')) {
      this.stats.unlockedBadges.push('streak_3');
      newlyUnlocked.push('streak_3');
    }
    if (this.stats.currentStreak >= 5 && !this.stats.unlockedBadges.includes('streak_5')) {
      this.stats.unlockedBadges.push('streak_5');
      newlyUnlocked.push('streak_5');
    }
    if (difficulty === 'expert' && !this.stats.unlockedBadges.includes('expert_correct')) {
      this.stats.unlockedBadges.push('expert_correct');
      newlyUnlocked.push('expert_correct');
    }

    return newlyUnlocked;
  }
}
