import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { ProductRecord } from "@/app/types/Product";

interface ProductGridProps {
  products: ProductRecord[] | undefined;
  columns: number;
}

export function ProductGrid({ products, columns }: ProductGridProps) {
  const gridColsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    }[columns] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  if (!products || products.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-muted-foreground">No se encontraron productos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className={`grid gap-4 p-4 sm:p-6 ${gridColsClass}`}>
        {products.map((product) => (
          <Card
            key={product.skuId}
            className="group overflow-hidden transition-all hover:shadow-lg"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-white">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="h-48 w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 bg-background/80 hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="mb-2 text-xs text-muted-foreground">
                {product.brand}
              </p>
              <h3
                className="mb-2 text-sm font-medium line-clamp-2 min-h-[40px]"
                title={product.name}
              >
                {product.name}
              </h3>

              {/* Rating Placeholder (API doesn't have rating yet) */}
              <div className="mb-3 flex items-center gap-1 opacity-50">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm text-yellow-400">
                    ★
                  </span>
                ))}
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  S/ {parseFloat(product.price).toFixed(2)}
                </span>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Agregar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
