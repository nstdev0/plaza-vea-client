"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import SideBarProvider from "@/components/SidebarContext";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SideBarProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </SideBarProvider>
    </QueryClientProvider>
  );
}
