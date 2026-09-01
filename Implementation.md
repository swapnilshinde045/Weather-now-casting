# AGNI-CAST (SIH26077): AI-Driven Hyper-Local Early Warning System for Severe Weather Nowcasting

> **Project Code**: SIH26077  
> **Topic**: AI-Driven Hyper-Local Early Warning System for Severe Weather Nowcasting  
> **System Architecture**: 100% Software Solution (Admin Web Portal + Citizen Android App) — 0 Hardware  

---

## 📋 Executive Summary & Problem Statement

Traditional weather forecasting relies on broad, district-level bulletins issued hours in advance. These bulletins lack spatial resolution and fail during hyper-local extreme weather events like cloudbursts, severe flash floods, and localized thunderstorms, which occur in micro-sectors (1–3 km grid) over very short time windows (15 to 90 minutes).

**AGNI-CAST (SIH26077)** is a 100% software-based end-to-end Nowcasting and Early Warning ecosystem designed for Indian municipal disaster management authorities. It ingests live weather telemetry APIs and radar grid streams, processes data through a spatial-temporal AI model (ConvLSTM + Transformer), persists logs in a database with a RAG (Retrieval-Augmented Generation) vector index for disaster SOPs, provides an **Admin Command Web Center**, and dispatches actionable multilingual push advisories directly to an **Android Citizen Mobile App**.

---

## 🏛️ End-to-End System Architecture

```
                               ┌─────────────────────────────────────────────────────────┐
                               │       External Meteorological Data Streams (0 Hardware) │
                               │  • Open-Meteo Weather API (Temp, Humidity, Rain, Wind) │
                               │  • OpenWeatherMap & Atmospheric Pressure Stream        │
                               │  • IMD Doppler Weather Radar Grid API & Satellite      │
                               └──────────────────────────┬──────────────────────────────┘
                                                          │
                                                          ▼ (JSON Data Stream via HTTP/REST)
                               ┌─────────────────────────────────────────────────────────┐
                               │         Backend Data Ingestion & Preprocessor           │
                               │  • REST API Fetcher & Data Normalizer                   │
                               │  • Grid Coordinate Mapping (OpenStreetMap Geocoding)   │
                               └──────────────────────────┬──────────────────────────────┘
                                                          │
                                                          ▼
                               ┌─────────────────────────────────────────────────────────┐
                               │           Cloud Infrastructure & Persistence         │
                               │  • PostgreSQL Database (Telemetry Logs, Alerts, Risks) │
                               │  • Vector DB / RAG Index (Historical SOPs, Guidelines) │
                               └──────────────────────────┬──────────────────────────────┘
                                                          │
                                                          ▼
                               ┌─────────────────────────────────────────────────────────┐
                               │           AI Nowcasting & Risk Core Engine              │
                               │  • ConvLSTM + Spatial-Temporal Transformer Model        │
                               │  • 15–90 Minute Predictive Precipitation Field          │
                               │  • Multi-Factor Risk Assessment Engine (0–100 Score)    │
                               │  • Automated CAP v1.2 Alert Draft Generator             │
                               └──────────────────────────┬──────────────────────────────┘
                                                          │
                                                          ▼
                               ┌─────────────────────────────────────────────────────────┐
                               │         WEBSITE FOR ADMIN (React Web Dashboard)        │
                               │  • Leaflet Geospatial Sector Risk Map                   │
                               │  • Recharts 90-Minute Prediction Timeline               │
                               │  • Admin Review & Control Panel (Human-in-the-Loop)     │
                               └──────────────────────────┬──────────────────────────────┘
                                                          │ (Approves Broadcast)
                                                          ▼
                               ┌─────────────────────────────────────────────────────────┐
                               │         ANDROID APP FOR USERS (Citizen Mobile App)      │
                               │  • Multilingual Push Advisories (EN • मराठी • हिंदी)    │
                               │  • Evacuation Routes & High-Ground Safe Shelter Finder   │
                               └─────────────────────────────────────────────────────────┘
```


## 🎯 Key Application Sections & Features

### 1. Live Command Dashboard (`LiveDashboard.jsx`)
* Displays 6 real-time sector metric cards around monitored districts (e.g., **Waluj MIDC**, **CIDCO**, **City Center**, **Paithan**, **Vaijapur**, **Kannad**, **Shendra**).
* Shows live temperature (°C), relative humidity (%), precipitation rate (mm/h), wind velocity (km/h), and calculated risk badge (🟢 SAFE, 🟡 LOW, 🟠 MODERATE, 🔴 HIGH, 🟣 EXTREME).

