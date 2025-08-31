import { toast } from "react-toastify";

// Firebase error code to user-friendly message mapping
const errorMessages = {
  // Authentication errors
  "auth/user-not-found": "No account found with this email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password should be at least 6 characters long.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  "auth/operation-not-allowed": "This sign-in method is not enabled.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  "auth/popup-closed-by-user": "Sign-in was cancelled.",
  "auth/cancelled-popup-request": "Sign-in was cancelled.",
  "auth/popup-blocked":
    "Sign-in popup was blocked. Please allow popups for this site.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email but different sign-in credentials.",
  "auth/requires-recent-login": "Please sign in again to complete this action.",
  "auth/invalid-credential":
    "Invalid credentials. Please check your email and password.",
  "auth/invalid-verification-code": "Invalid verification code.",
  "auth/invalid-verification-id": "Invalid verification ID.",
  "auth/missing-verification-code": "Verification code is required.",
  "auth/missing-verification-id": "Verification ID is required.",
  "auth/quota-exceeded": "Service quota exceeded. Please try again later.",
  "auth/credential-already-in-use":
    "This credential is already associated with another account.",
  "auth/email-change-needs-verification":
    "Please verify your new email address.",
  "auth/expired-action-code": "The action code has expired.",
  "auth/invalid-action-code": "Invalid action code.",
  "auth/missing-action-code": "Action code is required.",
  "auth/unauthorized-continue-uri": "Unauthorized continue URI.",
  "auth/user-token-expired": "Your session has expired. Please sign in again.",
  "auth/user-token-revoked":
    "Your session has been revoked. Please sign in again.",

  // Firestore errors
  "permission-denied": "You don't have permission to perform this action.",
  unavailable: "Service is currently unavailable. Please try again later.",
  "deadline-exceeded": "Request timed out. Please try again.",
  "resource-exhausted": "Service quota exceeded. Please try again later.",
  "failed-precondition":
    "Operation failed due to a precondition not being met.",
  aborted: "Operation was aborted.",
  "out-of-range": "Operation is out of range.",
  unimplemented: "Operation is not implemented.",
  internal: "An internal error occurred. Please try again.",
  "data-loss": "Data loss occurred.",
  unauthenticated: "You must be signed in to perform this action.",

  // Generic errors
  unknown: "An unexpected error occurred. Please try again.",
  "network-error": "Network error. Please check your connection.",
  timeout: "Request timed out. Please try again.",
};

// Get user-friendly error message
export const getErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred.";

  // Handle Firebase Auth errors
  if (error.code && errorMessages[error.code]) {
    return errorMessages[error.code];
  }

  // Handle Firestore errors
  if (error.code && errorMessages[error.code]) {
    return errorMessages[error.code];
  }

  // Handle network errors
  if (error.message && error.message.includes("network")) {
    return errorMessages["network-error"];
  }

  // Handle timeout errors
  if (error.message && error.message.includes("timeout")) {
    return errorMessages["timeout"];
  }

  // Return custom message if provided
  if (error.message) {
    return error.message;
  }

  // Default fallback
  return errorMessages["unknown"];
};

// Show error toast
export const showErrorToast = (error, customMessage = null) => {
  const message = customMessage || getErrorMessage(error);
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Show success toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Show info toast
export const showInfoToast = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Show warning toast
export const showWarningToast = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Handle Firebase operation with error handling
export const handleFirebaseOperation = async (
  operation,
  errorMessage = null
) => {
  try {
    const result = await operation();
    return { success: true, data: result };
  } catch (error) {
    console.error("Firebase operation error:", error);
    showErrorToast(error, errorMessage);
    return { success: false, error };
  }
};
