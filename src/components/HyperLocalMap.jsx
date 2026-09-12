import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, ZoomControl, Circle, Rectangle, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import { useSimulation } from '../context/SimulationContext';
import { fetchDailyForecast, fetchLiveNowcast, searchCityGeocoding, reverseGeocode } from '../services/weatherApi';
import { 
  Search, CloudRain, Wind, Thermometer, Droplets, Gauge, 
  Map as MapIcon, Layers, Play, Pause, ChevronLeft, ChevronRight, X, Loader2, Maximize2, Globe2
} from 'lucide-react';

// Custom Map Controller to fly to locations
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
};

// Map click handler for "click anywhere" functionality
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
};

// Weather Icon Helper
const getWeatherIcon = (code) => {
  if (code >= 95) return '🌩️';
  if (code >= 80) return '🌧️';
  if (code >= 61) return '☔';
  if (code >= 51) return '🌦️';
  if (code >= 45) return '🌫️';
  if (code >= 3) return '☁️';
  if (code >= 1) return '⛅';
  return '☀️';
};

function DynamicGrid({ onBlockSelect, activeSectorPoint }) {
  const map = useMap();
  const [blocks, setBlocks] = useState([]);
  
  const updateGrid = () => {
    if (map.getZoom() < 9) {
      setBlocks([]); // Hide grid when zoomed out too far
      return;
    }
    
    const bounds = map.getBounds();
    const centerLat = map.getCenter().lat;
    
    const GRID_SIZE_KM = 5;
    const latStep = GRID_SIZE_KM / 111.32;
    const lngStep = GRID_SIZE_KM / (111.32 * Math.cos(centerLat * Math.PI / 180));
    
    // Snap bounds to grid multiples for stability
    const startLat = Math.floor(bounds.getSouth() / latStep) * latStep;
    const endLat = Math.ceil(bounds.getNorth() / latStep) * latStep;
    const startLng = Math.floor(bounds.getWest() / lngStep) * lngStep;
    const endLng = Math.ceil(bounds.getEast() / lngStep) * lngStep;
    
    const newBlocks = [];
    for (let lat = startLat; lat < endLat; lat += latStep) {
      for (let lng = startLng; lng < endLng; lng += lngStep) {
        newBlocks.push({
          id: `${lat.toFixed(4)},${lng.toFixed(4)}`,
          bounds: [
            [lat, lng],
            [lat + latStep, lng + lngStep]
          ],
          center: [lat + latStep/2, lng + lngStep/2]
        });
      }
    }
    setBlocks(newBlocks);
  };

  useMapEvents({
    moveend: updateGrid,
    zoomend: updateGrid
  });

  useEffect(() => {
    updateGrid();
  }, [map]);

  return (
    <FeatureGroup>
      {blocks.map(block => {
        const latStep = 5 / 111.32;
        const lngStep = 5 / (111.32 * Math.cos(map.getCenter().lat * Math.PI / 180));
        const isActive = activeSectorPoint && 
          Math.abs(activeSectorPoint[0] - block.center[0]) < latStep/2 &&
          Math.abs(activeSectorPoint[1] - block.center[1]) < lngStep/2;
          
        return (
          <Rectangle 
            key={block.id}
            bounds={block.bounds}
            pathOptions={{ 
              color: isActive ? '#38bdf8' : '#475569', 
              weight: isActive ? 2 : 1, 
              fillOpacity: isActive ? 0.2 : 0.0,
              dashArray: isActive ? '' : '2, 6'
            }}
            eventHandlers={{
              click: () => onBlockSelect(block.center[0], block.center[1])
            }}
          />
        );
      })}
    </FeatureGroup>
  );
}

