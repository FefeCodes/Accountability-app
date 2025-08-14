import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

function App() {
  const router = createBrowserRouter([
  {
  path: "/",
  element: <Login />
},
{
  path: "/signup",
  element: <Signup />
},
/*{
  path: "/dashboard",
  element: <Dashboard />
}*/
]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;