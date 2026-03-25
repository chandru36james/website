import { GoogleGenAI } from "@google/genai";

/**
 * Returns a new GoogleGenAI client instance.
 * Follows the guideline: "Create a new GoogleGenAI instance right before making an API call."
 */
export const getGeminiAI = () => {
  // FIX: Guideline requires creating a new instance right before making an API call to ensure it 
  // always uses the most up-to-date API key and environment configuration.
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};
