import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  handleFirebaseOperation,
  showSuccessToast,
} from "../utils/errorHandler";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export const getUserFromFirestore = async (uid) => {
  const result = await handleFirebaseOperation(async () => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("User not found");
    }
  }, "Failed to fetch user data");

  if (!result.success) {
    throw result.error;
  }

  return result.data;
};

export const getUserFromFirestoreSilent = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User not found");
  }
};

export const saveUserToFirestore = async (user, method, fullName = null) => {
  const result = await handleFirebaseOperation(async () => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      fullName: fullName || user.displayName || "",
      email: user.email,
      profilePicture: user.photoURL || null,
      authProvider: method,
      onboardingStep: 1,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, "Failed to save user data");

  if (!result.success) {
    throw result.error;
  }
};

export const signInWithGoogle = async () => {
  const result = await handleFirebaseOperation(async () => {
    provider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, provider);
    let userData;

    try {
      userData = await getUserFromFirestoreSilent(result.user.uid);
    } catch {
      // User doesn't exist, create new user
      try {
        await saveUserToFirestore(result.user, "google");
        userData = await getUserFromFirestoreSilent(result.user.uid);
      } catch (saveError) {
        console.error("Failed to save user data:", saveError);
        throw new Error("Failed to create your account. Please try again.");
      }
    }

    showSuccessToast("Successfully signed in with Google!");
    return userData;
  }, "Failed to sign in with Google");

  if (!result.success) {
    throw result.error;
  }

  return result.data;
};

export const signInWithEmail = async (email, password) => {
  const result = await handleFirebaseOperation(async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userData = await getUserFromFirestore(userCredential.user.uid);
    showSuccessToast("Successfully signed in!");
    return userData;
  }, "Failed to sign in");

  if (!result.success) {
    throw result.error;
  }

  return result.data;
};

export const signUpWithEmail = async (fullName, email, password) => {
  const result = await handleFirebaseOperation(async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: fullName });
    await saveUserToFirestore(userCredential.user, "email", fullName);
    const userData = await getUserFromFirestore(userCredential.user.uid);
    showSuccessToast("Account created successfully!");
    return userData;
  }, "Failed to create account");

  if (!result.success) {
    throw result.error;
  }

  return result.data;
};

export const updateOnboardingProgress = async (uid, step, data = {}) => {
  const result = await handleFirebaseOperation(async () => {
    const userRef = doc(db, "users", uid);
    const updateData = {
      onboardingStep: step,
      updatedAt: new Date().toISOString(),
      ...data,
    };

    if (step === 5) {
      updateData.onboardingCompleted = true;
    }

    await setDoc(userRef, updateData, { merge: true });
  }, "Failed to update onboarding progress");

  if (!result.success) {
    throw result.error;
  }
};

export const updateUserProfile = async (uid, data) => {
  const result = await handleFirebaseOperation(async () => {
    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  }, "Failed to update profile");

  if (!result.success) {
    throw result.error;
  }
};

export const sendPasswordReset = async (email) => {
  const result = await handleFirebaseOperation(async () => {
    const actionCodeSettings = {
      url: `${window.location.origin}/reset-password`,
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    showSuccessToast("Password reset email sent! Check your inbox.");
  }, "Failed to send password reset email");

  if (!result.success) {
    throw result.error;
  }
};

export const signOutUser = async () => {
  const result = await handleFirebaseOperation(async () => {
    await signOut(auth);
    showSuccessToast("Successfully signed out!");
  }, "Failed to sign out");

  if (!result.success) {
    throw result.error;
  }
};
