import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  Unsubscribe,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../initFirebaseClient";
import { useAuthContext } from "@/lib/context/AuthContext";
import Message from "@/types/firestore/Message";

const useMessages = () => {
  const { user: currentUser, loading: userLoading } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userLoading) return;

    if (currentUser) {
      const q = query(
        collection(firestore, "messages"),
        where("uid", "==", currentUser.uid),
        orderBy("createdAt", "asc")
      );

      const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(docs as Message[]);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser, userLoading]);

  return { messages, loading };
};

export default useMessages;
