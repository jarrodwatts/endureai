import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";
import type Message from "@/types/firestore/Message";
import { convertMessageToPromptHelp } from "@/lib/format/convertMessageToPromptHelp";
import getMaxMessagesForTokenLimit from "@/lib/openai/getMaxMessagesForTokenLimit";
import { encode } from "gpt-3-encoder";

export default async function sendRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { systemMessage, previousMessages, newMessage, aboutUser } = req.body;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    // TODO: Check if the user has exceeded their message limit for the month.
    // If premium: messages for month > 300 * 2 (2 messages - one from ai one from user)
    // If free: messages for month > 25?

    const messagesToSendAsContext = await getMaxMessagesForTokenLimit(
      previousMessages,
      aboutUser,
      4096 - encode(systemMessage).length - encode(newMessage).length - 500 // 500 is a buffer to account for random shit
    );

    console.log("Requesting completion from OPENAI");

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        // System
        { role: "system", content: systemMessage },

        // Previous messages
        ...messagesToSendAsContext.map((m: Message) =>
          convertMessageToPromptHelp(m)
        ),

        // Latest message to prompt new response.
        { role: "user", content: newMessage },
      ],
    });

    if (completion.data.choices.length > 0) {
      return res.status(200).json(completion.data.choices[0]);
    } else {
      console.error("Could not find completion.", completion);
      return res.status(500).json({ error: "No completion found." });
    }
  } catch (error) {
    console.error("Error in sendRequest", error);
    return res.status(500).json({ error: "Error in sendRequest" });
  }
}
