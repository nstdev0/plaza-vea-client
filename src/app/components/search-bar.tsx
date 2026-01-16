"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid2x2, Grid3x3, LayoutGrid } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  productsPerPage: number;
  onProductsPerPageChange: (value: number) => void;
  gridColumns: number;
  onGridColumnsChange: (value: number) => void;
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  productsPerPage,
  onProductsPerPageChange,
  gridColumns,
  onGridColumnsChange,
}: SearchBarProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearchChange(value);
  }, 500);

  const handleInputChange = (value: string) => {
    setLocalSearch(value);
    debouncedSearch(value);
  };

  return (
    <div className="border-b border-border bg-card px-4 py-4 sm:px-6">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={localSearch}
            placeholder="Buscar productos..."
            onChange={(e) => handleInputChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* View Options */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Items per page */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Mostrar:
            </label>
            <select
              value={productsPerPage}
              onChange={(e) => onProductsPerPageChange(Number(e.target.value))}
              className="rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground"
            >
              <option value={6}>6 elementos</option>
              <option value={12}>12 elementos</option>
              <option value={24}>24 elementos</option>
              <option value={48}>48 elementos</option>
            </select>
          </div>

          {/* Grid columns */}
          <div className="hidden md:flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Columnas:
            </label>
            <div className="flex gap-1">
              <Button
                variant={gridColumns === 3 ? "default" : "outline"}
                size="sm"
                onClick={() => onGridColumnsChange(3)}
                className={gridColumns === 3 ? "bg-primary" : ""}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={gridColumns === 4 ? "default" : "outline"}
                size="sm"
                onClick={() => onGridColumnsChange(4)}
                className={gridColumns === 4 ? "bg-primary" : ""}
              >
                <Grid2x2 className="h-4 w-4" />
              </Button>
              <Button
                variant={gridColumns === 5 ? "default" : "outline"}
                size="sm"
                onClick={() => onGridColumnsChange(5)}
                className={gridColumns === 5 ? "bg-primary" : ""}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
