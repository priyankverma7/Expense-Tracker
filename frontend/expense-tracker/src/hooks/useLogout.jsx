import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const useLogout = () => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    // Clear user context
    clearUser();

    // Clear local storage
    localStorage.removeItem("token");

    // Redirect to login
    navigate("/login");
  };

  return logout;
};

export default useLogout;
