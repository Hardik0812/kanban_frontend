import React from "react";

const MenuItem = ({ icon, text, isSelected, onClick }) => {
  const itemClass = `text-sm flex items-center text-white py-2 px-4 mb-2 rounded-md cursor-pointer transition duration-150 ease-in-out ${
    isSelected
      ? "bg-customGreen text-white shadow-lg"
      : "text-gray-700 hover:bg-white hover:text-customGreen hover:shadow"
  }`;

  return (
    <li className={itemClass} onClick={onClick}>
      {icon}
      {text}
    </li>
  );
};

export default MenuItem;
