import Link from "next/link";
import styles from "./Content.module.css";
import { useAuthContext } from "@/lib/context/AuthContext";
import Image from "next/image";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/lib/mui/theme";

export default function Content() {
  const { user, loading } = useAuthContext();

  const mobileScreen = useMediaQuery(theme.breakpoints.only("xs")); // xs only
  const smScreen = useMediaQuery(theme.breakpoints.only("sm")); // sm only

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

      {!mobileScreen && (
        <Image
          src={"/fiucl.png"}
          alt="Endure AI Hero Image"
          // maintain 820x480 aspect ratio
          width={1640 / 2}
          height={960 / 2}
          className={styles.preview}
          quality={100}
        />
      )}
    </div>
  );
}
