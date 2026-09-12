import React, { createContext, useContext, useState, useEffect } from 'react';
import { SCENARIOS, SCENARIO_METADATA, WEATHER_DATA_BY_SCENARIO, NOWCASTING_TIMELINE_DATA, AI_RISK_FACTORS } from '../data/demoWeatherData';
import { DEMO_LOCATIONS } from '../data/demoLocations';
import { MULTILINGUAL_TEXT } from '../data/demoAlerts';
import { fetchLiveOpenMeteoData } from '../services/weatherApi';

const SimulationContext = createContext(null);

export const SimulationProvider = ({ children }) => {
  const [scenario, setScenarioState] = useState(SCENARIOS.NORMAL);
  const [selectedLocationId, setSelectedLocationId] = useState('waluj');
  const [locationsList, setLocationsList] = useState(DEMO_LOCATIONS);
  const [customWeatherDataMap, setCustomWeatherDataMap] = useState({});
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

  /**
   * Add dynamic searched city & fetch live weather data
   */
  const addAndSelectCity = async (locObj) => {
    // Check if location already exists in list
    const existing = locationsList.find(l => l.id === locObj.id || (l.coordinates[0] === locObj.coordinates[0] && l.coordinates[1] === locObj.coordinates[1]));
    
    let targetId = locObj.id;
    if (!existing) {
      setLocationsList((prev) => [locObj, ...prev]);
    } else {
      targetId = existing.id;
    }

    setSelectedLocationId(targetId);

    // Fetch live weather data for this city
    const live = await fetchLiveOpenMeteoData(locObj.coordinates[0], locObj.coordinates[1]);
    if (live && live.success) {
      const rain = live.rainfall;
      let riskLevel = 'SAFE';
      let riskScore = 18;
      if (rain > 75) { riskLevel = 'EXTREME'; riskScore = 92; }
      else if (rain > 40) { riskLevel = 'HIGH'; riskScore = 82; }
      else if (rain > 15) { riskLevel = 'MODERATE'; riskScore = 64; }
      else if (rain > 2) { riskLevel = 'LOW'; riskScore = 38; }

      setCustomWeatherDataMap((prev) => ({
        ...prev,
        [targetId]: {
          temp: `${live.temp}`,
          humidity: `${live.humidity}`,
          rainfall: `${live.rainfall}`,
          windSpeed: `${live.windSpeed}`,
          windDirection: 'SW',
          riskLevel: riskLevel,
          riskScore: riskScore,
          expectedTime: '+35 min lead time',
          predictionConfidence: '94% (LIVE API)',
          currentRainfall: `${live.rainfall} mm/h`,
          currentWindSpeed: `${live.windSpeed} km/h`,
          recommendedAction: {
            en: `Live Telemetry fetched for ${locObj.shortName}. Maintain active watch over local low-lying drainage channels.`,
            mr: `${locObj.shortName} साठी थेट माहिती प्राप्त झाली. स्थानिक सखल भागांवर लक्ष ठेवा.`,
            hi: `${locObj.shortName} के लिए लाइव डेटा प्राप्त हुआ। निचले क्षेत्रों पर नजर रखें।`
          }
        }
      }));
    }
  };

  const setScenario = (newScenario) => {
    setScenarioState(newScenario);
    
    // Trigger toast notification on severe weather change
    if (newScenario === SCENARIOS.HEAVY_RAIN || newScenario === SCENARIOS.SEVERE_WEATHER) {
      playAlertSound(newScenario === SCENARIOS.SEVERE_WEATHER ? 950 : 750, 0.5);
      const loc = locationsList.find(l => l.id === selectedLocationId) || locationsList[0];
      const data = customWeatherDataMap[selectedLocationId] || (WEATHER_DATA_BY_SCENARIO[newScenario][selectedLocationId] || WEATHER_DATA_BY_SCENARIO[newScenario].waluj);
      
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
  const currentScenarioMeta = SCENARIO_METADATA[scenario] || SCENARIO_METADATA.NORMAL;
  const currentLocation = (locationsList && locationsList.find(l => l.id === selectedLocationId)) || locationsList[0] || DEMO_LOCATIONS[0];

  const defaultWeatherData = {
    temp: '31.2',
    humidity: '48',
    rainfall: '0.2',
    windSpeed: '12',
    windDirection: 'SW',
    pressure: 1012,
    riskLevel: 'SAFE',
    riskScore: 18,
    predictedRisk: 'SAFE',
    predictionConfidence: '92% (SIMULATION)',
    expectedTime: 'Stable (Next 6 hrs)',
    currentRainfall: '0.2 mm/h',
    currentWindSpeed: '12 km/h',
    recommendedAction: {
      en: 'Normal conditions. No weather hazards detected.',
      mr: 'सामान्य परिस्थिती. हवामानाचा कोणताही धोका आढळलेला नाही.',
      hi: 'सामान्य स्थिति। मौसम का कोई खतरा नहीं पाया गया।'
    }
  };

  const scenarioWeatherObj = WEATHER_DATA_BY_SCENARIO[scenario] || WEATHER_DATA_BY_SCENARIO.NORMAL;
  const scenarioLocationWeather = scenarioWeatherObj[selectedLocationId] || scenarioWeatherObj.waluj || defaultWeatherData;

  const currentWeather = {
    ...defaultWeatherData,
    ...scenarioLocationWeather,
    ...(customWeatherDataMap[selectedLocationId] || {})
  };

  // Ensure currentRainfall & currentWindSpeed are populated
  if (!currentWeather.currentRainfall) {
    currentWeather.currentRainfall = `${currentWeather.rainfall} mm/h`;
  }
  if (!currentWeather.currentWindSpeed) {
    currentWeather.currentWindSpeed = `${currentWeather.windSpeed} km/h`;
  }

  const currentTimeline = NOWCASTING_TIMELINE_DATA[scenario] || NOWCASTING_TIMELINE_DATA.NORMAL;
  const currentAiFactors = AI_RISK_FACTORS[scenario] || AI_RISK_FACTORS.NORMAL;
  const t = MULTILINGUAL_TEXT[language] || MULTILINGUAL_TEXT.en;

  const value = {
    scenario,
    setScenario,
    selectedLocationId,
    setSelectedLocationId,
    locationsList,
    addAndSelectCity,
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
