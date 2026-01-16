import { ApiFetch } from "@/app/api/apiFetch";
import { PaginatedResponse, ProductRecord } from "@/app/types/Product";

export const getProducts = async (
  queryString: string
): Promise<PaginatedResponse<ProductRecord>> => {
  return await ApiFetch(`/api/products/?${queryString}`);
};
