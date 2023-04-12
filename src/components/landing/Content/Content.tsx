import Link from "next/link";
import styles from "./Content.module.css";

export default function Content() {
  return (
    <div className={styles.content}>
      <div className={styles.description}>
        <h2>Your 24/7 Partner for Mental Health</h2>
        <p className={styles.desc}>
          Chat to a personalized AI-powered mental health assistant in minutes.
        </p>
      </div>

      <Link href="/signup" className={styles.button}>
        <span>Get Started (Free)</span>
      </Link>

      <div className={styles.preview}></div>
    </div>
  );
}
