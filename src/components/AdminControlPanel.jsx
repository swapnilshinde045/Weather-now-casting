import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { generateGeminiNowcastPrediction } from '../services/geminiService';
import { Sliders, Database, Search, Send, CheckCircle2, AlertTriangle, Sparkles, Key, Bot, CloudRain } from 'lucide-react';

export const AdminControlPanel = () => {
  const { 
    currentWeather, 
    currentLocation, 
    scenario, 
    setScenario,
    setToastAlert
  } = useSimulation();

  const [geminiKey, setGeminiKey] = useState('');
  const [manualRain, setManualRain] = useState(currentWeather.rainfall);
  const [manualWind, setManualWind] = useState(currentWeather.windSpeed);
  const [alertText, setAlertText] = useState(currentWeather.recommendedAction.en);
  
  const [ragQuery, setRagQuery] = useState('Waluj industrial underpass flash flood protocol');
  const [ragResult, setRagResult] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState(null);

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

  const handleRunGeminiAI = async () => {
    setIsPredicting(true);
    const result = await generateGeminiNowcastPrediction({
      apiKey: geminiKey,
      locationName: currentLocation.name,
      rainfall: parseFloat(manualRain),
      windSpeed: parseFloat(manualWind),
      humidity: currentWeather.humidity,
      temp: currentWeather.temp,
      pressure: currentWeather.pressure,
      satelliteSource: 'INSAT-3DR (WV, TIR-1, TIR-2, MIR Bands)',
      scenarioName: scenario
    });

    setIsPredicting(false);
    if (result.success) {
      setGeminiResponse(result);
      if (result.data?.citizenAdvisoryEN) {
        setAlertText(result.data.citizenAdvisoryEN);
      }
    }
  };

  const handleRagSearch = () => {
    setRagResult({
      query: ragQuery,
      source: 'Vector Index: ISRO_INSAT3DR_Flood_SOP_2026.pdf (Chunk #42)',
      retrievedDoc: 'Standard Operating Procedure #14: For rainfall intensity exceeding 45mm/h in Waluj Sector 4, immediately dispatch Cell Broadcast alert to evacuate low-lying industrial basements and direct traffic to Highway Elevated Bridge #2.'
    });
  };

  const handleSendBroadcast = () => {
    setToastAlert({
      id: Date.now(),
      title: '🚨 GEMINI AI APPROVED EARLY WARNING',
      location: currentLocation.name,
      risk: geminiResponse?.data?.riskLevel || currentWeather.riskLevel,
      score: geminiResponse?.data?.riskScore || currentWeather.riskScore,
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
            <Sparkles className="w-5 h-5 text-purple-700 animate-pulse" />
            <h2 className="text-lg font-extrabold text-stone-900">
              Gemini AI Nowcasting & Admin Dispatch Portal
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
              Google Gemini API Powered
            </span>
          </div>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Zero-Training Gemini AI Prediction • INSAT-3DR Telemetry • Multimodal RAG SOP Query • Citizen Push
          </p>
        </div>
      </div>

      {/* Gemini API Key & Prediction Trigger Section */}
      <div className="bg-purple-50/70 border-2 border-purple-300 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-purple-200 pb-2">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-purple-700" />
            <h3 className="text-xs font-bold font-mono text-purple-950 uppercase">
              1. Google Gemini API Integration (AI Nowcasting Core)
            </h3>
          </div>
          <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded font-mono font-bold">
            Gemini 1.5 / 2.0 Flash
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="md:col-span-2">
            <label className="block font-semibold text-stone-800 mb-1">
              Google Gemini 2.0 Operational Intelligence Key:
            </label>
            <input 
              type="password" 
              placeholder="Paste AIZASy... (or leave blank to use pre-configured Operational Gemini Engine)" 
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full p-2.5 bg-white border border-purple-300 rounded-lg text-stone-900 font-mono text-xs shadow-2xs"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRunGeminiAI}
              disabled={isPredicting}
              className="w-full py-2.5 px-4 bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <Bot className="w-4 h-4 text-purple-300" />
              <span>{isPredicting ? 'Analyzing Telemetry...' : 'Run Gemini AI Prediction'}</span>
            </button>
          </div>
        </div>

        {/* Gemini AI Result Card */}
        {geminiResponse && (
          <div className="bg-white border-2 border-purple-400 rounded-xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between border-b border-purple-100 pb-2">
              <span className="text-xs font-bold font-mono text-purple-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                {geminiResponse.source}
              </span>
              <span className="text-xs font-black px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300">
                Risk Score: {geminiResponse.data?.riskScore}/100 ({geminiResponse.data?.riskLevel})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="font-bold text-stone-700 block">Hazard Classification:</span>
                <span className="font-extrabold text-purple-950 text-sm">{geminiResponse.data?.hazardType}</span>
              </div>
              <div>
                <span className="font-bold text-stone-700 block">Prediction Confidence:</span>
                <span className="font-bold text-emerald-800">{geminiResponse.data?.confidenceScore}% Accuracy</span>
              </div>
            </div>

            <div className="text-xs bg-purple-50 p-2.5 rounded-lg border border-purple-200 text-stone-800 leading-relaxed italic">
              "{geminiResponse.data?.predictionSummary}"
            </div>
          </div>
        )}
      </div>

      {/* Telemetry Input & RAG Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Manual Data Input & Weather Telemetry */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="border-b border-stone-200 pb-2 flex items-center justify-between">
            <h3 class="text-xs font-bold font-mono text-stone-900 uppercase">
              2. Weather Telemetry & INSAT-3DR Input
            </h3>
            <span className="text-[10px] bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-600 font-mono">
              INSAT-3DR Bands
            </span>
          </div>

          <form onSubmit={handleManualUpdate} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Rainfall Rate Input (mm/h):
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
                Wind Velocity Input (km/h):
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
              Update Telemetry Parameters
            </button>
          </form>
        </div>

        {/* Right: RAG Guidelines Search Engine */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="border-b border-stone-200 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono text-stone-900 uppercase">
              3. RAG Multimodal SOP Search
            </h3>
            <span className="text-[10px] bg-blue-100 text-blue-900 border border-blue-200 px-2 py-0.5 rounded font-mono">
              Vector Index
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Query Disaster Guidelines & Flood SOPs:
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
                  className="px-3 py-2 bg-blue-800 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center space-x-1 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>RAG Search</span>
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
            4. Admin Alert Approval & Mobile Push Dispatch
          </h3>
          <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-900 border border-rose-200 px-2 py-0.5 rounded">
            CAP v1.2 Dispatch
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-stone-900 mb-1">
              Review & Edit Emergency Advisory Wording for Citizen Mobile App:
            </label>
            <textarea
              rows={3}
              value={alertText}
              onChange={(e) => setAlertText(e.target.value)}
              className="w-full p-3 bg-white border border-stone-300 rounded-lg text-stone-900 font-sans font-medium text-xs shadow-2xs"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-stone-600 font-mono">
              Sector: <strong>{currentLocation.name}</strong> • AI Hazard: <strong className="text-rose-800">{geminiResponse?.data?.hazardType || currentWeather.riskLevel}</strong>
            </span>

            <button
              onClick={handleSendBroadcast}
              className="px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold text-xs shadow-xs transition flex items-center space-x-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Approve & Broadcast to Citizen Android App</span>
            </button>
          </div>

          {isSent && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-950 font-mono font-bold text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>✅ Gemini AI Alert Approved & Successfully Sent to Citizen Mobile App & Dashboard!</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
