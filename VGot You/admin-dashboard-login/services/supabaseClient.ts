import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig';

// Ensure the configuration has been updated from the placeholder values.
if (SUPABASE_URL.includes('YOUR_SUPABASE_URL') || SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')) {
  const errorMessage = 'Supabase credentials are not configured. Please edit services/supabaseConfig.ts with your actual Supabase URL and anon key.';
  console.error(errorMessage);
  
  // Display a more user-friendly message on the page itself.
  const root = document.getElementById('root');
  if (root) {
      root.innerHTML = `
        <div style="padding: 2rem; text-align: center; font-family: sans-serif; background-color: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; border-radius: 0.5rem; margin: 2rem;">
          <h1 style="font-size: 1.5rem; font-weight: bold;">Configuration Error</h1>
          <p style="margin-top: 0.5rem;">${errorMessage}</p>
        </div>
      `;
  }
  
  // Stop the app from running with an invalid configuration.
  throw new Error(errorMessage);
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
