import React, { useEffect, useRef } from "react";
import { SIDE_BAR_ITEMS, HAMBURGER_ICON } from "../../../constants";
import { SideBarProps } from "./types/SidebarProps";

import { useNavigate } from "react-router-dom";

function Sidebar({
  sideBarSelection,
  sideBarVisibility,
  viewProfile,
  setViewProfile,
  setSideBarSelection,
  setSideBarVisibility,
}: SideBarProps) {
  let navigate = useNavigate();
  const toggleSidebar = () => {
    setSideBarVisibility(!sideBarVisibility);
  };

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSideBarVisibility(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setSideBarVisibility]);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleSidebar();
  };

  const handleSidebarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleMenuItemClick = (route: string) => {
    setSideBarVisibility(false);
    setSideBarSelection(route);
    if (route === "Home") {
      navigate("home");
    }

    if (route === "Communities") {
      navigate("communities");
    }

    if (route === "Events") {
      navigate("events");
    }
  };

  const handleViewProfile = () => {
    setViewProfile(!viewProfile);
  };

  return (
    <div className="bg-slate-50">
      <button
        onClick={handleButtonClick}
        className="p-4 text-gray-500 md:hidden focus:ring-gray-200  "
      >
        <svg
          className="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={HAMBURGER_ICON}></path>
        </svg>
      </button>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-[280px] h-screen transition-transform -translate-x-full ${
          sideBarVisibility ? "translate-x-0" : "-translate-x-full "
        } md:translate-x-0 `}
        onClick={handleSidebarClick}
      >
        {/* Sidebar content */}
        <div className="h-full px-3 py-4 overflow-y-auto bg-white pt-[95px] border border-r-gray ">
          <ul className="space-y-2 ">
            {SIDE_BAR_ITEMS.map((item, index) => (
              <li className="text-sm pb-1" key={index}>
                <div
                  onClick={() => handleMenuItemClick(item.label)}
                  className={`flex items-center p-2 rounded-lg hover:bg-slate-50  font-light  ${
                    sideBarSelection === item.label ? "bg-slate-50 border" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-5  ${
                      sideBarSelection === item.label ? "text-regal-blue" : ""
                    }`}
                  >
                    <path d={item.icon} />
                  </svg>

                  <span
                    className={`ml-3 ${
                      sideBarSelection === item.label
                        ? "text-regal-blue"
                        : "text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleViewProfile}
            className="fixed rounded-lg bottom-0 inset-x-3 p-4 border mb-10 text-black"
          >
            Phillip
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
