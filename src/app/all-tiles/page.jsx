"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TileCard from "@/components/TileCard";
import Loader from "@/components/Loader";

function AllTilesContent() {
  const [tiles, setTiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    
    fetch("/tiles.json") 
      .then((r) => {
        if (!r.ok) throw new Error("JSON file not found");
        return r.json();
      })
      .then((data) => {
    
        const finalData = Array.isArray(data.tiles) ? data.tiles : data;
        setTiles(finalData);
        setFiltered(finalData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    
    let result = tiles || [];
    
    if (categoryParam) {
      result = result.filter((t) => 
        t.category?.toLowerCase() === categoryParam.toLowerCase()
      );
    }
    
    if (search.trim()) {
      result = result.filter((t) => 
        t.title?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFiltered(result);
  }, [search, tiles, categoryParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="text-terracotta text-xs uppercase tracking-widest font-medium">The Full Collection</span>
        <h1 className="font-heading text-charcoal text-4xl md:text-5xl font-bold mt-2 mb-4">All Tiles</h1>
        <p className="text-stone max-w-lg mx-auto text-sm leading-relaxed">Browse our complete collection of premium tiles from around the world.</p>
      </div>

      
      <div className="max-w-xl mx-auto mb-10 relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input 
          type="text" 
          placeholder="Search tiles by title..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#DDD0BC] focus:border-terracotta focus:outline-none rounded-sm text-charcoal placeholder-stone/60 text-sm transition-colors" 
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute inset-y-0 right-4 flex items-center text-stone hover:text-terracotta">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {!loading && (
        <p className="text-stone text-sm mb-6 text-center">
          Showing <span className="text-terracotta font-semibold">{filtered.length}</span> tiles
          {categoryParam && <span> in <span className="text-terracotta capitalize">{categoryParam}</span></span>}
        </p>
      )}

      {loading ? <Loader /> : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-heading text-charcoal/40 text-2xl mb-2">No tiles found</p>
          <p className="text-stone text-sm">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((tile) => (
          
            <TileCard key={tile.id || tile._id} tile={tile} /> 
          ))}
        </div>
      )}
    </div>
  );
}

export default function AllTilesPage() {
  return <Suspense fallback={<Loader />}><AllTilesContent /></Suspense>;
}