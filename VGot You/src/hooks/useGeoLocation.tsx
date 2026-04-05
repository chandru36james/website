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

      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const countryCode = data.country_code;
        const config = GEO_CONFIGS[countryCode] || {};
        
        const newGeo: GeoData = {
          country: data.country_name || 'Global',
          country_code: countryCode || 'US',
          currency: config.currency || '$',
          currency_symbol: config.currency_symbol || '$',
          range: config.range || { min: 100, max: 2000 },
          default: config.default || 500
        };

        setGeo(newGeo);
        localStorage.setItem('vgotyou_geo', JSON.stringify(newGeo));
      } catch (error) {
        console.error('Geo detection failed:', error);
      }
    };

    fetchGeo();
  }, []);

  return geo;
};
