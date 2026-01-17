"use client";

import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  selectedCategory: string;
  // selectedPrice: string;
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
}

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  // onPriceChange,
}: FilterSidebarProps) {
  // const categories = ["Electrónica", "Moda", "Hogar", "Deportes"];
  // const priceRanges = [
  //   { label: "Hasta $50", value: "low" },
  //   { label: "$50 - $150", value: "mid" },
  //   { label: "Más de $150", value: "high" },
  // ];

  return (
    <aside className="border-r border-border p-6 lg:w-64">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
          Categoría
        </h3>
        <div className="space-y-2">
          <Button
            variant={!selectedCategory ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onCategoryChange("")}
          >
            Todas
          </Button>
          {/* {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </Button>
          ))} */}
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
  );
}
