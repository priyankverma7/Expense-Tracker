import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu"; // ✅ import logout icon

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handles menu clicks
  const handleClick = (path) => {
    navigate(path);
  };

  // Handles logout
  const handleLogout = () => {
    clearUser(); // Clear user from context
    localStorage.removeItem("token"); // Clear token from localStorage
    toast.success("Logged out successfully ✅");
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-300 rounded-full text-xl font-bold text-white">
            {user?.fullName?.charAt(0) || "U"}
          </div>
        )}
        <h5 className="text-gray-950 font-medium leading-6 mt-2">
          {user?.fullName || "Guest"}
        </h5>
      </div>

      {/* Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label
              ? "text-white bg-primary"
              : "text-gray-700"
          } py-3 px-6 rounded-lg mb-3 hover:bg-primary/10 transition`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

      {/* Logout Button at Bottom */}
      <button
        className="w-full flex items-center gap-4 text-[15px] text-gray-700 py-3 px-6 rounded-lg hover:bg-primary/10 transition"
        onClick={handleLogout}
      >
        <LuLogOut className="text-xl" /> {/* ✅ logout icon */}
        Logout
      </button>
    </div>
  );
};

export default SideMenu;
