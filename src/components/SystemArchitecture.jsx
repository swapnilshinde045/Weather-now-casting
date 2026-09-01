import React from 'react';
import { Globe } from 'lucide-react';

export const SystemArchitecture = () => {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6 text-stone-900 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-stone-900">
            Software System Architecture Diagram
          </h2>
          <p className="text-xs text-stone-500 font-mono mt-0.5">
            100% Software Architecture (WEBSITE FOR ADMIN & ANDROID APP FOR USERS)
          </p>
        </div>

        <a 
          href="/architecture_diagram.html" 
          target="_blank" 
          rel="noreferrer"
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs font-bold rounded-lg shadow-2xs transition flex items-center space-x-1.5 cursor-pointer"
        >
          <span>Print / Export PDF Page</span>
          <Globe className="w-3.5 h-3.5 text-amber-400" />
        </a>
      </div>

      {/* Embedded Render of the Schematic Canvas */}
      <div className="max-w-5xl mx-auto p-4 sm:p-8 relative min-h-[920px] bg-white border border-stone-300 rounded-xl shadow-xs overflow-x-auto">
        
        {/* SVG Connector Lines Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block" style={{ minHeight: '920px' }}>
          <defs>
            <marker id="arrowhead-sw" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#444444" />
            </marker>
          </defs>

          {/* Arrow 1: Green Box 1 to Controller */}
          <path d="M 520 160 C 440 160, 420 185, 365 185" fill="none" stroke="#444444" strokeWidth="1.5" markerEnd="url(#arrowhead-sw)" />

          {/* Arrow 2: Green Box 2 to Controller */}
          <path d="M 740 160 C 600 160, 440 185, 365 195" fill="none" stroke="#444444" strokeWidth="1.5" markerEnd="url(#arrowhead-sw)" />

          {/* Arrow 3: Controller to Cloud DB */}
          <path d="M 270 220 C 270 250, 270 280, 270 320" fill="none" stroke="#444444" strokeWidth="1.5" markerEnd="url(#arrowhead-sw)" />

          {/* Arrow 4: Controller to Red Box 1 */}
          <path d="M 365 210 C 420 250, 520 330, 560 340" fill="none" stroke="#444444" strokeWidth="1.5" markerEnd="url(#arrowhead-sw)" />

          {/* Arrow 5: Controller to Red Box 2 */}
          <path d="M 365 215 C 480 260, 680 330, 770 340" fill="none" stroke="#444444" strokeWidth="1.5" markerEnd="url(#arrowhead-sw)" />

          {/* Arrow 6: Cloud DB to Purple Box 1 */}
          <path d="M 220 390 C 180 430, 160 470, 160 510" fill="none" stroke="#444444" strokeWidth="1.5" markerEnd="url(#arrowhead-sw)" />

          {/* Arrow 7: Cloud DB to Purple Box 2 */}
          <path d="M 320 390 C 360 430, 390 470, 390 510" fill="none" stroke="#444444" strokeWidth="1.5" markerEnd="url(#arrowhead-sw)" />

          {/* Arrow 8: Purple Box 1 to Circle */}
          <path d="M 170 580 C 170 630, 170 670, 170 710" fill="none" stroke="#444444" strokeWidth="1.5" markerEnd="url(#arrowhead-sw)" />
        </svg>

        {/* TOP RIGHT BOX */}
        <div className="sm:absolute top-[100px] right-[30px] w-full sm:w-[500px] h-[310px] border border-stone-500 bg-white p-4 my-4 sm:my-0">
          <div className="text-center font-bold text-xs text-stone-800 mb-3 border-b border-stone-200 pb-1">
            External Weather Data APIs & Alert Dispatch Outlets
          </div>

          <div className="flex justify-between space-x-3 mb-2">
            <div className="w-[220px] h-[65px] border border-emerald-700 bg-emerald-100/70 p-2 text-center text-xs text-stone-900 flex flex-col justify-center">
              <div className="font-bold text-emerald-950">Open-Meteo & Weather APIs</div>
              <div className="text-[10px] text-stone-700">Fetches Live Temp, Humidity & Rain</div>
            </div>

            <div className="w-[220px] h-[65px] border border-emerald-700 bg-emerald-100/70 p-2 text-center text-xs text-stone-900 flex flex-col justify-center">
              <div className="font-bold text-emerald-950">Doppler Radar & Satellite API</div>
              <div className="text-[10px] text-stone-700">Streams Cloud Motion & Rain Grid</div>
            </div>
          </div>

          <div className="flex justify-between text-[10px] font-mono text-stone-700 px-6 mb-6">
            <span>Reads Weather API Stream</span>
            <span>Detects Cloudburst Intensity</span>
          </div>

          <div className="flex justify-between text-[10px] font-mono text-stone-700 px-6 mb-2">
            <span>Evaluates Risk Thresholds</span>
            <span>Dispatches Push Advisory</span>
          </div>

          <div className="flex justify-between space-x-3">
            <div className="w-[210px] h-[55px] border border-rose-600 bg-rose-100/80 p-2 text-center text-xs text-stone-900 flex flex-col justify-center">
              <div className="font-bold text-rose-950">Admin Web Dashboard Alerts</div>
              <div className="text-[10px] text-rose-800">Displays Emergency Banners</div>
            </div>

            <div className="w-[210px] h-[55px] border border-rose-600 bg-rose-100/80 p-2 text-center text-xs text-stone-900 flex flex-col justify-center">
              <div className="font-bold text-rose-950">Android App Push Notifications</div>
              <div className="text-[10px] text-rose-800">Cell Broadcast System (CAP v1.2)</div>
            </div>
          </div>
        </div>

        {/* TOP LEFT / MIDDLE BOX */}
        <div className="sm:absolute top-[135px] left-[170px] w-full sm:w-[200px] h-[85px] border border-stone-500 bg-white p-2 my-4 sm:my-0">
          <div className="text-center font-bold text-xs text-stone-800 mb-1">
            Backend Ingestion Pipeline
          </div>
          <div className="w-full h-[45px] border border-amber-600 bg-amber-100/80 text-stone-900 font-bold text-xs flex flex-col items-center justify-center text-center p-1">
            <span>API Fetcher & Preprocessor</span>
            <span className="text-[9px] font-normal text-stone-700">Parses JSON & Coordinates</span>
          </div>
        </div>

        <div className="sm:absolute top-[235px] left-[180px] text-[10px] font-mono text-stone-700 text-center font-semibold hidden sm:block">
          Uploads JSON Telemetry Stream <br /> via HTTP / REST
        </div>

        {/* MIDDLE LEFT BOX */}
        <div className="sm:absolute top-[310px] left-[110px] w-full sm:w-[320px] h-[100px] border border-stone-500 bg-white p-2 my-4 sm:my-0">
          <div className="text-center font-bold text-xs text-stone-800 mb-2">
            Cloud Infrastructure & Database
          </div>
          <div className="w-[170px] h-[50px] mx-auto border border-blue-600 bg-blue-100/90 rounded-[50%] flex flex-col items-center justify-center text-xs text-blue-950 font-bold text-center">
            <span>PostgreSQL & Vector DB</span>
            <span className="text-[9px] font-normal text-blue-800">Telemetry Logs & RAG Index</span>
          </div>
        </div>

        <div className="sm:absolute top-[430px] left-[95px] text-[10px] font-mono text-stone-700 font-semibold hidden sm:block">
          Fetches Real-Time Data
        </div>
        <div className="sm:absolute top-[430px] left-[300px] text-[10px] font-mono text-stone-700 font-semibold hidden sm:block">
          Fetches Historical & RAG SOPs
        </div>

        {/* BOTTOM LEFT BOX */}
        <div className="sm:absolute top-[500px] left-[55px] w-full sm:w-[470px] h-[90px] border border-stone-500 bg-white p-2 my-4 sm:my-0">
          <div className="text-center font-bold text-xs text-stone-900 mb-2">
            User Interface (WEBSITE FOR ADMIN)
          </div>

          <div className="flex justify-between space-x-3 px-1">
            <div className="w-[210px] h-[45px] border border-purple-600 bg-purple-100/80 text-xs text-stone-900 flex flex-col items-center justify-center text-center">
              <span className="font-bold">React Dashboard & Leaflet Map</span>
              <span className="text-[9px] text-stone-700">Real-Time Risk Monitoring</span>
            </div>

            <div className="w-[210px] h-[45px] border border-purple-600 bg-purple-100/80 text-xs text-stone-900 flex flex-col items-center justify-center text-center">
              <span className="font-bold">Admin Alert Review & RAG Search</span>
              <span className="text-[9px] text-stone-700">Approve & Broadcast Bulletins</span>
            </div>
          </div>
        </div>

        <div className="sm:absolute top-[605px] left-[85px] text-[10px] font-mono text-stone-800 text-center font-bold hidden sm:block">
          Displays SAFE / MODERATE / HIGH / EXTREME Alerts & Sends Multilingual Mobile Push
        </div>

        {/* BOTTOM CIRCLE */}
        <div className="sm:absolute top-[700px] left-[95px] w-[150px] h-[150px] border border-stone-500 bg-stone-100 rounded-full flex flex-col items-center justify-center text-center text-xs text-stone-900 font-bold p-3 shadow-2xs my-4 sm:my-0 mx-auto">
          <span>ANDROID APP FOR USERS</span>
          <span className="text-[10px] font-normal text-stone-600 mt-1">Citizens & Disaster Officers (EN / MR / HI)</span>
        </div>

      </div>

    </div>
  );
};
