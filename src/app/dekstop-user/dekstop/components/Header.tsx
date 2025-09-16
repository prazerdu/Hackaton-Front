import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div className="flex justify-center items-center relative">
          <input
            className="w-[420px] rounded-full border border-gray-200 px-4 py-2 pl-10 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search something..."
          />
          <svg
            className="w-5 h-5 absolute left-4 top-2 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Add New button */}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow">
          Add New
        </button>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-medium">Sara Abraham</div>
          <div className="text-xs text-gray-400">View profile</div>
        </div>
        <Image
          src="https://i.pravatar.cc/40?img=32"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />

      </div>
    </header>
  );
}
