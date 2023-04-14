import { onSnapshot, doc } from "firebase/firestore";
import { firestore } from "../firebase/initFirebaseClient";
import addFirestoreDocument from "../firebase/firestore/addFirestoreDocument";
import initializeStripe from "./initializeStripe";

export const PREMIUM_PRICE_ID = "price_1MwcLJEUO8ue3hUa00tFJmYr";

export default async function createCheckoutSession(uid: string) {
  const pathToSession = `/users/${uid}/checkout_sessions`;

  // 1. Add a checkout session to Firestore
  const docRef = await addFirestoreDocument(pathToSession, {
    price: PREMIUM_PRICE_ID,
    success_url: `${window.location.origin}/talk`,
    cancel_url: `${window.location.origin}/setup`,
  });

  // 2. In the background, a sessionId is created and added to the document by the extension.
  //    We wait for the sessionId to be available before continuing.
  const unsub = onSnapshot(
    doc(firestore, `${pathToSession}/${docRef?.id}`),
    async (doc) => {
      const data = doc.data();
      const sessionId = data?.sessionId;

      if (sessionId) {
        // 3. When the sessionId is available, we can redirect to Checkout.
        // Note: the sessionId is set by the Firebase function.
        const stripe = await initializeStripe();
        stripe?.redirectToCheckout({ sessionId });
        unsub();
      }
    }
  );
}
