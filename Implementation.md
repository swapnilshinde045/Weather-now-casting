# AGNI-CAST (SIH26077): AI-Driven Hyper-Local Early Warning System for Severe Weather Nowcasting

> **Project Code**: SIH26077  
> **Topic**: AI-Driven Hyper-Local Early Warning System for Severe Weather Nowcasting  
> **Primary Satellite Stream**: INSAT-3DR (ISRO Meteorological Satellite Imager & Sounder)  
> **RAG Architecture Type**: Multimodal HyDE Graph RAG (Hybrid Dense-Sparse Vector Retrieval + Hypothetical Document Embeddings + SOP Knowledge Graph)  
> **System Architecture**: 100% Software Solution (Admin Web Portal + Citizen Android App) — 0 Hardware  

---

## 📋 Executive Summary & Problem Statement

Traditional weather forecasting relies on broad, district-level bulletins issued hours in advance. These bulletins lack spatial resolution and fail during hyper-local extreme weather events like cloudbursts, severe flash floods, and localized thunderstorms, which occur in micro-sectors (1–3 km grid) over very short time windows (15 to 90 minutes).

**AGNI-CAST (SIH26077)** is a 100% software-based end-to-end Nowcasting and Early Warning ecosystem designed for Indian municipal disaster management authorities. It ingests live **INSAT-3DR Satellite** telemetry APIs and radar grid streams, processes data through a spatial-temporal AI model (ConvLSTM + Transformer), persists logs in a database with a **Multimodal HyDE Graph RAG** vector index for disaster SOPs, provides an **Admin Command Web Center**, and dispatches actionable multilingual push advisories directly to an **Android Citizen Mobile App**.

---

## 🏛️ End-to-End System Architecture & RAG Pipeline

```
┌──────────────────────────────────────────────────────────────────────────┐
│              STEP 1: INSAT-3DR Satellite & Weather API Stream            │
│  • PRIMARY: INSAT-3DR Satellite (ISRO Infra-Red & Imager Telemetry)     │
│  • Open-Meteo Weather API (Live Temp, Humidity, Rain Rate, Wind Speed)   │
│  • IMD Doppler Weather Radar Grid API & GIS Elevation Topography         │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │ (JSON Stream over REST / HTTP)
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│             STEP 2 & 3: Database & Multimodal HyDE Graph RAG             │
│  • RAG TYPE: Multimodal HyDE Graph RAG (Hybrid Vector + HyDE + Graph)     │
│  • Vector Index: pgvector / ChromaDB storing INSAT-3DR & ISRO SOP Manuals │
│  • PostgreSQL Real-Time DB (Telemetry History Logs, Sent Alerts, Risks)  │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │ (Streams Real-Time Values)
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│              STEP 4 & 5: Admin Web Portal & Human Approval Loop          │
│  • Real-Time Dashboard & Leaflet Sector Map (🟢 SAFE → 🟣 CLOUDBURST)    │
│  • Severe Threat Target Focus: Thunderstorms, Cloudbursts & Flash Floods  │
│  • Human-in-the-Loop Approval: Admin reviews RAG advisory & dispatches   │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │ (Dispatches Approved Bulletin)
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│         STEP 6: Citizen Android Mobile App & Nearby Safe Shelters        │
│  • Cell Broadcast Push Alerts (English • मराठी Marathi • हिंदी Hindi)     │
│  • GPS Evacuation Finder: Directs to high-ground concrete shelters!      │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack & Architecture

### 1. Primary Satellite & Data Architecture
* **Primary Satellite Stream**: **INSAT-3DR** *(ISRO Hydro-Meteorological Imager & Sounder telemetry for convection & cloudburst tracking)*
* **Weather Telemetry APIs**: Open-Meteo API & OpenWeatherMap Stream
* **RAG Architecture Type**: **Multimodal HyDE Graph RAG** *(Hybrid Dense-Sparse Vector Retrieval + Hypothetical Document Embeddings + SOP Knowledge Graph)*
* **Vector Database**: pgvector / ChromaDB *(Embeddings index for ISRO disaster SOP manuals, flood response guidelines, and drainage protocols)*
* **Relational Database**: PostgreSQL / SQLite *(Real-time weather logs, risk vectors, sent alerts, and sector registries)*

### 2. Frontend & Presentation Deck (Web Command Center for Admin)
* **Framework**: React 19 + Vite 8
* **Styling**: Tailwind CSS v4 (Minimalist Classic Cream Theme `#faf7f2`)
* **Geospatial Mapping**: Leaflet + React-Leaflet + CartoDB Voyager light tiles
* **Data Visualization**: Recharts (Predictive Area/Line charts for 90-min rainfall and wind trends)
* **Audio Alerts**: Web Audio API Synthesizer (browser-native emergency siren sound engine)

### 3. Citizen Android Mobile App
* **Mobile Framework**: Native Android / React Native
* **Alert Delivery System**: Cell Broadcast System (CBS) + High-Priority Push Engine (CAP v1.2 Protocol)
* **Multilingual Localization**: i18n Engine (English, Marathi मराठी, Hindi हिंदी)
* **Shelter & Evacuation Finder**: GPS Map Router to concrete high-ground shelters during flash floods

---

## 📊 Weather Simulation Scenarios & Risk Thresholds

The app includes four pre-configured weather simulation scenarios for demonstration:

| Scenario | Risk Level | Score | Rain Rate | Wind Speed | Actionable Citizen Advisory |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **NORMAL** | 🟢 SAFE | 12/100 | 0.0 mm/h | 12 km/h | Clear skies. INSAT-3DR indicates normal cloud cover. |
| **MODERATE_RAIN** | 🟡 LOW | 38/100 | 12.5 mm/h | 28 km/h | Light to moderate rainfall. Exercise caution while driving. |
| **HEAVY_RAIN** | 🟠 MODERATE | 65/100 | 42.0 mm/h | 48 km/h | Heavy rain expected in 25 mins. Avoid low-lying underpasses. |
| **SEVERE_WEATHER** | 🔴 HIGH / EXTREME | 86/100 | 88.5 mm/h | 72 km/h | **IMMINENT CLOUDBURST / FLASH FLOOD WARNING**. INSAT-3DR convection anomaly detected. Evacuate to high-ground concrete shelter immediately. |
