import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/src/components/Sidebar";
import Overview from "@/app/pages/Dashboard/Components/Overview";
import Link from "next/link";
import Scramble from "@/app/pages/Dashboard/Components/Scramble";
export default function Dash() {
  const [activePage, setActivePage] = useState<string>("Vue d'ensemble");
  return (
    <div className="w-full h-screen bg-stone-100 dark:bg-black text-black flex">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1 p-6 dark:bg-gray-800 text-black dark:text-white">
        <main className="w-full">{renderContent(activePage)}</main>
      </div>
    </div>
  );
}

const renderContent = (activePage: string) => {
  switch (activePage) {
    case "Vue d'ensemble":
      return <Overview/>;
    case "Chronomètres":
      return <Scramble/>;
    case "Classement":
      return <div>Classement Panel</div>;
    case "Tournois":
      return <div>Tournois Panel</div>;
    default:
      return <p>non dispo</p>;
  }
};
