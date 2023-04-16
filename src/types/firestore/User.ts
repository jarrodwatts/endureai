import { Timestamp } from "firebase/firestore";

type User = {
  uid: string;
  email: string;
  name: string;
  photoUrl: string;
  createdAt: Timestamp;
  about?: string; // Populated when user selects phase 1 of setup
  botType: string; // Populated when user selects phase 2 of setup
  stripeId?: string; // Premium users only (i think)
  stripeLink?: string; // Premium users only (i think)
};

export default User;
