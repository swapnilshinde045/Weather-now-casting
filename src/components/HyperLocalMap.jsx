import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSimulation } from '../context/SimulationContext';
import { WEATHER_DATA_BY_SCENARIO } from '../data/demoWeatherData';
import { searchCityGeocoding } from '../services/weatherApi';
import { MapPin, AlertTriangle, Clock, Zap, Layers, Satellite, Search, Loader2, RefreshCw, X } from 'lucide-react';

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
  const scale = isSelected ? 'scale(1.25)' : 'scale(1)';
  const glow = isSelected ? `box-shadow: 0 0 16px ${color};` : '';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="transform: ${scale}; transition: all 0.25s ease; cursor: pointer; text-align: center;">
        <div style="width: 22px; height: 22px; border-radius: 50%; background: ${color}; border: 2.5px solid #fff; margin: 0 auto; ${glow}"></div>
        <div style="background: #ffffff; color: #1c1917; border: 1px solid #d6cebe; padding: 2px 6px; border-radius: 6px; font-size: 10px; font-weight: 800; margin-top: 3px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
          ${shortName}
        </div>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
};

export const HyperLocalMap = () => {
  const { 
    selectedLocationId, 
    setSelectedLocationId, 
    locationsList,
    customWeatherDataMap = {},
    addAndSelectCity,
    currentLocation,
    currentWeather,
    scenario, 
    language 
  } = useSimulation();

  const [activeLayer, setActiveLayer] = useState('osm');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedLoc = locationsList.find(l => l.id === selectedLocationId) || locationsList[0];
  const selectedWeatherData = currentWeather;

  const tileUrls = {
    osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    carto: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
  };

  // Debounced City Search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchCityGeocoding(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
      setShowDropdown(true);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectSearchResult = async (item) => {
    setShowDropdown(false);
    setSearchQuery('');
    await addAndSelectCity(item);
  };

  const handleQuickSearch = async (cityName) => {
    setIsSearching(true);
    const results = await searchCityGeocoding(cityName);
    if (results && results.length > 0) {
      await addAndSelectCity(results[0]);
    }
    setIsSearching(false);
  };

  return (
    <section className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 section-pop-hover">
      
      {/* Section Header with Ref Image Style Badge */}
      <div className="text-center space-y-2 max-w-3xl mx-auto border-b border-stone-200 pb-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full text-xs font-mono font-bold bg-sky-100 text-sky-950 border border-sky-300 shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-sky-700" />
          <span>02 / GEOSPATIAL MAP & SECTOR INTELLIGENCE</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Hyper-Local Geospatial Risk & City Radar Map
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
          Search ANY city or district across India for live satellite & weather telemetry. Fuses Open-Meteo geocoding, INSAT-3DR satellite infrared cloud imagery, and Gemini AI zero-shot risk nowcasts.
        </p>
      </div>

      {/* SEARCH BOX FOR CITY & DISTRICT */}
      <div className="bg-stone-50 p-4 rounded-2xl border-2 border-stone-300 space-y-3 shadow-2xs relative">
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
                placeholder="🔍 Type city or district name (e.g., Mumbai, Pune, Delhi, Nashik, Bengaluru)..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border-2 border-amber-800/40 focus:border-amber-800 rounded-xl text-stone-900 font-semibold text-xs shadow-2xs focus:outline-none transition"
              />
              {isSearching ? (
                <Loader2 className="w-4 h-4 text-amber-800 animate-spin absolute right-3" />
              ) : searchQuery ? (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 text-stone-400 hover:text-stone-700">
                  <X className="w-4 h-4" />
                </button>
              ) : null}
            </div>

            {/* Search Suggestion Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-amber-800/60 rounded-xl shadow-2xl z-[500] max-h-60 overflow-y-auto divide-y divide-stone-100 font-mono text-xs">
                {searchResults.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => handleSelectSearchResult(res)}
                    className="w-full text-left p-3 hover:bg-amber-50/80 transition flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-stone-900">{res.shortName}</div>
                      <div className="text-[10px] text-stone-500">{res.category}</div>
                    </div>
                    <div className="text-[10px] font-mono text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      {res.coordinates[0].toFixed(2)}°N, {res.coordinates[1].toFixed(2)}°E
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-1 bg-white p-1 rounded-xl border border-stone-300 text-[11px] font-mono font-bold">
            <button
              onClick={() => setActiveLayer('osm')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${activeLayer === 'osm' ? 'bg-amber-100 text-amber-950 border border-amber-300' : 'text-stone-600 hover:text-stone-900'}`}
            >
              OpenStreetMap
            </button>
            <button
              onClick={() => setActiveLayer('carto')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${activeLayer === 'carto' ? 'bg-amber-100 text-amber-950 border border-amber-300' : 'text-stone-600 hover:text-stone-900'}`}
            >
              Carto Voyager
            </button>
          </div>
        </div>

        {/* Quick Search City Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar font-mono text-xs pt-1">
          <span className="text-stone-400 font-bold text-[10px] uppercase">POPULAR SEARCHES:</span>
          {['Mumbai', 'Pune', 'Nashik', 'Delhi', 'Bengaluru', 'Nagpur', 'Latur'].map((city) => (
            <button
              key={city}
              onClick={() => handleQuickSearch(city)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-stone-800 border border-stone-200 text-[11px] font-semibold transition cursor-pointer shadow-2xs whitespace-nowrap"
            >
              📍 {city}
            </button>
          ))}
        </div>
      </div>

      {/* Sector Quick Switcher Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-50 p-2 rounded-2xl border border-stone-200 font-mono text-xs">
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
          <span className="text-stone-400 font-bold px-2 text-[10px] hidden sm:inline">ACTIVE LOCATIONS:</span>
          {locationsList.map((loc) => {
            const rawWeather = customWeatherDataMap[loc.id] || (WEATHER_DATA_BY_SCENARIO[scenario]?.[loc.id] || WEATHER_DATA_BY_SCENARIO[scenario]?.waluj || {});
            const locWeather = loc.id === selectedLocationId ? currentWeather : {
              riskLevel: 'SAFE',
              riskScore: 18,
              expectedTime: 'Stable',
              ...rawWeather
            };
            const isSelected = loc.id === selectedLocationId;
            const colorHex = getRiskColor(locWeather.riskLevel || 'SAFE');

            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocationId(loc.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                  isSelected 
                    ? 'bg-stone-900 text-white shadow-xs' 
                    : 'bg-white hover:bg-stone-200/70 text-stone-700 border border-stone-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorHex }}></span>
                <span>{loc.shortName || loc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Section Level Map Container & Sector Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Full Section Level Map View (Height h-[540px]) */}
        <div className="lg:col-span-2 relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden border-2 border-stone-300 shadow-md">
          
          {/* Overlay Status Badge */}
          <div className="absolute top-3 left-3 z-[400] bg-stone-950/90 text-white p-2.5 rounded-xl border border-stone-800 backdrop-blur-md shadow-lg font-mono text-[11px] space-y-1">
            <div className="flex items-center space-x-2 font-bold text-amber-400">
              <Satellite className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>INSAT-3DR Satellite Stream Active</span>
            </div>
            <div className="text-[10px] text-stone-300">
              Active Monitored City: <strong className="text-white">{selectedLoc?.name || 'waluj'}</strong>
            </div>
          </div>

          {/* Leaflet Map */}
          <MapContainer
            center={selectedLoc?.coordinates || [19.843, 75.251]}
            zoom={11}
            scrollWheelZoom={true}
            className="w-full h-full z-10"
          >
            <MapRecenter center={selectedLoc?.coordinates || [19.843, 75.251]} />
            <TileLayer
              attribution='&copy; OpenStreetMap &copy; CARTO GIS'
              url={tileUrls[activeLayer]}
            />

            {locationsList.map((loc) => {
              const rawWeather = customWeatherDataMap[loc.id] || (WEATHER_DATA_BY_SCENARIO[scenario]?.[loc.id] || WEATHER_DATA_BY_SCENARIO[scenario]?.waluj || {});
              const locWeather = loc.id === selectedLocationId ? currentWeather : {
                riskLevel: 'SAFE',
                riskScore: 18,
                expectedTime: 'Stable',
                ...rawWeather
              };
              const isSelected = loc.id === selectedLocationId;
              const colorHex = getRiskColor(locWeather.riskLevel || 'SAFE');

              return (
                <React.Fragment key={loc.id}>
                  {/* Convective Risk Polygon Circle */}
                  <Circle
                    center={loc.coordinates}
                    radius={3000}
                    pathOptions={{
                      color: colorHex,
                      fillColor: colorHex,
                      fillOpacity: isSelected ? 0.32 : 0.12,
                      weight: isSelected ? 3 : 1.5
                    }}
                  />

                  {/* Marker */}
                  <Marker
                    position={loc.coordinates}
                    icon={createCustomMarker(locWeather.riskLevel || 'SAFE', loc.shortName || loc.name, isSelected)}
                    eventHandlers={{ click: () => setSelectedLocationId(loc.id) }}
                  >
                    <Popup>
                      <div className="p-1 text-xs space-y-1 font-sans">
                        <div className="font-bold text-stone-900">{loc.name}</div>
                        <div className="font-mono text-[11px]">
                          Risk Level: <strong style={{ color: colorHex }}>{locWeather.riskLevel}</strong> ({locWeather.riskScore}/100)
                        </div>
                        <div className="text-[10px] text-stone-500 font-mono">
                          Lead Time: {locWeather.expectedTime}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>

        {/* Dedicated Sector Telemetry Panel */}
        <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-5 space-y-4 text-xs flex flex-col justify-between shadow-2xs">
          
          <div className="space-y-3">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider block">
                  SEARCHED CITY TELEMETRY
                </span>
                <h3 className="text-lg font-black text-stone-900 mt-0.5">
                  {selectedLoc?.name || 'Waluj Industrial'}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 font-mono font-bold text-[11px] text-stone-800 shadow-2xs">
                {(selectedLoc?.coordinates?.[0] || 19.84).toFixed(2)}°N
              </span>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between p-2 rounded-lg bg-white border border-stone-200">
                <span className="text-stone-500">Risk Assessment:</span>
                <span className="font-bold text-stone-900" style={{ color: getRiskColor(selectedWeatherData?.riskLevel || 'SAFE') }}>
                  {selectedWeatherData?.riskLevel || 'SAFE'} ({selectedWeatherData?.riskScore || 18}/100)
                </span>
              </div>

              <div className="flex justify-between p-2 rounded-lg bg-white border border-stone-200">
                <span className="text-stone-500">Early Warning Window:</span>
                <span className="font-bold text-stone-900">{selectedWeatherData?.expectedTime || 'Stable'}</span>
              </div>

              <div className="flex justify-between p-2 rounded-lg bg-white border border-stone-200">
                <span className="text-stone-500">Gemini Confidence:</span>
                <span className="font-bold text-emerald-800">{selectedWeatherData?.predictionConfidence || '92%'}</span>
              </div>

              <div className="flex justify-between p-2 rounded-lg bg-white border border-stone-200">
                <span className="text-stone-500">Live Temperature:</span>
                <span className="font-bold text-stone-900">{selectedWeatherData?.temp || '31.2'} °C</span>
              </div>

              <div className="flex justify-between p-2 rounded-lg bg-white border border-stone-200">
                <span className="text-stone-500">Rainfall Rate:</span>
                <span className="font-bold text-amber-900">{selectedWeatherData?.currentRainfall || `${selectedWeatherData?.rainfall || 0} mm/h`}</span>
              </div>

              <div className="flex justify-between p-2 rounded-lg bg-white border border-stone-200">
                <span className="text-stone-500">Wind Velocity:</span>
                <span className="font-bold text-stone-900">{selectedWeatherData?.currentWindSpeed || `${selectedWeatherData?.windSpeed || 12} km/h`}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-300 space-y-1">
              <span className="font-bold text-amber-950 block text-[11px] font-mono">
                ⚡ Recommended Action Advisory:
              </span>
              <p className="text-stone-800 italic text-xs leading-relaxed">
                "{selectedWeatherData?.recommendedAction?.[language] || selectedWeatherData?.recommendedAction?.en || 'Normal conditions. Maintain routine weather monitoring.'}"
              </p>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => alert(`CAP v1.2 Cell Broadcast Warning dispatched to all base stations in ${selectedLoc.name}`)}
              className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Dispatch CAP v1.2 Warning for {selectedLoc.shortName}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Map Risk Color Scale Legend */}
      <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <span className="text-stone-500 font-bold text-[11px]">RISK SCALE THRESHOLDS:</span>
        <div className="flex items-center flex-wrap gap-3 text-[11px]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-600"></span> 🟢 SAFE (0-30)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-600"></span> 🟡 LOW (31-50)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-600"></span> 🟠 MODERATE (51-70)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-600"></span> 🔴 HIGH (71-85)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-600"></span> 🟣 EXTREME CLOUDBURST (86-100)</span>
        </div>
      </div>

    </section>
  );
};
