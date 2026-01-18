"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid2x2, Grid3x3, LayoutGrid } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname(); // Buena práctica para reconstruir la ruta

  const currentSearch = searchParams.get("search") || "";

  // 1. Estado local para respuesta inmediata al escribir
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Sincronizar estado local si la URL cambia externamente (ej. botón atrás)
  useEffect(() => {
    if (currentSearch !== searchTerm) {
      setSearchTerm(currentSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearch]);

  // 2. Debounce SOLO para la ejecución de la búsqueda
  const executeSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    // Usar replace para no ensuciar el historial, scroll: false evita saltos
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // UI actualiza al instante
    executeSearch(value); // URL actualiza después de 500ms
  };

  // 3. Sin Debounce para selectores (acción inmediata)
  const handleProductsPerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (!params.get("pageSize")) params.set("pageSize", "6");

    params.set("pageSize", value);
    params.set("page", "1"); // Resetear página
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleGridColumnsChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("gridCols", value.toString());
    // Aquí NO reseteamos página, es solo visual
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const gridCols = Number(searchParams.get("gridCols") || "3");

  return (
    <div className="border-b border-border bg-card px-4 py-4 sm:px-6">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm} // Usamos el estado local
            placeholder="Buscar productos..."
            onChange={handleInputChange}
            className="pl-10"
          />
        </div>

        {/* View Options */}
        <div className="flex flex-wrap items-center gap-4 justify-between sm:justify-start">
          {/* Items per page */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              Mostrar:
            </label>
            <select
              value={searchParams.get("pageSize") || "6"}
              onChange={(e) => handleProductsPerPageChange(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
            </select>
          </div>

          {/* Grid columns */}
          <div className="hidden md:flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Columnas:
            </label>
            <div className="flex gap-1">
              <Button
                variant={gridCols === 3 ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleGridColumnsChange(3)}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={gridCols === 4 ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleGridColumnsChange(4)}
              >
                <Grid2x2 className="h-4 w-4" />
              </Button>
              <Button
                variant={gridCols === 5 ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => handleGridColumnsChange(5)}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* <div>
            <label className="text-sm font-medium text-muted-foreground">
              Productos: {productsLength}
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
}
