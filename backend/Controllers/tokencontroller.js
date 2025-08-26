import { encode, decode } from "gpt-tokenizer";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Tokenization function
const tokenizeText = async (text) => {
  const tokens = encode(text);  // Convert text → token IDs
  return {
    text,
    tokens,
    token_count: tokens.length,
    decoded_text: decode(tokens), // Convert back to text
  };
};

// Controller
export const tokensAndTokenization = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Optional: Ask model for explanation
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: "You are an assistant that explains tokenization." },
          { role: "user", content: `Explain tokenization for: ${prompt}` }
        ]
      }),
    });

    const data = await response.json();
    const message = data?.choices?.[0]?.message?.content;

    // Local tokenization
    const tokenizationResult = await tokenizeText(prompt);

    return res.json({
      model_explanation: message,
      tokenization_result: tokenizationResult,
    });

  } catch (error) {
    console.error("Error in tokensAndTokenization:", error.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
