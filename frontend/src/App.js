import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./core/layouts/AppLayout";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import HomePage from "./pages/HomePage";
import ResetPage from "./pages/ResetPage";
import ResetRequestPage from "./pages/ResetRequestPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import UserEditPage from "./pages/UserEditPage";
import UserPage from "./pages/UserPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="" element={<HomePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/edit" element={<UserEditPage />} />
        <Route path="/password" element={<ChangePasswordPage />} />
      </Route>
      <Route path="/register" element={<SignupPage />} />
      <Route path="/login" element={<SigninPage />} />
      <Route path="/reset-request" element={<ResetRequestPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function RequireAuth({ children }) {
  let auth = JSON.parse(localStorage.getItem("user"));
  let location = useLocation();

  if (!auth?.profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
