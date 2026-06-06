import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/components-lite/Layout";

// pages
import Home from "./components/components-lite/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import PrivacyPolicy from "./components/components-lite/PrivacyPolicy";
import TermService from "./components/components-lite/TermService";
import Jobs from "./components/components-lite/Jobs";
import Browse from "./components/components-lite/Browse";
import Profile from "./components/components-lite/Profile";
import Description from "./components/components-lite/Description";

// admin pages
import Companies from "./components/admincompanies/Companies";
import CompanyCreate from "./components/admincompanies/CompanyCreate";
import CompanySetup from "./components/admincompanies/CompanySetup";
import AdminJobs from "./components/admincompanies/AdminJobs";
import PostJob from "./components/admincompanies/PostJob";
import Applicants from "./components/admincompanies/Applicants";

// protected route
import ProtectedRoute from "./components/admincompanies/Protectedroute";
import useGetAllJobs from "./hooks/useGetAllJobs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // public routes
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Forgot Password
      { path: "forgot-password", element: <ForgotPassword /> },

      // Reset Password
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "description/:id", element: <Description /> },
      { path: "profile", element: <Profile /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermService /> },
      { path: "jobs", element: <Jobs /> },
      { path: "browse", element: <Browse /> },

      // 🔒 admin routes (PROTECTED)
      {
        path: "/admin/companies",
        element: (
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/create",
        element: (
          <ProtectedRoute>
            <CompanyCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/:id",
        element: (
          <ProtectedRoute>
            <CompanySetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute>
            <AdminJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: (
          <ProtectedRoute>
            <Applicants />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  useGetAllJobs(); // ✅ ONLY ONE TIME

  return <RouterProvider router={appRouter} />;
}

export default App;
