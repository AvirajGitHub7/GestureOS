export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="logo-grad-primary" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /> {/* violet-500 */}
          <stop offset="1" stopColor="#D946EF" /> {/* fuchsia-500 */}
        </linearGradient>
        <linearGradient id="logo-grad-secondary" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /> {/* indigo-500 */}
          <stop offset="1" stopColor="#C026D3" /> {/* fuchsia-600 */}
        </linearGradient>
      </defs>
      
      {/* Inspired by the top-right / top-middle modern geometric shapes */}
      {/* Outer V Shape */}
      <path d="M 15 20 L 50 85 L 85 20 L 60 20 L 50 45 L 40 20 Z" fill="url(#logo-grad-primary)" />
      
      {/* Inner abstract core / floating triangle */}
      <path d="M 35 20 L 65 20 L 50 55 Z" fill="url(#logo-grad-secondary)" />
    </svg>
  );
}
