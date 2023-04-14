import Link from "next/link";
import styles from "./Content.module.css";
import { useAuthContext } from "@/lib/context/AuthContext";

export default function Content() {
  const { user, loading } = useAuthContext();

  return (
    <div className={styles.content}>
      <div className={styles.description}>
        <h2>Your 24/7 Partner for Mental Health</h2>
        <p className={styles.desc}>
          Chat to a personalized AI-powered mental health assistant in minutes.
        </p>
      </div>

      <Link href="/login" className={styles.button}>
        <span>
          {user && !loading ? "Continue Talking" : "Get Started (Free)"}
        </span>
      </Link>

      <div className={styles.preview}></div>
    </div>
  );
}
