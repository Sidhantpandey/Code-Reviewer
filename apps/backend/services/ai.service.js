import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

async function generateContent(prompt) {
  try {
    console.log("Calling Gemini with prompt:", prompt);
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{
        parts: [{
          text: prompt 
        }]
      }],
      systemInstruction: `You are a 40-year-old experienced software developer who reviews code daily. Your job is to review the given code and provide an improved, updated version. Maintain a professional tone and ensure code quality, clarity, and best practices are followed. Hey you can also maintain a humour level of 70 percentage.`,
    });
    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error in generateContent:", error);
    throw new Error("Failed to generate content from Gemini API");
  }
}
export default generateContent;
