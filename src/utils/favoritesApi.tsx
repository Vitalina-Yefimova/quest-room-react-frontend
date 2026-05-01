import { API_BASE_URL } from "./config";

export async function getUserFavorites() {
  const res = await fetch(`${API_BASE_URL}/favorites`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return await res.json();
}

export async function addFavorite(questId: string) {
  const res = await fetch(`${API_BASE_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ questId }),
  });
  if (!res.ok) throw new Error("Failed to add favorite");
  return await res.json();
}

export async function removeFavorite(questId: string) {
  const res = await fetch(`${API_BASE_URL}/favorites/${questId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to remove favorite");
}
