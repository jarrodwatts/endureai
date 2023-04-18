import Message from "@/types/firestore/Message";
import GeneratedResponse from "@/types/openai/GeneratedResponse";
import addFirestoreDocument from "../firebase/firestore/addFirestoreDocument";
import { serverTimestamp } from "firebase/firestore";
import User from "@/types/firestore/User";

export default async function createChatCompletion(
  systemMessage: string,
  // previousMessages should be sorted by createdAt
  previousMessages: Message[],
  newMessage: string,
  user: User,
  removeLoadingMessage?: () => void
) {
  try {
    // Add user message to Firestore
    const result1 = await addFirestoreDocument("messages", {
      uid: user.uid,
      contents: newMessage,
      from: "user",
      createdAt: serverTimestamp(),
    });

    console.log("Added to Firestore.", result1?.id);
  } catch (error) {
    console.error("Failed to add to document to Firestore.", error);
  }

  try {
    // Make API request to /api/send-request
    const response = await fetch("/api/send-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemMessage,
        previousMessages,
        newMessage,
        aboutUser: user.about || "",
      }),
    });

    console.log(response);

    if (!response.ok) {
      console.log("response failed. response:", response);

      const error = await response.json();

      console.error("Failed to create chat completion", error);

      throw new Error("Failed to create chat completion");
    }

    const data = (await response.json()) as GeneratedResponse;

    console.log("data on client:", data);

    try {
      // Add AI message to Firestore
      const result2 = await addFirestoreDocument("messages", {
        uid: user.uid,
        contents: data.message.content,
        from: "ai",
        createdAt: serverTimestamp(),
      });

      console.log("Added to Firestore.", result2?.id);
    } catch (error) {
      console.error("Failed to add to Firestore.", error);
    }

    removeLoadingMessage?.();
    return data;
  } catch (error) {
    console.error("Failed to create chat completion", error);

    throw new Error("Failed to create chat completion");
  }
}
