/**
 * AstroMind Celestial Database
 * Rigorous astrophysical data, atmospheric compositions, internal cross-sections,
 * exploration timelines, survival simulations, and quiz datasets.
 */

const CELESTIAL_DATA = {
  sun: {
    id: "sun",
    name: "The Sun",
    latinName: "Sol",
    category: "Yellow Dwarf Star (G2V)",
    tagline: "The blazing thermonuclear heart of our solar system",
    overview: "The Sun contains 99.86% of all the mass in the entire Solar System. Inside its core, gravitational pressure fuses 600 million tons of hydrogen into helium every second, generating the radiant light and heat that sustains all life on Earth.",
    metrics: {
      radius_km: 696340,
      radius_earth_ratio: 109.2,
      mass_kg: "1.989 × 10³⁰",
      mass_earth_ratio: 333000,
      surface_gravity: 274.0,
      gravity_earth_ratio: 27.9,
      density_g_cm3: 1.41,
      escape_velocity_km_s: 617.7,
      distance_from_sun_mkm: 0,
      distance_au: 0,
      orbital_period: "230 Million Years (Galactic Orbit)",
      rotation_period: "27 Earth days (at equator)",
      axial_tilt_deg: 7.25,
      avg_temp_c: 5500,
      core_temp_c: 15000000,
      corona_temp_c: 2000000,
      moons_count: 0
    },
    atmosphere: [
      { gas: "Hydrogen (H₂)", percent: 73.46, color: "#ff4444" },
      { gas: "Helium (He)", percent: 24.85, color: "#ffaa00" },
      { gas: "Oxygen (O)", percent: 0.77, color: "#00f0ff" },
      { gas: "Carbon (C)", percent: 0.29, color: "#a855f7" },
      { gas: "Iron, Neon, Nitrogen", percent: 0.63, color: "#e2e8f0" }
    ],
    structure: [
      { layer: "Thermonuclear Core", thickness: "0 - 175,000 km", desc: "15,000,000°C extreme density where nuclear proton-proton fusion takes place.", color: "#ffffff" },
      { layer: "Radiative Zone", thickness: "175,000 - 490,000 km", desc: "Energy travels outward as photons; takes over 100,000 years for a photon to escape this zone!", color: "#ffe600" },
      { layer: "Convective Zone", thickness: "490,000 - 696,000 km", desc: "Boiling plasma cells transfer thermal energy up to the solar surface.", color: "#ff8800" },
      { layer: "Photosphere", thickness: "500 km", desc: "The visible 5,500°C surface emitting visible sunlight and sunspots.", color: "#ff3300" },
      { layer: "Corona", thickness: "Millions of km", desc: "Superheated outer solar atmosphere reaching over 2,000,000°C, extending into solar wind.", color: "#7928ca" }
    ],
    survival: {
      time: "< 0.001 seconds",
      rating: "INSTANT VAPORIZATION",
      verdict: "Surface temperature of 5,500°C and radiant intensity will vaporize any biological matter and materials in microseconds."
    },
    missions: [
      { year: 1995, name: "SOHO", agency: "ESA / NASA", milestone: "Continuous solar observatory discovering thousands of sun-grazing comets." },
      { year: 2010, name: "Solar Dynamics Obs.", agency: "NASA", milestone: "Ultra-HD solar corona monitoring and flare dynamics." },
      { year: 2018, name: "Parker Solar Probe", agency: "NASA", milestone: "First human spacecraft to 'touch the Sun', flying through the outer corona at 690,000 km/h." }
    ],
    funFacts: [
      "Over 1.3 million Earths could fit inside the Sun.",
      "The Sun loses roughly 4 million tons of mass every second as radiated energy.",
      "Light from the Sun takes 8 minutes and 20 seconds to reach Earth.",
      "The solar corona is mysteriously hundreds of times hotter than the Sun's visible surface."
    ],
    starterPrompts: [
      "How does the Sun generate energy in its core?",
      "Why is the Sun's corona hotter than its surface?",
      "What will happen to the Sun in 5 billion years?"
    ],
    visual: {
      radius: 14.0,
      distance: 0,
      orbitSpeed: 0,
      rotationSpeed: 0.002,
      tilt: 0.1,
      color: 0xffaa00,
      emissive: 0xff7700
    }
  },

  mercury: {
    id: "mercury",
    name: "Mercury",
    latinName: "Mercurius",
    category: "Terrestrial Planet",
    tagline: "The swift, scorched, iron-cored innermost world",
    overview: "Mercury is the smallest planet in the solar system and closest to the Sun. Having almost no atmosphere to trap heat, it suffers the most violent temperature swings of any planet, swinging from boiling 430°C by day to freezing -180°C at night.",
    metrics: {
      radius_km: 2439.7,
      radius_earth_ratio: 0.383,
      mass_kg: "3.301 × 10²³",
      mass_earth_ratio: 0.055,
      surface_gravity: 3.7,
      gravity_earth_ratio: 0.38,
      density_g_cm3: 5.43,
      escape_velocity_km_s: 4.3,
      distance_from_sun_mkm: 57.9,
      distance_au: 0.387,
      orbital_period: "88 Earth days",
      rotation_period: "58.6 Earth days (3:2 spin-orbit resonance)",
      axial_tilt_deg: 0.034,
      avg_temp_c: 167,
      min_temp_c: -180,
      max_temp_c: 430,
      moons_count: 0
    },
    atmosphere: [
      { gas: "Oxygen (exosphere)", percent: 42.0, color: "#00f0ff" },
      { gas: "Sodium (Na)", percent: 29.0, color: "#ffaa00" },
      { gas: "Hydrogen (H₂)", percent: 22.0, color: "#ff4444" },
      { gas: "Helium (He)", percent: 6.0, color: "#a855f7" },
      { gas: "Potassium, Trace", percent: 1.0, color: "#e2e8f0" }
    ],
    structure: [
      { layer: "Crust", thickness: "35 km", desc: "Silicate rock heavily battered by impact craters such as the 1,550 km Caloris Basin.", color: "#78716c" },
      { layer: "Mantle", thickness: "400 km", desc: "Dense silicate rocks surrounding an extraordinarily large iron core.", color: "#a8a29e" },
      { layer: "Outer Core", thickness: "Liquid iron-nickel", desc: "Fluid metallic layer generating Mercury's surprising global magnetic field.", color: "#d97706" },
      { layer: "Inner Solid Core", thickness: "Metallic Iron", desc: "Enormous core making up 85% of Mercury's planetary radius!", color: "#f59e0b" }
    ],
    survival: {
      time: "~15 seconds",
      rating: "LETHAL VACUUM & EXTREME THERMAL SHOCK",
      verdict: "Lack of atmosphere causes immediate ebullism (blood boiling in vacuum) combined with severe radiation and thermal shock."
    },
    missions: [
      { year: 1974, name: "Mariner 10", agency: "NASA", milestone: "First flyby missions photographing 45% of Mercury's cratered surface." },
      { year: 2011, name: "MESSENGER", agency: "NASA", milestone: "First orbital probe; discovered water ice in permanently shadowed polar craters." },
      { year: 2025, name: "BepiColombo", agency: "ESA / JAXA", milestone: "Dual orbiter spacecraft conducting multiple flybys ahead of 2026 orbital insertion." }
    ],
    funFacts: [
      "A year on Mercury is only 88 Earth days, but one solar day (sunrise to sunrise) takes 176 Earth days!",
      "Permanently shadowed craters at Mercury's poles contain frozen water ice despite daytime temperatures reaching 430°C.",
      "Mercury has shrunk by roughly 7 kilometers in radius as its massive iron core cooled over billions of years.",
      "It has almost no axial tilt (0.034°), so it experiences virtually zero seasonal variations."
    ],
    starterPrompts: [
      "Why does Mercury have such extreme temperature swings?",
      "How can water ice exist on Mercury so close to the Sun?",
      "Why is Mercury's iron core unusually huge?"
    ],
    visual: {
      radius: 1.2,
      distance: 26,
      orbitSpeed: 0.04,
      rotationSpeed: 0.005,
      tilt: 0.01,
      color: 0x9ca3af,
      roughness: 0.9
    }
  },

  venus: {
    id: "venus",
    name: "Venus",
    latinName: "Venus",
    category: "Terrestrial Planet",
    tagline: "Earth's runaway greenhouse twin and hottest planet",
    overview: "Venus is nearly identical in size and mass to Earth, but possesses a hellish toxic atmosphere with surface pressure 92 times greater than Earth's. Trapped beneath suffocating clouds of sulfuric acid, a runaway greenhouse effect keeps the surface at a blisteringly constant 465°C.",
    metrics: {
      radius_km: 6051.8,
      radius_earth_ratio: 0.949,
      mass_kg: "4.867 × 10²⁴",
      mass_earth_ratio: 0.815,
      surface_gravity: 8.87,
      gravity_earth_ratio: 0.90,
      density_g_cm3: 5.24,
      escape_velocity_km_s: 10.36,
      distance_from_sun_mkm: 108.2,
      distance_au: 0.723,
      orbital_period: "224.7 Earth days",
      rotation_period: "243 Earth days (Retrograde - spins backwards!)",
      axial_tilt_deg: 177.3,
      avg_temp_c: 465,
      min_temp_c: 462,
      max_temp_c: 475,
      moons_count: 0
    },
    atmosphere: [
      { gas: "Carbon Dioxide (CO₂)", percent: 96.5, color: "#ef4444" },
      { gas: "Nitrogen (N₂)", percent: 3.5, color: "#3b82f6" },
      { gas: "Sulfur Dioxide (SO₂)", percent: 0.015, color: "#eab308" },
      { gas: "Argon & Water vapor", percent: 0.01, color: "#cbd5e1" }
    ],
    structure: [
      { layer: "Crust", thickness: "50 km", desc: "Basaltic volcanic rock sculpted by thousands of active and dormant shield volcanoes.", color: "#ca8a04" },
      { layer: "Mantle", thickness: "3,000 km", desc: "Silicate rocky mantle exhibiting vigorous convective plume upwelling.", color: "#d97706" },
      { layer: "Metallic Core", thickness: "3,200 km radius", desc: "Partially molten iron-nickel core lacking convective dynamo (no intrinsic magnetic field).", color: "#b45309" }
    ],
    survival: {
      time: "< 1 second",
      rating: "CRUSHED, CORRODED & INCINERATED",
      verdict: "Surface pressure equals being 900 meters underwater on Earth, lead melts instantly, and atmosphere contains sulfuric acid droplets."
    },
    missions: [
      { year: 1970, name: "Venera 7", agency: "USSR", milestone: "First successful soft landing and telemetry transmission from another planet's surface." },
      { year: 1990, name: "Magellan", agency: "NASA", milestone: "Synthetic aperture radar mapping revealing 98% of volcanic plains and mountains." },
      { year: 2015, name: "Akatsuki", agency: "JAXA", milestone: "Atmospheric climate orbiter studying super-rotation and cloud dynamics." },
      { year: 2029, name: "DAVINCI & VERITAS", agency: "NASA", milestone: "Upcoming atmospheric descent probe and ultra-resolution orbital mapper." }
    ],
    funFacts: [
      "Venus rotates clockwise (retrograde). The Sun rises in the west and sets in the east!",
      "A day on Venus (243 Earth days) is longer than its entire year (225 Earth days).",
      "Venus is hotter than Mercury, even though Mercury is twice as close to the Sun.",
      "At 50 km above Venus's surface, atmospheric pressure and temperature match Earth's room temperature!"
    ],
    starterPrompts: [
      "Why did Venus experience a runaway greenhouse effect?",
      "Could floating cloud cities be feasible in Venus's upper atmosphere?",
      "Why does Venus rotate in reverse compared to most planets?"
    ],
    visual: {
      radius: 2.3,
      distance: 38,
      orbitSpeed: 0.03,
      rotationSpeed: -0.002,
      tilt: 3.1,
      color: 0xeab308,
      atmosphereGlow: 0xfde047
    }
  },

  earth: {
    id: "earth",
    name: "Earth",
    latinName: "Terra",
    category: "Terrestrial Planet",
    tagline: "The living oasis of oceans, oxygen, and intelligent civilization",
    overview: "Earth is the only known celestial harbor for life. Wrapped in a protective magnetic shield and nitrogen-oxygen atmosphere, 71% of its surface is covered by liquid water oceans, driving active weather cycles and biological evolution.",
    metrics: {
      radius_km: 6371.0,
      radius_earth_ratio: 1.0,
      mass_kg: "5.972 × 10²⁴",
      mass_earth_ratio: 1.0,
      surface_gravity: 9.807,
      gravity_earth_ratio: 1.0,
      density_g_cm3: 5.51,
      escape_velocity_km_s: 11.19,
      distance_from_sun_mkm: 149.6,
      distance_au: 1.0,
      orbital_period: "365.25 days",
      rotation_period: "23 hours 56 minutes 4 seconds",
      axial_tilt_deg: 23.44,
      avg_temp_c: 15,
      min_temp_c: -89.2,
      max_temp_c: 56.7,
      moons_count: 1
    },
    atmosphere: [
      { gas: "Nitrogen (N₂)", percent: 78.08, color: "#3b82f6" },
      { gas: "Oxygen (O₂)", percent: 20.95, color: "#06b6d4" },
      { gas: "Argon (Ar)", percent: 0.93, color: "#8b5cf6" },
      { gas: "Carbon Dioxide (CO₂)", percent: 0.042, color: "#f97316" },
      { gas: "Water Vapor & Neon", percent: 0.01, color: "#f1f5f9" }
    ],
    structure: [
      { layer: "Crust (Oceanic & Continental)", thickness: "5 - 70 km", desc: "Rigid tectonic plates floating upon the convective mantle asthenosphere.", color: "#0284c7" },
      { layer: "Upper & Lower Mantle", thickness: "2,890 km", desc: "Semi-solid silicate rock convective circulation driving plate tectonics.", color: "#ea580c" },
      { layer: "Outer Core", thickness: "2,200 km", desc: "Swirling liquid iron-nickel fluid that acts as a geodynamo, generating Earth's magnetic field.", color: "#f59e0b" },
      { layer: "Inner Core", thickness: "1,220 km radius", desc: "Crystalline solid nickel-iron sphere pressurized to 3.6 million atmospheres, hot as the Sun's surface.", color: "#fef08a" }
    ],
    survival: {
      time: "~80 Years",
      rating: "OPTIMAL BIOSPHERE",
      verdict: "Natural evolutionary home: ideal atmospheric pressure, breathable oxygen, and abundant liquid water."
    },
    missions: [
      { year: 1957, name: "Sputnik 1", agency: "USSR", milestone: "First artificial satellite to orbit Earth, kicking off the Space Age." },
      { year: 1990, name: "Hubble Space Telescope", agency: "NASA / ESA", milestone: "Revolutionized observational cosmology from low Earth orbit." },
      { year: 1998, name: "International Space Station", agency: "Global (15 Nations)", milestone: "Continuously inhabited orbital research laboratory since November 2000." },
      { year: 2021, name: "James Webb Space Telescope", agency: "NASA / ESA / CSA", milestone: "Next-generation infrared observatory positioned at Earth-Sun L2 Lagrange point." }
    ],
    funFacts: [
      "Earth is not a perfect sphere; centrifugal force causes an equatorial bulge of about 43 kilometers.",
      "The Van Allen radiation belts trap high-energy cosmic particles, shielding surface biology from sterilization.",
      "Plate tectonics constantly recycles carbon and rejuvenates continents, preventing a Venus-like greenhouse catastrophe.",
      "Earth travels around the Sun at an average orbital speed of 107,000 km/h (29.8 km/s)."
    ],
    starterPrompts: [
      "How does Earth's magnetic field shield us from solar storms?",
      "What role did plate tectonics play in stabilizing our climate?",
      "How does the Moon stabilize Earth's axial tilt and seasons?"
    ],
    visual: {
      radius: 2.5,
      distance: 52,
      orbitSpeed: 0.02,
      rotationSpeed: 0.015,
      tilt: 0.41,
      color: 0x2563eb,
      hasClouds: true,
      atmosphereGlow: 0x38bdf8
    }
  },

  moon: {
    id: "moon",
    name: "The Moon",
    latinName: "Luna",
    category: "Natural Satellite",
    parentPlanet: "earth",
    tagline: "Earth's cratered silent partner and launchpad to the stars",
    overview: "Formed 4.5 billion years ago when a Mars-sized protoplanet (Theia) collided with primordial Earth, the Moon is tidally locked to Earth, showing only one face. Its gravitational pull stabilizes Earth's axial wobble and creates oceanic tides.",
    metrics: {
      radius_km: 1737.4,
      radius_earth_ratio: 0.273,
      mass_kg: "7.342 × 10²²",
      mass_earth_ratio: 0.0123,
      surface_gravity: 1.62,
      gravity_earth_ratio: 0.166,
      density_g_cm3: 3.34,
      escape_velocity_km_s: 2.38,
      distance_from_sun_mkm: 149.6,
      distance_from_earth_km: 384400,
      orbital_period: "27.3 Earth days (Tidally Locked)",
      rotation_period: "27.3 Earth days",
      axial_tilt_deg: 1.54,
      avg_temp_c: -20,
      min_temp_c: -246,
      max_temp_c: 120,
      moons_count: 0
    },
    atmosphere: [
      { gas: "Trace Exosphere (Argon, Helium, Neon)", percent: 100, color: "#94a3b8" }
    ],
    structure: [
      { layer: "Regolith & Crust", thickness: "50 km", desc: "Fine pulverized basalt dust and anorthosite highlands from billions of meteorite impacts.", color: "#94a3b8" },
      { layer: "Lithospheric Mantle", thickness: "1,000 km", desc: "Dense rigid silicate rock containing deep moonquake hypocenters.", color: "#64748b" },
      { layer: "Partial Melt Zone", thickness: "150 km", desc: "Semi-molten boundary layer insulating the core.", color: "#475569" },
      { layer: "Metallic Core", thickness: "330 km radius", desc: "Small metallic iron-rich core, only 1-2% of the Moon's total mass.", color: "#f59e0b" }
    ],
    survival: {
      time: "~15 seconds",
      rating: "VACUUM DEPRESSURIZATION",
      verdict: "Hard vacuum causes unconsciousness within 15 seconds due to lack of oxygen in blood, followed by rapid hypothermia or thermal frying."
    },
    missions: [
      { year: 1969, name: "Apollo 11", agency: "NASA", milestone: "Neil Armstrong & Buzz Aldrin become first humans to walk on the lunar surface." },
      { year: 2019, name: "Chang'e 4", agency: "CNSA", milestone: "First historic soft landing on the far side of the Moon." },
      { year: 2023, name: "Chandrayaan-3", agency: "ISRO", milestone: "First successful soft landing near the lunar south polar region." },
      { year: 2026, name: "Artemis Program", agency: "NASA / International", milestone: "Crewed lunar exploration and permanent Gateway orbital habitat." }
    ],
    funFacts: [
      "The Moon is moving away from Earth at a rate of 3.8 cm per year due to tidal energy dissipation.",
      "The dark patches on the Moon (Maria) are ancient volcanic plains filled with solidified basalt lava.",
      "Permanent craters at the lunar south pole contain billions of tons of water ice.",
      "You would weigh roughly 1/6th of your Earth weight on the lunar surface."
    ],
    starterPrompts: [
      "How did the Giant Impact Hypothesis form the Moon?",
      "Why does the Moon only show one face toward Earth?",
      "How can water ice at the lunar south pole be used as rocket fuel?"
    ],
    visual: {
      radius: 0.7,
      distance: 6.0,
      orbitSpeed: 0.08,
      rotationSpeed: 0.01,
      tilt: 0.05,
      color: 0xd1d5db
    }
  },

  mars: {
    id: "mars",
    name: "Mars",
    latinName: "Mars",
    category: "Terrestrial Planet",
    tagline: "The rusty red frontier of ancient rivers and towering volcanoes",
    overview: "Mars is bathed in red dust from iron oxide (rust) covering its arid surface. Billions of years ago, Mars had a thick atmosphere and rushing rivers. Today it is a frigid desert home to Olympus Mons (the tallest volcano in the solar system) and Valles Marineris (a grand canyon spanning 4,000 km).",
    metrics: {
      radius_km: 3389.5,
      radius_earth_ratio: 0.532,
      mass_kg: "6.417 × 10²³",
      mass_earth_ratio: 0.107,
      surface_gravity: 3.72,
      gravity_earth_ratio: 0.38,
      density_g_cm3: 3.93,
      escape_velocity_km_s: 5.03,
      distance_from_sun_mkm: 227.9,
      distance_au: 1.524,
      orbital_period: "687 Earth days",
      rotation_period: "24 hours 37 minutes 22 seconds (1 Sol)",
      axial_tilt_deg: 25.19,
      avg_temp_c: -63,
      min_temp_c: -140,
      max_temp_c: 20,
      moons_count: 2
    },
    atmosphere: [
      { gas: "Carbon Dioxide (CO₂)", percent: 95.32, color: "#f97316" },
      { gas: "Nitrogen (N₂)", percent: 2.6, color: "#3b82f6" },
      { gas: "Argon (Ar)", percent: 1.9, color: "#a855f7" },
      { gas: "Oxygen (O₂)", percent: 0.13, color: "#06b6d4" },
      { gas: "Carbon Monoxide & Water", percent: 0.05, color: "#e2e8f0" }
    ],
    structure: [
      { layer: "Crust", thickness: "50 - 100 km", desc: "Thick volcanic basalt enriched with iron, sulfur, aluminum, and chlorine.", color: "#c2410c" },
      { layer: "Silicate Mantle", thickness: "1,500 km", desc: "Stagnant lid mantle; ancient volcanic hotspots produced immense shield volcanoes.", color: "#9a3412" },
      { layer: "Core", thickness: "1,830 km radius", desc: "Partially molten iron-nickel-sulfur core confirmed by NASA InSight seismometer.", color: "#f59e0b" }
    ],
    survival: {
      time: "~2 minutes",
      rating: "ANOXIA, COLD & EBULLISM",
      verdict: "Surface pressure is only 0.6% of Earth (below Armstrong Limit, body fluids vaporize at body temp). Severe hypoxia within 15 seconds."
    },
    missions: [
      { year: 1976, name: "Viking 1 & 2", agency: "NASA", milestone: "First successful operational landers conducting biology experiments." },
      { year: 1997, name: "Pathfinder / Sojourner", agency: "NASA", milestone: "First mobile robotic rover on Martian terrain." },
      { year: 2012, name: "Curiosity", agency: "NASA", milestone: "Nuclear-powered rover discovering organic carbon molecules in Gale Crater." },
      { year: 2021, name: "Perseverance & Ingenuity", agency: "NASA", milestone: "Collected sealed core samples and achieved first powered flight on another planet." }
    ],
    funFacts: [
      "Olympus Mons stands 21.9 km high—nearly three times taller than Mount Everest!",
      "Valles Marineris stretches over 4,000 km, easily four times longer and deeper than the Grand Canyon.",
      "A Martian day (Sol) is only 39 minutes longer than an Earth day.",
      "Sunset on Mars looks distinctly blue due to fine dust scattering reddish light forward."
    ],
    starterPrompts: [
      "Could liquid water ever flow across Mars again?",
      "Why did Mars lose its thick atmosphere and magnetic field?",
      "What challenges do humans face in building a permanent Mars colony?"
    ],
    visual: {
      radius: 1.8,
      distance: 68,
      orbitSpeed: 0.016,
      rotationSpeed: 0.014,
      tilt: 0.44,
      color: 0xe11d48,
      atmosphereGlow: 0xf43f5e
    }
  },

  jupiter: {
    id: "jupiter",
    name: "Jupiter",
    latinName: "Iuppiter",
    category: "Gas Giant",
    tagline: "The colossal king of planets with a centuries-old storm",
    overview: "Jupiter is more than twice as massive as all other planets combined. With a magnetic field 20,000 times stronger than Earth's, its stormy atmosphere features iconic swirling cloud belts and the Great Red Spot—a titanic anticyclonic hurricane that has raged for over 350 years.",
    metrics: {
      radius_km: 69911,
      radius_earth_ratio: 10.97,
      mass_kg: "1.898 × 10²⁷",
      mass_earth_ratio: 317.8,
      surface_gravity: 24.79,
      gravity_earth_ratio: 2.53,
      density_g_cm3: 1.33,
      escape_velocity_km_s: 59.5,
      distance_from_sun_mkm: 778.5,
      distance_au: 5.204,
      orbital_period: "11.86 Earth years",
      rotation_period: "9 hours 55 minutes (Fastest spin in the solar system!)",
      axial_tilt_deg: 3.13,
      avg_temp_c: -110,
      min_temp_c: -145,
      max_temp_c: -108,
      moons_count: 95
    },
    atmosphere: [
      { gas: "Hydrogen (H₂)", percent: 89.8, color: "#f87171" },
      { gas: "Helium (He)", percent: 10.2, color: "#fbbf24" },
      { gas: "Methane (CH₄)", percent: 0.3, color: "#60a5fa" },
      { gas: "Ammonia & Water vapor", percent: 0.1, color: "#c084fc" }
    ],
    structure: [
      { layer: "Upper Atmosphere", thickness: "1,000 km", desc: "Ammonia and water ice clouds organized into alternating eastward/westward jet streams.", color: "#fde68a" },
      { layer: "Gaseous Hydrogen Mantle", thickness: "10,000 km", desc: "Dense hydrogen gas gradually transitioning into supercritical fluid under colossal pressure.", color: "#f59e0b" },
      { layer: "Metallic Liquid Hydrogen", thickness: "40,000 km", desc: "Pressure surpasses 2 million atm; hydrogen acts as an electrical conductor, powering Jupiter's magnetosphere.", color: "#ea580c" },
      { layer: "Diffuse Heavy Element Core", thickness: "Dense silicate/iron mix", desc: "Juno probe data revealed a fuzzy 'dilute' core 10-20 times Earth's mass.", color: "#b45309" }
    ],
    survival: {
      time: "0.0 seconds",
      rating: "CRUSHING PRESSURE & MASSIVE RADIATION",
      verdict: "No solid surface exists. A human falling into Jupiter would be roasted by extreme heat, crushed by millions of atmospheres, and bombarded by lethal radiation."
    },
    missions: [
      { year: 1973, name: "Pioneer 10 & 11", agency: "NASA", milestone: "First close-up images of Jupiter and its intense radiation belts." },
      { year: 1979, name: "Voyager 1 & 2", agency: "NASA", milestone: "Discovered Jupiter's faint rings and active volcanism on moon Io." },
      { year: 1995, name: "Galileo", agency: "NASA", milestone: "First Jupiter orbiter; dropped atmospheric entry probe into the swirling clouds." },
      { year: 2016, name: "Juno", agency: "NASA", milestone: "Polar orbit investigations mapping gravitational anomalies, deep water, and magnetic fields." }
    ],
    funFacts: [
      "The Great Red Spot is so vast that an entire Earth could fit comfortably inside it.",
      "Jupiter completes a full rotation every 9.9 hours, creating a noticeable equatorial bulge.",
      "Its moon Ganymede is larger than Mercury and is the only moon in the solar system with its own magnetic field.",
      "Jupiter emits more heat than it receives from the Sun due to ongoing Kelvin-Helmholtz gravitational contraction."
    ],
    starterPrompts: [
      "What causes the Great Red Spot storm to survive for centuries?",
      "Why is metallic hydrogen so crucial to Jupiter's magnetosphere?",
      "Could Jupiter have become a second star if it had more mass?"
    ],
    visual: {
      radius: 5.5,
      distance: 98,
      orbitSpeed: 0.009,
      rotationSpeed: 0.03,
      tilt: 0.05,
      color: 0xf59e0b,
      atmosphereGlow: 0xfbbf24
    }
  },

  saturn: {
    id: "saturn",
    name: "Saturn",
    latinName: "Saturnus",
    category: "Gas Giant",
    tagline: "The jewel of the solar system with glorious icy ring architecture",
    overview: "Saturn is world-renowned for its dazzling ring system composed of billions of chunks of pure water ice and rocky debris. It has the lowest average density of any planet—low enough that it would float in a giant bathtub of water if one existed!",
    metrics: {
      radius_km: 58232,
      radius_earth_ratio: 9.13,
      mass_kg: "5.683 × 10²⁶",
      mass_earth_ratio: 95.2,
      surface_gravity: 10.44,
      gravity_earth_ratio: 1.06,
      density_g_cm3: 0.687,
      escape_velocity_km_s: 35.5,
      distance_from_sun_mkm: 1433.5,
      distance_au: 9.582,
      orbital_period: "29.45 Earth years",
      rotation_period: "10 hours 33 minutes",
      axial_tilt_deg: 26.73,
      avg_temp_c: -140,
      min_temp_c: -178,
      max_temp_c: -130,
      moons_count: 146
    },
    atmosphere: [
      { gas: "Hydrogen (H₂)", percent: 96.3, color: "#f87171" },
      { gas: "Helium (He)", percent: 3.25, color: "#fbbf24" },
      { gas: "Methane (CH₄)", percent: 0.45, color: "#60a5fa" },
      { gas: "Ammonia & Hydrogen deuteride", percent: 0.05, color: "#c084fc" }
    ],
    structure: [
      { layer: "Upper Atmosphere & Clouds", thickness: "Ammonia ice haze", desc: "Golden-hued ammonium cloud decks featuring a persistent hexagonal storm at the north pole.", color: "#fef08a" },
      { layer: "Liquid Molecular Hydrogen", thickness: "20,000 km", desc: "Deep convection envelope with helium rain droplets condensing and falling toward the interior.", color: "#fde047" },
      { layer: "Liquid Metallic Hydrogen", thickness: "15,000 km", desc: "Conductive metallic hydrogen generating Saturn's symmetrical magnetic dipole.", color: "#eab308" },
      { layer: "Rocky & Ice Core", thickness: "10-20 Earth masses", desc: "Dense silicate rock and iron core enveloped by thick high-pressure ice.", color: "#a16207" }
    ],
    survival: {
      time: "0.0 seconds",
      rating: "CRUSHED & FREEZING",
      verdict: "Freezing outer clouds plunging into supersonic winds and crushing atmospheric pressures that liquefy metal."
    },
    missions: [
      { year: 1980, name: "Voyager 1 & 2", agency: "NASA", milestone: "Revealed intricate ring structure, braided shepherd moons, and Titan's smoggy atmosphere." },
      { year: 2004, name: "Cassini-Huygens", agency: "NASA / ESA / ASI", milestone: "13-year orbital mission; deployed Huygens lander to Titan's surface and discovered Enceladus water geysers." }
    ],
    funFacts: [
      "Saturn's rings span up to 282,000 kilometers wide, but in most places are only 10 to 30 meters thick!",
      "Saturn has 146 confirmed moons—the highest moon count of any planet in our solar system.",
      "A massive hexagonal hurricane sits permanently atop Saturn's north pole, each side longer than Earth's diameter.",
      "The rings are steadily disappearing: gravitational ring rain pulls tons of water ice into Saturn's atmosphere every second."
    ],
    starterPrompts: [
      "How old are Saturn's rings and how did they form?",
      "What causes the mysterious hexagonal storm at Saturn's north pole?",
      "Could Saturn's moon Titan sustain human exploration?"
    ],
    visual: {
      radius: 4.8,
      distance: 130,
      orbitSpeed: 0.006,
      rotationSpeed: 0.025,
      tilt: 0.47,
      color: 0xfde047,
      rings: {
        innerRadius: 6.5,
        outerRadius: 11.5,
        color: 0xd4be8d
      }
    }
  },

  uranus: {
    id: "uranus",
    name: "Uranus",
    latinName: "Uranus",
    category: "Ice Giant",
    tagline: "The sideways rolling ice giant with an eerie cyan glow",
    overview: "Uranus is an ice giant composed of water, ammonia, and methane ices. Unique among the planets, its rotation axis is tilted by an extraordinary 97.8 degrees—meaning it literally rolls along its orbital path like a bowling ball, resulting in 42-year-long polar winters.",
    metrics: {
      radius_km: 25362,
      radius_earth_ratio: 3.98,
      mass_kg: "8.681 × 10²⁵",
      mass_earth_ratio: 14.54,
      surface_gravity: 8.69,
      gravity_earth_ratio: 0.89,
      density_g_cm3: 1.27,
      escape_velocity_km_s: 21.3,
      distance_from_sun_mkm: 2872.5,
      distance_au: 19.19,
      orbital_period: "84.0 Earth years",
      rotation_period: "17 hours 14 minutes (Retrograde sideways spin)",
      axial_tilt_deg: 97.77,
      avg_temp_c: -195,
      min_temp_c: -224,
      max_temp_c: -197,
      moons_count: 28
    },
    atmosphere: [
      { gas: "Hydrogen (H₂)", percent: 82.5, color: "#f87171" },
      { gas: "Helium (He)", percent: 15.2, color: "#fbbf24" },
      { gas: "Methane (CH₄)", percent: 2.3, color: "#22d3ee" },
      { gas: "Hydrogen Deuteride", percent: 0.01, color: "#cbd5e1" }
    ],
    structure: [
      { layer: "Upper Atmosphere", thickness: "H₂ / He / CH₄ haze", desc: "Methane gas absorbs red light and reflects cyan wavelengths, creating its calm turquoise color.", color: "#67e8f9" },
      { layer: "Icy Fluid Mantle", thickness: "Supercritical slush", desc: "Electrically conducting 'water-ammonia-methane ocean' with temperatures reaching thousands of degrees.", color: "#06b6d4" },
      { layer: "Silicate & Iron Core", thickness: "0.55 Earth masses", desc: "Small dense rocky core at the geometric center.", color: "#0891b2" }
    ],
    survival: {
      time: "0.0 seconds",
      rating: "CRYO-ASPHYXIATION",
      verdict: "Record-breaking cold temperatures of -224°C, absence of oxygen, and high pressures create an instantly lethal environment."
    },
    missions: [
      { year: 1986, name: "Voyager 2", agency: "NASA", milestone: "The only spacecraft to ever visit Uranus, discovering 10 new moons and 2 new rings." },
      { year: 2030, name: "Uranus Orbiter & Probe", agency: "NASA (Proposed Decadal)", milestone: "Flagship mission planned to drop a descent probe into the cyan ice giant." }
    ],
    funFacts: [
      "Because Uranus rolls on its side, each pole gets 42 continuous years of uninterrupted sunlight followed by 42 years of total darkness.",
      "Uranus holds the record for the coldest recorded atmosphere in the solar system at -224°C.",
      "All of Uranus's 28 moons are named after characters from William Shakespeare and Alexander Pope.",
      "Uranus has 13 faint, vertical rings made of dark organic-rich boulder debris."
    ],
    starterPrompts: [
      "What catastrophic impact knocked Uranus onto its side?",
      "Why is Uranus colder than Neptune, even though Neptune is further away?",
      "What is an ice giant's mantle made of?"
    ],
    visual: {
      radius: 3.4,
      distance: 165,
      orbitSpeed: 0.004,
      rotationSpeed: -0.015,
      tilt: 1.7,
      color: 0x22d3ee,
      atmosphereGlow: 0x67e8f9,
      rings: {
        innerRadius: 4.2,
        outerRadius: 6.0,
        color: 0x0891b2,
        opacity: 0.4
      }
    }
  },

  neptune: {
    id: "neptune",
    name: "Neptune",
    latinName: "Neptunus",
    category: "Ice Giant",
    tagline: "The supersonic storm world of the solar system's outer rim",
    overview: "Neptune is the most distant major planet from the Sun, cast in deep cerulean blue. Despite receiving feeble sunlight, it possesses the most violent supersonic winds in the entire solar system—blowing up to 2,100 km/h—and an intriguing retrograde moon, Triton, with active cryovolcanoes.",
    metrics: {
      radius_km: 24622,
      radius_earth_ratio: 3.86,
      mass_kg: "1.024 × 10²⁶",
      mass_earth_ratio: 17.15,
      surface_gravity: 11.15,
      gravity_earth_ratio: 1.14,
      density_g_cm3: 1.64,
      escape_velocity_km_s: 23.5,
      distance_from_sun_mkm: 4495.1,
      distance_au: 30.07,
      orbital_period: "164.8 Earth years",
      rotation_period: "16 hours 6 minutes",
      axial_tilt_deg: 28.32,
      avg_temp_c: -201,
      min_temp_c: -218,
      max_temp_c: -200,
      moons_count: 16
    },
    atmosphere: [
      { gas: "Hydrogen (H₂)", percent: 80.0, color: "#f87171" },
      { gas: "Helium (He)", percent: 19.0, color: "#fbbf24" },
      { gas: "Methane (CH₄)", percent: 1.5, color: "#38bdf8" },
      { gas: "Ammonia & Hydrogen deuteride", percent: 0.02, color: "#c084fc" }
    ],
    structure: [
      { layer: "Upper Atmosphere", thickness: "Methane cloud bands", desc: "Features high-altitude methane cirrus clouds and dark vortices driven by internal thermal heat.", color: "#3b82f6" },
      { layer: "Mantle (Hot Dense Fluid)", thickness: "Water, ammonia & methane", desc: "Extreme pressure may compress carbon into showers of diamond rain falling through the mantle!", color: "#1d4ed8" },
      { layer: "Silicate & Nickel-Iron Core", thickness: "1.2 Earth masses", desc: "Rocky core radiating 2.6 times more heat into space than the planet absorbs from the Sun.", color: "#1e3a8a" }
    ],
    survival: {
      time: "0.0 seconds",
      rating: "SUPERSONIC SHREDDING & CRYO-DEATH",
      verdict: "Supersonic winds exceeding 2,000 km/h combined with -200°C temperatures would tear apart and freeze any unprotected human in milliseconds."
    },
    missions: [
      { year: 1989, name: "Voyager 2", agency: "NASA", milestone: "The only spacecraft encounter with Neptune, capturing the Great Dark Spot and Triton geysers." }
    ],
    funFacts: [
      "Neptune's winds exceed 2,100 km/h—faster than the speed of sound on Earth!",
      "It takes Neptune nearly 165 Earth years to complete one orbit around the Sun. It completed its first orbit since discovery in 2011.",
      "Neptune radiates 2.6 times more internal heat than it receives from the distant Sun.",
      "Its largest moon, Triton, orbits backward (retrograde), indicating it was a captured Kuiper Belt object.",
      "Extreme pressures deep in Neptune's mantle can cause 'diamond rain' where carbon atoms crystallize into diamonds."
    ],
    starterPrompts: [
      "What drives 2,000 km/h winds on Neptune when it receives so little solar warmth?",
      "Is the theory of diamond rain inside Neptune scientifically supported?",
      "Why is moon Triton predicted to be torn apart into rings in the future?"
    ],
    visual: {
      radius: 3.3,
      distance: 195,
      orbitSpeed: 0.003,
      rotationSpeed: 0.018,
      tilt: 0.49,
      color: 0x2563eb,
      atmosphereGlow: 0x3b82f6
    }
  },

  pluto: {
    id: "pluto",
    name: "Pluto",
    latinName: "Pluto",
    category: "Dwarf Planet (Kuiper Belt)",
    tagline: "The heart-shaped icy wonder at the edge of the dark abyss",
    overview: "Once considered the ninth planet, Pluto is the recognized king of the Kuiper Belt. In 2015, NASA's New Horizons probe revealed a geologically active world of soaring water-ice mountains, floating nitrogen glaciers, and a giant heart-shaped nitrogen plain named Tombaugh Regio.",
    metrics: {
      radius_km: 1188.3,
      radius_earth_ratio: 0.186,
      mass_kg: "1.303 × 10²²",
      mass_earth_ratio: 0.0022,
      surface_gravity: 0.62,
      gravity_earth_ratio: 0.063,
      density_g_cm3: 1.85,
      escape_velocity_km_s: 1.21,
      distance_from_sun_mkm: 5906.4,
      distance_au: 39.48,
      orbital_period: "248 Earth years (Inclined 17.2°)",
      rotation_period: "6.39 Earth days (Tidally locked to Charon)",
      axial_tilt_deg: 122.53,
      avg_temp_c: -230,
      min_temp_c: -240,
      max_temp_c: -218,
      moons_count: 5
    },
    atmosphere: [
      { gas: "Nitrogen (N₂)", percent: 99.0, color: "#93c5fd" },
      { gas: "Methane (CH₄)", percent: 0.5, color: "#38bdf8" },
      { gas: "Carbon Monoxide (CO)", percent: 0.5, color: "#e2e8f0" }
    ],
    structure: [
      { layer: "Surface Crust & Ice Mountains", thickness: "Water & nitrogen ice", desc: "Mountains of pure water ice reaching 3,500 meters high, with slow-flowing nitrogen glaciers.", color: "#cbd5e1" },
      { layer: "Liquid Subsurface Ocean?", thickness: "100 km", desc: "Evidence suggests a sloshing liquid water-ammonia ocean may persist under the insulating ice shell.", color: "#0284c7" },
      { layer: "Dense Rocky Core", thickness: "1,700 km diameter", desc: "Silicate rock mantle providing radioactive decay heat to warm the ocean.", color: "#64748b" }
    ],
    survival: {
      time: "~10 seconds",
      rating: "CRYO-VACUUM",
      verdict: "Temperatures hovering around -230°C in an ultra-thin vacuum-level exosphere will instantly freeze biological tissue."
    },
    missions: [
      { year: 2015, name: "New Horizons", agency: "NASA", milestone: "Historic flyby capturing high-resolution imagery of Pluto's heart and moons." }
    ],
    funFacts: [
      "Pluto has a giant heart-shaped glacier named Sputnik Planitia made of frozen nitrogen, methane, and carbon monoxide.",
      "Pluto and its largest moon, Charon, form a double-dwarf planet system orbiting a shared center of gravity in open space.",
      "A year on Pluto is 248 Earth years; it hasn't completed a single full orbit since its discovery in 1930!",
      "The sky on Pluto is blue with complex layers of hydrocarbon photochemical haze."
    ],
    starterPrompts: [
      "Why was Pluto reclassified as a dwarf planet by the IAU in 2006?",
      "How does Pluto maintain geologically active glaciers at -230°C?",
      "Could a subsurface liquid ocean exist on Pluto?"
    ],
    visual: {
      radius: 0.9,
      distance: 225,
      orbitSpeed: 0.002,
      rotationSpeed: -0.006,
      tilt: 2.1,
      color: 0xca8a04
    }
  }
};

