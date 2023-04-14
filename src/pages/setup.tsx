import { Button, Container, Fade, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Setup.module.css";
import Header from "@/components/landing/Header/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/initFirebaseClient";
import updateFirestoreDocument from "@/lib/firebase/firestore/updateFirestoreDocument";

const formQuestions = [
  {
    title: "Tell us about you.",
    description:
      "Help the AI understand your history. Anything you provide here will be sent along with each message.",
  },

  {
    title: "Personalize your experience.",
    description: "How do you want the AI conversation to behave?",
  },

  {
    title: "Upgrade to Premium?",
    description: "We offer a free 7 day trial period. No credit card required.",
  },
];

const botOptions = [
  {
    title: "Therapist",
    description:
      "Empathetic, patient, and have strong communication skills to help individuals cope with mental and emotional issues.",
  },
  {
    title: "Psychologist",
    description:
      "Analytical, detail-oriented, and have strong research skills to understand human behavior and develop treatment plans",
  },
  {
    title: "Coach",
    description:
      "Motivational, goal-oriented, and have strong communication skills to help individuals improve their personal or professional lives",
  },
];

export default function Setup() {
  const [user] = useAuthState(auth);
  const [about, setAbout] = useState<string>("");
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const router = useRouter();

  async function submitInformation(fieldsToUpdate: { [key: string]: any }) {
    console.error("User is not logged in");
    if (!user) return router.push("/login");

    // Add firebase document field to user profile
    const result = await updateFirestoreDocument(
      `users/${user.uid}`,
      fieldsToUpdate
    );

    // TODO: toast success // error
  }

  async function handleBeginCheckout() {
    console.error("User is not logged in");
    if (!user) return router.push("/login");

    await createCheckoutSession(user?.uid);
  }

  return (
    <div className={styles.base}>
      <Header />
      <Container maxWidth="sm">
        <div className={styles.container}>
          <Image alt="logo" src="/logo.png" width={32} height={32} />
          <Typography variant="h2" className={styles.title}>
            Set up your Profile
          </Typography>
          <Typography variant="body2" className={styles.caption}>
            Tell us a little bit about yourself, so we can get to know you
            better.
          </Typography>

          <div className={styles.formPhaseContainer}>
            <button
              className={`${styles.formPhaseNumber} 
            ${phase === 1 ? styles.active : ``} 

            `}
              onClick={() => setPhase(1)}
            >
              <Typography>1</Typography>
            </button>

            <button
              className={`${styles.formPhaseNumber} 
            ${phase === 2 ? styles.active : ``} 
            `}
              onClick={() => setPhase(2)}
            >
              <Typography>2</Typography>
            </button>
            <button
              className={`${styles.formPhaseNumber} 
            ${phase === 3 ? styles.active : ``} 
            `}
              onClick={() => setPhase(3)}
            >
              <Typography>3</Typography>
            </button>
          </div>

          {phase === 1 && (
            <Fade in={true} mountOnEnter unmountOnExit timeout={750}>
              <div className={styles.formQuestionContainer}>
                <Typography variant="h3" className={styles.title}>
                  {formQuestions[phase - 1].title}
                </Typography>

                <Typography variant="body2" className={styles.caption}>
                  {formQuestions[phase - 1].description}
                </Typography>

                {phase === 1 && (
                  <div className={styles.botOptionsContainer}>
                    <TextField
                      multiline
                      onChange={(e) => setAbout(e.target.value)}
                      variant="outlined"
                      rows={5}
                      placeholder="Tell us about yourself."
                      className={styles.textField}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderWidth: "2px",
                            borderColor: "rgba(255, 255, 255, 0.2)",
                            transition: "all 0.3s ease",
                          },

                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },

                          "&.Mui-focused fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      color="inherit"
                      className={styles.nextButton}
                      onClick={() => {
                        submitInformation({ about });
                        setPhase(2);
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                )}
              </div>
            </Fade>
          )}

          {phase === 2 && (
            <Fade in={true} mountOnEnter unmountOnExit timeout={750}>
              <div className={styles.formQuestionContainer}>
                <Typography variant="h3" className={styles.title}>
                  {formQuestions[phase - 1].title}
                </Typography>

                <Typography variant="body2" className={styles.caption}>
                  {formQuestions[phase - 1].description}
                </Typography>

                <div className={styles.botOptionsContainer}>
                  {botOptions.map((option, index) => (
                    <button
                      className={styles.botOption}
                      key={index}
                      onClick={() => {
                        submitInformation({ botType: option.title });
                        setPhase(3);
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="#fff"
                        className={styles.optionTitle}
                      >
                        {option.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#fff"
                        className={styles.optionDescription}
                      >
                        {option.description}
                      </Typography>
                    </button>
                  ))}
                </div>
              </div>
            </Fade>
          )}

          {phase === 3 && (
            <Fade in={true} mountOnEnter unmountOnExit timeout={750}>
              <div className={styles.formQuestionContainer}>
                <Typography variant="h3" className={styles.title}>
                  {formQuestions[phase - 1].title}
                </Typography>

                <Typography variant="body2" className={styles.caption}>
                  {formQuestions[phase - 1].description}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => router.push("/talk")}
                  className={styles.nextButton}
                >
                  Begin 7 Day Trial
                </Button>

                <Button
                  variant="contained"
                  onClick={handleBeginCheckout}
                  className={styles.secondaryButton}
                >
                  Upgrade to Premium
                </Button>
              </div>
            </Fade>
          )}
        </div>
      </Container>
    </div>
  );
}
