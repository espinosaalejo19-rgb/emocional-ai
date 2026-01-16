import OpenAI from "openai";

export const config = {
  runtime: "nodejs"
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Método no permitido" });
  }

  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Sos una presencia empática, humana y calmada. Respondés en español argentino, con pocas palabras, sin juzgar."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });
  } catch (err) {
    res.status(500).json({
      reply: "Estoy acá con vos. ¿Querés contarme un poco más?"
    });
  }
}
