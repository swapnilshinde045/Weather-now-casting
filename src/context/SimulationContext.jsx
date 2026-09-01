import React, { createContext, useContext, useState, useEffect } from 'react';
import { SCENARIOS, SCENARIO_METADATA, WEATHER_DATA_BY_SCENARIO, NOWCASTING_TIMELINE_DATA, AI_RISK_FACTORS } from '../data/demoWeatherData';
import { DEMO_LOCATIONS } from '../data/demoLocations';
import { MULTILINGUAL_TEXT } from '../data/demoAlerts';

const SimulationContext = createContext(null);

export const SimulationProvider = ({ children }) => {
  const [scenario, setScenarioState] = useState(SCENARIOS.NORMAL);
  const [selectedLocationId, setSelectedLocationId] = useState('waluj');
  const [language, setLanguage] = useState('en');
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [timeStepIndex, setTimeStepIndex] = useState(2); // +30 MIN by default
  const [guidedStep, setGuidedStep] = useState(1);
  const [toastAlert, setToastAlert] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Audio synthesize alert sound using Web Audio API
  const playAlertSound = (freq = 880, duration = 0.3) => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio alert fallback', e);
    }
  };

  const setScenario = (newScenario) => {
    setScenarioState(newScenario);
    
    // Trigger toast notification on severe weather change
    if (newScenario === SCENARIOS.HEAVY_RAIN || newScenario === SCENARIOS.SEVERE_WEATHER) {
      playAlertSound(newScenario === SCENARIOS.SEVERE_WEATHER ? 950 : 750, 0.5);
      const loc = DEMO_LOCATIONS.find(l => l.id === selectedLocationId) || DEMO_LOCATIONS[0];
      const data = WEATHER_DATA_BY_SCENARIO[newScenario][selectedLocationId] || WEATHER_DATA_BY_SCENARIO[newScenario].waluj;
      
      setToastAlert({
        id: Date.now(),
        title: newScenario === SCENARIOS.SEVERE_WEATHER ? '🚨 CLOUDBURST & FLASH FLOOD ALERT' : '🚨 NEW EARLY WARNING',
        location: loc.name,
        risk: data.riskLevel,
        score: data.riskScore,
        time: new Date().toLocaleTimeString(),
        message: data.recommendedAction[language] || data.recommendedAction.en,
        expected: data.expectedTime
      });
    } else {
      setToastAlert(null);
    }
  };

  // Auto-play timeline simulation
  useEffect(() => {
    let interval = null;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setTimeStepIndex((prev) => (prev + 1) % 6);
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  // Derived current values
  const currentScenarioMeta = SCENARIO_METADATA[scenario];
  const currentLocation = DEMO_LOCATIONS.find(l => l.id === selectedLocationId) || DEMO_LOCATIONS[0];
  const currentWeather = WEATHER_DATA_BY_SCENARIO[scenario][selectedLocationId] || WEATHER_DATA_BY_SCENARIO[scenario].waluj;
  const currentTimeline = NOWCASTING_TIMELINE_DATA[scenario];
  const currentAiFactors = AI_RISK_FACTORS[scenario];
  const t = MULTILINGUAL_TEXT[language] || MULTILINGUAL_TEXT.en;

  const value = {
    scenario,
    setScenario,
    selectedLocationId,
    setSelectedLocationId,
    currentLocation,
    currentScenarioMeta,
    currentWeather,
    currentTimeline,
    currentAiFactors,
    language,
    setLanguage,
    t,
    isPresentationMode,
    setIsPresentationMode,
    togglePresentationMode: () => setIsPresentationMode(!isPresentationMode),
    isAutoPlaying,
    setIsAutoPlaying,
    toggleAutoPlay: () => setIsAutoPlaying(!isAutoPlaying),
    timeStepIndex,
    setTimeStepIndex,
    guidedStep,
    setGuidedStep,
    toastAlert,
    setToastAlert,
    audioEnabled,
    setAudioEnabled,
    playAlertSound
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
