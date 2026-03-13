"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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

    // Limpiar page=1, pageSize=12 y grid=5 (valores default)
    params.delete("page");
    if (params.get("pageSize") === "12") {
      params.delete("pageSize");
    }
    if (params.get("grid") === "5") {
      params.delete("grid");
    }

    // Siempre redirigir a la página principal al buscar
    router.replace(`/?${params.toString()}`, { scroll: true });
  }, 550);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // UI actualiza al instante
    executeSearch(value); // URL actualiza después de 500ms
  };


  return (
    <div className="w-full">
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
      </div>
    </div>
  );
}
