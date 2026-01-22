import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const getPredictionInsight = async (
  inputValue: number,
  predictedValue: number,
  slope: number
): Promise<string> => {
  const ai = getClient();
  if (!ai) {
    return "API Key not configured. Unable to fetch AI insights.";
  }

  const prompt = `
    You are an expert Data Science tutor explaining a Simple Linear Regression model to a student.
    
    Context:
    - We are predicting Exam Scores based on Study Hours.
    - The model calculated a slope (rate of increase) of ${slope.toFixed(2)}.
    - The user input was ${inputValue} hours.
    - The predicted score is ${predictedValue.toFixed(2)}.

    Task:
    Explain simply why the model predicted this value. Mention that for every 1 hour increase, the score tends to go up by the slope amount. Keep it brief (under 3 sentences) and encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No insight available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insight at this time.";
  }
};