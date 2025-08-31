import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Onboarding from "./Onboarding.jsx";
import OnboardingSecond from "./OnboardingSecond.jsx";
import OnboardingFourth from "./OnboardingFourth.jsx";
import OnboardingThird from "./OnboardingThird.jsx";
import OnboardingFinal from "./OnboardingFinal.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/onboarding-step-1",
      element: <Onboarding />,
    },
    {
      path: "/onboarding-step-2",
      element: <OnboardingSecond />,
    },
    {
      path: "/onboarding-step-3",
      element: <OnboardingThird />,
    },
    {
      path: "/onboarding-step-4",
      element: <OnboardingFourth />,
    },
    {
      path: "/onboarding-step-final",
      element: <OnboardingFinal />,
    },
    /*{
  path: "/dashboard",
  element: <Dashboard />
}*/
  ]);
  return <RouterProvider router={router} />;
}

export default App;
