import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/src/components/Sidebar";

export default function Dash() {
  const { data: session, status } = useSession();
  const [activePage, setActivePage] = useState<string>("Vue d'ensemble");

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (!session) {
    return <p>Utilisateur non connecté</p>;
  }

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
      return <div>Vue d'ensemble Panel</div>;
    case "Chronomètres":
      return <div>Chronomètres Panel</div>;
    case "Classement":
      return <div>Classement Panel</div>;
    case "Tournois":
      return <div>Tournois Panel</div>;
    default:
      return <p>non dispo</p>;
  }
};
