import React, { useContext, useEffect, useState } from "react";
import UserProvider, { UserContext } from "./context/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

import { Toaster } from "react-hot-toast";
import axiosInstance from "./utils/axiosInstances";
import { API_PATHS } from "./utils/apiPaths";

// ------------------------ Protected Route ------------------------
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// ------------------------ Root Component ------------------------
const Root = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        updateUser(res.data);
      } catch {
        clearUser();
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [updateUser, clearUser]);

  if (loading) return <p>Loading...</p>;

  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

// ------------------------ App Component ------------------------
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Root auto-redirect based on login */}
          <Route path="/" element={<Root />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <ProtectedRoute>
                <Expense />
              </ProtectedRoute>
            }
          />

          {/* Catch-all → redirect to Root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster toastOptions={{ style: { fontSize: "13px" } }} />
    </UserProvider>
  );
};

export default App;
