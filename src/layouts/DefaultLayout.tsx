import React, { ReactNode } from "react";
import Header from "../components/Header";

const DefaultLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="relative w-screen min-h-screen h-fit p-4 border bg-[#F3DFDF]">
      <div className="w-full h-full rounded-lg">
        <Header/>
        <div className="w-full h-full px-4 py-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
