import React from "react";
const AuthLayout = ({ title, description, children }) => (
  <div className="grid grid-cols-7 h-screen">
    <div className="col-span-7 sm:col-span-4 flex justify-center items-center order-1 sm:order-0 h-screen hidden sm:px-5 xl:px-0 sm:flex dark:bg-customGreen">
      <div className="flex justify-center items-center flex-col max-w-[690px]">
        <h1 className="text-2xl font-extrabold mb-5 dark:text-white">
          Kanban App
        </h1>
        <p className="text-lg	 mt-9 text-center dark:text-white">
          {description ||
            "A Kanban board is a visual tool that helps to manage work at an organizational or personal level. It uses cards to represent work items and columns to represent each stage of a process. Cards are moved from left to right to show progress and to help coordinate teams performing the work."}
        </p>
      </div>
    </div>
    {children}
  </div>
);

export default AuthLayout;
