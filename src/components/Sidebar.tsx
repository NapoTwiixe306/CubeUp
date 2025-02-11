"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  LayoutDashboard,
  LucideChevronsUpDown,
  Clock,
  Network,
  ChartNoAxesColumn
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Sidebar = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode");
    setIsDarkMode(darkModePreference === "true");
    if (darkModePreference === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark");
  };

  const role = session?.user?.role;
  const handleSetActivePage = (page: string) => setActivePage(page);

  return (
    <div
      className={`relative left-0 top-0 h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      } hover:w-64 shadow-lg`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="mb-8 flex items-center justify-center">
            <span className={`text-2xl font-bold ${isExpanded ? "block" : "hidden"}`}>
              cubeup
            </span>
          </div>
          <nav>
            <SidebarItem icon={<Home size={24} />} text="Accueil" onClick={() => (window.location.href = "/")} expanded={isExpanded} />
            <SidebarItem icon={<LayoutDashboard size={24} />} text="Vue d'ensemble" onClick={() => handleSetActivePage("Vue d'ensemble")} expanded={isExpanded} />
            <SidebarItem icon={<Clock size={24} />} text="Chronomètres" onClick={() => handleSetActivePage("Chronomètres")} expanded={isExpanded} />
            {/*<SidebarItem icon={<ChartNoAxesColumn size={24} />} text="Classement" onClick={() => handleSetActivePage("Classement")} expanded={isExpanded} />
            <SidebarItem icon={<Network size={24} />} text="Tournois" onClick={() => handleSetActivePage("Tournois")} expanded={isExpanded} />*/}
          </nav>
        </div>

        <div className="relative">
          <button
            className="flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <p className={`ml-2 ${isExpanded ? "block" : "hidden"}`}>
              {session?.user?.email ?? "Anonyme"}
            </p>

            <LucideChevronsUpDown />
          </button>

          {isMenuOpen && (
              <div
                  className={`absolute bottom-full mb-2 w-full bg-white dark:bg-gray-700 shadow-md rounded-md p-2 ${isExpanded ? "block" : "hidden"}`}>
                <button
                    className="w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                    onClick={() => handleSetActivePage("Profil")}
                >
                  Paramètres
                </button>
                <button
                    className="w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                    onClick={() => handleSetActivePage("Profil")}
                >
                  Profil
                </button>
                {session && (
                    <button
                      className="w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                      onClick={() => signOut()}
                    >
                      Déconnexion
                    </button>
                  )}
                <button
                    onClick={toggleDarkMode}
                    className="w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                >
                <span className={`${isExpanded ? "block" : "hidden"}`}>
                  {isDarkMode ? "Mode clair" : "Mode sombre"}
                </span>
                </button>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  expanded: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({icon, text, onClick, expanded }) => {
  return (
    <button onClick={onClick} className="mb-4 flex items-center rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 w-full">
      {icon}
      <span className={`ml-2 ${expanded ? "block" : "hidden"}`}>{text}</span>
    </button>
  );
};

export default Sidebar;
