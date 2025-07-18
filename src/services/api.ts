import type { ListItem } from "../types";

export const fetchMetadata = async (): Promise<ListItem[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/metadata`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    throw error;
  }
};
