import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Cpu, Brain, Layers, ArrowRight, Activity, ShieldAlert, Sparkles, CheckCircle2, Zap } from 'lucide-react';

export const AiRiskEngine = () => {
  const { 
    currentAiFactors, 
    currentWeather, 
    currentLocation, 
    scenario 
  } = useSimulation();

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-purple-700" />
            <h2 className="text-lg font-extrabold text-stone-900">
              AI Risk Engine & Feature Weighting Matrix
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
              Prototype AI Risk Simulation
            </span>
          </div>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Spatial-Temporal Convective Cloudburst Neural Pipeline
          </p>
        </div>

        <div className="text-[11px] font-mono px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-900 font-bold flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 text-purple-700" />
          <span>Prototype AI Risk Simulation</span>
        </div>
      </div>

      {/* Inputs -> Output Score Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: 7 Input Factors */}
        <div className="lg:col-span-2 space-y-3">
          <div className="text-xs font-mono text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>INPUT ATMOSPHERIC FACTORS ({currentAiFactors.length})</span>
            <span>WEIGHT & CONTRIBUTION</span>
          </div>

          <div className="space-y-2.5">
            {currentAiFactors.map((factor, idx) => (
              <div 
                key={idx}
                className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition hover:border-stone-300 shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-mono font-bold text-amber-800 text-xs shadow-2xs">
                    F{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">{factor.name}</div>
                    <div className="text-[11px] text-stone-500 font-mono">{factor.weight} • {factor.status}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4">
                  <span className="font-mono font-bold text-stone-900 bg-white px-2 py-1 rounded border border-stone-200 shadow-2xs">
                    {factor.value}
                  </span>
                  
                  <div className="w-24 bg-stone-200 h-2.5 rounded-full overflow-hidden border border-stone-300">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        factor.score > 80 ? 'bg-rose-600' : factor.score > 50 ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    ></div>
                  </div>

                  <span className="font-mono text-[11px] text-stone-600 w-8 text-right font-bold">
                    {factor.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Calculated Risk Score Card */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-2xs">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-mono font-bold text-stone-600 uppercase">
                CALCULATED RISK SCORE
              </span>
              <Sparkles className="w-4 h-4 text-purple-700" />
            </div>

            <div className="text-center py-4">
              <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 border-stone-200 bg-white relative shadow-md ring-4 ring-amber-100">
                <span className="text-4xl font-black tracking-tight text-stone-900">
                  {currentWeather.riskScore}
                </span>
                <span className="text-xs font-mono font-bold text-stone-500 mt-0.5">
                  / 100
                </span>
              </div>

              <div className="mt-4">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-extrabold font-mono border shadow-2xs ${
                  currentWeather.riskScore >= 75 
                    ? 'bg-rose-100 text-rose-900 border-rose-300' 
                    : currentWeather.riskScore >= 45 
                    ? 'bg-amber-100 text-amber-900 border-amber-300' 
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}>
                  {currentWeather.riskLevel} RISK
                </span>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-3 rounded-lg flex items-center justify-between text-xs font-mono shadow-2xs">
              <span className="text-stone-600">Prediction Confidence:</span>
              <span className="text-emerald-800 font-bold">{currentWeather.predictionConfidence}</span>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg space-y-1">
              <span className="text-[11px] font-bold text-purple-900 block">AI Neural Inference Summary:</span>
              <p className="text-xs text-purple-950 leading-relaxed italic font-medium">
                "Multiple weather indicators indicate increasing severe-weather probability based on convective cell buildup over {currentLocation.shortName}."
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200 text-center">
            <span className="text-[10px] text-stone-500 font-mono">
              Label: Prototype AI Risk Simulation • No DB/Backend required
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
