import React from "react";
import Header from "@/components/landing/Header/Header";
import LoginComponent from "@/components/Login/Login";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthContext } from "@/lib/context/AuthContext";
import styles from "../styles/Login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuthContext();

  // TODO: Make this a server-side check.
  if (user) router.push(`/talk`);

  return (
    <div className={styles.base}>
      <Header />
      <Container maxWidth="sm">
        <LoginComponent />
      </Container>
    </div>
  );
}
