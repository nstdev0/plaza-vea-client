import { ApiFetch } from "@/app/api/apiFetch";
import { IPageableRequest } from "@/app/common/pagination";
import { PaginatedResponse, ProductRecord } from "@/app/types/Product";

export const getProducts = async (
  pageableRequest: IPageableRequest
): Promise<PaginatedResponse<ProductRecord>> => {
  const queryParams = new URLSearchParams();

  if (pageableRequest.page) {
    queryParams.append("page", pageableRequest.page.toString());
  }
  if (pageableRequest.pageSize) {
    queryParams.append("pageSize", pageableRequest.pageSize.toString());
  }
  if (pageableRequest.search) {
    queryParams.append("search", pageableRequest.search);
  }

  const response = await ApiFetch(`/api/products/?${queryParams.toString()}`);

  console.log("getProducts: ", response);

  return response;
};
