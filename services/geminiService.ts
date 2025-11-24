import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Product, User } from '../types';
import { PRODUCTS } from './mockData';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the response schema for recommendations
const recommendationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          reason: { type: Type.STRING },
          category: { type: Type.STRING },
        },
        required: ['productName', 'reason', 'category'],
      },
    },
  },
};

// Define response schema for price forecasts
const forecastSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    forecasts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          productId: { type: Type.STRING },
          advice: { type: Type.STRING },
          trend: { type: Type.STRING, enum: ['UP', 'DOWN', 'STABLE'] },
        },
        required: ['productId', 'advice', 'trend'],
      },
    },
  },
};

export const getPersonalizedRecommendations = async (user: User): Promise<any[]> => {
  try {
    const purchasedProductNames = PRODUCTS.filter(p => user.purchaseHistoryIds.includes(p.id)).map(p => p.name).join(", ");
    const preferences = user.preferences.join(", ");

    const prompt = `
      Based on the following user data, suggest 3 grocery products they might like.
      User Preferences: ${preferences}
      Purchase History: ${purchasedProductNames}
      
      Return a JSON object with a list of recommendations. Each recommendation should have a product name, a short reason why, and a category.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
      },
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text);
    return data.recommendations || [];
  } catch (error) {
    console.error("Error fetching recommendations from Gemini:", error);
    // Fallback if API fails
    return [
      { productName: "Almond Milk", reason: "Based on your interest in dairy alternatives", category: "Dairy" },
      { productName: "Quinoa", reason: "Matches your healthy eating profile", category: "Pantry" },
    ];
  }
};

export const getMarketForecasts = async (products: Product[]): Promise<any[]> => {
  try {
    const productList = products.map(p => {
        // Calculate lowest price for context
        const minPrice = Math.min(...p.prices.map(pr => pr.amount));
        return `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Current Best Price: $${minPrice}`;
    }).join('\n');

    const prompt = `
      Analyze market trends for the following grocery items and predict price movements for the next 2 weeks:
      ${productList}

      Consider seasonality, supply chain trends, and general economic factors for groceries.
      
      For 'trend', use one of: 'UP' (Price likely to rise), 'DOWN' (Price likely to drop), 'STABLE' (Price likely to remain stable).
      For 'advice', provide a short, actionable sentence (max 15 words) like "Buy now, seasonal low" or "Wait, prices dropping".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: forecastSchema,
      },
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text);
    return data.forecasts || [];
  } catch (error) {
    console.error("Error fetching market forecasts:", error);
    return [];
  }
};
