import React, { useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import Header from "@/components/landing/Header/Header";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useAuthContext } from "@/lib/context/AuthContext";
import useUserData from "@/lib/firebase/firestore/useUserDocument";
import createPortalUrl from "@/lib/stripe/createPortalUrl";

type Props = {};

export default function Profile({}: Props) {
  const { loading: loadingAuth, user: authUser, isPremium } = useAuthContext();
  const { loading: loadingUserData, data: userData } = useUserData();
  const [about, setAbout] = useState<string>("");

  // As userData comes in, set the about field.
  useEffect(() => {
    if (userData) setAbout(userData.about || "");
  }, [userData]);

  async function manageSub() {
    const result = await createPortalUrl();
    console.log(result);
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
              <Typography variant="h2">Profile Information</Typography>

              <Typography variant="body1">
                <b>Name</b>: {authUser?.displayName}
              </Typography>

              <Typography variant="body1">
                <b>Email</b>: {authUser?.email}
              </Typography>

              <div style={{ width: "100%" }}>
                <Typography variant="body1">
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
              </div>

              <Typography variant="h2" sx={{ mt: 3 }}>
                Plan
              </Typography>

              <Button
                onClick={manageSub}
                variant="contained"
                color="primary"
                sx={{ height: 48 }}
              >
                Manage Subscription
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
