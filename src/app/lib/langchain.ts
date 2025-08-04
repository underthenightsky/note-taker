import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// Base LLM (OpenAI)
const model = new ChatOpenAI({
  temperature: 0.7,
  modelName: "gpt-4",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Refine Note Chain
export const getRefineChain = () => {
  const prompt = PromptTemplate.fromTemplate(`
Refine the following note to improve clarity, structure, and grammar, while preserving the original intent:

{note}
  `);
  return new LLMChain({ llm: model, prompt });
};

// Generate Title Chain
export const getTitleChain = () => {
  const prompt = PromptTemplate.fromTemplate(`
Generate a short, clear, and relevant title (under 10 words) for the following note:

{note}
  `);
  return new LLMChain({ llm: model, prompt });
};
