import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <section id="tweets" className={styles.section}>
        <div className={styles.content}>
          <div className={styles.description}>
            <h2 className={styles.title}>Get Started with Endure</h2>
            <p className={styles.desc}>
              Chat to a personalized AI-powered mental health assistant in
              minutes.
            </p>
          </div>

          <Link href="/signup" className={styles.button}>
            <span>Get Started for Free</span>
          </Link>
        </div>

        <footer className={styles.footer}>
          <div className={styles.inner}>
            <Link href="/" className={styles.logo}>
              Endure
            </Link>
            <ul className={styles.breadcrumbs}>
              <li>
                <a href="https://diagram.com/privacy">Privacy</a>
              </li>
              <li>
                <a href="https://diagram.com/terms">Terms</a>
              </li>
            </ul>
          </div>
        </footer>
      </section>
    </>
  );
}
