import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductRecord } from "@/features/products/types";

export interface CartItem extends ProductRecord {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: ProductRecord) => void;
    removeItem: (skuId: string) => void;
    updateQuantity: (skuId: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.skuId === product.skuId);
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.skuId === product.skuId
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, { ...product, quantity: 1 }] };
                });
            },

            removeItem: (skuId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.skuId !== skuId),
                }));
            },

            updateQuantity: (skuId, quantity) => {
                set((state) => {
                    if (quantity <= 0) {
                        return {
                            items: state.items.filter((item) => item.skuId !== skuId),
                        };
                    }
                    return {
                        items: state.items.map((item) =>
                            item.skuId === skuId ? { ...item, quantity } : item
                        ),
                    };
                });
            },

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-storage", // name of the item in the storage (must be unique)
        }
    )
);
