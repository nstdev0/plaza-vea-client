"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/use-get-products";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Card } from "@/components/ui/card";
import { AddToCartButton } from "./add-to-cart-button";

export function RelatedProducts({ category, currentSkuId }: { category: string, currentSkuId: string }) {
    // Construimos query, usando brand o category para encontrar relacionados
    const searchQuery = category ? `category=${encodeURIComponent(category)}&pageSize=5` : "pageSize=5";

    const { data, isLoading, isError } = useQuery({
        queryKey: ["related-products", category],
        queryFn: () => getProducts(searchQuery),
    });

    if (isLoading) {
        return (
            <div className="mt-12 p-6 lg:px-12">
                <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError || !data || !data.records || data.records.length === 0) {
        return null; // no related products to show
    }

    const related = data.records.filter(p => p.skuId !== currentSkuId).slice(0, 4);

    if (related.length === 0) return null;

    return (
        <div className="mt-12 p-6 lg:px-12">
            <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((product) => (
                    <Card
                        key={product.skuId}
                        className="group overflow-hidden transition-all hover:shadow-lg flex flex-col"
                    >
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
                        <div className="p-4 flex flex-col flex-1">
                            <p className="mb-2 text-sm text-muted-foreground">
                                {product.brand}
                            </p>
                            <Link href={`/products/${product.skuId}`} className="flex-1">
                                <h3
                                    className="mb-2 text-md font-medium line-clamp-2 min-h-[40px] hover:text-primary transition-colors"
                                    title={product.name}
                                >
                                    {product.name}
                                </h3>
                            </Link>
                            <div className="flex flex-col gap-3 mt-auto">
                                <span className="text-lg font-bold text-primary">
                                    S/ {parseFloat(product.price).toFixed(2)}
                                </span>
                                <AddToCartButton product={product} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
