import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Tile mosaic 404 */}
      <div className="grid grid-cols-4 gap-1.5 mb-10">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={`w-10 h-10 rounded-sm ${i % 3 === 0 ? "bg-terracotta" : i % 3 === 1 ? "bg-clay" : "bg-[#DDD0BC]"} ${i % 5 === 0 ? "opacity-30" : i % 7 === 0 ? "opacity-60" : "opacity-100"}`} />
        ))}
      </div>
      <span className="text-terracotta text-xs uppercase tracking-[0.3em] font-medium mb-2">404 Error</span>
      <h1 className="font-heading text-charcoal text-5xl md:text-7xl font-bold mb-4">Page Not Found</h1>
      <p className="text-stone max-w-md text-sm leading-relaxed mb-8">
        This tile seems to have gone missing from our collection. Let&apos;s get you back to browsing beautiful tiles.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 bg-[#2C2C2C] hover:bg-terracotta text-cream px-8 py-3 rounded-sm text-sm uppercase tracking-widest transition-colors duration-200">
        Return Home
      </Link>
    </div>
  );
}
