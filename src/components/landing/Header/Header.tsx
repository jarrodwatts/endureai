import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
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

        <ul className={styles.items}>
          <li className={styles.item}>
            <a href="#features" className={styles.itemLink}>
              Features
            </a>
          </li>
          <li className={styles.item}>
            <a href="#pricing" className={styles.itemLink}>
              Pricing
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
