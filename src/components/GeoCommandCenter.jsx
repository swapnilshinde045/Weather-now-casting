import { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { fetchLiveNowcast, searchCityGeocoding, reverseGeocode } from '../services/weatherApi';
import {
  Activity,
  AlertTriangle,
  Bell,
  ChevronDown,
  CloudLightning,
  CloudRain,
  Crosshair,
  Gauge,
  Layers3,
  LocateFixed,
  MapPinned,
  Maximize2,
  Minus,
  Navigation,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Radio,
  Search,
  ShieldCheck,
  Siren,
  Sparkles,
  SunMedium,
  Users,
  Waves,
  Wind,
  X,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, Circle, Rectangle, useMapEvents, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';

const center = [19.8762, 75.3433];

const alerts = [
  { time: '18:42', title: 'Cloudburst cell detected', detail: 'CIDCO N-1, movement east at 21 km/h', level: 'Critical' },
  { time: '18:31', title: 'Drainage threshold crossed', detail: 'Waluj MIDC Sector 4 underpass', level: 'High' },
  { time: '18:18', title: 'Thunderstorm advisory', detail: 'Chhatrapati Sambhajinagar district', level: 'Watch' },
];

const fallbackForecast = [
  { time: 'Now', rain: 68, temp: '26°', storm: true },
  { time: '+15m', rain: 86, temp: '25°', storm: true },
  { time: '+30m', rain: 94, temp: '24°', storm: true },
  { time: '+45m', rain: 71, temp: '25°', storm: true },
  { time: '+60m', rain: 46, temp: '26°', storm: false },
  { time: '+90m', rain: 22, temp: '27°', storm: false },
];

const riskMeta = (score) => {
  if (score >= 80) return { label: 'CRITICAL RISK', title: 'Immediate action advised', color: '#ef4444' };
  if (score >= 60) return { label: 'HIGH RISK', title: 'Severe weather watch', color: '#f97316' };
  if (score >= 40) return { label: 'MODERATE RISK', title: 'Conditions being monitored', color: '#f59e0b' };
  return { label: 'LOW RISK', title: 'No severe weather signal', color: '#4ade80' };
};

const layerItems = [
  { id: 'radar', name: 'Rain radar', icon: CloudRain, color: 'blue' },
  { id: 'risk', name: 'AI risk grid', icon: Gauge, color: 'orange' },
  { id: 'lightning', name: 'Lightning', icon: CloudLightning, color: 'yellow' },
  { id: 'shelters', name: 'Safe shelters', icon: ShieldCheck, color: 'green' },
];

function DynamicGrid({ onBlockSelect, activeSector }) {
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
        // Calculate if this block contains the active sector point
        const latStep = 5 / 111.32;
        const lngStep = 5 / (111.32 * Math.cos(map.getCenter().lat * Math.PI / 180));
        const isActive = activeSector?.point && 
          Math.abs(activeSector.point[0] - block.center[0]) < latStep/2 &&
          Math.abs(activeSector.point[1] - block.center[1]) < lngStep/2;
          
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
              click: () => onBlockSelect({
                name: `Grid [${block.center[0].toFixed(2)}, ${block.center[1].toFixed(2)}]`,
                point: block.center,
                risk: 50, // default risk before live data fetches
                people: 'N/A',
                color: '#38bdf8'
              })
            }}
          />
        );
      })}
    </FeatureGroup>
  );
}

