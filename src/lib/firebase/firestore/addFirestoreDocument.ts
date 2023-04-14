import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../initFirebaseClient";

const addFirestoreDocument = async (
  collectionPath: string,
  data: Record<string, any>
) => {
  try {
    const collectionRef = collection(firestore, collectionPath);
    const reuslt = await addDoc(collectionRef, data);

    return reuslt;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export default addFirestoreDocument;
