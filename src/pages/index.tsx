import styles from "@/styles/Home.module.css";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { DocumentReference, doc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/initFirebaseClient";

interface Test {
  hey: string;
}

export default function Home() {
  const [value, loading, error] = useDocumentData<Test>(
    doc(firestore, "test", "1") as DocumentReference<Test>
  );

  console.log({ value, loading, error });

  return (
    <>
      <h1>hello</h1>
      <p>
        {!!error && <code>error</code>}
        {!!loading && <code>loading</code>}
        {!!value && <code>value</code>}
      </p>
    </>
  );
}
