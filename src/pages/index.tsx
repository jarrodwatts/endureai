import styles from "@/styles/Home.module.css";
import Header from "@/components/landing/Header/Header";
import Content from "@/components/landing/Content/Content";
import Diagram from "@/components/landing/Diagram/Diagram";
import Pricing from "@/components/landing/Pricing/Pricing";
import Footer from "@/components/landing/Footer/Footer";

interface Test {
  hey: string;
}

export default function Home() {
  return (
    <div className={styles.body}>
      <section id="hero" className={styles.hero}>
        <Header />
        <Content />
      </section>

      <Diagram />
      <Pricing />
      <Footer />
    </div>
  );
}
