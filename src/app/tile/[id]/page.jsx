"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function TileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
      return;
    }

    if (session) {
      // পরিবর্তন: সরাসরি /tiles.json ফেচ করে আইডি দিয়ে খুঁজে বের করা
      fetch("/tiles.json")
        .then((r) => {
          if (!r.ok) throw new Error("File not found");
          return r.json();
        })
        .then((data) => {
          // যদি ডেটার ভেতর tiles অ্যারে থাকে সেটি নাও, নাহলে সরাসরি ডেটা নাও
          const allTiles = Array.isArray(data.tiles) ? data.tiles : data;
          
          // URL-এর id-র সাথে JSON-এর id মিলিয়ে দেখা হচ্ছে (String এ রূপান্তর করে)
          const foundTile = allTiles.find((t) => String(t.id || t._id) === String(id));
          
          if (foundTile) {
            setTile(foundTile);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Detail Fetch Error:", err);
          setLoading(false);
        });
    }
  }, [id, session, isPending, router]);

  if (isPending || loading) return <Loader />;

  if (!tile) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <p className="font-heading text-charcoal/40 text-3xl mb-4">Tile Not Found</p>
      <Link href="/all-tiles" className="text-sm text-terracotta hover:underline">← Back to All Tiles</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/all-tiles" className="inline-flex items-center gap-2 text-stone hover:text-terracotta text-sm mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to All Tiles
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative rounded-sm overflow-hidden aspect-square bg-[#EDE4D6]">
            <img src={tile.image} alt={tile.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <span className={`text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm font-medium ${tile.inStock ? "bg-[#6B9E6E]/90 text-white" : "bg-[#B85450]/90 text-white"}`}>
                {tile.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
          
          {/* Mini info cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Material", value: tile.material },
              { label: "Dimensions", value: tile.dimensions },
              { label: "Category", value: tile.category },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-[#DDD0BC] rounded-sm p-3 text-center">
                <p className="text-xs text-stone uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-charcoal font-semibold text-sm capitalize">{item.value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div>
          <span className="text-terracotta text-xs uppercase tracking-[0.3em] font-medium">{tile.category}</span>
          <h1 className="font-heading text-charcoal text-3xl md:text-4xl font-bold mt-2 mb-2">{tile.title}</h1>
          <p className="text-stone text-sm mb-6">By <span className="text-charcoal font-medium">{tile.creator || "Tiles Gallery"}</span></p>

          <div className="flex items-baseline gap-2 mb-8">
            <span className="font-heading text-terracotta text-4xl font-bold">${tile.price}</span>
            <span className="text-stone text-sm">{tile.currency || "USD"} / unit</span>
          </div>

          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-stone font-medium mb-3">Style Description</h3>
            <p className="text-charcoal/80 leading-relaxed text-sm border-l-2 border-clay pl-4">{tile.style || "No style description available."}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-stone font-medium mb-3">About This Tile</h3>
            <p className="text-charcoal/70 leading-relaxed text-sm">{tile.description}</p>
          </div>

          {tile.tags && tile.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-stone font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tile.tags.map((tag) => (
                  <span key={tag} className="bg-[#EDE4D6] text-charcoal text-xs px-3 py-1.5 rounded-sm border border-[#DDD0BC]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button 
              className={`flex-1 py-3.5 rounded-sm text-sm uppercase tracking-widest font-medium transition-colors ${tile.inStock ? "bg-terracotta hover:bg-stone text-white" : "bg-[#DDD0BC] text-stone cursor-not-allowed"}`}
              disabled={!tile.inStock}
            >
              {tile.inStock ? "Add to Enquiry" : "Out of Stock"}
            </button>
            <button className="border border-[#DDD0BC] hover:border-terracotta text-charcoal hover:text-terracotta px-4 py-3.5 rounded-sm transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}