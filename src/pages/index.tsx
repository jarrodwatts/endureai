import { useDocumentData } from "react-firebase-hooks/firestore";
import { DocumentReference, doc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/initFirebaseClient";
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
  const [value, loading, error] = useDocumentData<Test>(
    doc(firestore, "test", "1") as DocumentReference<Test>
  );

  console.log({ value, loading, error });

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
