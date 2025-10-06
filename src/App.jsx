// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Components/auth/SignUp";
import Login from "./Components/auth/Login";

// Protected Route Component - Only allows authenticated users
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component - Redirects to dashboard if already logged in
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - Accessible to everyone */}
        <Route path="/" element={<Landing />} />

        {/* Public Routes - Only accessible when NOT logged in */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes - Only accessible when logged in */}
        <Route
          path="/dashboard"
          element={
            // <PublicRoute>
            //   <Dashboard />
            // </PublicRoute>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all - Redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
