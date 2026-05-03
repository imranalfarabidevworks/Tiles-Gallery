import Link from "next/link";
import Image from "next/image";

export default function TileCard({ tile }) {
  return (
    <div className="tile-card bg-white rounded-sm overflow-hidden border border-[#DDD0BC] group">
      <div className="relative h-52 overflow-hidden">
        <img
          src={tile.image}
          alt={tile.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs uppercase tracking-widest px-2 py-1 rounded-sm font-medium ${
              tile.inStock
                ? "bg-[#6B9E6E]/90 text-white"
                : "bg-[#B85450]/90 text-white"
            }`}
          >
            {tile.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-[#2C2C2C]/80 text-[#F5EFE6] px-2 py-1 text-xs rounded-sm">
          {tile.dimensions}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-stone uppercase tracking-widest mb-1">
          {tile.category}
        </p>
        <h3 className="font-heading text-charcoal text-lg font-semibold leading-tight mb-2">
          {tile.title}
        </h3>
        <p className="text-sm text-charcoal/60 line-clamp-2 mb-4 leading-relaxed">
          {tile.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-terracotta font-bold text-lg">
              ${tile.price}
            </span>
            <span className="text-xs text-stone ml-1">/ {tile.material}</span>
          </div>
          <Link
            href={`/tile/${tile.id}`}
            className="text-xs uppercase tracking-wider bg-[#2C2C2C] text-cream hover:bg-terracotta px-4 py-2 rounded-sm transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
