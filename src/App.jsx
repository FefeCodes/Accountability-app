import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LandingPage from "./components/pages/LandingPage.jsx";
import Login from "./app/Login.jsx";
import Signup from "./app/Signup.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import OnboardingSecond from "./components/onboarding/OnboardingSecond.jsx";
import Onboarding from "./components/onboarding/Onboarding.jsx";
import OnboardingThird from "./components/onboarding/OnboardingThird.jsx";
import OnboardingFourth from "./components/onboarding/OnboardingFourth.jsx";
import OnboardingFinal from "./components/onboarding/OnboardingFinal.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Partners from "./components/pages/Partners.jsx";
import ConnectProfile from "./components/pages/profile/ConnectProfile.jsx";
import ConnectedProfile from "./components/pages/profile/ConnectedProfile.jsx";
import SeeMore from "./components/pages/profile/SeeMore.jsx";
import ForgotPassword from "./components/ForgotPasword.jsx";
import UserProfile from "./components/pages/UserProfile.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    {
      path: "/login",
      element: (
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <ProtectedRoute requireAuth={false}>
          <Signup />
        </ProtectedRoute>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <ProtectedRoute requireAuth={false}>
          <ForgotPassword />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <ProtectedRoute requireAuth={false}>
          <ResetPassword />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/partners",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <Partners />
        </ProtectedRoute>
      ),
    },
    {
      path: "/connect-profile/:partnerId",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <ConnectProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/connected-profile/:partnerId",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <ConnectedProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/see-more/",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <SeeMore />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <UserProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/onboarding-step-1",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <Onboarding />
        </ProtectedRoute>
      ),
    },
    {
      path: "/onboarding-step-2",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <OnboardingSecond />
        </ProtectedRoute>
      ),
    },
    {
      path: "/onboarding-step-3",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <OnboardingThird />
        </ProtectedRoute>
      ),
    },
    {
      path: "/onboarding-step-4",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <OnboardingFourth />
        </ProtectedRoute>
      ),
    },
    {
      path: "/onboarding-step-final",
      element: (
        <ProtectedRoute requireOnboarding={true}>
          <OnboardingFinal />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
