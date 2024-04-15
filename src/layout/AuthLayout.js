import React from "react";
const AuthLayout = ({ title, description, children }) => (
  <div className="grid grid-cols-7 h-screen">
    <div className="col-span-7 sm:col-span-4 flex justify-center items-center order-1 sm:order-0 h-screen hidden sm:px-5 xl:px-0 sm:flex dark:bg-[#18171B]">
      <div className="flex justify-center items-center flex-col max-w-[690px]">
        <h1 className="text-2xl font-extrabold mb-5 dark:text-white">
          Kanban App
        </h1>
        <h2 className="text-xl font-semibold mt-9 dark:text-white">
          {title || "Harness Data For Smarter Decisions."}
        </h2>
        <p className="text-lg	 mt-9 text-center dark:text-white">
          {description ||
            "As AI creators, we must embed our highest ethical standards into these technologies, ensuring they serve humanity responsibly and protect individual rights and dignity."}
        </p>
      </div>
    </div>
    {children}
  </div>
);

export default AuthLayout;
