import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SCENARIOS } from '../data/demoWeatherData';
import { ShieldAlert, Sun, CloudRain, CloudLightning, Zap, Tv, Menu, X, Satellite, Bot, Globe } from 'lucide-react';
import { Button } from './ui/saa-s-template';

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
    <header className="fixed top-0 w-full z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group" 
            onClick={() => handleNavClick('hero')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-rose-600 flex items-center justify-center text-black font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
              <ShieldAlert className="w-4 h-4 text-black" />
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
                AGNI-CAST
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400 block -mt-0.5">
                SIH26077 • OPERATIONAL
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center justify-center gap-6 font-medium text-xs">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'dashboard' ? 'text-white font-bold border-b-2 border-amber-400' : 'text-zinc-400 hover:text-white'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('map')}
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'map' ? 'text-white font-bold border-b-2 border-amber-400' : 'text-zinc-400 hover:text-white'}`}
            >
              GIS Sector Map
            </button>
            <button
              onClick={() => handleNavClick('nowcasting')}
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'nowcasting' ? 'text-white font-bold border-b-2 border-amber-400' : 'text-zinc-400 hover:text-white'}`}
            >
              AI Nowcasting
            </button>
            <button
              onClick={() => handleNavClick('warning-system')}
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'warning-system' ? 'text-white font-bold border-b-2 border-amber-400' : 'text-zinc-400 hover:text-white'}`}
            >
              Early Warning
            </button>
            <button
              onClick={() => handleNavClick('admin-panel')}
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'admin-panel' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-zinc-400 hover:text-white'}`}
            >
              Admin Control
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className={`transition-colors py-1 cursor-pointer ${activeTab === 'architecture' ? 'text-white font-bold border-b-2 border-amber-400' : 'text-zinc-400 hover:text-white'}`}
            >
              Architecture
            </button>
          </div>

          {/* Right Action & Scenario Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Presentation Mode Toggle */}
            <button
              onClick={togglePresentationMode}
              className={`p-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer border ${
                isPresentationMode 
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/20' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
              title="Toggle Presentation Tour Mode for SIH Judges"
            >
              <Tv className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline text-[11px]">Tour Mode</span>
            </button>

            {/* Launch Command Center Button */}
            <Button
              type="button"
              variant="gradient"
              size="sm"
              onClick={() => handleNavClick('dashboard')}
              className="rounded-lg font-semibold text-xs text-black cursor-pointer shadow-md shadow-white/10"
            >
              Command Center
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-zinc-300 hover:text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 animate-[slideDown_0.2s_ease-out]">
          <div className="px-6 py-4 flex flex-col gap-3 font-mono text-xs">
            <button
              onClick={() => handleNavClick('hero')}
              className={`text-left py-2 border-b border-zinc-900 ${activeTab === 'hero' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
            >
              🏠 Home & Overview
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`text-left py-2 border-b border-zinc-900 ${activeTab === 'dashboard' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
            >
              🌐 Live Dashboard
            </button>
            <button
              onClick={() => handleNavClick('map')}
              className={`text-left py-2 border-b border-zinc-900 ${activeTab === 'map' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
            >
              🗺️ GIS Sector Map
            </button>
            <button
              onClick={() => handleNavClick('nowcasting')}
              className={`text-left py-2 border-b border-zinc-900 ${activeTab === 'nowcasting' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
            >
              ⚡ AI Nowcasting Engine
            </button>
            <button
              onClick={() => handleNavClick('warning-system')}
              className={`text-left py-2 border-b border-zinc-900 ${activeTab === 'warning-system' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
            >
              ⚠️ Early Warning System
            </button>
            <button
              onClick={() => handleNavClick('admin-panel')}
              className={`text-left py-2 border-b border-zinc-900 ${activeTab === 'admin-panel' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
            >
              🎛️ Admin Control Panel
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className={`text-left py-2 border-b border-zinc-900 ${activeTab === 'architecture' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
            >
              🏛️ System Architecture Flowchart
            </button>

            <div className="pt-2 flex flex-col gap-2">
              <Button
                type="button"
                variant="gradient"
                size="sm"
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-black font-bold"
              >
                Launch Command Center
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
