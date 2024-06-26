import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaSignOutAlt, FaAppStore } from "react-icons/fa";

import MenuItem from "../MenuItem";
import UserProfile from "../UserProfile";
import { logoutUser } from "../../redux/slices/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userDetails);
  const full_name = userData && userData.full_name ? userData.full_name : localStorage.getItem("full_name");

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
    await dispatch(logoutUser());
    navigate("/");
  };

  const handleMenuItemClick = (path) => {
    const newSelectedItem = findSelectedItem();
    setSelectedItem(newSelectedItem);
    navigate(path);
  };

  return (
    <div className="fixed top-0 left-0 w-[250px] h-screen bg-customGreen shadow-md flex flex-col justify-between">
      <div>
        <div className="text-lg font-bold p-8 text-white">Kanban App</div>
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
        <UserProfile full_name={full_name} />
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full text-customGreen bg-white hover:bg-white hover:text-customGreen focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-md cursor-pointer transition duration-150 ease-in-out px-2 py-1"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
