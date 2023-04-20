import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseApp } from "../firebase/initFirebaseClient";

// Get a reference to your Cloud Function
const functions = getFunctions(firebaseApp, "us-central1");

const createPortalLinkFn = httpsCallable(
  functions,
  "ext-firestore-stripe-payments-createPortalLink"
);

export default async function createPortalUrl() {
  try {
    const result = await createPortalLinkFn({
      returnUrl: `${window.location.origin}/profile`,
    });
    return result.data;
  } catch (error) {
    console.error("Error in createPortalUrl", error);
    return { error: "Error in createPortalUrl" };
  }
}
