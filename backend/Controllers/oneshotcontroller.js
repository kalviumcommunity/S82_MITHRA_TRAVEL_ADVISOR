import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// One-Shot Controller with OpenRouter
export const oneShotPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // One-shot: provide an example before the actual user query
    const messages = [
      { role: "system", content: "You are a helpful travel assistant." },
      {
        role: "user",
        content: "Plan a 2-day trip to Goa with beaches and nightlife.",
      },
      {
        role: "assistant",
        content:
          "Day 1: Relax at Baga Beach, water sports, evening at Tito’s Club. Day 2: Visit Anjuna Beach, flea market, seafood dinner.",
      },
      { role: "user", content: prompt }, // actual user input
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",  // free model
        messages,
        temperature: 0.7
      }),
    });

    const data = await response.json();

    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error("Error in oneShotPrompt:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