function HazardMap({ layers, activeSector, mapStyle, onSelectSector, liveRisk, liveCurrent }) {
  const mapCenter = activeSector?.point ?? center;
  const isSevere = liveCurrent && (liveCurrent.code >= 61 || liveRisk >= 60);
  const isThunderstorm = liveCurrent && liveCurrent.code >= 95;
  
  const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.flyTo(center, 13, { duration: 1.5 });
      }
    }, [center, map]);
    return null;
  };

  return (
    <div className="globe-wrap map-zoom-earth-style">
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        zoomControl={false}
        style={{ width: '100%', height: '100%', background: '#111827' }}
      >
        <TileLayer
          attribution='&copy; Google Maps'
          url={mapStyle === 'Satellite' 
            ? 'http://mt1.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}' 
            : 'http://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'}
        />
        <MapController center={mapCenter} />
        
        {/* Render a single marker for the active sector */}
        <Marker 
          position={mapCenter}
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

        {/* Dynamic 5x5 km visual grid over India */}
        <DynamicGrid onBlockSelect={onSelectSector} activeSector={activeSector} />

        {/* Severe Weather Overlays within the 5x5 block */}
        {layers.radar && isSevere && (
          <>
            <Circle 
              center={mapCenter} 
              radius={2000} 
              pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.5, weight: 0 }} 
              className="pulse-radar"
            />
            <Circle 
              center={[mapCenter[0] + 0.005, mapCenter[1] - 0.005]} 
              radius={1200} 
              pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.6, weight: 0 }} 
              className="pulse-radar"
              style={{ animationDelay: '0.5s' }}
            />
          </>
        )}

        {layers.lightning && isThunderstorm && (
          <Marker 
            position={[mapCenter[0] + 0.01, mapCenter[1] - 0.01]}
            icon={L.divIcon({
              className: 'bg-transparent',
              html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 0px 6px #eab308); animation: flash 1.5s infinite;"><path d="M11 2v10h4l-4 10v-10h-4z" fill="#eab308"></path></svg>`
            })}
          />
        )}

      </MapContainer>
      <style dangerouslySetInnerHTML={{__html: `
        .globe-wrap .leaflet-container { height: 100vh !important; width: 100vw !important; z-index: 0; position: absolute; inset: 0; }
        .geo-app .map-stage { z-index: 1; }
        .pulse-radar { animation: pulseRadar 2s infinite; }
        @keyframes pulseRadar { 0% { fill-opacity: 0.6; } 50% { fill-opacity: 0.2; } 100% { fill-opacity: 0.6; } }
        @keyframes flash { 0% { opacity: 1; } 10% { opacity: 0; } 20% { opacity: 1; } 100% { opacity: 1; } }
      `}} />
    </div>
  );
}

function RailButton({ icon: Icon, label, active, onClick, badge }) {
  return <button className={`rail-button ${active ? 'active' : ''}`} onClick={onClick} title={label}>
    <Icon size={21} strokeWidth={active ? 2.3 : 1.7} />
    {badge && <span className="rail-badge">{badge}</span>}
    <span>{label}</span>
  </button>;
}

