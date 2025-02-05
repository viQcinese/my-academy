import React from "react";
import { NavLink } from "react-router-dom";

type LayoutProps = {
  children?: React.ReactNode;
};

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div>
      <div className="p-4 bg-teal-700 h-nav">
        <nav className="flex max-w-site m-auto justify-between ">
          <div>o</div>
          <div className="flex  gap-4">
            <NavLink className="text-teal-50 font-bold" to="/students" end>
              Students
            </NavLink>
            <NavLink className="text-teal-50 font-bold" to="/classes" end>
              Classes
            </NavLink>
          </div>
        </nav>
      </div>
      <main className="max-w-site h-content flex flex-col m-auto pt-8 pb-12">
        {children}
      </main>
    </div>
  );
}
