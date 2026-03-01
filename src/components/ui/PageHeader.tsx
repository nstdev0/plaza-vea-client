"use client";

import { ThemeToggle } from "../theme-toggle";
import { Button } from "./button";
import { Menu, X } from "lucide-react";
import { useSidebar } from "../SidebarContext";
import { CartSheet } from "../cart/CartSheet";
import Link from "next/link";
import { SearchBar } from "@/features/products/components/search-bar";

export default function PageHeader() {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <header className="flex-none border-b border-border bg-card">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="text-xl font-bold text-primary sm:text-2xl">
            Catálogo
          </Link>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <CartSheet />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleSidebar()}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full md:max-w-xl md:px-4">
          <SearchBar />
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-4">
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
