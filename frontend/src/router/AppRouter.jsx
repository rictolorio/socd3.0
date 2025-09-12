// src/router/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/notfound/NotFound";

// Layouts
import AuthLayout from "../components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function AppRouter() {
  const { user } = useAuth() || {};

  return (
    <Router>
      <Routes>
        {/* Auth layout handles /, /login, /register */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<div />} /> {/* placeholder, layout shows carousel */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected dashboard */}
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
