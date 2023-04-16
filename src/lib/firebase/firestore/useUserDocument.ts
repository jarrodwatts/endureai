import { useEffect, useState } from "react";
import { doc, onSnapshot, DocumentSnapshot } from "firebase/firestore";
import { useAuthContext } from "@/lib/context/AuthContext";
import { firestore } from "../initFirebaseClient";
import User from "@/types/firestore/User";

const useUserData = () => {
  const [data, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    // TODO: wut?
    let unsubscribe = () => {};

    if (user) {
      const userDocRef = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(userDocRef, (doc: DocumentSnapshot) => {
        if (doc.exists()) {
          const data = doc.data() as User;
          setUserData(data);
          setLoading(false);
        } else {
          setUserData(null);
          setLoading(false);
        }
      });
    } else {
      setUserData(null);
      setLoading(false);
    }

    return unsubscribe;
  }, [user]);

  return { data, loading };
};

export default useUserData;
