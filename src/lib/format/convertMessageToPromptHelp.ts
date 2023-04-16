import Message from "@/types/firestore/Message";
import { ChatCompletionRequestMessage } from "openai";

export function convertMessageToPromptHelp(
  message: Message
): ChatCompletionRequestMessage {
  const role = message.from === "ai" ? "assistant" : "user";
  const content = message.contents;

  return { role, content };
}
