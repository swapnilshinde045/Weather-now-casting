import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Smartphone, Globe, ShieldAlert, MapPin, Clock, ArrowRight, BellRing, Wifi, Battery, Signal } from 'lucide-react';

export const UserExperienceCitizen = () => {
  const { 
    language, 
    setLanguage, 
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
            <Smartphone className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-extrabold text-stone-900">
              Citizen Mobile Alert Experience
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
              Cell Broadcast System (CBS)
            </span>
          </div>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Simulated citizen smartphone interface showing localized automated broadcast
          </p>
        </div>

        {/* Multilingual Switcher */}
        <div className="flex items-center space-x-1.5 bg-stone-50 border border-stone-200 p-1 rounded-lg text-xs font-mono">
          <Globe className="w-4 h-4 text-stone-400 ml-1" />
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded font-bold transition ${language === 'en' ? 'bg-amber-800 text-white' : 'text-stone-600 hover:text-stone-900'}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('mr')}
            className={`px-2.5 py-1 rounded font-bold transition ${language === 'mr' ? 'bg-amber-800 text-white' : 'text-stone-600 hover:text-stone-900'}`}
          >
            मराठी
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-2.5 py-1 rounded font-bold transition ${language === 'hi' ? 'bg-amber-800 text-white' : 'text-stone-600 hover:text-stone-900'}`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Smartphone Container Mockup */}
      <div className="max-w-md mx-auto relative bg-stone-900 rounded-[40px] border-4 border-stone-800 p-4 shadow-xl text-stone-100 ring-1 ring-stone-700/50">
        
        <div className="w-32 h-4 bg-stone-950 rounded-full mx-auto mb-4 flex items-center justify-between px-3">
          <div className="w-2 h-2 rounded-full bg-stone-800"></div>
          <div className="w-12 h-1.5 rounded-full bg-stone-800"></div>
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-400 px-3 py-1 font-mono">
          <span>14:40</span>
          <div className="flex items-center space-x-2">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-3" />
          </div>
        </div>

        <div className="mt-4 bg-stone-950 rounded-2xl p-4 border border-stone-800 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
          
          <div className="space-y-4">
            
            <div className="flex items-center justify-between text-xs border-b border-stone-800 pb-2">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold font-mono">
                <BellRing className="w-4 h-4 animate-bounce text-amber-400" />
                <span>AGNI-CAST EMERGENCY ALERT</span>
              </div>
              <span className="text-[10px] text-stone-500 font-mono">Just Now</span>
            </div>

            <div className={`p-4 rounded-xl border space-y-3 shadow-xl ${
              scenario === 'SEVERE_WEATHER' || scenario === 'HEAVY_RAIN'
                ? 'bg-rose-950/90 border-rose-500 text-slate-100 animate-alert-glow'
                : 'bg-stone-900 border-stone-800 text-stone-200'
            }`}>
              
              <div className="flex items-start justify-between">
                <div className="font-extrabold text-sm text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>🚨 {language === 'mr' ? 'गंभीर हवामान इशारा' : language === 'hi' ? 'गंभीर मौसम चेतावनी' : 'Severe Weather Alert'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-900 text-rose-200 font-bold">
                  {currentWeather.riskLevel}
                </span>
              </div>

              <p className="text-xs font-medium leading-relaxed">
                "{currentWeather.recommendedAction[language] || currentWeather.recommendedAction.en}"
              </p>

              <div className="pt-2 border-t border-stone-800/80 space-y-1 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-stone-400">Location:</span>
                  <span className="text-white font-bold">{currentLocation.shortName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Expected:</span>
                  <span className="text-amber-300 font-bold">{currentWeather.expectedTime}</span>
                </div>
              </div>

            </div>

            <div className="space-y-2">
              <button 
                onClick={() => alert(`Evacuation shelter directions opened for ${currentLocation.shortName}`)}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
              >
                🗺️ Navigate to High Ground Shelter
              </button>

              <button 
                onClick={() => alert('Dialing Emergency Helpline 1077...')}
                className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 transition cursor-pointer"
              >
                📞 Call Emergency Helpline (1077)
              </button>
            </div>

          </div>

          <div className="mt-4 pt-2 border-t border-stone-800 text-center text-[10px] text-stone-400 font-mono">
            <span>Multilingual Capability Demo: EN / MR / HI</span>
          </div>

        </div>

        <div className="w-28 h-1 bg-stone-700 rounded-full mx-auto mt-3"></div>

      </div>

    </div>
  );
};
