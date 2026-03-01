"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/use-get-product";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductDetail({ skuId }: { skuId: string }) {
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", skuId],
        queryFn: () => getProduct(skuId),
    });

    if (isLoading) {
        return (
            <div className="flex flex-col md:flex-row gap-8 p-6 animate-pulse">
                <div className="w-full md:w-1/2 h-[400px] bg-muted rounded-lg" />
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <div className="h-8 w-1/4 bg-muted rounded" />
                    <div className="h-12 w-3/4 bg-muted rounded" />
                    <div className="h-8 w-1/3 bg-muted rounded" />
                    <div className="h-12 w-full mt-4 bg-muted rounded" />
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return <div className="p-6 text-red-500 font-semibold">Error al cargar el producto o no encontrado.</div>;
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 lg:p-12">
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white rounded-xl p-8 shadow-sm">
                <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name || ""}
                    width={600}
                    height={600}
                    className="object-contain w-full max-h-[500px]"
                    style={{ viewTransitionName: `product-image-${product.skuId}` }}
                    priority
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span
                    className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold"
                    style={{ viewTransitionName: `product-brand-${product.skuId}` }}
                >
                    {product.brand}
                </span>
                <h1
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ viewTransitionName: `product-name-${product.skuId}` }}
                >
                    {product.name}
                </h1>
                {product.ean && (
                    <p className="text-sm text-muted-foreground mb-6">EAN: {product.ean}</p>
                )}
                <div className="mb-8 block">
                    <span
                        className="text-4xl font-extrabold text-primary"
                        style={{ viewTransitionName: `product-price-${product.skuId}` }}
                    >
                        S/ {parseFloat(product.price).toFixed(2)}
                    </span>
                </div>

                {/* Adicionales properties de rawJson visuales podrian ir aqui */}
                {product.description && (
                    <div className="mb-8 prose prose-sm max-w-none text-muted-foreground">
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                )}

                <div className="max-w-md mt-6">
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
}
