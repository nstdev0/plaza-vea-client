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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const queryClient = new QueryClient();

  const resolvedParams = await searchParams;

  // 1. Extraer filtros de la URL (Server Side)
  const searchTerm = resolvedParams.search || "";
  const selectedCategory = resolvedParams.category || "";
  const currentPage = Number(resolvedParams.page) || 1;
  const productsPerPage = Number(resolvedParams.pageSize) || 12;

  const params = new URLSearchParams();

  params.set("page", currentPage.toString());
  params.set("pageSize", productsPerPage.toString());

  if (searchTerm) params.set("search", searchTerm.toString());
  if (selectedCategory) params.set("category", selectedCategory.toString());

  console.log(params);

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

            {/* Pagination at bottom */}
            <div className="flex-none border-t border-border bg-card p-4">
              {/* <Pagination
                currentPage={currentPage}
                totalPages={data?.totalPages || 1}
                onPageChange={(page) => updateURL({ page })}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
