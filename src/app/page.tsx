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
import { Pagination } from "@/components/ui/pagination";

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

  // 2. Prefetch (Carga los datos antes de renderizar)
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
        {/* Sidebar - Filters */}
        {/* {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )} */}
        <div
        //   className={
        //     `fixed left-0 top-0 z-50 h-full w-64 transform overflow-y-auto bg-card transition-transform duration-300 ease-in-out lg:relative lg:z-0 lg:translate-x-0 ${
        //     sidebarOpen ? "translate-x-0" : "-translate-x-full"
        //   }`
        // }
        >
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

            {/* Pagination at bottom
            <div className="flex-none border-t border-border bg-card p-4">
              <Pagination />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
