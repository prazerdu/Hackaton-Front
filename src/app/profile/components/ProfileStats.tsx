"use client";

export default function ProfileStats() {
  return (
    <div className="flex justify-center gap-4 text-gray-800 mt-6">
      <div className="w-24 h-24 flex flex-col items-center justify-center bg-white shadow-md rounded-xl">
        <span className="font-semibold text-lg">112</span>
        <span className="text-gray-500 text-xs sm:text-sm">Following</span>
      </div>

      <div className="w-24 h-24 flex flex-col items-center justify-center bg-white shadow-md rounded-xl">
        <span className="font-semibold text-lg">627</span>
        <span className="text-gray-500 text-xs sm:text-sm">Likes</span>
      </div>

      <div className="w-24 h-24 flex flex-col items-center justify-center bg-white shadow-md rounded-xl">
        <span className="font-semibold text-lg">8</span>
        <span className="text-gray-500 text-xs sm:text-sm">Collections</span>
      </div>
    </div>
  );
}
