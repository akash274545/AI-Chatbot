import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        reply: "Please enter a message.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: "You are a friendly AI assistant.",
      },
    });

    const aiReply = response.text;

    res.json({
      reply: aiReply,
    });

  } catch (error) {
    console.error("Gemini API Error:", error);

    res.status(500).json({
      reply: "⚠️ Unable to get a response from Gemini API.",
    });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});