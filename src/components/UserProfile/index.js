import React from "react";
import { FaUser } from "react-icons/fa";

const UserProfile = ({ full_name }) => {
  return (
    <div className="mb-4 text-gray-800 flex items-center justify-between">
      <div className="flex items-center">
        <FaUser size={15} className="mr-2 text-white" />
        <span className="text-white text-sm">
          {full_name || "Unknown User"}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
