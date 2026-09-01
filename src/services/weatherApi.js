/**
 * SIH26077 - Weather Telemetry API Service
 * 
 * Recommended FREE Weather APIs:
 * 1. Open-Meteo API (RECOMMENDED - 100% FREE, NO API KEY REQUIRED)
 *    Endpoint: https://api.open-meteo.com/v1/forecast?latitude=19.8398&longitude=75.2285&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m
 * 
 * 2. OpenWeatherMap API (Free key with 1,000 requests/day limit)
 *    Endpoint: https://api.openweathermap.org/data/2.5/weather?lat=19.8398&lon=75.2285&appid=YOUR_FREE_API_KEY&units=metric
 */

export const API_INFO = {
  recommendedApi: 'Open-Meteo API',
  requiresKey: false,
  cost: '100% Free / Open Source',
  rateLimit: '10,000 free calls / day (No sign-up required)',
  alternativeApi: 'OpenWeatherMap Free Tier',
  alternativeKeyUrl: 'https://openweathermap.org/api'
};

/**
 * Fetch real live weather from Open-Meteo for Chhatrapati Sambhajinagar / Waluj coordinates
 * Completely free without requiring any API key.
 */
export async function fetchLiveOpenMeteoData(lat = 19.8398, lng = 75.2285) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,surface_pressure&hourly=precipitation,wind_speed_10m&forecast_days=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const data = await res.json();
    
    const current = data.current || {};
    return {
      success: true,
      source: 'Open-Meteo Real Telemetry',
      temp: current.temperature_2m ?? 29.5,
      humidity: current.relative_humidity_2m ?? 72,
      rainfall: current.precipitation ?? 0.0,
      windSpeed: current.wind_speed_10m ?? 14.5,
      pressure: current.surface_pressure ?? 1012,
      raw: data
    };
  } catch (err) {
    console.warn('Live Open-Meteo fetch failed, falling back to mock state:', err);
    return { success: false, error: err.message };
  }
}
