import React, { useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import Header from "@/components/landing/Header/Header";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useAuthContext } from "@/lib/context/AuthContext";
import useUserData from "@/lib/firebase/firestore/useUserDocument";
import createPortalUrl from "@/lib/stripe/createPortalUrl";
import { useRouter } from "next/router";
import createCheckoutSession from "@/lib/stripe/createCheckoutSession";
import updateFirestoreDocument from "@/lib/firebase/firestore/updateFirestoreDocument";

type Props = {};

export default function Profile({}: Props) {
  const router = useRouter();
  const { loading: loadingAuth, user: authUser, isPremium } = useAuthContext();
  const { loading: loadingUserData, data: userData } = useUserData();

  // Update profile
  const [about, setAbout] = useState<string>("");
  const [botType, setBotType] = useState<string | null>(null);

  // As userData comes in, set the about field.
  useEffect(() => {
    if (userData) setAbout(userData.about || "");
    if (userData) setBotType(userData.botType || null);
  }, [userData]);

  async function manageSub() {
    const result = await createPortalUrl();

    if (!result) {
      return alert("Error creating portal url. Please try again later.");
    }

    // send user to the url
    // @ts-ignore
    window.location.assign(result.url as string);
    console.log(result);
  }

  async function handleBeginCheckout() {
    if (!authUser) return router.push("/login");
    await createCheckoutSession(authUser?.uid);
  }

  async function saveProfile() {
    if (!authUser) return router.push("/login");

    const result = await updateFirestoreDocument(`/users/${authUser?.uid}`, {
      about,
      botType,
    });

    // TODO: Toast.
    alert("Profile updated!");
  }

  return (
    <div className={styles.base}>
      <Header />
      <Container maxWidth="md">
        <div className={styles.container}>
          <Typography variant="h1">My Profile</Typography>

          {loadingAuth || loadingUserData ? (
            <Typography variant="body1">Loading...</Typography>
          ) : (
            <div className={styles.profile}>
              <div style={{ width: "100%" }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <b>About you</b>
                </Typography>

                <TextField
                  multiline
                  onChange={(e) => setAbout(e.target.value)}
                  variant="outlined"
                  value={about}
                  rows={5}
                  placeholder="Tell us about yourself."
                  className={styles.textField}
                  sx={{
                    width: "100%",
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

                <Typography variant="body1" sx={{ mt: 3, mb: 1 }}>
                  <b>Your AI Behaviour</b>

                  {/* Radio choice between Therapist, Psychologist, Coach */}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div>
                      <input
                        type="radio"
                        id="therapist"
                        name="ai-behaviour"
                        value="Therapist"
                        checked={botType === "Therapist"}
                        onChange={(e) => setBotType(e.target.value)}
                      />
                      <label htmlFor="therapist">Therapist</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="psychologist"
                        name="ai-behaviour"
                        value="Psychologist"
                        checked={botType === "Psychologist"}
                        onChange={(e) => setBotType(e.target.value)}
                      />
                      <label htmlFor="psychologist">Psychologist</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="coach"
                        name="ai-behaviour"
                        value="Coach"
                        checked={botType === "Coach"}
                        onChange={(e) => setBotType(e.target.value)}
                      />
                      <label htmlFor="coach">Coach</label>
                    </div>
                  </div>
                </Typography>
              </div>

              <Button
                onClick={saveProfile}
                variant="contained"
                color="primary"
                sx={{ height: 48 }}
              >
                Save Profile
              </Button>

              <hr
                style={{
                  width: "100%",
                  opacity: 0.1,
                  marginTop: 32,
                }}
              />

              <Typography variant="h2" sx={{ mt: 3 }}>
                Plan
              </Typography>

              {isPremium ? (
                <Button
                  onClick={manageSub}
                  variant="contained"
                  color="primary"
                  sx={{ height: 48 }}
                >
                  Manage Subscription
                </Button>
              ) : (
                <Button
                  onClick={handleBeginCheckout}
                  variant="contained"
                  color="primary"
                  sx={{ height: 48 }}
                >
                  Upgrade to Premium
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
