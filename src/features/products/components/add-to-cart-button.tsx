"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { ProductRecord } from "@/features/products/types";
import { toast } from "sonner"; // Assuming sonner is installed as per package.json

export function AddToCartButton({ product }: { product: ProductRecord }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem(product);
        toast.success("Producto agregado al carrito", {
            description: product.name,
            duration: 3000,
        });
    };

    return (
        <Button
            className="w-full"
            onClick={handleAddToCart}
        >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Añadir al Carrito
        </Button>
    );
}
