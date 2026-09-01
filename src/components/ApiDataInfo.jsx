import React, { useState } from 'react';
import { API_INFO, fetchLiveOpenMeteoData } from '../services/weatherApi';
import { Database, Key, CheckCircle2, RefreshCw, Globe, ExternalLink, ShieldCheck, Zap, Info } from 'lucide-react';

export const ApiDataInfo = () => {
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchLive = async () => {
    setLoading(true);
    const result = await fetchLiveOpenMeteoData();
    setLiveData(result);
    setLoading(false);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-extrabold text-stone-900">
              Free Meteorological Data API Guidance
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
              100% Free / No Credit Card
            </span>
          </div>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Section Clarification & Telemetry Provider Recommendations for SIH Judges
          </p>
        </div>

        <button
          onClick={handleFetchLive}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold text-xs shadow-2xs transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Test Live Open-Meteo API Fetch</span>
        </button>
      </div>

      {/* 2 Primary Free API Recommendations (Prompt Specs Clarification) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* API 1: Open-Meteo (RECOMMENDED) */}
        <div className="bg-stone-50 border-2 border-emerald-300 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <h3 className="font-extrabold text-stone-900 text-sm">
                1. Open-Meteo API (RECOMMENDED)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              NO KEY REQUIRED
            </span>
          </div>

          <ul className="space-y-2 text-xs text-stone-700 font-mono">
            <li>• <strong>API Key:</strong> Not Required (Zero registration needed)</li>
            <li>• <strong>Cost:</strong> 100% Free & Open-Source</li>
            <li>• <strong>Rate Limit:</strong> 10,000 free calls per day</li>
            <li>• <strong>Telemetry:</strong> Temperature, Relative Humidity, Precipitation rate, Wind speed, Surface Pressure</li>
            <li>• <strong>Endpoint:</strong> <code className="text-[10px] bg-white p-1 rounded border text-amber-900">https://api.open-meteo.com/v1/forecast</code></li>
          </ul>

          <div className="p-3 bg-white rounded-lg border border-stone-200 text-[11px] text-stone-700">
            <strong>Why best for SIH Presentation:</strong> You don't need to sign up or hide any secrets. It responds instantly and works everywhere offline or online.
          </div>
        </div>

        {/* API 2: OpenWeatherMap Free Tier */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-amber-700" />
              <h3 className="font-extrabold text-stone-900 text-sm">
                2. OpenWeatherMap API (Alternative)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              FREE KEY AVAILABLE
            </span>
          </div>

          <ul className="space-y-2 text-xs text-stone-700 font-mono">
            <li>• <strong>API Key:</strong> Requires Free Key (Sign-up on openweathermap.org)</li>
            <li>• <strong>Cost:</strong> Free Tier available</li>
            <li>• <strong>Rate Limit:</strong> 60 calls/minute, 1,000 calls/day</li>
            <li>• <strong>Telemetry:</strong> Current weather, cloud cover, atmospheric pressure, wind gust</li>
            <li>• <strong>Endpoint:</strong> <code className="text-[10px] bg-white p-1 rounded border text-amber-900">https://api.openweathermap.org/data/2.5/weather</code></li>
          </ul>

          <div className="p-3 bg-white rounded-lg border border-stone-200 text-[11px] text-stone-700">
            <strong>How to get free key:</strong> Visit <a href="https://openweathermap.org/api" target="_blank" rel="noreferrer" className="text-amber-800 font-bold underline">openweathermap.org/api</a>, click "Get API Key" (Free Plan).
          </div>
        </div>

      </div>

      {/* Live Fetch Result Output */}
      {liveData && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
            <span className="font-bold text-emerald-900">✅ Live Open-Meteo Fetch Response (Waluj Sector):</span>
            <span className="text-[10px] text-emerald-800">{liveData.source}</span>
          </div>
          {liveData.success ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-900 pt-1">
              <div>Temp: <strong>{liveData.temp} °C</strong></div>
              <div>Humidity: <strong>{liveData.humidity} %</strong></div>
              <div>Rainfall: <strong>{liveData.rainfall} mm/h</strong></div>
              <div>Wind: <strong>{liveData.windSpeed} km/h</strong></div>
            </div>
          ) : (
            <div className="text-rose-700 font-bold">Error: {liveData.error}</div>
          )}
        </div>
      )}

    </div>
  );
};
