import { Configuration, OpenAIApi } from "openai";
import { convertMessageToPromptHelp } from "@/lib/format/convertMessageToPromptHelp";
import getMaxMessagesForTokenLimit from "@/lib/openai/getMaxMessagesForTokenLimit";
import initializeFirebaseServer from "@/lib/firebase/initFirebaseServer";
import { encode } from "gpt-3-encoder";
import type { NextApiRequest, NextApiResponse } from "next";
import type Message from "@/types/firestore/Message";

export default async function sendRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { systemMessage, previousMessages, newMessage, aboutUser } = req.body;
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ error: "No authorization header." });
    }

    const { auth, db } = initializeFirebaseServer();

    const decodedToken = await auth.verifyIdToken(
      authorizationHeader.split("Bearer ")[1]
    );

    if (!decodedToken) {
      return res.status(401).json({ error: "Invalid token." });
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const user = await auth.getUser(decodedToken.uid);
    const isPremium = user.customClaims?.stripeRole === "premium";
    const numAllowedMessages = isPremium ? 600 : 30;

    // TODO: This isn't secure, it uses the messages passed in the request body.
    // If someone were to modify the request body, they could send more messages than they are allowed.
    if (previousMessages.length > numAllowedMessages) {
      return res.status(403).json({
        error: `You have exceeded your message limit for the month. Please upgrade to premium to send more messages.`,
      });
    }

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
