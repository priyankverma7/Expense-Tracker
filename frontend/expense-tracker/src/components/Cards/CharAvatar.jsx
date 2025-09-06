import React from "react";

const CharAvatar = ({ fullName = "", width = "w-12", height = "h-12", style = "text-base" }) => {
  // Function to get initials
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div
      className={`${width} ${height} ${style} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
    >
      {getInitials(fullName)}
    </div>
  );
};

export default CharAvatar;
