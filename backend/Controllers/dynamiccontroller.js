import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Dynamic Prompt Controller
export const dynamicPrompt = async (req, res) => {
  try {
    const { prompt, preferences, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Default preferences
    const userPreferences = preferences || {
      likes: ["beaches", "local food"],
      budget: "medium",
      travel_style: "relaxed",
    };

    // Previous conversation history
    const chatHistory = history || [];

    // Build dynamic system message
    const systemMessage = {
      role: "system",
      content: `You are a travel advisor. 
      The user prefers: ${userPreferences.likes.join(", ")}. 
      Budget: ${userPreferences.budget}. 
      Travel style: ${userPreferences.travel_style}.
      Always personalize recommendations.`
    };

    // Build final message array dynamically
    const messages = [systemMessage, ...chatHistory, { role: "user", content: prompt }];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free", // free model
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    res.json({
      dynamic_prompt_used: messages,
      response: data.choices[0].message.content
    });

  } catch (error) {
    console.error("Error in dynamicPrompt:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
