import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { AlertTriangle, X, Clock, MapPin, ShieldAlert, ArrowRight } from 'lucide-react';

export const NotificationToast = () => {
  const { toastAlert, setToastAlert } = useSimulation();

  if (!toastAlert) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md w-[90%] sm:w-auto bg-white/95 backdrop-blur-xl border border-rose-300 rounded-2xl p-4 shadow-xl text-stone-900 animate-alert-glow">
      <div className="flex items-start justify-between gap-3 border-b border-stone-200 pb-2">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-rose-600 animate-bounce" />
          <h4 className="font-bold text-sm text-rose-900 font-mono">
            {toastAlert.title}
          </h4>
        </div>
        <button
          onClick={() => setToastAlert(null)}
          className="text-stone-400 hover:text-stone-900 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center justify-between text-stone-700 font-mono">
          <span className="flex items-center gap-1 font-bold text-stone-900">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            {toastAlert.location}
          </span>
          <span className="flex items-center gap-1 text-stone-500">
            <Clock className="w-3.5 h-3.5" />
            {toastAlert.time}
          </span>
        </div>

        <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-rose-950">
          <div className="font-bold text-[11px] uppercase tracking-wider text-rose-900">
            Severity: {toastAlert.risk} ({toastAlert.score}/100) • Expected: {toastAlert.expected}
          </div>
          <p className="mt-1 text-xs leading-relaxed font-sans font-medium">
            "{toastAlert.message}"
          </p>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={() => setToastAlert(null)}
            className="px-3 py-1 rounded bg-stone-900 hover:bg-stone-800 text-amber-100 font-mono font-bold text-[10px]"
          >
            Acknowledge Early Warning
          </button>
        </div>
      </div>
    </div>
  );
};
