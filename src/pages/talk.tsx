import { Container, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Talk.module.css";
import Header from "@/components/landing/Header/Header";
import { useRouter } from "next/router";
import { useAuthContext } from "@/lib/context/AuthContext";
import LoginComponent from "@/components/Login/Login";
import useMessages from "@/lib/firebase/firestore/useMessages";
import ChatBox from "@/components/Chatbox/Chatbox";
import createChatCompletion from "@/lib/openai/createChatCompletion";
import useUserData from "@/lib/firebase/firestore/useUserDocument";
import systemPrompts from "@/const/systemPrompts";

export default function Talk() {
  const router = useRouter();

  // Load authentication of user, to show login screen if not logged in
  const { user, loading: loadingUser } = useAuthContext();

  // Load the /users/{uid} document of the user
  const { data: userData, loading: loadingUserData } = useUserData();

  // Load documents from the "messages" collection sent by this user uid
  const { messages, loading } = useMessages();
  console.log(messages);

  // Store the state of the new message user is typing into Chatbox
  const [newMessage, setNewMessage] = useState<string>("");

  // Ref to update scroll position of messages container
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function submitNewMessage() {
    if (!user) {
      console.log("User not logged in");
      router.push(`/login?redirect=${router.asPath}`);
      return;
    }

    console.log("Submitting message.");

    console.log(systemPrompts[userData?.botType || "Therapist"]);

    const result = await createChatCompletion(
      // systemMessage: Based on what the user selected as their chatbot option.
      systemPrompts[userData?.botType || "Therapist"],
      messages,
      newMessage,
      user.uid
    );

    console.log("result", result);
  }

  return (
    <div className={styles.base}>
      <Header />
      <Container maxWidth="md">
        <div className={styles.container}>
          {loadingUser && <Typography variant="body1">Loading...</Typography>}
          {!loadingUser && !user && <LoginComponent />}

          {/* State where user is logged in (TODO: Check if trial period / premium) */}
          {user && (
            <div className={styles.chatContainer}>
              <div
                className={styles.messagesContainer}
                ref={messagesContainerRef}
              >
                {loading ? (
                  <Typography variant="body1">Loading...</Typography>
                ) : (
                  messages.map((message) => (
                    <div
                      className={`${styles.message} ${
                        message.from === "user" ? styles.sent : styles.received
                      }`}
                      key={message.id}
                    >
                      <Typography variant="body1">
                        {message.contents}
                      </Typography>
                    </div>
                  ))
                )}
              </div>

              <ChatBox
                message={newMessage}
                setMessage={setNewMessage}
                onSubmit={submitNewMessage}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
