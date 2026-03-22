import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  streamText,
  type LanguageModel,
} from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { STELLAR_SYSTEM_PROMPT } from "@/lib/stellar-prompt";
import { buildMockStellarReply } from "@/lib/mock-stellar-reply";

export const maxDuration = 60;

function resolveLanguageModel(): LanguageModel | null {
  const openaiKey = process.env.OPENAI_API_KEY;
  const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (openaiKey?.startsWith("sk-")) {
    return openai("gpt-4o-mini");
  }

  const geminiKey =
    googleKey ?? (openaiKey?.startsWith("AIza") ? openaiKey : undefined);
  if (geminiKey) {
    const genAI = createGoogleGenerativeAI({ apiKey: geminiKey });
    return genAI("gemini-flash-latest");
  }

  return null;
}

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages;

  const model = resolveLanguageModel();

  if (!model) {
    const lastUser = [...messages]
      .reverse()
      .find((m: { role: string }) => m.role === "user");
    const lastText =
      lastUser?.parts?.find((p: { type: string }) => p.type === "text")
        ?.text ?? "";
    const mock = buildMockStellarReply(lastText);
    const textId = generateId();

    const stream = createUIMessageStream({
      originalMessages: messages,
      execute: ({ writer }) => {
        writer.write({ type: "text-start", id: textId });
        for (const chunk of mock.split(/(\s+)/)) {
          if (chunk) writer.write({ type: "text-delta", id: textId, delta: chunk });
        }
        writer.write({ type: "text-end", id: textId });
      },
    });

    return createUIMessageStreamResponse({ stream });
  }

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model,
    system: STELLAR_SYSTEM_PROMPT,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