// Guided Tours Data
const GUIDED_TOURS = [
  {
    id: "grand-odyssey",
    title: "Grand Planetary Odyssey",
    duration: "6 Stops",
    description: "Embark on an epic voyage from our fiery star all the way through the terrestrial worlds to the giant ringed worlds of the outer solar system.",
    stops: [
      { target: "sun", narrative: "Welcome aboard AstroMind. We begin at the Sun—the gravitational titan holding 99.86% of the solar system together. Thermonuclear fusion in its core creates all light and life." },
      { target: "mercury", narrative: "Arriving at Mercury, the closest planet to the Sun. Scorched by day and frozen by night, this iron-dense world has virtually no atmosphere to shield it from cosmic rays." },
      { target: "earth", narrative: "Approaching Earth, the vibrant blue marble. With liquid oceans, active plate tectonics, and a protective geomagnetic shield, it is the solitary cradle of life we know." },
      { target: "mars", narrative: "Crossing the orbital void to Mars. The Red Planet features Olympus Mons, a volcano three times the height of Everest, and dried riverbeds hinting at an ancient water-rich past." },
      { target: "jupiter", narrative: "Warping past the asteroid belt into Jovian territory. Jupiter is a mammoth world with winds that fuel the Great Red Spot storm, which has raged for centuries." },
      { target: "saturn", narrative: "Concluding our Grand Odyssey at Saturn. Behold its glorious rings of water ice and rock, spanning nearly 300,000 kilometers yet only tens of meters thick." }
    ]
  },
  {
    id: "alien-oceans",
    title: "The Search for Alien Oceans",
    duration: "3 Stops",
    description: "Follow the trail of astrobiology: explore worlds where liquid oceans exist today beneath frozen crusts, holding potential keys to extraterrestrial life.",
    stops: [
      { target: "earth", narrative: "Earth: the baseline of all known biology. 71% covered in saltwater oceans, harboring hydrothermal vents where life may have first sparked." },
      { target: "jupiter", narrative: "Jupiter's system harbors moon Europa, which hides a global saltwater ocean beneath a 20-km ice shell. Europa has more liquid water than all of Earth's oceans combined!" },
      { target: "saturn", narrative: "Saturn's moons Enceladus and Titan: Enceladus shoots cryovolcanic water plumes into space from hydrothermal vents, while Titan boasts lakes of liquid methane." }
    ]
  },
  {
    id: "terrestrial-rocky",
    title: "Rocky World Geological Wonders",
    duration: "4 Stops",
    description: "Investigate how volcanism, impact craters, and runaway atmospheric physics transformed the four inner terrestrial worlds.",
    stops: [
      { target: "mercury", narrative: "Mercury's surface was shaped by ancient lava flows and the giant Caloris Basin impact, causing tectonic compression cliffs called rupes as the planet cooled." },
      { target: "venus", narrative: "Venus shows what happens when greenhouse warming runs out of control. Over 1,600 major volcanoes blanketed the world in lava, driving carbon dioxide to 96%." },
      { target: "earth", narrative: "Earth's active plate tectonics recycles crust, creating mountains, ocean trenches, and a balanced carbon cycle that prevents the extreme fate of Venus." },
      { target: "mars", narrative: "Mars cooled too quickly, losing its core dynamo and magnetic field. Solar wind stripped its air away, turning a temperate world into a freeze-dried desert." }
    ]
  }
];

