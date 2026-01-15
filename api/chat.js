export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const userMessage = req.body.message;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'Sos una inteligencia artificial emocional. No juzgás. Respondés corto, humano y con calma. No das frases vacías.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: 'Estoy acá. Dame un segundo.' });
  }
}
