import { useState, useEffect } from 'react';

export interface GeoData {
  country: string;
  country_code: string;
  currency: string;
  currency_symbol: string;
  range: { min: number; max: number };
  default: number;
}

const DEFAULT_GEO: GeoData = {
  country: 'USA',
  country_code: 'US',
  currency: '$',
  currency_symbol: '$',
  range: { min: 100, max: 2000 },
  default: 500
};

const GEO_CONFIGS: Record<string, Partial<GeoData>> = {
  IN: {
    currency: '₹',
    currency_symbol: '₹',
    range: { min: 1000, max: 20000 },
    default: 5000
  },
  US: {
    currency: '$',
    currency_symbol: '$',
    range: { min: 100, max: 3000 },
    default: 500
  },
  GB: {
    currency: '£',
    currency_symbol: '£',
    range: { min: 100, max: 2500 },
    default: 400
  }
};

export const useGeoLocation = () => {
  const [geo, setGeo] = useState<GeoData>(() => {
    const cached = localStorage.getItem('vgotyou_geo');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Deep merge for range to ensure min/max always exist
        return { 
          ...DEFAULT_GEO, 
          ...parsed,
          range: {
            ...DEFAULT_GEO.range,
            ...(parsed.range || {})
          }
        };
      } catch (e) {
        return DEFAULT_GEO;
      }
    }
    return DEFAULT_GEO;
  });

  useEffect(() => {
    const fetchGeo = async () => {
      if (localStorage.getItem('vgotyou_geo')) return;

      const services = [
        'https://ipapi.co/json/',
        'https://ip-api.com/json',
        'https://ipwho.is/',
        'https://freeipapi.com/api/json'
      ];

      for (const service of services) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

          const response = await fetch(service, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (!response.ok) continue;
          
          const data = await response.json();
          
          // normalize different service responses
          let countryCode = data.country_code || data.countryCode || data.country_code_iso3 || '';
          if (service.includes('ipwho.is')) countryCode = data.country_code;
          
          if (!countryCode) continue;

          const config = GEO_CONFIGS[countryCode] || {};
          
          const newGeo: GeoData = {
            country: data.country_name || data.country || data.countryName || 'Global',
            country_code: countryCode,
            currency: config.currency || '$',
            currency_symbol: config.currency_symbol || '$',
            range: config.range || { min: 100, max: 2000 },
            default: config.default || 500
          };

          setGeo(newGeo);
          localStorage.setItem('vgotyou_geo', JSON.stringify(newGeo));
          return; // Success
        } catch (error) {
          // Silently try next service or fallback
          if (error instanceof Error && error.name === 'AbortError') {
            console.log(`Geo detection: ${service} timed out`);
          }
        }
      }
      
      // If all fail, we just stick with DEFAULT_GEO already set in state
      console.log('Geo detection: using default region');
    };

    fetchGeo();
  }, []);

  return geo;
};
