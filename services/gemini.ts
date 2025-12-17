
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export async function askVicBot(prompt: string) {
  try {
    // Fix: Initializing GoogleGenAI with the API key from process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.9,
      },
    });
    // Fix: Accessing the text property directly on the GenerateContentResponse object
    return response.text || "I'm sorry, I couldn't process that request at the moment.";
  } catch (error) {
    console.error("VicBot Error:", error);
    return "Error connecting to VicBot Core. Please check your system connection.";
  }
}
