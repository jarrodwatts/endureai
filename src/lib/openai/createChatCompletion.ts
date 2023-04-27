import Message from "@/types/firestore/Message";
import GeneratedResponse from "@/types/openai/GeneratedResponse";
import addFirestoreDocument from "../firebase/firestore/addFirestoreDocument";
import { serverTimestamp } from "firebase/firestore";
import User from "@/types/firestore/User";
import removeRoleFromResponse from "../format/removeRoleFromResponse";
import { User as FirebaseUser } from "firebase/auth";

export default async function createChatCompletion(
  systemMessage: string,
  // previousMessages should be sorted by createdAt
  previousMessages: Message[],
  newMessage: string,
  user: FirebaseUser,
  userData: User,
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
        // Auth Header: Current Firebase user token ID
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
      body: JSON.stringify({
        systemMessage,
        previousMessages,
        newMessage: `Client: ${newMessage}`,
        aboutUser: userData.about || "",
      }),
    });

    // Handle different responses

    // 401: Require login
    if (response.status === 401) {
      alert(
        "Something went wrong authenticating your request. Please refresh the page and try again."
      );
    }

    // 403: Exceeded message limit
    if (response.status === 403) {
      alert(
        "You have exceeded your message limit for the month. Please upgrade to premium to send more messages."
      );
    }

    // 500: OpenAI error
    if (response.status === 500) {
      alert(
        "Something went wrong communicating with OpenAI. Please refresh the page and try again."
      );
    }

    if (!response.ok) {
      console.log("response failed. response:", response);

      const error = await response.json();

      console.error("Failed to create chat completion", error);

      throw new Error("Failed to create chat completion");
    }

    const data = (await response.json()) as GeneratedResponse;

    try {
      // Add AI message to Firestore
      const result2 = await addFirestoreDocument("messages", {
        uid: user.uid,
        contents: removeRoleFromResponse(data.message.content),
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
