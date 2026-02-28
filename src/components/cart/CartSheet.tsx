import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";

export function CartSheet() {
    const [mounted, setMounted] = useState(false);
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);

    const { total, itemCount } = items.reduce(
        (acc, item) => {
            const price = parseFloat(item.price);
            const lineTotal = price * item.quantity;
            return {
                total: acc.total + lineTotal,
                itemCount: acc.itemCount + item.quantity,
            };
        },
        { total: 0, itemCount: 0 }
    );

    // Prevent hydration errors by only rendering cart contents after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            {itemCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Mi Carrito
                        {itemCount > 0 && (
                            <span className="text-sm font-normal text-muted-foreground ml-2">
                                ({itemCount} productos)
                            </span>
                        )}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto mt-4 pr-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <ShoppingCart className="h-16 w-16 text-muted-foreground opacity-20" />
                            <p className="text-muted-foreground">Tu carrito está vacío.</p>
                            <SheetTrigger asChild>
                                <Button variant="outline">Continuar Comprando</Button>
                            </SheetTrigger>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {items.map((item) => (
                                <CartItem key={item.skuId} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <SheetFooter className="border-t pt-4 flex-col sm:flex-col gap-4">
                        <div className="flex justify-between w-full">
                            <span className="font-semibold">Subtotal</span>
                            <span className="font-semibold">S/ {total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-full text-lg">
                            <span className="font-bold">Total</span>
                            <span className="font-bold text-primary">S/ {total.toFixed(2)}</span>
                        </div>

                        <div className="flex gap-2 w-full mt-2">
                            <Button
                                variant="outline"
                                className="w-1/3 text-destructive"
                                onClick={clearCart}
                            >
                                Vaciar
                            </Button>
                            <Button className="w-2/3">
                                Finalizar Pedido
                            </Button>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
