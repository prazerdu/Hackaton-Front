export default function BottomNav() {
  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-xs px-6">
      <div className="bg-white rounded-2xl shadow-lg flex items-center justify-between px-4 py-2">
        <button className="flex flex-col items-center text-xs text-gray-500">
          <span className="text-2xl">🏠</span>
          <span>Home</span>
        </button>

        <button className="-mt-6 bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
          🔍
        </button>

        <button className="flex flex-col items-center text-xs text-gray-500">
          <span className="text-2xl">📁</span>
          <span>Saved</span>
        </button>
      </div>
    </nav>
  );
}
