import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/components-lite/Layout";

// pages
import Home from "./components/components-lite/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import PrivacyPolicy from "./components/components-lite/PrivacyPolicy";
import TermService from "./components/components-lite/TermService";
import Jobs from "./components/components-lite/Jobs";
import Browse from "./components/components-lite/Browse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // 👈 parent
    children: [
      {
        index: true,       // 🔥 HOME FIX (MOST IMPORTANT)
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms",
        element: <TermService />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;