import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaSignOutAlt, FaTachometerAlt, FaAppStore } from "react-icons/fa";

import MenuItem from "../MenuItem";
import UserProfile from "../UserProfile";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userDetails);

  const menuItems = useMemo(
    () => [
      // {
      //   icon: <FaTachometerAlt size={20} className="mr-4" />,
      //   text: "Dashboard",
      //   path: "/dashboard",
      // },
      {
        icon: <FaAppStore size={20} className="mr-4" />,
        text: "Project",
        path: "/project",
      },
    ],
    []
  );

  const findSelectedItem = useCallback(() => {
    return (
      menuItems.find((item) => location.pathname.startsWith(item.path))?.text ||
      "Dashboard"
    );
  }, [location.pathname, menuItems]);

  const [selectedItem, setSelectedItem] = useState(findSelectedItem());

  useEffect(() => {
    setSelectedItem(findSelectedItem());
  }, [findSelectedItem]);

  const handleLogout = async () => {
    await localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleMenuItemClick = (path) => {
    const newSelectedItem = findSelectedItem();
    setSelectedItem(newSelectedItem);
    navigate(path);
  };

  return (
    <div className="fixed top-0 left-0 w-[250px] h-screen bg-[#18171B] z-30 shadow-md flex flex-col justify-between">
      <div>
        <div className="text-lg font-bold p-8 text-white">
          Kanban <span className="text-[#00B796]">App</span>
        </div>
        <nav>
          <ul className="flex flex-col pl-4 pr-4">
            {menuItems.map(({ icon, text, path }) => (
              <MenuItem
                key={text}
                icon={icon}
                text={text}
                isSelected={selectedItem === text}
                onClick={() => handleMenuItemClick(path)}
              />
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <UserProfile full_name={userData?.full_name} />
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full text-white bg-customGreen hover:bg-white hover:text-customGreen focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-md cursor-pointer transition duration-150 ease-in-out px-2 py-1"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
