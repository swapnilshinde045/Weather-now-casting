import React from 'react';
import { Activity, Clock, Zap, AlertTriangle, ShieldCheck, BarChart3, Info } from 'lucide-react';

export const AnalyticsDemo = () => {
  const metrics = [
    {
      title: 'Average Alert Lead Time',
      value: '38 min',
      sub: 'Pre-event early warning window',
      color: 'text-amber-800',
      badge: 'Simulated Target'
    },
    {
      title: 'Risk Detection Accuracy',
      value: '94.2%',
      sub: 'Convective cell correlation',
      color: 'text-emerald-800',
      badge: 'Synthetic Validation'
    },
    {
      title: 'Alert Broadcast Latency',
      value: '< 5 sec',
      sub: 'Cell broadcast dispatch speed',
      color: 'text-purple-800',
      badge: 'Benchmark Test'
    },
    {
      title: 'False Alarm Rate',
      value: 'Prototype Eval',
      sub: 'Tuned via historical backtesting',
      color: 'text-stone-900',
      badge: 'Under Evaluation'
    }
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-extrabold text-stone-900">
              System Performance & Analytics
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-300">
              Prototype Benchmark Metrics
            </span>
          </div>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Simulated performance evaluations across Chhatrapati Sambhajinagar test sectors
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-2xs">
          <Info className="w-4 h-4 text-amber-700" />
          <span>Demo / Simulated Metrics</span>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold">
              <span>{m.title}</span>
              <span className="px-1.5 py-0.5 rounded bg-white text-stone-700 border border-stone-200 text-[9px]">
                {m.badge}
              </span>
            </div>

            <div>
              <div className={`text-3xl font-black ${m.color} tracking-tight font-mono`}>
                {m.value}
              </div>
              <div className="text-[11px] text-stone-500 mt-1 font-mono">
                {m.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lead Time Advantage Visual */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4 shadow-2xs">
        <h3 className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
          SIMULATED LEAD TIME ADVANTAGE COMPARISON
        </h3>

        <div className="space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between mb-1 text-stone-600 font-semibold">
              <span>Traditional District Forecast (Broad bulletin)</span>
              <span className="text-stone-500 font-bold">~ 0 to 10 min local notice</span>
            </div>
            <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden border border-stone-300">
              <div className="bg-stone-400 h-full w-[15%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-stone-900 font-bold">
              <span className="text-amber-900 font-bold">Our Proposed Hyper-Local AI System (SIH26077)</span>
              <span className="text-amber-900 font-bold">38 min early lead time window</span>
            </div>
            <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden border border-stone-300">
              <div className="bg-gradient-to-r from-amber-600 to-stone-800 h-full w-[78%] animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-500 font-mono text-center">
        ⚠️ DISCLAIMER: Metrics shown are derived from simulated prototype test cases for presentation purposes.
      </div>

    </div>
  );
};
