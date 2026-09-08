import React from 'react';
import { Globe, CloudRain, Database, Brain, Smartphone, AlertTriangle, ShieldCheck, Sparkles, Key } from 'lucide-react';

export const SystemArchitecture = () => {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6 text-stone-900 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-700 animate-pulse" />
            <h2 className="text-lg font-extrabold text-stone-900">
              Gemini AI Weather Nowcasting Architecture & Flow
            </h2>
          </div>
          <p className="text-xs text-stone-500 font-mono mt-0.5">
            Primary Satellite: INSAT-3DR (ISRO) • AI Engine: Google Gemini API (No Model Training) • Multilingual RAG Advisories
          </p>
        </div>

        <a 
          href="/architecture_diagram.html" 
          target="_blank" 
          rel="noreferrer"
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs font-bold rounded-lg shadow-2xs transition flex items-center space-x-1.5 cursor-pointer"
        >
          <span>Print / Export PPT PDF</span>
          <Globe className="w-3.5 h-3.5 text-amber-400" />
        </a>
      </div>

      {/* 4 Step-by-Step Flow Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch relative">
        
        {/* STEP 1 */}
        <div className="bg-sky-50/70 border-2 border-sky-300 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="text-center border-b border-sky-300 pb-2">
            <div className="text-xs font-black uppercase text-sky-800 tracking-wider font-mono">STEP 1</div>
            <div className="text-sm font-bold text-sky-950">INSAT-3DR Satellite & Weather APIs</div>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="bg-blue-100/90 border-2 border-blue-500 rounded-xl p-3 space-y-1 shadow-sm">
              <div className="font-extrabold text-xs text-blue-950 flex items-center justify-between">
                <span>PRIMARY: INSAT-3DR Satellite</span>
                <span className="text-[9px] bg-blue-700 text-white px-1.5 py-0.5 rounded font-mono font-bold">ISRO STREAM</span>
              </div>
              <p className="text-[10px] text-blue-950 font-semibold leading-tight">
                WV (6.5–7.0µm), TIR-1 (10.2–11.2µm), TIR-2 (11.5–12.5µm) & MIR (3.8–4.0µm) bands for cloud top & moisture monitoring.
              </p>
            </div>

            <div className="bg-white border-2 border-sky-300 rounded-xl p-3 space-y-1 shadow-2xs">
              <div className="font-extrabold text-xs text-sky-950 flex items-center justify-between">
                <span>Open-Meteo & IMDAA Data</span>
                <span className="text-[9px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-mono">Live Stream</span>
              </div>
              <p className="text-[10px] text-stone-600">Temp, RH, CAPE, CIN, Wind Shear & GSMaP-ISRO Rainfall</p>
            </div>

            <div className="bg-white border-2 border-sky-300 rounded-xl p-3 space-y-1 shadow-2xs">
              <div className="font-extrabold text-xs text-sky-950">CartoDEM / SRTM Elevation</div>
              <p className="text-[10px] text-stone-600">Low-lying drainage basin elevation grid for Flash Flood mapping</p>
            </div>
          </div>

          <div className="bg-sky-100 border border-sky-300 p-2 rounded-lg text-center text-[10px] font-mono font-bold text-sky-950">
            ──► Streams Data to Gemini AI Engine
          </div>
        </div>

        {/* STEP 2 */}
        <div className="bg-purple-50/70 border-2 border-purple-300 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="text-center border-b border-purple-300 pb-2">
            <div className="text-xs font-black uppercase text-purple-800 tracking-wider font-mono">STEP 2 & 3</div>
            <div className="text-sm font-bold text-purple-950">Gemini AI Engine & Database</div>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="bg-purple-100 border-2 border-purple-500 rounded-xl p-3 space-y-1.5 shadow-sm">
              <div className="font-black text-xs text-purple-950 flex items-center justify-between">
                <span>Google Gemini API Key</span>
                <span className="text-[9px] bg-purple-700 text-white px-1.5 py-0.5 rounded font-mono font-bold">GEMINI AI</span>
              </div>
              <p className="text-[10px] text-purple-950 font-semibold leading-tight">
                Replaces custom model training with zero-shot Gemini 1.5/2.0 Flash reasoning over INSAT-3DR telemetry.
              </p>
              <div className="text-[9px] text-purple-900 font-mono pt-0.5">
                Generates 15-90 min nowcasts & 0-100 risk scores.
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-400 rounded-xl p-2.5 space-y-1 shadow-2xs">
              <div className="font-extrabold text-xs text-teal-950">Multimodal RAG SOP Index</div>
              <p className="text-[9px] text-teal-900">Retrieves ISRO flood manuals & municipal disaster guidelines</p>
            </div>

            <div className="bg-white border-2 border-purple-400 rounded-xl p-2.5 text-center space-y-1 shadow-2xs">
              <div className="font-black text-xs text-purple-950">PostgreSQL / SQLite DB</div>
              <p className="text-[9px] text-stone-600 font-mono">Stores Real-Time Values & Gemini Forecast Logs</p>
            </div>
          </div>

          <div className="bg-purple-100 border border-purple-300 p-2 rounded-lg text-center text-[10px] font-mono font-bold text-purple-950">
            ──► Streams Real-Time Values to Admin Panel
          </div>
        </div>

        {/* STEP 3 */}
        <div className="bg-amber-50/80 border-2 border-amber-300 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="text-center border-b border-amber-300 pb-2">
            <div className="text-xs font-black uppercase text-amber-800 tracking-wider font-mono">STEP 4 & 5</div>
            <div className="text-sm font-bold text-amber-950">Admin Web Command Portal</div>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="bg-white border-2 border-amber-300 rounded-xl p-3 space-y-1 shadow-2xs">
              <div className="font-extrabold text-xs text-amber-950">Real-Time Dashboard & Leaflet Map</div>
              <p className="text-[10px] text-stone-600">Displays Sector Risk Circles (🟢 SAFE → 🟣 EXTREME Cloudburst)</p>
            </div>

            <div className="bg-rose-50 border-2 border-rose-400 rounded-xl p-3 space-y-1 shadow-2xs">
              <div className="font-black text-xs text-rose-950 flex items-center justify-between">
                <span>Severe Threat Focus</span>
                <span className="text-[9px] bg-rose-200 text-rose-900 px-1 py-0.5 rounded font-mono font-bold">TARGET</span>
              </div>
              <p className="text-[10px] text-rose-900 font-bold">
                • Severe Thunderstorms<br />
                • Imminent Cloudbursts<br />
                • Urban Flash Floods
              </p>
            </div>

            <div className="bg-amber-100 border-2 border-amber-500 rounded-xl p-3 space-y-1 shadow-xs">
              <div className="font-black text-xs text-amber-950 flex items-center justify-between">
                <span>Human Admin Approval</span>
                <span className="text-[9px] bg-amber-300 text-amber-950 px-1.5 py-0.5 rounded font-mono font-bold">DISPATCH</span>
              </div>
              <p className="text-[10px] text-amber-950 font-medium">
                Admin reviews Gemini AI advisory wording & approves cell broadcast dispatch.
              </p>
            </div>
          </div>

          <div className="bg-amber-200 border border-amber-400 p-2 rounded-lg text-center text-[10px] font-mono font-bold text-amber-950">
            ──► Dispatches Approved Alert to Citizen App
          </div>
        </div>

        {/* STEP 4 */}
        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="text-center border-b border-emerald-300 pb-2">
            <div className="text-xs font-black uppercase text-emerald-800 tracking-wider font-mono">STEP 6</div>
            <div className="text-sm font-bold text-emerald-950">Citizen Android App & Shelters</div>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="bg-white border-2 border-emerald-400 rounded-xl p-3 space-y-1 shadow-2xs">
              <div className="font-extrabold text-xs text-emerald-950 flex items-center justify-between">
                <span>Cell Broadcast Alert</span>
                <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">MOBILE APP</span>
              </div>
              <p className="text-[10px] text-stone-700">
                Instant Push Notification in English, Marathi (मराठी), and Hindi (हिंदी).
              </p>
            </div>

            <div className="bg-emerald-100 border-2 border-emerald-500 rounded-xl p-3 space-y-1.5 shadow-xs">
              <div className="font-black text-xs text-emerald-950 flex items-center justify-between">
                <span>🏥 Nearby Safe Shelters</span>
                <span className="text-[9px] bg-emerald-300 text-emerald-950 px-1.5 py-0.5 rounded font-mono font-bold">SHELTER</span>
              </div>
              <p className="text-[10px] text-emerald-950 font-semibold leading-tight">
                Automatically provides GPS location to nearest high-ground concrete shelters & safe evacuation routes during Flash Floods!
              </p>
            </div>

            <div className="bg-white border border-emerald-300 rounded-xl p-2.5 text-center">
              <div className="font-bold text-xs text-emerald-950">Citizens & First Responders</div>
              <p className="text-[9px] text-stone-600">Protected with 15-90 min advance warning</p>
            </div>
          </div>

          <div className="bg-emerald-200 border border-emerald-400 p-2 rounded-lg text-center text-[10px] font-mono font-bold text-emerald-950">
            ✅ Evacuates Citizens to High-Ground Shelters
          </div>
        </div>

      </div>

    </div>
  );
};