// Offline AstroMind Neural Knowledge Base & Prompt Categorization
const AI_KNOWLEDGE_BASE = {
  // Common keywords to match topics
  intents: [
    {
      keywords: ["venus", "hotter", "mercury", "temperature"],
      answer: "### Why Venus is Hotter than Mercury\n\nEven though Mercury is twice as close to the Sun (58M km vs 108M km), **Venus is significantly hotter**, with an average surface temperature of **465°C** compared to Mercury's **167°C**.\n\n* **Runaway Greenhouse Effect:** Venus's atmosphere is **96.5% Carbon Dioxide** and 92 times denser than Earth's. It acts like an impenetrable thermal blanket, trapping solar infrared radiation.\n* **No Atmosphere on Mercury:** Mercury has virtually no atmosphere (only an ultra-tenuous exosphere). Heat radiates directly into empty space the moment the Sun sets, plunging nighttime temperatures down to **-180°C**."
    },
    {
      keywords: ["life", "alien", "europa", "enceladus", "titan", "habitable"],
      answer: "### Where Could Life Exist in the Solar System?\n\nAstrobiologists consider the following worlds top candidates:\n\n1. **Europa (Moon of Jupiter):** Hides a subsurface liquid ocean containing **2-3x more water than Earth**. Hydrothermal vents at its seafloor could provide chemical energy for chemosynthetic life.\n2. **Enceladus (Moon of Saturn):** Cassini directly sampled geysers shooting from its south polar fissures, detecting water vapor, molecular hydrogen, salts, and complex organic molecules.\n3. **Titan (Moon of Saturn):** Features rivers and lakes of liquid methane and ethane, plus a prebiotic nitrogen atmosphere—a testbed for alternative non-water biochemistry.\n4. **Mars:** Subsurface brines or caves may harbor fossilized or extremophile microbial life from its ancient wet era."
    },
    {
      keywords: ["great red spot", "jupiter storm", "storm"],
      answer: "### The Great Red Spot: Nature's Super-Storm\n\n* **Scale:** An anticyclonic vortex spanning over **16,000 km across**—large enough to swallow Earth whole.\n* **Longevity:** Continuously observed for at least **350 years** (first recorded in the 17th century).\n* **Mechanism:** Fueled by Jupiter's internal convective heat and sandwiched between two counter-flowing jet streams (eastward above, westward below) that act like cosmic gears keeping the storm spinning at winds up to **680 km/h**."
    },
    {
      keywords: ["saturn", "rings", "ring", "origin", "disappear"],
      answer: "### Saturn's Rings: Structure & Fate\n\n* **Composition:** 99% pure water ice, with traces of tholins and silicate dust, ranging from pebble-sized grains to house-sized boulders.\n* **Extreme Thinness:** While the main rings span **282,000 km across**, they are only about **10 to 30 meters thick**!\n* **Origin:** Likely formed when an icy moon or comet wandered too close and was shredded apart inside Saturn's Roche limit about 100-200 million years ago.\n* **Ring Rain:** Saturn is actively pulling the rings into its atmosphere via magnetic gravity. At this rate, the rings may vanish in **100 to 300 million years**."
    },
    {
      keywords: ["olympus mons", "tallest volcano", "mars mountain"],
      answer: "### Olympus Mons: The Solar System's Colossus\n\n* **Height:** **21.9 km (72,000 ft)** above Martian datum—nearly **3 times taller than Mt. Everest**.\n* **Width:** Roughly **600 km across** (equal to the size of the entire state of Arizona or France).\n* **Why so large?** Mars has only 38% of Earth's gravity and **lacks moving tectonic plates**. The crust remained stationary over a stationary volcanic mantle plume for millions of years, stacking lava layer upon layer without shifting."
    },
    {
      keywords: ["pluto", "dwarf planet", "not a planet", "reclassified"],
      answer: "### Why Pluto is a Dwarf Planet\n\nIn 2006, the International Astronomical Union (IAU) established 3 criteria for a full planet:\n\n1. Must orbit the Sun: **Yes (Pluto orbits Sol).**\n2. Must have sufficient mass to assume a nearly round hydrostatic equilibrium shape: **Yes (Pluto is round).**\n3. Must have cleared the neighborhood around its orbit: **No!**\n\nPluto resides in the Kuiper Belt surrounded by thousands of icy trans-Neptunian objects (like Eris, Makemake, and Haumea) and shares its orbital resonance with Neptune. It only accounts for a fraction of the mass in its orbital zone."
    },
    {
      keywords: ["sun", "core", "fusion", "energy"],
      answer: "### How the Sun Generates Energy\n\n* **Proton-Proton Fusion:** At the core's 15,000,000°C temperature and 250 billion atm pressure, four hydrogen protons fuse into one helium nucleus.\n* **Mass Loss:** The resulting helium nucleus has slightly less mass (0.7% less). By Einstein's equation **E = mc²**, this missing mass converts into pure radiant energy.\n* **Scale:** Every second, the Sun converts **600 million tons of hydrogen** into 596 million tons of helium, releasing energy equivalent to 100 billion megatons of TNT every second."
    },
    {
      keywords: ["black hole", "event horizon", "singularity"],
      answer: "### Black Holes: Gravity at the Extreme\n\n* **Event Horizon:** The boundary of no return where escape velocity equals and then surpasses the speed of light ($c$). Nothing, not even light, can escape.\n* **Time Dilation:** Due to general relativity, an outside observer watching you fall toward an event horizon would see your clock slow down exponentially until your image freezes and red-shifts into invisibility.\n* **Spaghettification:** Extreme tidal gravity gradient pulls much harder on your feet than your head, stretching matter into long noodle-like strands."
    },
    {
      keywords: ["speed of light", "travel time", "distance"],
      answer: "### Light Travel Times in the Solar System\n\n* **Moon to Earth:** ~1.3 seconds\n* **Sun to Earth (1 AU):** ~8 minutes 20 seconds\n* **Earth to Mars:** 3 to 22 minutes (depending on orbital alignment)\n* **Sun to Jupiter:** ~43 minutes\n* **Sun to Saturn:** ~1 hour 20 minutes\n* **Sun to Neptune:** ~4 hours 10 minutes\n* **Sun to Voyager 1 (Interstellar space):** ~22.5 hours"
    }
  ]
};

