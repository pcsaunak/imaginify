import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    //  mobile nav bar component
    <main className="root">
      {/* Sidebar component */}
      <Sidebar />
      <MobileNav />
      <div className="container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
