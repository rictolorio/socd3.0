// src/router/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Pages / components
import ImageCarousel from "../components/ImageCarousel";            // <-- make sure this file exists and exports default ImageCarousel
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/notfound/NotFound";

// Layouts
import AuthLayout from "../components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function AppRouter() {
  // defensive: avoid destructuring a null return from useAuth
  const { user } = useAuth() || {};

  return (
    <Router>
      <Routes>
        {/* Auth layout: home (carousel) + login/register */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<ImageCarousel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
