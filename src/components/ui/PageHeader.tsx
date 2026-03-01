"use client";

import { ThemeToggle } from "../theme-toggle";
import { Button } from "./button";
import { Menu, X } from "lucide-react";
import { useSidebar } from "../SidebarContext";
import { CartSheet } from "../cart/CartSheet";
import Link from "next/link";

export default function PageHeader() {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <header className="flex-none border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-primary sm:text-2xl">
          Catálogo
        </Link>
        <div className="flex items-center gap-2 lg:gap-4">
          <ThemeToggle />
          <CartSheet />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSidebar()}
            className="lg:hidden"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
