export default function LoadingSpinner({ text = "Loading tiles..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-tile-sand/30 border-t-tile-terracotta rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-tile-terracotta/20 rounded-sm rotate-45" />
        </div>
      </div>
      <p className="font-mono text-sm text-tile-slate/50 tracking-widest uppercase">
        {text}
      </p>
    </div>
  );
}

export function TileCardSkeleton() {
  return (
    <div className="bg-white rounded-sm border border-tile-sand/20 overflow-hidden">
      <div className="h-52 skeleton-tile" />
      <div className="p-4 space-y-3">
        <div className="h-5 skeleton-tile rounded w-3/4" />
        <div className="h-4 skeleton-tile rounded w-full" />
        <div className="h-4 skeleton-tile rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 skeleton-tile rounded w-16" />
          <div className="h-8 skeleton-tile rounded w-24" />
        </div>
      </div>
    </div>
  );
}
