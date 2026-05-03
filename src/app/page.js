"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import TileCard from "@/components/TileCard";
import Loader from "@/components/Loader";
import "swiper/css";
import "swiper/css/pagination";

const heroSlides = [
  {
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&auto=format",
    tag: "Ceramic Collection",
    title: "Discover Your Perfect Aesthetic",
    sub: "Premium tiles from around the globe, curated for the discerning eye.",
  },
  {
    bg: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1400&auto=format",
    tag: "Terracotta Series",
    title: "Warmth Fired Into Every Piece",
    sub: "Handcrafted terracotta tiles that bring the earth indoors.",
  },
  {
    bg: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&auto=format",
    tag: "Geometric Range",
    title: "Bold Patterns, Timeless Spaces",
    sub: "Geometric precision meets artistic sensibility.",
  },
];

export default function HomePage() {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiles?_limit=4`)
      .then((r) => r.json())
      .then((data) => {
        setTiles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ── Hero Banner with Swiper ── */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-[75vh] min-h-[500px]"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <img
                  src={slide.bg}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2C2C2C]/80 via-[#2C2C2C]/40 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="max-w-xl animate__animated animate__fadeInLeft">
                      <span className="text-clay text-xs uppercase tracking-[0.3em] font-medium mb-4 block">
                        {slide.tag}
                      </span>
                      <h1 className="font-heading text-cream text-4xl md:text-6xl font-bold leading-tight mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-cream/70 text-lg mb-8 leading-relaxed">
                        {slide.sub}
                      </p>
                      <Link
                        href="/all-tiles"
                        className="inline-flex items-center gap-2 bg-terracotta hover:bg-stone text-cream px-8 py-3 rounded-sm text-sm uppercase tracking-widest font-medium transition-colors duration-300"
                      >
                        Browse Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ── Marquee ── */}
      <div className="bg-[#2C2C2C] py-3 border-y border-clay/30">
        <Marquee gradient={false} speed={50} className="text-clay text-xs uppercase tracking-widest">
          {[
            "New Arrivals: Himalayan Pink Slate",
            "Weekly Feature: Modern Geometric Patterns",
            "Join the Community — Share Your Tile Inspiration",
            "Free Shipping on Orders Over $500",
            "New Arrivals: Sage Subway Collection",
            "Explore 8+ Unique Categories",
            "Hand-Crafted. Globally Sourced. Locally Loved.",
          ].map((text, i) => (
            <span key={i} className="mx-12">
              {text} <span className="text-terracotta mx-4">◆</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── Stats ── */}
      <section className="bg-[#EDE4D6] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "500+", label: "Tile Designs" },
              { num: "8", label: "Categories" },
              { num: "12k+", label: "Happy Clients" },
              { num: "15+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl md:text-4xl font-bold text-terracotta">{stat.num}</p>
                <p className="text-stone text-xs uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Tiles ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-terracotta text-xs uppercase tracking-[0.3em] font-medium">
              Handpicked For You
            </span>
            <h2 className="font-heading text-charcoal text-3xl md:text-4xl font-bold mt-1">
              Featured Tiles
            </h2>
          </div>
          <Link
            href="/all-tiles"
            className="hidden md:flex items-center gap-2 text-sm text-stone hover:text-terracotta transition-colors uppercase tracking-wider"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiles.map((tile) => (
              <TileCard key={tile.id} tile={tile} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/all-tiles"
            className="inline-flex items-center gap-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream px-6 py-2.5 rounded-sm text-sm uppercase tracking-wider transition-colors"
          >
            View All Tiles
          </Link>
        </div>
      </section>

      {/* ── Categories Section ── */}
      <section className="bg-[#EDE4D6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-terracotta text-xs uppercase tracking-[0.3em] font-medium">
              Explore By
            </span>
            <h2 className="font-heading text-charcoal text-3xl md:text-4xl font-bold mt-1">
              Material & Style
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Ceramic", emoji: "🏺", count: "120+" },
              { name: "Marble", emoji: "💎", count: "85+" },
              { name: "Terracotta", emoji: "🧱", count: "64+" },
              { name: "Mosaic", emoji: "🎨", count: "95+" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/all-tiles?category=${cat.name.toLowerCase()}`}
                className="bg-white hover:bg-terracotta group rounded-sm p-6 text-center transition-colors duration-300 border border-[#DDD0BC]"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-heading text-charcoal group-hover:text-cream text-lg font-semibold">
                  {cat.name}
                </h3>
                <p className="text-stone group-hover:text-cream/70 text-xs mt-1">
                  {cat.count} designs
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