export const HyperLocalMap = () => {
  const { language } = useSimulation();
  
  // UI State
  const [activeLayer, setActiveLayer] = useState('precipitation');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Data State
  const [mapCenter, setMapCenter] = useState([19.84, 75.25]); // Default to Maharashtra/Aurangabad region
  const [mapZoom, setMapZoom] = useState(7);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Selected Point Data
  const [selectedPoint, setSelectedPoint] = useState({
    name: 'Maharashtra Region',
    lat: 19.84,
    lng: 75.25,
    forecast: [],
    current: null,
    loading: false
  });

  // Fetch data for a specific point
  const fetchPointData = async (lat, lng, nameFallback = null) => {
    setSelectedPoint(prev => ({ ...prev, loading: true, lat, lng }));
    
    // Reverse geocode if name isn't provided
    let locationName = nameFallback;
    if (!locationName) {
      locationName = await reverseGeocode(lat, lng);
    }

    // Fetch Open-Meteo Data
    const [dailyData, nowcastData] = await Promise.all([
      fetchDailyForecast(lat, lng),
      fetchLiveNowcast(lat, lng)
    ]);

    setSelectedPoint({
      name: locationName,
      lat,
      lng,
      forecast: dailyData,
      current: nowcastData.success ? nowcastData.current : null,
      loading: false
    });
  };

  // Initial Load
  useEffect(() => {
    fetchPointData(19.84, 75.25, 'Chhatrapati Sambhajinagar');
  }, []);

  // Handle Search
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
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectSearchResult = async (item) => {
    setShowDropdown(false);
    setSearchQuery('');
    setMapCenter([item.lat, item.lng]);
    setMapZoom(11);
    await fetchPointData(item.lat, item.lng, item.name);
  };

  const handleMapClick = async (lat, lng) => {
    setMapCenter([lat, lng]);
    await fetchPointData(lat, lng);
  };

  // Timeline Mock Data
  const [timeIndex, setTimeIndex] = useState(4);

  const isSevere = selectedPoint.current && selectedPoint.current.code >= 61;
  const isThunderstorm = selectedPoint.current && selectedPoint.current.code >= 95;

  return (
    <section className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl relative border border-stone-700 h-[800px] flex flex-col font-sans section-pop-hover">
      
      {/* MAP CONTAINER - Full size, underneath UI */}
      <div className="absolute inset-0 z-0 map-zoom-earth-style">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          zoomControl={false}
          className="w-full h-full"
          style={{ background: '#111827' }}
        >
          {/* Real Google Maps street map for authentic locations */}
          <TileLayer
            attribution='&copy; Google Maps'
            url={activeLayer === 'satellite' 
              ? "http://mt1.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}" 
              : "http://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"}
          />
          <MapController center={mapCenter} zoom={mapZoom} />
          <MapClickHandler onMapClick={handleMapClick} />
          <ZoomControl position="bottomright" />

          {/* Dynamic 5x5 km visual grid */}
          <DynamicGrid onBlockSelect={handleMapClick} activeSectorPoint={[selectedPoint.lat, selectedPoint.lng]} />

          {/* Severe Weather Renderings inside Grid */}
          {activeLayer === 'radar' && isSevere && (
            <>
              <Circle 
                center={[selectedPoint.lat, selectedPoint.lng]} 
                radius={2000} 
                pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.5, weight: 0 }} 
                className="pulse-radar"
              />
              <Circle 
                center={[selectedPoint.lat + 0.005, selectedPoint.lng - 0.005]} 
                radius={1200} 
                pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.6, weight: 0 }} 
                className="pulse-radar"
                style={{ animationDelay: '0.5s' }}
              />
            </>
          )}

          {isThunderstorm && (
            <Marker 
              position={[selectedPoint.lat + 0.01, selectedPoint.lng - 0.01]}
              icon={L.divIcon({
                className: 'bg-transparent',
                html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 0px 6px #eab308); animation: flash 1.5s infinite;"><path d="M11 2v10h4l-4 10v-10h-4z" fill="#eab308"></path></svg>`
              })}
            />
          )}

          {/* Marker for selected point */}
          <Marker 
            position={[selectedPoint.lat, selectedPoint.lng]}
            icon={L.divIcon({
              className: 'bg-transparent',
              html: `<div style="transform: translate(-50%, -100%);">
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.8));">
                         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#38bdf840"></path>
                         <circle cx="12" cy="10" r="3" fill="#38bdf8"></circle>
                       </svg>
                     </div>`
            })}
          />
        </MapContainer>

        {/* Global Styles */}
        <style dangerouslySetInnerHTML={{__html: `
          .leaflet-container {
            font-family: inherit;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4b5563;
            border-radius: 4px;
          }
          .pulse-radar { animation: pulseRadar 2s infinite; }
          @keyframes pulseRadar { 0% { fill-opacity: 0.6; } 50% { fill-opacity: 0.2; } 100% { fill-opacity: 0.6; } }
          @keyframes flash { 0% { opacity: 1; } 10% { opacity: 0; } 20% { opacity: 1; } 100% { opacity: 1; } }
        `}} />
      </div>

      {/* FLOATING UI OVERLAYS (Z-INDEX 10) */}
      
      {/* TOP LEFT: Brand & Search */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-4 w-72">
        {/* Brand Logo mimic */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-3 flex items-center gap-3 border border-slate-700/50 shadow-lg text-white">
          <div className="bg-sky-500 w-8 h-8 rounded-full flex items-center justify-center">
            <Globe2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-black text-sm leading-tight tracking-wide">AGNI-CAST</div>
            <div className="text-[10px] text-slate-300 font-medium tracking-widest uppercase">SIH26077 Live</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="relative flex items-center bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
              placeholder="Search city, district, village..."
              className="w-full pl-9 pr-9 py-3 bg-transparent text-white text-sm focus:outline-none placeholder-slate-400 font-medium"
            />
            {isSearching ? (
              <Loader2 className="w-4 h-4 text-sky-400 animate-spin absolute right-3" />
            ) : searchQuery ? (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>

          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar text-sm z-50">
              {searchResults.map((res) => (
                <button
                  key={res.id}
                  onClick={() => handleSelectSearchResult(res)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-700/50 transition border-b border-slate-700/50 last:border-0 flex flex-col text-white"
                >
                  <span className="font-bold">{res.shortName}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{res.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LEFT SIDEBAR: Layer Controls */}
      <div className="absolute top-44 left-4 z-10 w-48 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-lg text-white overflow-hidden">
        <div className="p-3 border-b border-slate-700/50 bg-slate-800/50">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <MapIcon className="w-3 h-3" /> LIVE MAPS
          </div>
        </div>
        <div className="p-2 flex flex-col gap-1">
          <button className={`flex items-center gap-3 p-2 rounded-lg text-sm font-medium transition cursor-pointer ${activeLayer === 'satellite' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`} onClick={() => setActiveLayer('satellite')}>
            <Satellite className="w-4 h-4" /> Satellite
          </button>
          <button className={`flex items-center gap-3 p-2 rounded-lg text-sm font-medium transition cursor-pointer ${activeLayer === 'radar' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`} onClick={() => setActiveLayer('radar')}>
            <Layers className="w-4 h-4" /> Radar
          </button>
        </div>

        <div className="p-3 border-b border-t border-slate-700/50 bg-slate-800/50 mt-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <CloudRain className="w-3 h-3" /> FORECAST MAPS
          </div>
        </div>
        <div className="p-2 flex flex-col gap-1 mb-1">
          {[
            { id: 'precipitation', icon: CloudRain, label: 'Precipitation' },
            { id: 'wind', icon: Wind, label: 'Wind' },
            { id: 'temperature', icon: Thermometer, label: 'Temperature' },
            { id: 'humidity', icon: Droplets, label: 'Humidity' },
            { id: 'pressure', icon: Gauge, label: 'Pressure' }
          ].map(layer => (
            <button 
              key={layer.id}
              className={`flex items-center gap-3 p-2 rounded-lg text-sm font-medium transition cursor-pointer ${activeLayer === layer.id ? 'bg-sky-500/20 text-sky-400' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
              onClick={() => setActiveLayer(layer.id)}
            >
              <layer.icon className="w-4 h-4" /> {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* TOP RIGHT: Detailed Forecast Panel */}
      <div className="absolute top-4 right-4 z-10 w-80 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-2xl text-white flex flex-col">
        {selectedPoint.loading && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl">
            <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          </div>
        )}
        
        {/* Header: Location & Current Data */}
        <div className="p-4 border-b border-slate-700/50 bg-slate-800/80 rounded-t-xl">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg leading-tight w-5/6 line-clamp-2">
              {selectedPoint.name}
            </h3>
            <button className="text-slate-400 hover:text-white cursor-pointer">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex justify-between items-center">
              <div className="text-xs text-sky-400 font-bold tracking-wider uppercase bg-sky-500/10 border border-sky-500/20 px-2 py-1 rounded w-fit">
                5x5 KM GRID BLOCK
              </div>
              {selectedPoint.current?.rainClassification && (
                <div className="text-[10px] text-white font-bold bg-slate-700/80 border border-slate-600 px-2 py-1 rounded">
                  {selectedPoint.current.rainClassification}
                </div>
              )}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {selectedPoint.lat.toFixed(2)}° N, {selectedPoint.lng.toFixed(2)}° E
            </div>
            {isSevere && (
              <div className="mt-1 text-[10px] font-bold text-red-400 flex items-center gap-1 border border-red-500/30 bg-red-500/10 px-2 py-1 rounded w-fit">
                <CloudRain className="w-3 h-3" /> Cloudburst / Severe Activity Detected
              </div>
            )}
          </div>
          
          {selectedPoint.current && (
            <div className="grid grid-cols-3 gap-2 text-sm text-center mb-1">
              <div className="bg-slate-700/50 p-1.5 rounded-lg border border-slate-600/30">
                <div className="text-[9px] text-slate-400 uppercase font-bold">Flash Flood</div>
                <div className={`font-bold text-lg ${selectedPoint.current.flashFloodRisk > 50 ? 'text-sky-400' : 'text-slate-200'}`}>{selectedPoint.current.flashFloodRisk}%</div>
              </div>
              <div className="bg-slate-700/50 p-1.5 rounded-lg border border-slate-600/30">
                <div className="text-[9px] text-slate-400 uppercase font-bold">Cloudburst</div>
                <div className={`font-bold text-lg ${selectedPoint.current.cloudBurstRisk > 50 ? 'text-rose-400' : 'text-slate-200'}`}>{selectedPoint.current.cloudBurstRisk}%</div>
              </div>
              <div className="bg-slate-700/50 p-1.5 rounded-lg border border-slate-600/30">
                <div className="text-[9px] text-slate-400 uppercase font-bold">Thunderstorm</div>
                <div className={`font-bold text-lg ${selectedPoint.current.thunderstormRisk > 50 ? 'text-amber-400' : 'text-slate-200'}`}>{selectedPoint.current.thunderstormRisk}%</div>
              </div>
            </div>
          )}
        </div>

        {/* 5-Day Forecast List */}
        <div className="p-2 flex flex-col gap-1 flex-1">
          <div className="grid grid-cols-4 px-3 py-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <div className="col-span-1">Day</div>
            <div className="col-span-1 text-center">Min</div>
            <div className="col-span-2 text-right">Pressure / Max</div>
          </div>
          
          {selectedPoint.forecast.length > 0 ? (
             selectedPoint.forecast.map((day, idx) => (
              <div key={idx} className={`grid grid-cols-4 items-center px-3 py-2 rounded-lg text-sm ${idx === 0 ? 'bg-sky-500/10 border border-sky-500/20' : 'hover:bg-slate-700/30'}`}>
                <div className="col-span-1 font-bold">{day.day}</div>
                <div className="col-span-1 flex items-center justify-center gap-1">
                  <span className="text-lg">{getWeatherIcon(day.code)}</span>
                  <span className="text-slate-300 font-mono">{day.minTemp}°</span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-3 font-mono">
                  <span className="text-slate-400 text-xs">{day.pressure}</span>
                  <span className="w-8 h-1 bg-gradient-to-r from-sky-400 to-rose-400 rounded-full hidden sm:block"></span>
                  <span className="font-bold">{day.maxTemp}°</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-slate-400 text-sm font-medium">
              Click anywhere on the map to fetch live data.
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM TIMELINE */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 pointer-events-auto">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-full border border-slate-700/50 shadow-2xl text-white px-4 py-2 flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-400 flex items-center justify-center text-white transition shadow-lg shadow-sky-500/20 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          
          <div className="flex items-center gap-3 font-mono text-sm">
            <button 
              onClick={() => setTimeIndex(Math.max(0, timeIndex - 1))}
              className="text-slate-400 hover:text-white transition p-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="font-bold bg-slate-700/50 px-4 py-1 rounded-lg tabular-nums tracking-wider min-w-[140px] text-center">
              12 Sept <span className="text-sky-400">{timelineTimes[timeIndex]}</span>
            </div>
            
            <button 
              onClick={() => setTimeIndex(Math.min(timelineTimes.length - 1, timeIndex + 1))}
              className="text-slate-400 hover:text-white transition p-1 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-slate-700/50 mx-2"></div>

          <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
            ICON <span className="font-normal text-slate-500">13 km</span>
          </div>
        </div>
      </div>

      {/* LEGEND (Bottom Left) */}
      <div className="absolute bottom-6 left-4 z-10">
        <div className="flex rounded-md overflow-hidden shadow-xl border border-slate-700/50 text-[10px] font-bold">
          <div className="bg-[#1e3a8a] text-white px-2 py-1 border-r border-slate-700/30">hPa</div>
          <div className="bg-[#1e40af] text-white px-2 py-1">970</div>
          <div className="bg-[#3b82f6] text-white px-2 py-1">985</div>
          <div className="bg-[#60a5fa] text-slate-900 px-2 py-1">1000</div>
          <div className="bg-[#e2e8f0] text-slate-900 px-2 py-1">1015</div>
          <div className="bg-[#ef4444] text-white px-2 py-1">1030</div>
          <div className="bg-[#b91c1c] text-white px-2 py-1">1045</div>
        </div>
      </div>

    </section>
  );
};

export default HyperLocalMap;
