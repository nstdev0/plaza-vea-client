import { AppConfig } from "@/config/conf";

const BASE_URL = AppConfig.API_URL;

export async function ApiFetch(url: string) {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await res.json().catch(() => {
      console.error("Response was not valid JSON");
    });
    const apiResponse = jsonResponse;
    return apiResponse;
  } catch (error) {
    console.error("Error fetching API:", error);
    throw error;
  }
}
