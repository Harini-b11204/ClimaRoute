import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize the client only if key exists, otherwise we handle errors gracefully in the UI
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getGeminiWeatherInsight = async (location: string, conditions: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key missing");
    return "AI insights unavailable (Missing API Key).";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Analyze the delivery risks for a truck driver in ${location} with current conditions: ${conditions}.
      Provide a concise 2-sentence safety warning and one speed recommendation.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "No insight generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to retrieve real-time AI analysis.";
  }
};
