"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./components/theme-toggle";
import { SearchBar } from "./components/search-bar";
import { ProductGrid } from "./components/product-grid";
import { Pagination } from "./components/pagination";
import { FilterSidebar } from "./components/filter-sidebar";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./features/products/queries";
import { ProductGridSkeleton } from "@/app/components/product-grid-skeleton";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read state from URL or defaults
  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const productsPerPage = Number(searchParams.get("pageSize")) || 12;

  // Local state for UI only (sidebar)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState(3);

  // Helper to update URL
  const updateURL = (params: Record<string, string | number | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "" || value === 0) {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      currentPage,
      productsPerPage,
      searchTerm,
      selectedCategory,
    ],
    queryFn: () => {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has("page")) params.set("page", currentPage.toString());
      if (!params.has("pageSize"))
        params.set("pageSize", productsPerPage.toString());
      return getProducts(params.toString());
    },
  });

  const handleFilterChange = (type: string, value: string) => {
    setSidebarOpen(false);
    updateURL({
      page: 1, // Reset to page 1 on filter change
      [type]: value,
    });
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="flex-none border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold text-primary sm:text-2xl">
            Catálogo
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
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

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden lg:flex-row">
        {/* Sidebar - Filters */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`fixed left-0 top-0 z-50 h-full w-64 transform overflow-y-auto bg-card transition-transform duration-300 ease-in-out lg:relative lg:z-0 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={(value) => handleFilterChange("category", value)}
            onPriceChange={(value) => handleFilterChange("price", value)}
          />
        </div>

        {/* Main Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Search Bar & View Options */}
          <div className="flex-none">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={(val) => {
                updateURL({ search: val, page: 1 });
              }}
              productsPerPage={productsPerPage}
              onProductsPerPageChange={(val) => {
                updateURL({ pageSize: val, page: 1 });
              }}
              gridColumns={gridColumns}
              onGridColumnsChange={setGridColumns}
              totalProducts={data ? data.totalData.toString() : "cargando..."}
            />
          </div>

          {/* Products Grid with Scroll */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {isLoading ? (
              <ProductGridSkeleton columns={gridColumns} />
            ) : (
              <>
                <ProductGrid products={data?.records} columns={gridColumns} />

                {/* Pagination at bottom */}
                <div className="flex-none border-t border-border bg-card p-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data?.totalPages || 1}
                    onPageChange={(page) => updateURL({ page })}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
