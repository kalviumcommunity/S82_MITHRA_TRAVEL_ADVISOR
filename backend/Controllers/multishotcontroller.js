import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Multi-Shot Controller
export const multiShotPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Multi-shot: provide several examples before the actual user query
    const messages = [
      { role: "system", content: "You are a helpful travel assistant." },

      // Example 1
      { role: "user", content: "Plan a 2-day trip to Goa with beaches and nightlife." },
      { role: "assistant", content: "Day 1: Relax at Baga Beach, water sports, evening at Tito’s Club. Day 2: Visit Anjuna Beach, flea market, seafood dinner." },

      // Example 2
      { role: "user", content: "Suggest a 3-day trip to Paris focusing on art and museums." },
      { role: "assistant", content: "Day 1: Louvre Museum & Seine River Cruise. Day 2: Musée d'Orsay & Montmartre. Day 3: Palace of Versailles & Eiffel Tower at night." },

      // Example 3
      { role: "user", content: "Plan a weekend in Tokyo with food and culture." },
      { role: "assistant", content: "Day 1: Tsukiji Market sushi breakfast, Asakusa Temple, Akihabara. Day 2: Harajuku fashion, Shibuya crossing, evening izakaya dining." },

      // Actual user request
      { role: "user", content: prompt },
    ];

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
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error("Error in multiShotPrompt:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