export function GeoCommandCenter() {
  const [activeTab, setActiveTab] = useState('explore');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [layers, setLayers] = useState({ radar: true, risk: true, lightning: true, shelters: true });
  const [activeSector, setActiveSector] = useState({ name: 'Chhatrapati Sambhajinagar', point: [19.8762, 75.3433], risk: 65 });
  const [mapStyle, setMapStyle] = useState('Satellite');
  const [lastUpdated, setLastUpdated] = useState('loading live data');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(false);
  
  // Real Search Effect
  useEffect(() => {
    if (!search || search.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchCityGeocoding(search);
      setSearchResults(results);
      setIsSearching(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // When active sector changes, fetch its real data
  useEffect(() => {
    let active = true;
    const loadWeather = async () => {
      // 1. Fetch live weather data
      const result = await fetchLiveNowcast(activeSector?.point[0] ?? center[0], activeSector?.point[1] ?? center[1]);
      if (!active) return;
      if (result.success) {
        setWeather(result);
        setWeatherError(false);
        setLastUpdated(`observed ${result.observedAt.split('T')[1]} IST`);
      } else {
        setWeatherError(true);
        setLastUpdated('live feed unavailable');
      }

      // 2. Fetch real location name if missing
      if (!activeSector?.name || activeSector.name.startsWith('Grid [')) {
        const geoName = await reverseGeocode(activeSector?.point[0] ?? center[0], activeSector?.point[1] ?? center[1]);
        if (active && geoName) {
          setActiveSector(prev => ({ ...prev, name: geoName }));
        }
      }
    };
    loadWeather();
    const timer = setInterval(loadWeather, 15 * 60 * 1000);
    return () => { active = false; clearInterval(timer); };
  }, [activeSector]);

  const toggleLayer = (id) => setLayers((current) => ({ ...current, [id]: !current[id] }));
  const liveCurrent = weather?.current ?? { temp: 26, humidity: 92, rainRate: 68, wind: 42, cloudCover: 92, condition: 'Loading data...', code: 95, rainClassification: 'Loading...', cloudBurstRisk: 0, thunderstormRisk: 0, flashFloodRisk: 0 };
  const liveForecast = weather?.forecast ?? fallbackForecast;
  const liveRisk = weather?.riskScore ?? activeSector.risk;
  const risk = riskMeta(liveRisk);

  return (
    <div className="geo-app">
      <aside className="activity-rail" aria-label="Primary tools">
        <div className="rail-logo"><Siren size={22} /></div>
        <div className="rail-tools">
          <RailButton icon={MapPinned} label="Explore" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
          <RailButton icon={Layers3} label="Layers" active={activeTab === 'layers'} onClick={() => setActiveTab('layers')} />
          <RailButton icon={CloudRain} label="Radar" active={activeTab === 'radar'} onClick={() => setActiveTab('radar')} />
          <RailButton icon={Bell} label="Alerts" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} badge="3" />
          <RailButton icon={Navigation} label="Response" active={activeTab === 'response'} onClick={() => setActiveTab('response')} />
        </div>
        <div className="rail-bottom"><RailButton icon={PanelLeftClose} label="Collapse" onClick={() => setSidebarOpen((value) => !value)} /></div>
      </aside>

      <section className={`workspace ${sidebarOpen ? '' : 'collapsed'}`}>
        <header className="topbar">
          <div className="brand-block"><span>AGNI</span><i />CAST <small>SIH 26077</small></div>
          <div className="topbar-status"><span className="live-dot" /> LIVE OPERATIONS <span className="status-separator" /> INSAT-3DR <ChevronDown size={14} /></div>
          <div className="topbar-actions"><button title="Locate"><LocateFixed size={18} /></button><button title="Account"><Users size={18} /></button></div>
        </header>

        <div className="map-stage">
          <HazardMap layers={layers} activeSector={activeSector} mapStyle={mapStyle} onSelectSector={setActiveSector} liveRisk={liveRisk} liveCurrent={liveCurrent} />
          <div className="map-vignette" />

          <div className="search-box relative">
            <Search size={18} />
            <input 
              value={search} 
              onChange={(event) => setSearch(event.target.value)} 
              placeholder="Search a place, district or shelter" 
            />
            {isSearching ? <span style={{fontSize:'12px', color:'#38bdf8'}}>Loading...</span> : <span>⌘ K</span>}
            
            {searchResults.length > 0 && (
              <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', zIndex: 100, overflow: 'hidden' }}>
                {searchResults.map(res => (
                  <button 
                    key={res.id} 
                    style={{ width: '100%', textAlign: 'left', padding: '10px 14px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', fontSize: '13px' }}
                    onClick={() => {
                      setActiveSector({ name: res.shortName, point: [res.lat, res.lng], risk: 65, people: 'N/A', color: '#f59e0b' });
                      setSearch('');
                      setSearchResults([]);
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <b>{res.shortName}</b> <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: '6px' }}>{res.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {sidebarOpen && <aside className="inspector">
            <div className="inspector-header">
              <div><span className="eyebrow">COMMAND CENTER</span><h1>{activeTab === 'alerts' ? 'Active alerts' : activeTab === 'radar' ? 'Weather radar' : activeTab === 'response' ? 'Response readiness' : activeTab === 'layers' ? 'Map layers' : 'Severe weather watch'}</h1></div>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close panel"><X size={18} /></button>
            </div>

            {activeTab === 'alerts' ? <div className="alert-list">
              {alerts.map((alert) => <article className={`alert-card ${alert.level.toLowerCase()}`} key={alert.time}><div className="alert-time">{alert.time}</div><div><strong>{alert.title}</strong><p>{alert.detail}</p><button>Review alert <ChevronDown size={13} /></button></div></article>)}
            </div> : activeTab === 'layers' ? <div className="layer-list">
              {layerItems.map(({ id, name, icon: Icon, color }) => <button className="layer-row" key={id} onClick={() => toggleLayer(id)}><span className={`layer-icon ${color}`}><Icon size={17} /></span><span>{name}</span><i className={layers[id] ? 'on' : ''} /></button>)}
              <div className="map-style"><span>BASE MAP</span><button onClick={() => setMapStyle((style) => style === 'Satellite' ? 'Terrain' : 'Satellite')}><div className={mapStyle === 'Satellite' ? 'satellite-thumb' : 'terrain-thumb'} /><b>{mapStyle}</b><ChevronDown size={14} /></button></div>
            </div> : activeTab === 'response' ? <div className="response-panel">
              <div className="readiness-score"><ShieldCheck size={25} /><div><b>82%</b><span>response readiness</span></div></div>
              <div className="response-line"><Users size={18} /><span>11 field teams available</span><b>Ready</b></div>
              <div className="response-line"><MapPinned size={18} /><span>3 safe shelters open</span><b>2.4 km</b></div>
              <button className="dispatch-button"><Siren size={16} /> Prepare alert dispatch</button>
            </div> : <>
              <div className="hero-risk-card">
                <div className="risk-orb" style={{ borderColor: risk.color }}><span>{liveRisk}</span><small>/100</small></div>
                <div>
                  <span className="eyebrow orange" style={{ color: risk.color }}>
                    {risk.label} &middot; 5x5 KM GRID BLOCK
                  </span>
                  <h2>{risk.title}</h2>
                  <p>{liveCurrent.rainClassification} &middot; {liveCurrent.condition} &middot; live block observation at {activeSector.name}</p>
                  {(liveCurrent.code >= 61 || liveRisk >= 60) && (
                    <div className="mt-2 text-xs font-bold text-red-400 flex items-center gap-1 border border-red-500/30 bg-red-500/10 p-1.5 rounded w-fit">
                      <AlertTriangle size={14} /> Cloudburst / Severe Activity Detected in this Grid
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 px-4 text-center">
                <div className="bg-slate-800/80 border border-slate-700/50 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Cloudburst</div>
                  <div className={`font-bold text-xl ${liveCurrent.cloudBurstRisk > 50 ? 'text-rose-400' : 'text-slate-200'}`}>{liveCurrent.cloudBurstRisk}%</div>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/50 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Thunderstorm</div>
                  <div className={`font-bold text-xl ${liveCurrent.thunderstormRisk > 50 ? 'text-amber-400' : 'text-slate-200'}`}>{liveCurrent.thunderstormRisk}%</div>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/50 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Flash Flood</div>
                  <div className={`font-bold text-xl ${liveCurrent.flashFloodRisk > 50 ? 'text-sky-400' : 'text-slate-200'}`}>{liveCurrent.flashFloodRisk}%</div>
                </div>
              </div>
              <div className="signal-grid"><div><CloudRain size={17} /><span>Rain rate</span><b>{liveCurrent.rainRate} <small>mm/h</small></b></div><div><Wind size={17} /><span>Wind speed</span><b>{Math.round(liveCurrent.wind)} <small>km/h</small></b></div><div><CloudLightning size={17} /><span>Cloud cover</span><b>{liveCurrent.cloudCover}<small>%</small></b></div></div>
              {activeTab === 'radar' ? (
                <>
                  <div className="radar-note"><Radio size={16} /><span>{weatherError ? 'Live feed unavailable. Showing the resilience scenario.' : "Open-Meteo observations are combined with AGNI-CAST's transparent risk model."}</span></div>
                  {weather?.factors && (
                    <div className="model-factors">
                      <div className="list-title">RISK EXPLAINABILITY <span>{weather.confidence}% confidence</span></div>
                      {weather.factors.map((factor) => (
                        <div className="factor-row" key={factor.name}>
                          <span><b>{factor.name}</b><small>{factor.value}</small></span>
                          <i><em style={{ width: `${Math.min(100, factor.score * 3)}%` }} /></i>
                          <strong>+{factor.score}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="sector-list">
                  <div className="list-title">SELECTED LOCATION</div>
                  <button className="sector-row selected">
                    <i style={{ background: '#38bdf8' }} />
                    <span>
                      <b>{activeSector.name}</b>
                      <small>Real-time data telemetry active</small>
                    </span>
                    <strong>{activeSector.risk}</strong>
                  </button>
                </div>
              )}
            </>}
          </aside>}

          {!sidebarOpen && <button className="panel-reopen" onClick={() => setSidebarOpen(true)}><PanelLeftOpen size={18} /> Open controls</button>}

          <div className="weather-chip"><SunMedium size={18} /><div><b>{Math.round(liveCurrent.temp)}°</b><span>{liveCurrent.condition}</span></div><span className="weather-sep" /><div><b>{liveCurrent.humidity}%</b><span>Humidity</span></div></div>
          <div className="location-tag"><MapPinned size={15} /> {activeSector.name}</div>

          <div className="bottom-timeline"><div className="timeline-head"><div><span className={weatherError ? 'live-dot offline' : 'live-dot'} /> LIVE WEATHER <b>Updated {lastUpdated}</b></div><button><Sparkles size={14} /> AGNI-CAST nowcast <ChevronDown size={14} /></button></div><div className="forecast-strip">{liveForecast.map((item, index) => <button key={item.time} className={index === 0 ? 'current' : ''} title={`${item.condition ?? 'Forecast'} · ${item.rain} mm/h · ${item.wind ?? 0} km/h`}><span>{item.time}</span>{item.storm ? <CloudLightning size={20} /> : <CloudRain size={20} />}<b>{item.temp}</b><i style={{ height: `${Math.min(100, Math.max(12, item.rain * 8))}%` }} /></button>)}</div><div className="timeline-track"><span>Now</span><div><i /><b>{weatherError ? 'Live data reconnecting' : `${liveCurrent.condition} model active`}</b></div><span>+90m</span></div></div>
        </div>
      </section>
    </div>
  );
}
