import React from "react";
import Sidebar from "../components/Sidebar";

const CommonLayout = ({ children }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 h-screen ml-[250px] p-4 bg-white">
        {children}
      </main>
    </div>
  );
};

export default CommonLayout;
