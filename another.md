---

## 🛠️ Technology Stack & Dependencies

### 1. Frontend & Presentation Deck (Web Command Center for Admin)
* **Framework**: React 19 + Vite 8
* **Styling**: Tailwind CSS v4 (Vanilla CSS variables + warm stone palette)
* **Geospatial Mapping**: Leaflet + React-Leaflet + CartoDB Voyager light tiles (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`)
* **Data Visualization**: Recharts (Predictive Area/Line charts for 90-min rainfall and wind trends)
* **Icons & UI Utilities**: Lucide React
* **Audio Alerts**: Web Audio API Synthesizer (browser-native emergency siren sound engine)

### 2. Backend & Data Architecture
* **API Ingestion**: Open-Meteo API (`https://api.open-meteo.com/v1/forecast` — 100% free, 10,000 calls/day, no API key required) & OpenWeatherMap API
* **Database**: Relational DB (PostgreSQL / SQLite) for historical weather telemetry, alert logs, and sector risk levels
* **RAG / Vector Engine**: pgvector / ChromaDB for embedding unstructured meteorological reports, disaster management SOP guidelines, and historical flood response protocols
* **Alert Format**: Common Alert Protocol (CAP v1.2 standard)

---

## 📁 Project Directory Structure

```
SIH 2k26/
├── index.html                     # HTML root entry with Google Fonts & body class
├── architecture_diagram.html      # Standalone printable 100% Software Architecture HTML/PDF page
├── Implementation.md              # Comprehensive context document for AI tools & developers
├── package.json                   # Dependencies (react, vite, tailwindcss, lucide-react, recharts, leaflet)
├── vite.config.js                 # Vite build configuration
├── public/
│   └── architecture_diagram.html  # Public copy served statically at /architecture_diagram.html
└── src/
    ├── main.jsx                    # React entry point
    ├── App.jsx                     # Top-level routing & layout wrapper
    ├── index.css                   # Custom CSS variables, scrollbars & Leaflet theme
    ├── context/
    │   └── SimulationContext.jsx   # State management (Scenario, Location, Language, Audio Siren, Toasts)
    ├── data/
    │   ├── demoLocations.js        # 7 Monitored micro-sectors (lat, lng, elevation, vulnerability)
    │   ├── demoWeatherData.js      # Weather scenarios & 90-min forecast timeline vectors
    │   └── demoAlerts.js           # CAP v1.2 alert templates & multilingual dictionaries (EN, MR, HI)
    ├── services/
    │   └── weatherApi.js           # Live Open-Meteo API integration & free weather API guidance
    └── components/
        ├── Navbar.jsx              # Clean header with navigation links, scenario toggles & presentation mode
        ├── HeroLanding.jsx         # Minimalist landing hero section
        ├── LiveDashboard.jsx       # 6 Telemetry metric cards
        ├── HyperLocalMap.jsx       # Leaflet geospatial map with risk circles
        ├── NowcastingTimeline.jsx  # Recharts 90-minute predictive forecast area chart
        ├── AiRiskEngine.jsx        # AI score ring & factor weighting breakdown
        ├── EarlyWarningSystem.jsx  # Active emergency warning card & shelter modal
        ├── UserExperienceCitizen.jsx# Android smartphone mockup (Multilingual EN / MR / HI)
        ├── AdminControlPanel.jsx   # Admin manual telemetry input, RAG query & mobile push dispatch
        ├── ComparisonSection.jsx   # Traditional Bulletins vs AGNI-CAST Matrix
        ├── SystemArchitecture.jsx  # In-app interactive architecture diagram component
        ├── ApiDataInfo.jsx         # Interactive free weather API fetch & testing component
        ├── PresentationModeView.jsx# 9-slide deck controllable via Keyboard Arrow Left/Right
        ├── DemoSimulationControls.jsx # Quick scenario selector toolbar
        └── NotificationToast.jsx   # Floating emergency risk toast
```

---

## 🚀 How to Run and Test Locally

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation & Execution
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# App will run at: http://localhost:5173/
# Standalone Architecture Diagram: http://localhost:5173/architecture_diagram.html
```

### Production Build Test
```bash
# Build production bundle
npm run build
```

---