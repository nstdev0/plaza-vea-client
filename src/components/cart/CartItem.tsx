import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType, useCartStore } from "@/store/useCartStore";
import Image from "next/image";

export function CartItem({ item }: { item: CartItemType }) {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);

    const price = parseFloat(item.price);

    return (
        <div className="flex items-center gap-4 py-4 border-b">
            <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-white">
                <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex justify-between items-start gap-2">
                    <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.skuId)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-md border">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.skuId, item.quantity - 1)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>

                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val > 0) {
                                    updateQuantity(item.skuId, val);
                                }
                            }}
                            className="w-10 h-8 text-center text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.skuId, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    <div className="text-right">
                        <div className="text-sm font-bold">
                            S/ {(price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                            <div className="text-xs text-muted-foreground">
                                S/ {price.toFixed(2)} c/u
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
