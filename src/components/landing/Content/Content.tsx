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
  const decentScreen = useMediaQuery(theme.breakpoints.up("md")); // md only

  console.log({ mobileScreen, smScreen, decentScreen });

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

      <div className={styles.preview}>
        <Image
          src={"/test2.png"}
          alt="Endure AI Hero Image"
          // maintain 820x480 aspect ratio
          width={mobileScreen ? 500 : smScreen ? 640 : decentScreen ? 820 : 820}
          height={
            mobileScreen ? 300 : smScreen ? 480 : decentScreen ? 480 : 480
          }
          quality={100}
        />
      </div>
      <Typography variant="body2" className={styles.subcaption}>
        A real conversation with Endure AI.
      </Typography>
    </div>
  );
}
