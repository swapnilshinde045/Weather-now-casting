import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSimulation } from '../context/SimulationContext';
import { DEMO_LOCATIONS } from '../data/demoLocations';
import { WEATHER_DATA_BY_SCENARIO } from '../data/demoWeatherData';
import { MapPin, AlertTriangle, Clock, Zap } from 'lucide-react';

const MapRecenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 11, { duration: 1 });
  }, [center, map]);
  return null;
};

const getRiskColor = (riskLevel) => {
  switch (riskLevel) {
    case 'SAFE': return '#059669';
    case 'LOW': return '#d97706';
    case 'MODERATE': return '#ea580c';
    case 'HIGH': return '#dc2626';
    case 'EXTREME': return '#7c3aed';
    default: return '#059669';
  }
};

const createCustomMarker = (riskLevel, shortName, isSelected) => {
  const color = getRiskColor(riskLevel);
  const scale = isSelected ? 'scale(1.2)' : 'scale(1)';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="transform: ${scale}; transition: all 0.2s ease; cursor: pointer; text-align: center;">
        <div style="width: 20px; height: 20px; border-radius: 50%; background: ${color}; border: 2px solid #fff; margin: 0 auto; box-shadow: 0 2px 6px rgba(0,0,0,0.2);"></div>
        <div style="background: #ffffff; color: #1c1917; border: 1px solid #e7e0d3; padding: 1px 5px; border-radius: 4px; font-size: 10px; font-weight: 700; margin-top: 2px; white-space: nowrap;">
          ${shortName}
        </div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

export const HyperLocalMap = () => {
  const { 
    selectedLocationId, 
    setSelectedLocationId, 
    scenario, 
    language 
  } = useSimulation();

  const selectedLoc = DEMO_LOCATIONS.find(l => l.id === selectedLocationId) || DEMO_LOCATIONS[0];
  const selectedWeatherData = WEATHER_DATA_BY_SCENARIO[scenario][selectedLocationId] || WEATHER_DATA_BY_SCENARIO[scenario].waluj;

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
      
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-stone-900">
            Hyper-Local Geospatial Risk Map
          </h2>
          <p className="text-xs text-stone-500 font-mono">
            Interactive sector surveillance • OpenStreetMap
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-[10px] font-mono text-stone-600">
          <span className="text-emerald-700 font-bold">🟢 SAFE</span>
          <span className="text-amber-700 font-bold">🟠 MODERATE</span>
          <span className="text-rose-700 font-bold">🔴 HIGH</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Map */}
        <div className="lg:col-span-2 relative h-[380px] rounded-lg overflow-hidden border border-stone-200">
          <MapContainer
            center={selectedLoc.coordinates}
            zoom={11}
            scrollWheelZoom={false}
            className="w-full h-full z-10"
          >
            <MapRecenter center={selectedLoc.coordinates} />
            <TileLayer
              attribution='&copy; OpenStreetMap &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            {DEMO_LOCATIONS.map((loc) => {
              const locWeather = WEATHER_DATA_BY_SCENARIO[scenario][loc.id] || WEATHER_DATA_BY_SCENARIO[scenario].waluj;
              const isSelected = loc.id === selectedLocationId;
              const colorHex = getRiskColor(locWeather.riskLevel);

              return (
                <React.Fragment key={loc.id}>
                  <Circle
                    center={loc.coordinates}
                    radius={loc.id === 'waluj' ? 3200 : 2200}
                    pathOptions={{
                      color: colorHex,
                      fillColor: colorHex,
                      fillOpacity: isSelected ? 0.25 : 0.1,
                      weight: isSelected ? 2.5 : 1
                    }}
                  />

                  <Marker
                    position={loc.coordinates}
                    icon={createCustomMarker(locWeather.riskLevel, loc.shortName, isSelected)}
                    eventHandlers={{ click: () => setSelectedLocationId(loc.id) }}
                  >
                    <Popup>
                      <div className="p-1 text-xs space-y-1 font-sans">
                        <div className="font-bold">{loc.name}</div>
                        <div>Risk: <strong>{locWeather.riskLevel}</strong> ({locWeather.riskScore}/100)</div>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>

        {/* Minimal Sector Info Card */}
        <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3 text-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">SECTOR DETAILS</span>
              <h3 className="text-base font-bold text-stone-900">{selectedLoc.name}</h3>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-200/60">
              <span className="text-stone-500">Risk Level:</span>
              <span className="font-bold font-mono text-stone-900">{selectedWeatherData.riskLevel} ({selectedWeatherData.riskScore}/100)</span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-200/60">
              <span className="text-stone-500">Predicted Window:</span>
              <span className="font-bold font-mono text-stone-900">{selectedWeatherData.expectedTime}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-200/60">
              <span className="text-stone-500">Confidence:</span>
              <span className="font-bold font-mono text-emerald-800">{selectedWeatherData.predictionConfidence}</span>
            </div>

            <div className="pt-2">
              <span className="font-bold text-amber-900 block text-[11px]">Recommended Action:</span>
              <p className="text-stone-700 italic text-xs mt-0.5">
                "{selectedWeatherData.recommendedAction[language] || selectedWeatherData.recommendedAction.en}"
              </p>
            </div>
          </div>

          <button
            onClick={() => alert(`Warning dispatched for ${selectedLoc.name}`)}
            className="w-full py-2 rounded bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Dispatch Warning
          </button>
        </div>

      </div>

    </div>
  );
};
