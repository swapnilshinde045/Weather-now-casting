import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SCENARIOS } from '../data/demoWeatherData';
import { ShieldAlert, Sun, CloudRain, CloudLightning, Zap, Tv } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { 
    scenario, 
    setScenario, 
    isPresentationMode, 
    togglePresentationMode,
    language,
    setLanguage
  } = useSimulation();

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('hero')}>
            <div className="w-9 h-9 rounded-lg bg-stone-900 flex items-center justify-center text-amber-400 font-bold">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-black text-lg text-stone-900 tracking-tight">
                AGNI-CAST
              </span>
              <span className="ml-2 text-xs font-mono font-bold text-stone-500">
                SIH26077
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-stone-600">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`transition ${activeTab === 'dashboard' ? 'text-amber-800 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`transition ${activeTab === 'map' ? 'text-amber-800 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Geospatial Map
            </button>
            <button
              onClick={() => setActiveTab('nowcasting')}
              className={`transition ${activeTab === 'nowcasting' ? 'text-amber-800 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              AI Nowcasting
            </button>
            <button
              onClick={() => setActiveTab('warning-system')}
              className={`transition ${activeTab === 'warning-system' ? 'text-amber-800 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Early Warning
            </button>
            <button
              onClick={() => setActiveTab('admin-panel')}
              className={`transition ${activeTab === 'admin-panel' ? 'text-amber-800 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Admin Control
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`transition ${activeTab === 'architecture' ? 'text-amber-800 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Workflow Flowchart
            </button>
          </nav>

          {/* Scenario Trigger Pills right in Header */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
              <button
                onClick={() => setScenario(SCENARIOS.NORMAL)}
                className={`px-2.5 py-1 rounded font-bold transition ${scenario === SCENARIOS.NORMAL ? 'bg-emerald-700 text-white' : 'text-stone-600 hover:text-stone-900'}`}
              >
                Normal
              </button>
              <button
                onClick={() => setScenario(SCENARIOS.MODERATE_RAIN)}
                className={`px-2.5 py-1 rounded font-bold transition ${scenario === SCENARIOS.MODERATE_RAIN ? 'bg-amber-600 text-white' : 'text-stone-600 hover:text-stone-900'}`}
              >
                Rain
              </button>
              <button
                onClick={() => setScenario(SCENARIOS.HEAVY_RAIN)}
                className={`px-2.5 py-1 rounded font-bold transition ${scenario === SCENARIOS.HEAVY_RAIN ? 'bg-rose-600 text-white' : 'text-stone-600 hover:text-stone-900'}`}
              >
                Heavy
              </button>
              <button
                onClick={() => setScenario(SCENARIOS.SEVERE_WEATHER)}
                className={`px-2.5 py-1 rounded font-bold transition ${scenario === SCENARIOS.SEVERE_WEATHER ? 'bg-purple-700 text-white' : 'text-stone-600 hover:text-stone-900'}`}
              >
                Severe
              </button>
            </div>

            <button
              onClick={togglePresentationMode}
              className={`p-2 rounded-lg text-xs font-bold transition ${isPresentationMode ? 'bg-purple-800 text-white' : 'bg-stone-900 text-amber-100 hover:bg-stone-800'}`}
              title="Toggle Presentation Mode"
            >
              <Tv className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
