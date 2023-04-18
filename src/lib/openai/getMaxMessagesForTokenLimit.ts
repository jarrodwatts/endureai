import Message from "@/types/firestore/Message";
import { encode } from "gpt-3-encoder";

/**
 * This function gets the maximum number of messages that can be sent with the given token limit.
 * It should also send the "about" of the user.
 */
export default async function getMaxMessagesForTokenLimit(
  allMessages: Message[],
  aboutUser: string,
  remainingTokens: number
) {
  // The maximum number of tokens allowed in a request is 4096.
  // A helpful rule of thumb is that one token generally corresponds to ~4 characters of text for common English text. This translates to roughly ¾ of a word (so 100 tokens ~= 75 words).
  // If you need a programmatic interface for tokenizing text, check out our tiktoken package for Python.
  // For JavaScript, the gpt-3-encoder package for node.js works for most GPT-3 models.

  // The maximum number of tokens allowed in a request is 4096.
  const aboutTokens = encode(aboutUser).length;
  let messageTokens = 0;
  let messagesToSend: Message[] = [];

  // Calculate the total number of tokens required to encode the messages, starting from the most recent messages.
  for (let i = allMessages.length - 1; i >= 0; i--) {
    const message = allMessages[i];
    const messageLength = encode(message.contents).length;

    if (messageTokens + messageLength + aboutTokens <= remainingTokens) {
      messageTokens += messageLength;
      messagesToSend.unshift(message); // Add messages to the front of the array to preserve the order.
    } else {
      break; // Stop adding messages once the token limit is reached.
    }
  }

  // Send the messages and the "about" of the user in ascending order.
  messagesToSend.reverse(); // Reverse the array to restore the original order.

  return messagesToSend;
}
