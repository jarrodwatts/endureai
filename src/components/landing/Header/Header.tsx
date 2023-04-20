import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  const { loading, user, isPremium } = useAuthContext();
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoContainer}>
          <Image
            className={styles.logoImg}
            src="/logo.png"
            alt="Endure"
            width={32}
            height={32}
          />
          Endure
        </Link>

        <div className={styles.right}>
          {user && !loading && (
            <Link href="/profile">
              <AccountCircleIcon
                className={styles.profileIcon}
                color="primary"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
