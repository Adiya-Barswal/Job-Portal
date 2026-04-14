import React from "react";
import Navbar from "./components/components-lite/Navbar";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./components/components-lite/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import PrivacyPolicy from "./components/components-lite/PrivacyPolicy";
import TermService from "./components/components-lite/TermService";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<Home /> 
  },

  {
    path: "/login",
    element:<Login />
  },

  {
    path: "/register",
    element:<Register />
  },
  {
   path:"/privacy-policy" ,
    element:<PrivacyPolicy />,
    

  },
  {
  path: "/terms",
  element: <TermService />,
},
]);

function App() {
  return (
    <div>
  <RouterProvider router={appRouter} />
  </div>
  )
}

export default App;