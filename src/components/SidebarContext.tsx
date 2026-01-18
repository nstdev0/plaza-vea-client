"use client";

import { createContext, useContext, useState } from "react";

interface SideBarContextProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SideBarContext = createContext<SideBarContextProps | undefined>(
  undefined,
);

export default function SideBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const value = {
    sidebarOpen,
    toggleSidebar,
  };

  return <SideBarContext value={value}>{children}</SideBarContext>;
}

export function useSidebar() {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SideBarProvider");
  }

  return context;
}
