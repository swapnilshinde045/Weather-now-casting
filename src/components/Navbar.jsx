import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SCENARIOS } from '../data/demoWeatherData';
import { ShieldAlert, Sun, CloudRain, CloudLightning, Zap, Tv, Menu, X } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { 
    scenario, 
    setScenario, 
    isPresentationMode, 
    togglePresentationMode
  } = useSimulation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 text-stone-900 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <div className="w-9 h-9 rounded-lg bg-stone-900 flex items-center justify-center text-amber-400 font-bold shadow-xs">
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
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-stone-600 font-mono">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`transition cursor-pointer ${activeTab === 'dashboard' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('map')}
              className={`transition cursor-pointer ${activeTab === 'map' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Geospatial Map
            </button>
            <button
              onClick={() => handleNavClick('nowcasting')}
              className={`transition cursor-pointer ${activeTab === 'nowcasting' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              AI Nowcasting
            </button>
            <button
              onClick={() => handleNavClick('warning-system')}
              className={`transition cursor-pointer ${activeTab === 'warning-system' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Early Warning
            </button>
            <button
              onClick={() => handleNavClick('admin-panel')}
              className={`transition cursor-pointer ${activeTab === 'admin-panel' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Admin Control
            </button>
            <button
              onClick={() => handleNavClick('api-info')}
              className={`transition cursor-pointer ${activeTab === 'api-info' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              7-API Network
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className={`transition cursor-pointer ${activeTab === 'architecture' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-1' : 'hover:text-stone-900'}`}
            >
              Architecture
            </button>
          </nav>

          {/* Action & Presentation Mode Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePresentationMode}
              className={`p-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer border ${
                isPresentationMode 
                  ? 'bg-purple-800 text-white border-purple-700' 
                  : 'bg-stone-900 text-amber-100 hover:bg-stone-800 border-stone-800'
              }`}
              title="Toggle Presentation Tour Mode"
            >
              <Tv className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-xs font-mono font-bold">Tour Mode</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-stone-700 p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-4 py-3 flex flex-col space-y-2 text-xs font-mono font-bold text-stone-700">
            <button onClick={() => handleNavClick('hero')} className="text-left py-1.5 border-b border-stone-100">🏠 Home</button>
            <button onClick={() => handleNavClick('dashboard')} className="text-left py-1.5 border-b border-stone-100">🌐 Dashboard</button>
            <button onClick={() => handleNavClick('map')} className="text-left py-1.5 border-b border-stone-100">🗺️ Geospatial Map</button>
            <button onClick={() => handleNavClick('nowcasting')} className="text-left py-1.5 border-b border-stone-100">⚡ AI Nowcasting</button>
            <button onClick={() => handleNavClick('warning-system')} className="text-left py-1.5 border-b border-stone-100">⚠️ Early Warning</button>
            <button onClick={() => handleNavClick('admin-panel')} className="text-left py-1.5 border-b border-stone-100">🎛️ Admin Control</button>
            <button onClick={() => handleNavClick('api-info')} className="text-left py-1.5 border-b border-stone-100">📡 7-API Network</button>
            <button onClick={() => handleNavClick('architecture')} className="text-left py-1.5">🏛️ System Architecture</button>
          </div>
        </div>
      )}
    </header>
  );
};
