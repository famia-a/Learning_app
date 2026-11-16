import Groq from 'groq-sdk';


const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API,
  dangerouslyAllowBrowser: true // Explicitly acknowledge the security risk
});


export async function llm() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of AI mae some mcqqs with this topic",
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}