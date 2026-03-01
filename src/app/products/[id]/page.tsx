import { ProductDetail } from "@/features/products/components/product-detail";
import { RelatedProducts } from "@/features/products/components/related-products";
import PageHeader from "@/components/ui/PageHeader";
import { getProduct } from "@/features/products/api/use-get-product";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ProductRecord } from "@/features/products/types";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const queryClient = new QueryClient();
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // Prefetch product
    await queryClient.prefetchQuery({
        queryKey: ["product", id],
        queryFn: () => getProduct(id),
    });

    const state = queryClient.getQueryState(["product", id]);
    const productData = state?.data as ProductRecord | undefined;

    // Try to find a search term for related products
    // We use the first category name, or brand fallback
    const cleanCategory = productData?.category?.[0] || productData?.brand || "";

    return (
        <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
            <PageHeader />
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto py-6 px-4">
                    <Link href="/">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
                        </Button>
                    </Link>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <ProductDetail skuId={id} />
                        <RelatedProducts category={cleanCategory} currentSkuId={id} />
                    </HydrationBoundary>
                </div>
            </div>
        </div>
    );
}
