import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Controller for zero-shot prompting
export const zeroShotPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // you can use gpt-3.5-turbo too
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error in zeroShotPrompt:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
