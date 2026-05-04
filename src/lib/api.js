
const JSON_FILE_PATH = "/tiles.json"; 

export async function getAllTiles() {

  const res = await fetch(JSON_FILE_PATH, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load local JSON data");
  
  const data = await res.json();
  
  
  return Array.isArray(data.tiles) ? data.tiles : data;
}

export async function getTileById(id) {
  
  const tiles = await getAllTiles();
  
  
  const tile = tiles.find((t) => String(t.id || t._id) === String(id));
  
  if (!tile) throw new Error("Tile not found");
  return tile;
}

export async function getFeaturedTiles() {
  const tiles = await getAllTiles();
  
  return tiles.slice(0, 4);
}

export async function searchTiles(query) {
  const tiles = await getAllTiles();
  if (!query) return tiles;
  
  //title search
  return tiles.filter((t) =>
    t.title?.toLowerCase().includes(query.toLowerCase())
  );
}