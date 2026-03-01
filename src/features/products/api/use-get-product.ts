import { ProductRecord } from "@/features/products/types";
import { ApiFetch } from "@/lib/api-client";

export const getProduct = async (
    skuId: string,
): Promise<ProductRecord> => {
    return await ApiFetch(`/api/products/skuId/${skuId}`);
};
