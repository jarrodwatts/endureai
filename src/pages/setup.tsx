import { Container, Fade, Slide, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import Header from "@/components/landing/Header/Header";
import Image from "next/image";
import { useRouter } from "next/router";

const formQuestions = [
  {
    title: "Tell us about you.",
    description:
      "Help the AI understand your history. Anything you provide here will be sent along with each message.",
  },

  {
    title: "Personalize your experience.",
    description:
      "How do you want the AI to behave? You can change these settings at any time.",
  },

  {
    title: "Upgrade to Premium?",
    description:
      "We offer a free 7 day trial period. No credit card required. To continue using the platform, you will need to upgrade to a paid plan.",
  },
];

export default function Setup() {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const router = useRouter();

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
                  <TextField
                    multiline
                    variant="outlined"
                    rows={5}
                    placeholder="Tell us about yourself."
                    className={styles.textField}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        // remove border
                        "& fieldset": {
                          borderWidth: "2px",
                          borderColor: "rgba(255, 255, 255, 0.2)",
                          transition: "all 0.3s ease",
                        },

                        // hover
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.2)",
                        },

                        // selected
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.2)",
                        },
                      },

                      // selected effect
                    }}
                  />
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
              </div>
            </Fade>
          )}
        </div>
      </Container>
    </div>
  );
}
