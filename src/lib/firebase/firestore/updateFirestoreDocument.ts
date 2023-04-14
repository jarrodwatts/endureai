import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../initFirebaseClient";

const updateFirestoreDocument = async (
  docPath: string,
  fieldsToUpdate: { [key: string]: any }
) => {
  const documentRef = doc(firestore, docPath);

  try {
    await updateDoc(documentRef, fieldsToUpdate);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export default updateFirestoreDocument;
