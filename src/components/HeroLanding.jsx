import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { ArrowRight, Activity, ShieldCheck, Zap, Radio, Globe, Satellite, Sparkles } from 'lucide-react';
import { Button } from './ui/saa-s-template';

export const HeroLanding = ({ onLaunchDemo, onHowItWorks }) => {
  const { scenario, t } = useSimulation();

  return (
    <section
      className="relative flex flex-col items-center justify-start px-4 sm:px-6 py-12 md:py-20 text-white overflow-hidden"
      style={{
        animation: "fadeIn 0.6s ease-out"
      }}
    >
      {/* Background Radial Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-purple-600/15 to-sky-500/10 blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      {/* Hero Badge */}
      <aside className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700/80 bg-zinc-900/60 backdrop-blur-md max-w-full shadow-lg">
        <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          ⚡ SIH26077 • Operational AI Weather Engine
        </span>
        <button
          onClick={onHowItWorks}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-all active:scale-95 whitespace-nowrap font-medium cursor-pointer"
          aria-label="Read system architecture and workflow"
        >
          <span>Architecture Document</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </aside>

      {/* Main SaaS Headline */}
      <h1
        className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-center max-w-4xl px-4 leading-[1.15] mb-6 tracking-tight"
        style={{
          background: "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255, 255, 255, 0.65))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.04em"
        }}
      >
        Give your district <br />
        the weather engine it deserves
      </h1>

      {/* Subheadline */}
      <p className="text-sm sm:text-base md:text-lg text-center max-w-2xl px-4 mb-10 text-zinc-400 font-normal leading-relaxed">
        INSAT-3DR Satellite & Multi-Sensor Telemetry Fusion powered by Google Gemini 2.0 AI. Predict severe thunderstorms, cloudbursts, and urban flash floods <strong className="text-amber-300 font-semibold">38 minutes before impact</strong>.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 mb-16">
        <Button
          type="button"
          variant="gradient"
          size="lg"
          onClick={onLaunchDemo}
          className="rounded-xl flex items-center justify-center font-semibold text-sm cursor-pointer shadow-xl shadow-white/10 hover:scale-105 transition"
        >
          <span>Launch Command Center</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={onHowItWorks}
          className="rounded-xl flex items-center justify-center font-medium text-sm text-zinc-300 hover:text-white border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/80 backdrop-blur-sm cursor-pointer"
        >
          <span>Technical Flow & Architecture</span>
        </Button>
      </div>

      {/* Dashboard Mirror Preview Frame */}
      <div className="w-full max-w-5xl relative pb-10">
        {/* Glow Mirror Backdrop Asset */}
        <div
          className="absolute left-1/2 w-[95%] pointer-events-none z-0 opacity-80"
          style={{
            top: "-25%",
            transform: "translateX(-50%)"
          }}
          aria-hidden="true"
        >
          <img
            src="https://cdn.21st.dev/assets/mirror/ab/abe6d8090cc14780b846eee062024e4e03274c99d38188554239cd312a7180fa.png"
            alt="Glow background effect"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
        
        {/* Interactive Dashboard Live Card Frame */}
        <div className="relative z-10 bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-4">
          
          {/* Top Bar of Dashboard Preview */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
              <div>
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Waluj Industrial Sector 3</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    LIVE OPERATIONAL
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  Coordinates: 19.8398° N, 75.2285° E • Kham River Low-Lying Axis
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-sky-400" />
                INSAT-3DR Stream Active
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                Lead Time: 38 Min
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
              <span className="text-zinc-500 text-[10px] block">Open-Meteo Temp</span>
              <strong className="text-base text-white font-bold">29.4 °C</strong>
            </div>
            <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
              <span className="text-zinc-500 text-[10px] block">Relative Humidity</span>
              <strong className="text-base text-sky-400 font-bold">78 %</strong>
            </div>
            <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
              <span className="text-zinc-500 text-[10px] block">Rainfall Rate</span>
              <strong className="text-base text-amber-400 font-bold">42.5 mm/h</strong>
            </div>
            <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
              <span className="text-zinc-500 text-[10px] block">Gemini AI Risk Score</span>
              <strong className="text-base text-rose-400 font-bold">86 / 100 (HIGH)</strong>
            </div>
          </div>

          {/* SaaS Image Mirror Backdrop Asset Overlay */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800/80 shadow-xl group cursor-pointer" onClick={onLaunchDemo}>
            <img
              src="https://cdn.21st.dev/assets/mirror/a9/a9c7043f8f41ca34d70f771cba29b4ba6d11ef8f5f51c90d21f220fea109d6af.png"
              alt="AGNI-CAST Dashboard Live Operational View"
              className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition duration-300"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent flex items-end justify-center p-6">
              <div className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center space-x-2 shadow-2xl group-hover:scale-105 transition">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Explore Full Interactive GIS Dashboard & AI Engine →</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
