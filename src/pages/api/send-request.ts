import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";
import type Message from "@/types/firestore/Message";
import { convertMessageToPromptHelp } from "@/lib/format/convertMessageToPromptHelp";

export default async function sendRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { systemMessage, previousMessages, newMessage } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      // System
      { role: "system", content: systemMessage },

      // Previous messages: TODO - token limit
      ...previousMessages.map((m: Message) => convertMessageToPromptHelp(m)),

      // Latest message to prompt new response.
      { role: "user", content: newMessage },
    ],
  });

  if (completion.data.choices.length > 0) {
    return res.status(200).json(completion.data.choices[0]);
  } else {
    console.error("Could not find completion.", completion.data);
    return res.status(500).json({ error: "No completion found." });
  }
}