// Comprehensive Dynamic Quiz Question Bank
const QUIZ_QUESTIONS = [
  // Novice / Stargazer
  {
    id: 1,
    difficulty: "novice",
    category: "solar_system",
    question: "Which planet is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    answerIndex: 1,
    explanation: "Venus is the hottest planet at 465°C due to a runaway greenhouse effect from its dense 96.5% carbon dioxide atmosphere."
  },
  {
    id: 2,
    difficulty: "novice",
    category: "planets",
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
    answerIndex: 2,
    explanation: "Jupiter is more than twice as massive as all the other planets in the solar system combined."
  },
  {
    id: 3,
    difficulty: "novice",
    category: "sun",
    question: "Approximately what percentage of the Solar System's total mass is contained within the Sun?",
    options: ["50%", "75%", "90%", "99.86%"],
    answerIndex: 3,
    explanation: "The Sun contains an astounding 99.86% of all mass in our solar system."
  },
  {
    id: 4,
    difficulty: "novice",
    category: "mars",
    question: "What gives Mars its characteristic rusty reddish appearance?",
    options: ["Red vegetation", "Iron oxide (rust)", "Sulfuric acid lakes", "Copper deposits"],
    answerIndex: 1,
    explanation: "Iron oxide—common rust—covers Martian regolith and dust, scattering red wavelengths."
  },
  {
    id: 5,
    difficulty: "novice",
    category: "earth_moon",
    question: "How long does it take sunlight to travel from the Sun to Earth?",
    options: ["Instantaneous", "8 seconds", "8 minutes and 20 seconds", "1 hour"],
    answerIndex: 2,
    explanation: "Traveling at 300,000 km/s across 150 million km, photons take roughly 8 minutes and 20 seconds to reach Earth."
  },

  // Intermediate / Cosmonaut
  {
    id: 6,
    difficulty: "intermediate",
    category: "moons",
    question: "Which moon is the only one in the solar system known to have its own internally generated magnetic field?",
    options: ["Europa", "Ganymede", "Titan", "Triton"],
    answerIndex: 1,
    explanation: "Ganymede (Jupiter's largest moon) possesses a liquid iron-rich core that generates its own magnetosphere."
  },
  {
    id: 7,
    difficulty: "intermediate",
    category: "saturn",
    question: "What is remarkable about Saturn's density compared to liquid water?",
    options: ["It is 10x denser than water", "It has the exact same density", "It is less dense than water and would float", "It is made of metallic lead"],
    answerIndex: 2,
    explanation: "Saturn's average density is only 0.687 g/cm³—lower than water (1.0 g/cm³). If you had a bathtub big enough, Saturn would float!"
  },
  {
    id: 8,
    difficulty: "intermediate",
    category: "uranus",
    question: "What is unusual about Uranus's axial tilt?",
    options: ["It has zero tilt", "It spins upside down at 97.8 degrees", "It wobbles wildly every hour", "Its axis points directly at Earth"],
    answerIndex: 1,
    explanation: "With an axial tilt of 97.77°, Uranus literally rolls along its orbital plane, likely due to a colossal ancient protoplanetary impact."
  },
  {
    id: 9,
    difficulty: "intermediate",
    category: "mars",
    question: "Olympus Mons on Mars is the tallest volcano in the solar system. How tall is it compared to Mount Everest?",
    options: ["About the same height", "Roughly 3 times taller", "Half the height", "10 times taller"],
    answerIndex: 1,
    explanation: "Olympus Mons stands 21.9 km tall—nearly three times the height of Mount Everest above sea level."
  },
  {
    id: 10,
    difficulty: "intermediate",
    category: "spaceflight",
    question: "Which spacecraft is the only human probe to ever fly past both Uranus and Neptune?",
    options: ["Pioneer 10", "Cassini", "Voyager 2", "New Horizons"],
    answerIndex: 2,
    explanation: "Voyager 2 flew past Uranus in 1986 and Neptune in 1989, completing NASA's famous Grand Tour of the outer planets."
  },

  // Expert / Astrophysicist
  {
    id: 11,
    difficulty: "expert",
    category: "astrophysics",
    question: "What state of matter in Jupiter's interior is believed to generate its immense planetary magnetic field?",
    options: ["Solid iron-nickel crystals", "Liquid metallic hydrogen", "Superheated plasma steam", "Gaseous helium currents"],
    answerIndex: 1,
    explanation: "At pressures exceeding 2 million atmospheres, hydrogen electrons become delocalized, behaving like a liquid metal conductor."
  },
  {
    id: 12,
    difficulty: "expert",
    category: "moons",
    question: "What is the primary heat source keeping Europa's subsurface ocean liquid despite being in deep space?",
    options: ["Sunlight penetrating the ice", "Tidal flexing from Jupiter's gravitational gradient", "Decay of uranium in the crust", "Volcanic greenhouse atmosphere"],
    answerIndex: 1,
    explanation: "Gravitational tidal tugs from Jupiter and orbital resonances with Io and Ganymede continuously stretch Europa, generating friction and internal heat."
  },
  {
    id: 13,
    difficulty: "expert",
    category: "astrophysics",
    question: "What is the phenomenon where carbon in the high-pressure mantles of Uranus and Neptune may crystallize into gems?",
    options: ["Sublimation", "Diamond Rain", "Opal Condensation", "Cryo-crystallization"],
    answerIndex: 1,
    explanation: "Pressures and temperatures deep inside ice giants dissociate methane into carbon and hydrogen, causing carbon to compress into solid diamonds that sink toward the core."
  },
  {
    id: 14,
    difficulty: "expert",
    category: "celestial_mechanics",
    question: "Mercury's orbital period is 88 Earth days, while its rotation period is 58.6 Earth days. What is this gravitational relationship called?",
    options: ["1:1 Tidal Lock", "3:2 Spin-Orbit Resonance", "2:1 Kozai Resonance", "Lagrange Equilibrium"],
    answerIndex: 1,
    explanation: "Mercury completes exactly three rotations on its axis for every two orbits around the Sun—a 3:2 spin-orbit resonance."
  },
  {
    id: 15,
    difficulty: "expert",
    category: "atmosphere",
    question: "Which moon in the solar system possesses a dense nitrogen atmosphere and stable lakes of liquid hydrocarbons on its surface?",
    options: ["Europa", "Enceladus", "Triton", "Titan"],
    answerIndex: 3,
    explanation: "Saturn's moon Titan has a 1.5 atm surface pressure atmosphere composed of 95% nitrogen, with lakes of liquid methane and ethane."
  }
];
