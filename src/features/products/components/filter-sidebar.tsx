"use client";

import { useSidebar } from "@/components/SidebarContext";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function FilterSidebar() {
  const categories = ["Electrónica", "Moda", "Hogar", "Deportes"];
  const { sidebarOpen, toggleSidebar } = useSidebar();
  // const priceRanges = [
  //   { label: "Hasta $50", value: "low" },
  //   { label: "$50 - $150", value: "mid" },
  //   { label: "Más de $150", value: "high" },
  // ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categories: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categories === "") {
      params.delete("categories");
      params.set("page", "1");
      router.push(`?${params.toString()}`);
      return;
    }

    if (params.get("categories") === categories) {
      params.delete("categories");
    } else {
      params.set("categories", categories);
      params.set("page", "1");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex h-full flex-1 overflow-hidden lg:flex-row">
      {/* Sidebar - Filters */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => toggleSidebar()}
        />
      )}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-64 transform overflow-y-auto bg-card transition-transform duration-300 ease-in-out lg:relative lg:z-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <aside className="min-h-full border-r border-border p-6 lg:w-64">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
              Categoría
            </h3>
            <div className="space-y-2">
              <Button
                variant={!searchParams.get("categories") ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleCategoryChange("")}
              >
                Todas
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={
                    searchParams.get("categories") === cat ? "default" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Price */}
          {/* <div>
        <h3 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
          Precio
        </h3> */}
          {/* <div className="space-y-2">
          <Button
            variant={!selectedPrice ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPriceChange("")}
          >
            Todos
          </Button>
          {priceRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedPrice === range.value ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onPriceChange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div> */}
          {/* </div> */}
        </aside>
      </div>
    </div>
  );
}
