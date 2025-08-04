import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function POST(req: Request) {
  const { prompt: input } = await req.json();

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash-lite-001",
    maxOutputTokens: 2048,
  });


  const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage("You're a helpful assistant, based on the given content generate an appropriate title for it"),
    new HumanMessage(input),
  ]);

  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  const result = await chain.invoke(input);

  return Response.json(result);
}