import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { DEMO_LOCATIONS } from '../data/demoLocations';
import { Thermometer, Droplets, CloudRain, Wind, AlertTriangle, MapPin } from 'lucide-react';

export const LiveDashboard = () => {
  const { 
    selectedLocationId, 
    setSelectedLocationId, 
    currentLocation, 
    currentWeather 
  } = useSimulation();

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-stone-900">
            Live Weather & Risk Command
          </h2>
          <p className="text-xs text-stone-500 font-mono">
            Chhatrapati Sambhajinagar Surveillance Zone
          </p>
        </div>

        {/* Sector Selector */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {DEMO_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocationId(loc.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                loc.id === selectedLocationId
                  ? 'bg-stone-900 text-white font-bold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {loc.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Minimal Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* 1. Location */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">LOCATION</span>
          <div className="text-sm font-bold text-stone-900 mt-1 truncate">📍 {currentLocation.shortName}</div>
          <div className="text-[10px] text-stone-500 truncate">{currentLocation.category}</div>
        </div>

        {/* 2. Temperature */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">TEMP</span>
          <div className="text-xl font-black text-stone-900 mt-1">{currentWeather.temp} °C</div>
          <div className="text-[10px] text-stone-500">Thermal Index</div>
        </div>

        {/* 3. Humidity */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">HUMIDITY</span>
          <div className="text-xl font-black text-stone-900 mt-1">{currentWeather.humidity} %</div>
          <div className="text-[10px] text-stone-500">Relative Saturation</div>
        </div>

        {/* 4. Rainfall */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">RAINFALL</span>
          <div className="text-xl font-black text-stone-900 mt-1">{currentWeather.rainfall} <span className="text-xs text-stone-500">mm/h</span></div>
          <div className="text-[10px] text-stone-500">Intensity Rate</div>
        </div>

        {/* 5. Wind */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3">
          <span className="text-[10px] font-mono text-stone-400 block font-bold">WIND</span>
          <div className="text-xl font-black text-stone-900 mt-1">{currentWeather.windSpeed} <span className="text-xs text-stone-500">km/h</span></div>
          <div className="text-[10px] text-stone-500">Direction {currentWeather.windDirection}</div>
        </div>

        {/* 6. Risk Level */}
        <div className={`border rounded-lg p-3 ${
          currentWeather.riskLevel === 'EXTREME' ? 'bg-purple-50 border-purple-300 text-purple-900' :
          currentWeather.riskLevel === 'HIGH' ? 'bg-rose-50 border-rose-300 text-rose-900' :
          currentWeather.riskLevel === 'MODERATE' ? 'bg-amber-50 border-amber-300 text-amber-900' :
          'bg-emerald-50 border-emerald-300 text-emerald-900'
        }`}>
          <span className="text-[10px] font-mono font-bold block">RISK LEVEL</span>
          <div className="text-lg font-black mt-1">{currentWeather.riskLevel}</div>
          <div className="text-[10px] font-mono font-bold">Score: {currentWeather.riskScore}/100</div>
        </div>

      </div>

    </div>
  );
};
