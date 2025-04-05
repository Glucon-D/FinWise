import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Specify the model name correctly
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates investment suggestions using Gemini AI based on user profile data
 * @param {Object} userProfile - User profile data
 * @returns {Promise<Object>} - AI-generated investment suggestions
 */
export async function generateInvestmentSuggestion(userProfile) {
  try {
    const prompt = `
      As an AI investment advisor, analyze this investor profile and provide personalized recommendations:
      
      Age: ${userProfile.age || 'N/A'}
      Monthly Investment: ${userProfile.monthlyInvestment || 'N/A'}
      Initial Investment: ${userProfile.initialInvestment || 'N/A'}
      Investment Goal: ${userProfile.investmentGoal || 'N/A'}
      Investment Period: ${userProfile.investmentPeriod || 'N/A'} years
      Risk Tolerance: ${userProfile.riskTolerance || 'Moderate'}
      
      Based on this profile:
      1. Determine the most appropriate risk profile (choose exactly one from: "Conservative", "Moderate", or "Aggressive")
      2. Suggest 3-5 investment types (e.g., SIP, Gold, Balanced Mutual Fund, Index Funds, etc.)
      
      Return your response as a JSON object with this exact format:
      { 
        "riskProfile": "one of Conservative/Moderate/Aggressive", 
        "investmentType": ["type1", "type2", "type3"]
      }
      Return only the JSON, no other text.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract the JSON object from the response text
    // Sometimes the API returns the JSON with extra text, so we need to parse it
    let jsonResponse;
    try {
      // First try to parse the entire response as JSON
      jsonResponse = JSON.parse(responseText);
    } catch (error) {
      // If that fails, try to extract JSON using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON from response");
      }
    }
    
    return {
      success: true,
      data: jsonResponse
    };
  } catch (error) {
    console.error("Error generating investment suggestion:", error);
    return {
      success: false,
      error: error.message,
      // Fallback data in case of failure
      data: {
        riskProfile: "Moderate",
        investmentType: ["SIP", "Mutual Funds", "Index Funds"]
      }
    };
  }
}

/**
 * Explains an investment term in simple language for beginners
 * @param {string} term - The investment term to explain
 * @returns {Promise<Object>} - Simple explanation of the term
 */
export async function explainLike18(term) {
  try {
    const prompt = `Explain ${term} in 2-3 simple, friendly sentences to an 18-year-old beginner. Avoid jargon.`;
    
    const result = await model.generateContent(prompt);
    const explanation = result.response.text();
    
    return {
      success: true,
      explanation
    };
  } catch (error) {
    console.error("Error explaining term:", error);
    // Create a more helpful error message that includes API details
    const errorMessage = `Explanation failed: ${error.message}. 
      This might be due to API changes or quota limits. 
      You can try again later or check the Gemini API documentation for updates.`;
    
    return {
      success: false,
      error: errorMessage,
      explanation: `Sorry, I couldn't explain "${term}" right now. The AI explanation service is temporarily unavailable.`
    };
  }
}