import { Container, Fade, Typography } from "@mui/material";
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

  // Show "typing" message while OpenAI is generating a response
  const [typing, setTyping] = useState<boolean>(false);

  // Ref to update scroll position of messages container
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function submitNewMessage() {
    if (!user || !userData) {
      console.log("User not logged in");
      // TODO: toast error
      alert("Login and set up your account to continue.");
      router.push(`/login?redirect=${router.asPath}`);
      return;
    }

    setTyping(true);

    try {
      console.log("Submitting message.");

      console.log(systemPrompts[userData?.botType || "Therapist"]);

      const result = await createChatCompletion(
        // systemMessage: Based on what the user selected as their chatbot option.
        systemPrompts[userData?.botType || "Therapist"],
        messages,
        newMessage,
        userData,
        () => setTyping(false)
      );

      console.log("result", result);
    } catch (error) {
      // TODO: Toast error
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setTyping(false);
    }
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
                    <Fade in={true} key={message.id}>
                      <div
                        className={`${styles.message} ${
                          message.from === "user"
                            ? styles.sent
                            : styles.received
                        }`}
                        key={message.id}
                      >
                        <Typography variant="body1">
                          {message.contents}
                        </Typography>
                      </div>
                    </Fade>
                  ))
                )}

                {
                  // Show "typing" message while OpenAI is generating a response
                  typing && (
                    <Fade
                      in={typing}
                      // dont fade out
                      timeout={{ enter: 250, exit: 0 }}
                    >
                      <div className={`${styles.message} ${styles.received}`}>
                        <Typography variant="body1">Typing...</Typography>
                      </div>
                    </Fade>
                  )
                }
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
