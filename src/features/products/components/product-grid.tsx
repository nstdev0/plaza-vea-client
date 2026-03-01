"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { Card } from "@/components/ui/card"; import { useSearchParams } from "next/navigation";
import { getProducts } from "../api/use-get-products";
import { useQuery } from "@tanstack/react-query";
import { ProductGridSkeleton } from "./product-grid-skeleton";
import { Pagination } from "@/components/ui/pagination";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductGrid() {
  const searchParams = useSearchParams();

  // Sincronizamos el hook con la URL actual
  const params = new URLSearchParams(searchParams.toString());

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", params.toString()],
    queryFn: () => getProducts(params.toString()),
  });

  const gridCols = Number(searchParams.get("grid") || "5");

  const gridColsClass =
    {
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5 lg:grid-cols-5",
    }[gridCols] || "grid-cols-1 sm:grid-cols-5 lg:grid-cols-5";

  const columns = gridCols;

  if (isLoading) return <ProductGridSkeleton columns={columns} />;
  if (isError) return <div>Error al cargar productos</div>;

  if (!data || data.records?.length === 0 || !data.records)
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-muted-foreground">No se encontraron productos</p>
        </div>
      </div>
    );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className={`grid gap-4 p-4 sm:p-6 ${gridColsClass}`}>
          {data.records.map((product) => (
            <Card
              key={product.skuId}
              className="group overflow-hidden transition-all hover:shadow-lg"
            >
              {/* Image Container */}
              <Link href={`/products/${product.skuId}`} className="block relative overflow-hidden bg-white">
                <Image
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-48 w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ viewTransitionName: `product-image-${product.skuId}` }}
                />
              </Link>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <p
                  className="mb-2 text-sm text-muted-foreground"
                  style={{ viewTransitionName: `product-brand-${product.skuId}` }}
                >
                  {product.brand}
                </p>
                <Link href={`/products/${product.skuId}`} className="flex-1 block">
                  <h3
                    className="mb-2 text-md font-medium line-clamp-2 min-h-[40px] hover:text-primary transition-colors"
                    style={{ viewTransitionName: `product-name-${product.skuId}` }}
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                </Link>

                {/* Price and CTA */}
                <div className="flex flex-col gap-3 mt-auto">
                  <span
                    className="text-lg font-bold text-primary"
                    style={{ viewTransitionName: `product-price-${product.skuId}` }}
                  >
                    S/ {parseFloat(product.price).toFixed(2)}
                  </span>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="border-t border-border bg-card p-4">
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
        />
      </div>
    </div >
  );
}
