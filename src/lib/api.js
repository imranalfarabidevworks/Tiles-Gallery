const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://demo-data-9dgl.onrender.com";

export async function getAllTiles() {
  const res = await fetch(`${API_URL}/tiles`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tiles");
  return res.json();
}

export async function getTileById(id) {
  const res = await fetch(`${API_URL}/tiles/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tile");
  return res.json();
}

export async function getFeaturedTiles() {
  const tiles = await getAllTiles();
  return tiles.slice(0, 4);
}

export async function searchTiles(query) {
  const tiles = await getAllTiles();
  if (!query) return tiles;
  return tiles.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );
}
