import { PaginatedResponse, ProductRecord } from "@/features/products/Product";
import { ApiFetch } from "@/lib/api-client";

export const getProducts = async (
  queryString: string,
): Promise<PaginatedResponse<ProductRecord>> => {
  return await ApiFetch(`/api/products/?${queryString}`);
};