### 2. Hyper-Local Geospatial Map (`HyperLocalMap.jsx`)
* Interactive Leaflet map initialized on sector coordinates (e.g., Chhatrapati Sambhajinagar region).
* Color-coded risk circles drawn over micro-sectors reflecting live threat intensity.
* Interactive sector drawer providing sector telemetry breakdown and evacuation routes.

### 3. AI Nowcasting Timeline (`NowcastingTimeline.jsx`)
* Visualizes 90-minute forecast trajectory (`NOW` → `+15m` → `+30m` → `+45m` → `+60m` → `+75m` → `+90m`).
* Plots dual-axis Recharts graph:
  - Expected Rainfall Rate (mm/h)
  - Wind Velocity (km/h)
  - Projected Risk Score (0-100)

### 4. AI Risk Engine Inspector (`AiRiskEngine.jsx`)
* Displays the calculated risk score ring (e.g., `86/100 HIGH RISK`).
* Shows neural factor weight breakdown:
  - Rainfall Intensity Rate Weight (35%)
  - Topographic Low-Lying Elevation Index Weight (25%)
  - Atmospheric Pressure Trend Weight (20%)
  - Soil Saturation & Drainage Capacity Weight (20%)

### 5. Early Warning & Siren System (`EarlyWarningSystem.jsx`)
* Displays active emergency advisories with target sector names and estimated lead times (e.g., "Flash flood warning for Waluj Sector 4 — expected in 18 minutes").
* Web Audio API Siren toggle for testing localized audio alarms.
* High-ground concrete shelter modal with interactive step-by-step citizen evacuation instructions.

### 6. Citizen Mobile Experience (`UserExperienceCitizen.jsx`)
* Realistic smartphone frame mockup demonstrating the **Android App for Users**.
* Supports instant 1-click language toggling between:
  - **English**
  - **Marathi (मराठी)**
  - **Hindi (हिंदी)**

### 7. Admin Control & Dispatch Portal (`AdminControlPanel.jsx`)
* **Manual Data Telemetry Override**: Allows admins to manually enter rainfall (mm/h) and wind speed (km/h) to simulate weather incidents or override API feeds.
* **RAG Disaster SOP Search**: Queries the RAG vector index for unstructured disaster response documents (e.g., "Waluj underpass flash flood protocol").
* **Human-in-the-Loop Alert Review & Send**: Allows admins to review AI-generated alert text, modify citizen advisory wording, and dispatch official CAP v1.2 push alerts to the mobile app and web dashboard.

### 8. Presentation Deck Mode (`PresentationModeView.jsx`)
* Full-screen 9-slide presentation deck designed for live SIH Judges evaluation pitches.
* Fully navigable via **Keyboard Arrow Keys (`←` and `→`)** or on-screen slide controls.
* Top bar includes instant weather scenario triggers (`Normal`, `Moderate Rain`, `Heavy Rain`, `Severe Weather`) for live demonstrations.

### 9. Standalone Printable Architecture Diagram (`/architecture_diagram.html`)
* Pure HTML/Tailwind visual block diagram mimicking exact block-schematic structure.
* Includes 1-click **"Print / Export PDF"** button for pitch presentations and hardcopy reports.

---

## 📊 Weather Simulation Scenarios (`demoWeatherData.js`)

The app includes four pre-configured weather simulation scenarios for demonstration:

| Scenario | Risk Level | Score | Rain Rate | Wind Speed | Actionable Advisory |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **NORMAL** | 🟢 SAFE | 12/100 | 0.0 mm/h | 12 km/h | Clear skies. No weather alerts active. |
| **MODERATE_RAIN** | 🟡 LOW | 38/100 | 12.5 mm/h | 28 km/h | Light to moderate rainfall. Exercise caution while driving. |
| **HEAVY_RAIN** | 🟠 MODERATE | 65/100 | 42.0 mm/h | 48 km/h | Heavy rain expected in 25 mins. Avoid low-lying underpasses. |
| **SEVERE_WEATHER** | 🔴 HIGH / EXTREME | 86/100 | 88.5 mm/h | 72 km/h | **IMMINENT CLOUDBURST / FLASH FLOOD WARNING**. Move to high-ground concrete shelter immediately. |

---

## 💡 How to Use This File with AI Tools

When feeding this file into an AI tool (Gemini, ChatGPT, Claude, DeepSeek):
1. Copy and paste the contents of `Implementation.md`.
2. The AI tool will instantly understand the **entire codebase**, data structure, state context, API integrations, theme system, and business logic without needing to read individual source files!
