import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "../initFirebaseClient";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

/**
 * Sign in with a social provider using Firebase Auth
 */
export default async function signIn(provider: GoogleAuthProvider) {
  try {
    const result = await signInWithPopup(auth, provider);

    console.log(result);

    // If the user is new, create a document in the users collection
    if (
      result.user.metadata.creationTime === result.user.metadata.lastSignInTime
    ) {
      await setDoc(doc(firestore, "users", result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        photoUrl: result.user.photoURL,
        uid: result.user.uid,
        createdAt: serverTimestamp(),
      });
    }

    return result;
  } catch (error) {
    // TODO: Show error message to user
    console.error("Error signing in:", error);
    return null;
  }
}
