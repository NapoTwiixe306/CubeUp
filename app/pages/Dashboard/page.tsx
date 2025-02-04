"use client";

import { SessionProvider } from "next-auth/react";
import Dash from "./Dashboard";
const Dashboard = () => {
  return (
    <SessionProvider>
        <Dash/>
    </SessionProvider>
  );
};

export default Dashboard;