export default async function handler(req, res) {
  const { message } = req.body;

  const systemPrompt = `
أنت مساعد ذكي تجيب فقط بناءً على النص التالي عن د. عبدالله. لا تؤلف.
د. عبدالله البنيان، أستاذ مساعد في الذكاء الاصطناعي بجامعة الأمير سطام...
(هنا الصق قصتك أو نصك الكامل)
`;

  const payload = {
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices?.[0]?.message?.content });
}

