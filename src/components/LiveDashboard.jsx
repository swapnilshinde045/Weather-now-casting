import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { DEMO_LOCATIONS } from '../data/demoLocations';
import { Thermometer, Droplets, CloudRain, Wind, AlertTriangle, MapPin, Activity } from 'lucide-react';

export const LiveDashboard = () => {
  const { 
    selectedLocationId, 
    setSelectedLocationId, 
    locationsList,
    currentLocation, 
    currentWeather 
  } = useSimulation();

  return (
    <section className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Section Header with Ref Image Style Badge */}
      <div className="text-center space-y-2 max-w-3xl mx-auto border-b border-stone-200 pb-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full text-xs font-mono font-bold bg-sky-100 text-sky-950 border border-sky-300 shadow-2xs">
          <Activity className="w-3.5 h-3.5 text-sky-700 animate-pulse" />
          <span>01 / REAL-TIME WEATHER TELEMETRY</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Live Operational Weather & Telemetry Command
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
          Real-time ground meteorological telemetry streams fused from Open-Meteo API and INSAT-3DR satellite observations across Chhatrapati Sambhajinagar district sectors.
        </p>
      </div>

      {/* Sector Selection Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
        <span className="text-xs font-mono font-bold text-stone-500 uppercase px-2">ACTIVE MONITORED SECTORS:</span>
        
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {locationsList.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocationId(loc.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                loc.id === selectedLocationId
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white hover:bg-stone-200/70 text-stone-700 border border-stone-200'
              }`}
            >
              📍 {loc.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Minimal Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* 1. Location */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">SECTOR</span>
          <div className="text-sm font-bold text-stone-900 truncate">📍 {currentLocation?.shortName || currentLocation?.name || 'Sector'}</div>
          <div className="text-[10px] text-stone-500 truncate">{currentLocation?.category || 'Monitored Zone'}</div>
        </div>

        {/* 2. Temperature */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">TEMPERATURE</span>
          <div className="text-xl font-black text-stone-900">{currentWeather?.temp ?? '31.2'} °C</div>
          <div className="text-[10px] text-stone-500">Thermal Index</div>
        </div>

        {/* 3. Humidity */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">HUMIDITY</span>
          <div className="text-xl font-black text-stone-900">{currentWeather?.humidity ?? '48'} %</div>
          <div className="text-[10px] text-stone-500">Relative Saturation</div>
        </div>

        {/* 4. Rainfall */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">RAINFALL</span>
          <div className="text-xl font-black text-stone-900">{currentWeather?.rainfall ?? '0.2'} <span className="text-xs text-stone-500">mm/h</span></div>
          <div className="text-[10px] text-stone-500">Precipitation Rate</div>
        </div>

        {/* 5. Wind */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">WIND VELOCITY</span>
          <div className="text-xl font-black text-stone-900">{currentWeather?.windSpeed ?? '12'} <span className="text-xs text-stone-500">km/h</span></div>
          <div className="text-[10px] text-stone-500">Vector {currentWeather?.windDirection ?? 'SW'}</div>
        </div>

        {/* 6. Risk Level */}
        <div className={`border rounded-2xl p-4 space-y-1 shadow-2xs ${
          currentWeather?.riskLevel === 'EXTREME' ? 'bg-purple-50 border-purple-300 text-purple-900' :
          currentWeather?.riskLevel === 'HIGH' ? 'bg-rose-50 border-rose-300 text-rose-900' :
          currentWeather?.riskLevel === 'MODERATE' ? 'bg-amber-50 border-amber-300 text-amber-900' :
          'bg-emerald-50 border-emerald-300 text-emerald-900'
        }`}>
          <span className="text-[10px] font-mono font-bold block">RISK LEVEL</span>
          <div className="text-lg font-black">{currentWeather?.riskLevel || 'SAFE'}</div>
          <div className="text-[10px] font-mono font-bold">Score: {currentWeather?.riskScore ?? 18}/100</div>
        </div>

      </div>

    </section>
  );
};
