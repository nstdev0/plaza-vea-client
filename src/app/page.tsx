import { ProductGrid } from "../features/products/components/product-grid";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProducts } from "@/features/products/api/use-get-products";
import { FilterSidebar } from "@/features/products/components/filter-sidebar";
import PageHeader from "@/components/ui/PageHeader";
import { SearchBar } from "@/features/products/components/search-bar";

interface PageProps {
  searchParams: Promise<
    string | string[][] | Record<string, string> | URLSearchParams
  >;
}

export default async function Page({ searchParams }: PageProps) {
  const queryClient = new QueryClient();

  const resolvedParams = await searchParams;
  const params = new URLSearchParams(resolvedParams);

  if (params.get("page") === "1") params.delete("page");
  if (params.get("pageSize") === "10") params.delete("pageSize");

  if (params.get("search")) params.set("search", params.get("search") || "");
  if (params.get("category"))
    params.set("category", params.get("category") || "");

  await queryClient.prefetchQuery({
    queryKey: ["products", params.toString()],
    queryFn: () => getProducts(params.toString()),
  });

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <PageHeader />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden lg:flex-row">
        <div>
          <FilterSidebar />
        </div>

        {/* Main Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Search Bar & View Options */}
          <div className="flex-none">
            <SearchBar />
          </div>

          {/* Products Grid with Scroll */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ProductGrid />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
