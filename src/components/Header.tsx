export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80"
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-xs text-gray-500">Welcome Back</p>
          <p className="text-sm text-gray-500 font-semibold">Mr. William</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xl text-gray-400">
        <button>🔔</button>
        <button>⚙️</button>
      </div>
    </header>
  );
}
