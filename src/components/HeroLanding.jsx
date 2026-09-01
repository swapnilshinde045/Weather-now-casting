import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const HeroLanding = ({ onLaunchDemo, onHowItWorks }) => {
  const { scenario, t } = useSimulation();

  return (
    <section className="py-10 text-center max-w-3xl mx-auto space-y-4">
      
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-100 text-amber-900 border border-amber-300">
        <span>SIH26077 • Prototype Presentation Demo</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
        AI-Driven Hyper-Local <br />
        <span className="text-amber-800">Early Warning System</span>
      </h1>

      <p className="text-base text-stone-600 font-medium leading-relaxed max-w-2xl mx-auto">
        Predict Severe Weather. Detect Local Risk. Warn People Before It Escalates.
      </p>

      <div className="pt-2 flex items-center justify-center space-x-3">
        <button
          onClick={onLaunchDemo}
          className="px-6 py-2.5 rounded-lg font-bold text-xs bg-stone-900 hover:bg-stone-800 text-white transition flex items-center space-x-2 cursor-pointer shadow-xs"
        >
          <span>Launch Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </button>

        <button
          onClick={onHowItWorks}
          className="px-6 py-2.5 rounded-lg font-semibold text-xs bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 transition cursor-pointer"
        >
          <span>System Workflow</span>
        </button>
      </div>

    </section>
  );
};
