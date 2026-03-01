"use client";

import { Button } from "@/components/ui/button";
import { Grid2x2, Grid3x3, LayoutGrid } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function ViewOptions() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleProductsPerPageChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (params.get("pageSize") === "12") params.delete("pageSize");

        // Al cambiar pageSize, volvemos a la página 1 (borramos page)
        params.delete("page");

        if (value !== "10") {
            params.set("pageSize", value);
        } else {
            params.delete("pageSize");
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleGridColumnsChange = (value: number) => {
        const params = new URLSearchParams(searchParams);
        if (value === 5) params.delete("grid");
        else params.set("grid", value.toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleOrderByChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (params.get("orderBy") === "relevance") params.delete("orderBy");

        // Al cambiar orderBy, volvemos a la página 1 (borramos page)
        params.delete("page");

        if (value !== "relevance") {
            params.set("orderBy", value);
        } else {
            params.delete("orderBy");
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const gridColumns = Number(searchParams.get("grid") || "5");

    return (
        <div className="border-b border-border bg-card px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-4 justify-between sm:justify-start">
                {/* Items per page */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                        Mostrar:
                    </label>
                    <select
                        value={searchParams.get("pageSize") || "12"}
                        onChange={(e) => handleProductsPerPageChange(e.target.value)}
                        className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>

                {/* Order Options */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                        Ordenar por:
                    </label>
                    <select
                        value={searchParams.get("orderBy") || "relevance"}
                        onChange={(e) => handleOrderByChange(e.target.value)}
                        className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value="relevance">Relevancia</option>
                        <option value="price,asc">Precio: Menor a Mayor</option>
                        <option value="price,desc">Precio: Mayor a Menor</option>
                        <option value="name,asc">Nombre: A-Z</option>
                        <option value="name,desc">Nombre: Z-A</option>
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
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleGridColumnsChange(3)}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={gridColumns === 4 ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleGridColumnsChange(4)}
                        >
                            <Grid2x2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={gridColumns === 5 ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleGridColumnsChange(5)}
                        >
                            <Grid3x3 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
