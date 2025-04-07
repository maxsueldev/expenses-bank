// import IUser from "../interface/IUser";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const onCreateUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const onSignIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const onSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

const onSignOut = () => {
  return auth.signOut();
};

export { onCreateUser, onSignIn, onSignInWithGoogle, onSignOut };
