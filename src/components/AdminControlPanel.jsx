import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Sliders, Database, Search, Send, CheckCircle2, AlertTriangle, FileText, RefreshCw } from 'lucide-react';

export const AdminControlPanel = () => {
  const { 
    currentWeather, 
    currentLocation, 
    scenario, 
    setScenario,
    setToastAlert,
    language
  } = useSimulation();

  const [manualRain, setManualRain] = useState(currentWeather.rainfall);
  const [manualWind, setManualWind] = useState(currentWeather.windSpeed);
  const [alertText, setAlertText] = useState(currentWeather.recommendedAction.en);
  const [ragQuery, setRagQuery] = useState('Waluj industrial underpass flash flood protocol');
  const [ragResult, setRagResult] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const handleManualUpdate = (e) => {
    e.preventDefault();
    if (parseFloat(manualRain) > 75) {
      setScenario('SEVERE_WEATHER');
    } else if (parseFloat(manualRain) > 35) {
      setScenario('HEAVY_RAIN');
    } else if (parseFloat(manualRain) > 10) {
      setScenario('MODERATE_RAIN');
    } else {
      setScenario('NORMAL');
    }
  };

  const handleRagSearch = () => {
    setRagResult({
      query: ragQuery,
      source: 'Vector Index: Disaster_Guidelines_2026.pdf (Chunk #42)',
      retrievedDoc: 'Standard Operating Procedure #14: For rainfall intensity exceeding 45mm/h in Waluj Sector 4, immediately dispatch Cell Broadcast alert to evacuate low-lying industrial basements and direct traffic to Highway Elevated Bridge #2.'
    });
  };

  const handleSendBroadcast = () => {
    setToastAlert({
      id: Date.now(),
      title: '🚨 ADMIN APPROVED EARLY WARNING',
      location: currentLocation.name,
      risk: currentWeather.riskLevel,
      score: currentWeather.riskScore,
      time: new Date().toLocaleTimeString(),
      message: alertText,
      expected: currentWeather.expectedTime
    });
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6 text-stone-900 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-amber-800" />
            <h2 className="text-lg font-extrabold text-stone-900">
              Admin Review & Dispatch Control Portal
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
              Human-in-the-Loop Control
            </span>
          </div>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Manual Data Overrides • RAG Guideline Query • Alert Review & Mobile Broadcast
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Manual Data Input & Weather API Override */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="border-b border-stone-200 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono text-stone-900 uppercase">
              1. Manual Weather Telemetry Input
            </h3>
            <span className="text-[10px] bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-600 font-mono">
              Live Override
            </span>
          </div>

          <form onSubmit={handleManualUpdate} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Manual Rainfall Rate Input (mm/h):
              </label>
              <input 
                type="number" 
                value={manualRain} 
                onChange={(e) => setManualRain(e.target.value)}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Manual Wind Velocity Input (km/h):
              </label>
              <input 
                type="number" 
                value={manualWind} 
                onChange={(e) => setManualWind(e.target.value)}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold text-xs shadow-2xs transition"
            >
              Apply Manual Data & Recalculate AI Risk
            </button>
          </form>
        </div>

        {/* Right: RAG Guidelines Search Engine */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="border-b border-stone-200 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono text-stone-900 uppercase">
              2. RAG Historical Guidelines Query
            </h3>
            <span className="text-[10px] bg-blue-100 text-blue-900 border border-blue-200 px-2 py-0.5 rounded font-mono">
              Embeddings Index
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Search Disaster Guidelines / Historical Documents:
              </label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={ragQuery} 
                  onChange={(e) => setRagQuery(e.target.value)}
                  className="flex-1 p-2 bg-white border border-stone-300 rounded-lg text-stone-900 text-xs"
                />
                <button
                  onClick={handleRagSearch}
                  className="px-3 py-2 bg-blue-800 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center space-x-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Query RAG</span>
                </button>
              </div>
            </div>

            {ragResult && (
              <div className="bg-white p-3 rounded-lg border border-blue-200 space-y-1">
                <div className="text-[10px] font-mono font-bold text-blue-800">{ragResult.source}</div>
                <p className="text-[11px] text-stone-700 italic">"{ragResult.retrievedDoc}"</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Admin Alert Review & Send to Mobile App */}
      <div className="bg-amber-50/60 border border-amber-300 rounded-xl p-5 space-y-4">
        <div className="border-b border-amber-200 pb-2 flex items-center justify-between">
          <h3 className="text-xs font-bold font-mono text-amber-950 uppercase flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            3. Admin Alert Review & Mobile App Broadcast
          </h3>
          <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-900 border border-rose-200 px-2 py-0.5 rounded">
            CAP v1.2 Dispatch
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-stone-900 mb-1">
              Review & Edit Emergency Advisory Message for Citizens:
            </label>
            <textarea
              rows={3}
              value={alertText}
              onChange={(e) => setAlertText(e.target.value)}
              className="w-full p-3 bg-white border border-stone-300 rounded-lg text-stone-900 font-sans font-medium text-xs shadow-2xs"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-600 font-mono">
              Target Sector: <strong>{currentLocation.name}</strong> • Risk: <strong className="text-rose-800">{currentWeather.riskLevel} ({currentWeather.riskScore}/100)</strong>
            </span>

            <button
              onClick={handleSendBroadcast}
              className="px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold text-xs shadow-xs transition flex items-center space-x-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Approve & Broadcast to Mobile App</span>
            </button>
          </div>

          {isSent && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-950 font-mono font-bold text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>✅ Alert Approved & Successfully Sent to Citizen Mobile App & Dashboard!</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
