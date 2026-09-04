import React from 'react';
import { Globe, CloudRain } from 'lucide-react';

export const SystemArchitecture = () => {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6 text-stone-900 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-stone-900">
            4-Zone System Architecture Diagram (AGNI-CAST)
          </h2>
          <p className="text-xs text-stone-500 font-mono mt-0.5">
            Zone 1: Services ──► Zone 2: Frontend ──► Zone 3: Backend ──► Zone 4: AI & Database
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

      {/* 4 Zone Columns Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch relative">
        
        {/* ZONE 1 */}
        <div className="bg-stone-50/80 border-2 border-stone-300 rounded-xl p-4 flex flex-col justify-between space-y-6">
          <div className="text-center border-b border-stone-300 pb-2">
            <div className="text-xs font-black uppercase text-stone-700 tracking-wider font-mono">Zone 1</div>
            <div className="text-sm font-bold text-stone-900">Users & External Services</div>
          </div>

          <div className="border-2 border-dashed border-sky-400 bg-sky-50/80 rounded-2xl p-4 space-y-2 text-center shadow-2xs">
            <div className="text-xs font-extrabold text-sky-950 flex items-center justify-center gap-1.5">
              <CloudRain className="w-4 h-4 text-sky-700" />
              <span>Third-Party Services</span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="bg-white border border-sky-300 rounded-lg p-2 text-[11px] font-bold text-sky-900 shadow-2xs">
                Open-Meteo Weather API
              </div>
              <div className="bg-white border border-sky-300 rounded-lg p-2 text-[11px] font-bold text-sky-900 shadow-2xs">
                IMD Doppler Radar Grid API
              </div>
              <div className="bg-white border border-sky-300 rounded-lg p-2 text-[11px] font-bold text-sky-900 shadow-2xs">
                GIS Topography API
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="bg-white border-2 border-amber-300 rounded-xl p-3 flex items-center space-x-3 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-400 flex items-center justify-center font-bold text-amber-900 text-xs">
                👨‍💼
              </div>
              <div>
                <div className="font-bold text-xs text-amber-950">Disaster Authority Admin</div>
                <div className="text-[10px] text-stone-600">Interacts with Admin Dashboard</div>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-300 rounded-xl p-3 flex items-center space-x-3 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center font-bold text-emerald-900 text-xs">
                🧑‍🌾
              </div>
              <div>
                <div className="font-bold text-xs text-emerald-950">Citizens & First Responders</div>
                <div className="text-[10px] text-stone-600">Receives Multilingual Push Bulletins</div>
              </div>
            </div>
          </div>
        </div>

        {/* ZONE 2 */}
        <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="text-center border-b border-emerald-300 pb-2">
            <div className="text-xs font-black uppercase text-emerald-800 tracking-wider font-mono">Zone 2</div>
            <div className="text-sm font-bold text-emerald-950">Frontend (Presentation Layer)</div>
          </div>

          <div className="border-2 border-emerald-400 bg-white rounded-2xl p-4 space-y-4 shadow-2xs flex-1 flex flex-col justify-between">
            <div className="text-center border-b border-emerald-200 pb-2">
              <span className="text-xs font-black text-emerald-950 font-mono">AGNI-CAST UI Apps</span>
              <div className="text-[10px] font-semibold text-emerald-800">(React 19 / Vite / Android)</div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-300 rounded-xl p-3 space-y-2">
              <div className="font-bold text-xs text-emerald-950 flex items-center justify-between">
                <span>Admin Web Portal</span>
                <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-mono">Web</span>
              </div>
              <div className="space-y-1 text-[10px]">
                <div className="bg-white border border-emerald-200 p-1.5 rounded font-medium text-stone-800">
                  📊 Live Sector Dashboard & Leaflet Map
                </div>
                <div className="bg-white border border-emerald-200 p-1.5 rounded font-medium text-stone-800">
                  📈 90-Min Predictive Recharts Timeline
                </div>
                <div className="bg-white border border-emerald-200 p-1.5 rounded font-medium text-stone-800">
                  🎛️ Admin Review & Dispatch Control
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-300 rounded-xl p-3 space-y-2">
              <div className="font-bold text-xs text-emerald-950 flex items-center justify-between">
                <span>Citizen Mobile App</span>
                <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-mono">Android</span>
              </div>
              <div className="space-y-1 text-[10px]">
                <div className="bg-white border border-emerald-200 p-1.5 rounded font-medium text-stone-800">
                  🔔 Multilingual Advisory (EN / MR / HI)
                </div>
                <div className="bg-white border border-emerald-200 p-1.5 rounded font-medium text-stone-800">
                  🏥 Shelter Finder & Evacuation Route
                </div>
              </div>
            </div>

            <div className="text-center pt-1 border-t border-emerald-100">
              <span className="text-[10px] font-mono font-bold text-emerald-900">HTTP / REST API Sync</span>
            </div>
          </div>
        </div>

        {/* ZONE 3 */}
        <div className="bg-purple-50/60 border-2 border-purple-300 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="text-center border-b border-purple-300 pb-2">
            <div className="text-xs font-black uppercase text-purple-800 tracking-wider font-mono">Zone 3</div>
            <div className="text-sm font-bold text-purple-950">Backend (Application Layer)</div>
          </div>

          <div className="border-2 border-purple-400 bg-white rounded-2xl p-4 space-y-2 shadow-2xs flex-1 flex flex-col justify-between">
            <div className="text-center border-b border-purple-200 pb-1.5">
              <span className="text-xs font-black text-purple-950 font-mono">Backend Services</span>
              <div className="text-[10px] font-semibold text-purple-800">(Node.js / Python FastAPI)</div>
            </div>

            <div className="bg-purple-200/80 border-2 border-purple-400 rounded-lg p-2 text-center">
              <div className="font-black text-xs text-purple-950">API Gateway</div>
              <div className="text-[9px] font-mono text-purple-800">(Routing, Auth, Rate Limit)</div>
            </div>

            <div className="space-y-1.5 text-[10px]">
              <div className="bg-purple-50 border border-purple-300 p-1.5 rounded text-center font-bold text-purple-950">
                API Ingestion & Preprocessor
              </div>
              <div className="bg-purple-50 border border-purple-300 p-1.5 rounded text-center font-bold text-purple-950">
                15-90m Trajectory Normalizer
              </div>
              <div className="bg-purple-50 border border-purple-300 p-1.5 rounded text-center font-bold text-purple-950">
                Risk Scoring Matrix (0-100 Rating)
              </div>
              <div className="bg-purple-50 border border-purple-300 p-1.5 rounded text-center font-bold text-purple-950">
                Admin Review Workflow Service
              </div>
              <div className="bg-purple-50 border border-purple-300 p-1.5 rounded text-center font-bold text-purple-950">
                Notification & Audio Siren Service
              </div>
            </div>

            <div className="text-center pt-1 border-t border-purple-100">
              <span className="text-[10px] font-mono font-bold text-purple-900">Data Exchange Streams</span>
            </div>
          </div>
        </div>

        {/* ZONE 4 */}
        <div className="bg-sky-50/60 border-2 border-sky-300 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="text-center border-b border-sky-300 pb-2">
            <div className="text-xs font-black uppercase text-sky-800 tracking-wider font-mono">Zone 4</div>
            <div className="text-sm font-bold text-sky-950">Data & Intelligence ("The Brain")</div>
          </div>

          <div className="border-2 border-sky-400 bg-sky-100/70 rounded-2xl p-4 space-y-3 shadow-2xs flex-1 flex flex-col justify-between">
            <div className="text-center border-b border-sky-300 pb-2">
              <div className="w-9 h-9 mx-auto bg-sky-500 rounded-full flex items-center justify-center text-white text-base mb-1 shadow-2xs">
                🧠
              </div>
              <span className="text-xs font-black text-sky-950 font-mono">AI/ML Intelligence Engine</span>
              <div className="text-[9px] font-mono text-sky-800 font-bold">Tech: PyTorch, ConvLSTM, Transformer, pgvector</div>
            </div>

            <div className="space-y-2 text-[10px]">
              <div className="bg-white border border-sky-300 p-2 rounded-lg space-y-0.5">
                <div className="font-extrabold text-sky-950">Nowcasting Trajectory Model</div>
                <div className="text-[9px] text-stone-600">(Analyzes Radar Grid + Rain Rate)</div>
              </div>

              <div className="bg-white border border-sky-300 p-2 rounded-lg space-y-0.5">
                <div className="font-extrabold text-sky-950">Multi-Factor Risk Assessment</div>
                <div className="text-[9px] text-stone-600">(Elevation + Rain + Pressure + Soil)</div>
              </div>

              <div className="bg-white border border-sky-300 p-2 rounded-lg space-y-0.5">
                <div className="font-extrabold text-sky-950">RAG Vector Advisory Engine</div>
                <div className="text-[9px] text-stone-600">(Generates Disaster SOP Guidance)</div>
              </div>
            </div>

            <div className="bg-white border-2 border-sky-400 rounded-xl p-2 text-center shadow-2xs">
              <div className="font-black text-xs text-sky-950">PostgreSQL & Vector DB</div>
              <div className="text-[9px] text-stone-600 font-mono">Telemetry History & SOP Embeddings</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
