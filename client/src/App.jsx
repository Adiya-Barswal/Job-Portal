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
]);

function App() {
  return (
    <div>
  <RouterProvider router={appRouter} />
  </div>
  )
}

export default App;