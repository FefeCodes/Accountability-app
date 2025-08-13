import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBDsM_FULMMAwrswxt-lQdutv9YFk9B7qI",
  authDomain: "accountability-app-8ef2e.firebaseapp.com",
  projectId: "accountability-app-8ef2e",
  storageBucket: "accountability-app-8ef2e.firebasestorage.app",
  messagingSenderId: "779841041223",
  appId: "1:779841041223:web:5b488fc7cd5a60c8db5262",
  measurementId: "G-V97633C2CY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    let userData;
    try {
      userData = await getUserFromFirestore(result.user.uid);
    } catch {
      await saveUserToFirestore(result.user, "google");
      userData = await getUserFromFirestore(result.user.uid);
    }
    return userData;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUserFromFirestore(userCredential.user.uid);
    return userData;
  } catch (error) {
    console.error("Email/Password Sign-In Error:", error);
    throw error;
  }
};

export const signUpWithEmail = async (fullName, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: fullName });
  await saveUserToFirestore(userCredential.user, "email", fullName);
  return getUserFromFirestore (userCredential.user.uid);
};

export const saveUserToFirestore = async (user, method, fullName = null) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    fullName: fullName || user.displayName || "",
    email: user.email,
    authProvider: method,
    createdAt: new Date().toISOString()
  });
};

export const getUserFromFirestore = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User not found in Firestore");
  }
};