import React, { useState } from 'react';
import { ALL_SYSTEM_APIS, fetchLiveOpenMeteoData, fetchSatelliteTerrainTelemetry } from '../services/weatherApi';
import { Database, Key, CheckCircle2, RefreshCw, Globe, Satellite, Layers, MapPin, Bot, Radio, ShieldCheck, Zap } from 'lucide-react';

export const ApiDataInfo = () => {
  const [liveData, setLiveData] = useState(null);
  const [satelliteData, setSatelliteData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchLive = async () => {
    setLoading(true);
    const result = await fetchLiveOpenMeteoData();
    const satResult = await fetchSatelliteTerrainTelemetry();
    setLiveData(result);
    setSatelliteData(satResult);
    setLoading(false);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-extrabold text-stone-900">
              Integrated Multi-API Data Ecosystem
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-emerald-300">
              7 Integrated Live & Spatial APIs
            </span>
          </div>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Real-time data stream pipelines: Satellite imagery, meteorological ground telemetry, elevation GIS, and AI inference.
          </p>
        </div>

        <button
          onClick={handleFetchLive}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold text-xs shadow-2xs transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Test Live Multi-API Telemetry Fetch</span>
        </button>
      </div>

      {/* Grid of All 7 Integrated APIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ALL_SYSTEM_APIS.map((api) => (
          <div key={api.id} className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3 shadow-2xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">
                  {api.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {api.badge}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                  {api.id === 'insat-3dr' && <Satellite className="w-4 h-4 text-sky-700" />}
                  {api.id === 'open-meteo' && <Globe className="w-4 h-4 text-emerald-700" />}
                  {api.id === 'imdaa' && <Layers className="w-4 h-4 text-purple-700" />}
                  {api.id === 'cartodem' && <Layers className="w-4 h-4 text-amber-700" />}
                  {api.id === 'google-maps' && <MapPin className="w-4 h-4 text-rose-700" />}
                  {api.id === 'gemini-ai' && <Bot className="w-4 h-4 text-purple-700" />}
                  {api.id === 'ndma-cap' && <Radio className="w-4 h-4 text-rose-700" />}
                  {api.name}
                </h3>
                <div className="text-[11px] font-mono font-bold text-stone-600 mt-0.5">
                  Provider: {api.provider}
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {api.description}
              </p>

              <div className="space-y-1.5 pt-1 font-mono text-[11px]">
                <div className="text-stone-500 font-bold">API Endpoint:</div>
                <code className="block text-[10px] bg-white p-1.5 rounded border border-stone-200 text-amber-900 break-all">
                  {api.endpoint}
                </code>
              </div>

              {api.channels && (
                <div className="text-[10px] font-mono space-y-1">
                  <span className="font-bold text-stone-700">Multispectral Channels:</span>
                  <div className="flex flex-wrap gap-1">
                    {api.channels.map((ch, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-900 border border-sky-200">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {api.metrics && (
                <div className="text-[10px] font-mono space-y-1">
                  <span className="font-bold text-stone-700">Streamed Telemetry:</span>
                  <div className="flex flex-wrap gap-1">
                    {api.metrics.map((m, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {api.features && (
                <div className="text-[10px] font-mono space-y-1">
                  <span className="font-bold text-stone-700">Features:</span>
                  <div className="flex flex-wrap gap-1">
                    {api.features.map((f, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono">
              <span className="text-stone-500">Pipeline Status:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                {api.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Telemetry Data Output Box */}
      {liveData && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl space-y-3 font-mono text-xs shadow-xs">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
            <span className="font-bold text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Live Telemetry & Spatial API Fetch Output:
            </span>
            <span className="text-[10px] text-emerald-800 font-bold">{liveData.source}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-900">
            <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
              <span className="text-stone-500 block text-[10px]">Open-Meteo Temp:</span>
              <strong className="text-sm text-stone-900">{liveData.temp} °C</strong>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
              <span className="text-stone-500 block text-[10px]">Humidity:</span>
              <strong className="text-sm text-stone-900">{liveData.humidity} %</strong>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
              <span className="text-stone-500 block text-[10px]">Rainfall Rate:</span>
              <strong className="text-sm text-amber-800">{liveData.rainfall} mm/h</strong>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
              <span className="text-stone-500 block text-[10px]">Wind Velocity:</span>
              <strong className="text-sm text-stone-900">{liveData.windSpeed} km/h</strong>
            </div>
          </div>

          {satelliteData && (
            <div className="pt-2 border-t border-emerald-200 text-[11px] text-emerald-950 space-y-1">
              <div className="font-bold">INSAT-3DR Satellite & CartoDEM Terrain Sync:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                <div>• INSAT-3DR Stream: <strong>{satelliteData.insat3drStatus}</strong> ({satelliteData.lastSatellitePass})</div>
                <div>• CartoDEM Terrain Grid: <strong>{satelliteData.cartoDEMElevation}</strong></div>
                <div>• IMDAA Reanalysis: <strong>{satelliteData.imdaaReanalysis}</strong></div>
                <div>• Google / CartoDB Maps: <strong>{satelliteData.googleMapsStatus}</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
