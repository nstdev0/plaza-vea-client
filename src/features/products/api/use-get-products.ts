import { PaginatedResponse, ProductRecord } from "@/features/products/types";
import { ApiFetch } from "@/lib/api-client";

export const getProducts = async (
  queryString = "page=1&pageSize=12",
): Promise<PaginatedResponse<ProductRecord>> => {
  return await ApiFetch(`/api/products/?${queryString}`);
};
