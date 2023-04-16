import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/initFirebaseClient";

type AuthContextType = {
  user: User | null | undefined;
  loading: boolean;
  isPremium: boolean | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isPremium: null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, loading] = useAuthState(auth);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;

    if (user) {
      auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
        if (
          idTokenResult.claims.stripeRole &&
          idTokenResult.claims.stripeRole === "premium"
        ) {
          setIsPremium(true);
        } else {
          setIsPremium(false);
        }
      });
    }
  }, [loading, user]);

  return (
    <AuthContext.Provider value={{ user, loading, isPremium }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
