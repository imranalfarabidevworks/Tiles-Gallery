export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <div className="relative w-16 h-16">
        <div className="loader-ring w-16 h-16" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="9" height="9" fill="#C4622D" opacity="0.9"/>
            <rect x="13" y="2" width="9" height="9" fill="#C4A882" opacity="0.9"/>
            <rect x="2" y="13" width="9" height="9" fill="#C4A882" opacity="0.9"/>
            <rect x="13" y="13" width="9" height="9" fill="#C4622D" opacity="0.9"/>
          </svg>
        </div>
      </div>
      <p className="text-stone text-sm uppercase tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  );
}
