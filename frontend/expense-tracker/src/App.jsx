import React, { useContext, useEffect, useState } from "react";
import UserProvider, { UserContext } from "./context/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import { Toaster } from "react-hot-toast";
import axiosInstance from "./utils/axiosInstances";
import { API_PATHS } from "./utils/apiPaths";

// 🆕 Import your route guards
import { PrivateRoute, PublicRoute } from "./routes/ProtectedRoutes";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />

          {/* Public routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signUp" element={<PublicRoute><SignUp /></PublicRoute>} />

          {/* Private routes */}
          <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
          <Route path="/expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
        </Routes>
      </Router>

      <Toaster toastOptions={{ style: { fontSize: "13px" } }} />
    </UserProvider>
  );
};

export default App;

// 🆕 Root component for default landing
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

  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
