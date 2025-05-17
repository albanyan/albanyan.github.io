export default async function handler(req, res) {
  const { message } = req.body;

  const systemPrompt = `
أنت مساعد ذكي تجيب فقط بناءً على النص التالي عن د. عبدالله. لا تؤلف أو تخمّن. وإذا ما تعرف قل "لا أعلم".

د. عبدالله البنيان، أستاذ مساعد في الذكاء الاصطناعي بجامعة الأمير سطام. يشغل منصب وكيل الكلية للشؤون الأكاديمية. بدأ مشواره الأكاديمي عام 2012، وعمل في مشاريع الذكاء الاصطناعي في القطاع الحكومي والخاص.
شارك مؤخرًا في هاكاثون صناعي وحصل على إشادة من لجنة التحكيم. لديه ثلاثة أبناء: عبدالعزيز (8 سنوات)، نورة (5 سنوات)، وأحمد (ولد عام 2024).
أنشأ مشروع "راصد" لتحليل سلوك العملاء باستخدام الرؤية الحاسوبية، ويهدف لتوسيع المشروع في قطاع المطاعم والمقاهي في 2025.
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
