export default function VideoTips() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Video Guides & Tips</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-pink-50 p-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-pink-100 transition">
          <span className="bg-pink-500 text-white p-2 rounded-lg text-xs">▶</span>
          <p className="text-sm font-medium text-gray-700">5 tips to make your site easier...</p>
        </div>
        <div className="bg-pink-50 p-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-pink-100 transition">
          <span className="bg-pink-500 text-white p-2 rounded-lg text-xs">▶</span>
          <p className="text-sm font-medium text-gray-700">Setting up your first theme...</p>
        </div>
        <div className="bg-pink-50 p-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-pink-100 transition">
          <span className="bg-pink-500 text-white p-2 rounded-lg text-xs">▶</span>
          <p className="text-sm font-medium text-gray-700">3 ways to increase traffic...</p>
        </div>
      </div>
    </div>
  );
}
