import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Example backend function
const getWeather = async (city) => {
  // Dummy data (replace with real API like OpenWeather)
  return {
    city,
    temperature: "28°C",
    condition: "Sunny",
  };
};

// Function Calling Controller
export const functionCallingPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: "You are a travel assistant. You can call functions when needed." },
          { role: "user", content: prompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "getWeather",
              description: "Get current weather for a city",
              parameters: {
                type: "object",
                properties: {
                  city: {
                    type: "string",
                    description: "The city to get weather for"
                  }
                },
                required: ["city"]
              }
            }
          }
        ]
      }),
    });

    const data = await response.json();

    // Check if model requested a function call
    const message = data.choices[0].message;

    if (message.tool_calls) {
      const toolCall = message.tool_calls[0];
      if (toolCall.function.name === "getWeather") {
        const args = JSON.parse(toolCall.function.arguments);
        const weather = await getWeather(args.city);

        return res.json({
          called_function: "getWeather",
          arguments: args,
          result: weather
        });
      }
    }

    // Default response if no function call
    res.json({ response: message.content });

  } catch (error) {
    console.error("Error in functionCallingPrompt:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
