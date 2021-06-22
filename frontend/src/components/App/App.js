import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  LandingPage,
  Layout,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  ProtectedRoute,
  RegistrationPage,
  ParsPage
} from "../../components";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
          <Route path="/registration" element={<RegistrationPage />} />

          {/* App */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/review" element={<ParsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
