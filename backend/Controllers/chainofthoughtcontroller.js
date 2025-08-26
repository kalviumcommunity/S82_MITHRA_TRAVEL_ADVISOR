import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Chain-of-Thought Controller
export const chainOfThoughtPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Messages with CoT instruction
    const messages = [
      { role: "system", content: "You are a reasoning assistant. Always explain your reasoning step by step before giving the final answer." },

      // Example to set style
      { role: "user", content: "If a train travels 300 km at 100 km/h, how long will it take?" },
      { role: "assistant", content: "Step 1: Distance = 300 km. Step 2: Speed = 100 km/h. Step 3: Time = Distance / Speed = 3 hours. Final Answer: 3 hours." },

      // Actual user request
      { role: "user", content: prompt }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free", // free OpenRouter model
        messages,
        temperature: 0.5, // lower temp for more logical steps
      }),
    });

    const data = await response.json();
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error("Error in chainOfThoughtPrompt:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
