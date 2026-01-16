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
import { IPageableRequest } from "./common/pagination";
import { ProductGridSkeleton } from "@/app/components/product-grid-skeleton";
export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [gridColumns, setGridColumns] = useState(3);

  const pageableRequest: IPageableRequest = {
    page: currentPage,
    pageSize: productsPerPage,
    search: searchTerm,
  };

  // Real API Data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage, productsPerPage, searchTerm],
    queryFn: () => getProducts(pageableRequest),
  });

  // Reset to first page when filters change
  const handleFilterChange = (type: string, value: string) => {
    setCurrentPage(1);
    setSidebarOpen(false);
    if (type === "category") setSelectedCategory(value);
    if (type === "price") setSelectedPrice(value);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
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
      <div className="flex h-[calc(100vh-80px)] flex-col lg:flex-row">
        {/* Sidebar - Filters */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`fixed left-0 top-[80px] z-50 h-[calc(100vh-80px)] w-64 transform overflow-y-auto bg-card transition-transform duration-300 ease-in-out lg:relative lg:top-0 lg:z-0 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <FilterSidebar
            selectedCategory={selectedCategory}
            selectedPrice={selectedPrice}
            onCategoryChange={(value) => handleFilterChange("category", value)}
            onPriceChange={(value) => handleFilterChange("price", value)}
          />
        </div>

        {/* Main Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Search Bar & View Options */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1); // Reset pagination on search
            }}
            productsPerPage={productsPerPage}
            onProductsPerPageChange={(val) => {
              setProductsPerPage(val);
              setCurrentPage(1); // Reset pagination on page size change
            }}
            gridColumns={gridColumns}
            onGridColumnsChange={setGridColumns}
          />

          {/* Products Grid with Scroll */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {isLoading ? (
              <ProductGridSkeleton columns={gridColumns} />
            ) : (
              <>
                <ProductGrid products={data?.records} columns={gridColumns} />

                {/* Pagination at bottom */}
                <div className="border-t border-border bg-card p-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data?.totalPages || 1}
                    onPageChange={setCurrentPage}
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
