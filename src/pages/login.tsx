import { Button, Container, Typography } from "@mui/material";
import React from "react";
import styles from "../styles/Login.module.css";
import Header from "@/components/landing/Header/Header";
import Image from "next/image";
import signIn from "@/lib/firebase/auth/signIn";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  async function handleLogin(provider: GoogleAuthProvider) {
    const result = await signIn(provider);

    if (result !== null) {
      router.push(`/setup`);
    }
  }

  return (
    <div className={styles.base}>
      <Header />
      <Container maxWidth="sm">
        <div className={styles.container}>
          <Image alt="logo" src="/logo.png" width={32} height={32} />
          <Typography variant="h2" className={styles.title}>
            Sign up / Log in
          </Typography>
          <Typography variant="body2" className={styles.caption}>
            Let&rsquo;s get you signed in to start chatting with Endure.
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={
              <Image alt="logo" src="/google.png" width={24} height={24} />
            }
            className={styles.button}
            onClick={() => handleLogin(new GoogleAuthProvider())}
          >
            Sign In with Google
          </Button>
        </div>
      </Container>
    </div>
  );
}
