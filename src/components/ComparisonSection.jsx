import React from 'react';
import { Layers, XCircle, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const ComparisonSection = () => {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 border-b border-stone-200 pb-4">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          <span>Targeted Improvement Matrix</span>
        </div>
        <h2 className="text-2xl font-black text-stone-900 tracking-tight">
          Why Hyper-Local Early Warning?
        </h2>
        <p className="text-xs text-stone-500 font-mono">
          Transforming passive broad-area forecasts into actionable hyper-local citizen alerts
        </p>
      </div>

      {/* Side-by-Side 2 Column Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT: Traditional Weather Information */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 space-y-4 shadow-2xs">
          <div className="flex items-center space-x-2 text-stone-700 font-extrabold text-sm border-b border-stone-200 pb-3">
            <XCircle className="w-5 h-5 text-rose-600" />
            <span>Traditional Weather Information</span>
          </div>

          <ul className="space-y-3 text-xs text-stone-700">
            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-bold">✕</span>
              <div>
                <strong className="text-stone-900">Broad-area information:</strong> District-wide advisories covering 10,000+ sq km.
              </div>
            </li>

            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-bold">✕</span>
              <div>
                <strong className="text-stone-900">User interprets forecast:</strong> Citizens must calculate if rain affects their specific underpass.
              </div>
            </li>

            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-bold">✕</span>
              <div>
                <strong className="text-stone-900">General warnings:</strong> Standard alerts lack actionable evacuation or safety instructions.
              </div>
            </li>

            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-bold">✕</span>
              <div>
                <strong className="text-stone-900">Limited personalization:</strong> Static 6-to-24 hour updates with low spatial resolution.
              </div>
            </li>
          </ul>
        </div>

        {/* RIGHT: Our Proposed System */}
        <div className="bg-amber-50/60 border-2 border-amber-300 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-amber-950 font-extrabold text-sm border-b border-amber-200 pb-3">
            <CheckCircle2 className="w-5 h-5 text-amber-700" />
            <span>Our Proposed System (SIH26077)</span>
          </div>

          <ul className="space-y-3 text-xs text-stone-800">
            <li className="flex items-start space-x-2">
              <span className="text-amber-700 font-bold">✓</span>
              <div>
                <strong className="text-stone-900">Hyper-local risk visualization:</strong> Pinpoint 1-3 km neighborhood level resolution.
              </div>
            </li>

            <li className="flex items-start space-x-2">
              <span className="text-amber-700 font-bold">✓</span>
              <div>
                <strong className="text-stone-900">Predictive risk score:</strong> AI multi-factor 0-100 score with 90-minute nowcasting horizon.
              </div>
            </li>

            <li className="flex items-start space-x-2">
              <span className="text-amber-700 font-bold">✓</span>
              <div>
                <strong className="text-stone-900">Location-aware warning:</strong> Geofenced automated alerts targeting citizens in high-risk zones.
              </div>
            </li>

            <li className="flex items-start space-x-2">
              <span className="text-amber-700 font-bold">✓</span>
              <div>
                <strong className="text-stone-900">Action-oriented alerts:</strong> Direct guidance ("Avoid low-lying underpass roads & move to concrete shelter").
              </div>
            </li>

            <li className="flex items-start space-x-2">
              <span className="text-amber-700 font-bold">✓</span>
              <div>
                <strong className="text-stone-900">Rapid risk updates:</strong> Low latency continuous spatial recalculations.
              </div>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
