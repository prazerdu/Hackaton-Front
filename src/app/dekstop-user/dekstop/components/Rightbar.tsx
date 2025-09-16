import Image from "next/image";

const applicants = [
  "Mike Tyson",
  "Zara Thomas",
  "Neeru Abraham",
  "John Samuel",
  "Zara Thomas",
];

export default function Rightbar() {
  return (
    <aside className="w-72 bg-white/95 border-l border-gray-100 p-6 flex flex-col gap-6">
      {/* Calendar */}
      <div>
        <div className="text-sm font-medium">Schedule Calendar</div>
        <div className="mt-3 bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-400">May</div>
          <div className="flex gap-1 mt-2">
            <div className="px-2 py-1 rounded bg-white text-xs">Mon</div>
            <div className="px-2 py-1 rounded bg-white text-xs">Tue</div>
            <div className="px-2 py-1 rounded bg-indigo-600 text-white text-xs">Wed</div>
            <div className="px-2 py-1 rounded bg-white text-xs">Thu</div>
            <div className="px-2 py-1 rounded bg-white text-xs">Fri</div>
          </div>
        </div>
      </div>

      {/* Applicants */}
      <div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">New Applicants</div>
          <div className="text-xs text-indigo-600">View All</div>
        </div>

        <ul className="mt-3 space-y-3">
          {applicants.map((a, i) => (
            <li key={i} className="flex items-center gap-3">
              <Image
                src={`https://i.pravatar.cc/32?img=${i + 10}`}
                alt={`Avatar ${i + 10}`}
                width={32}
                height={32}
                className="rounded-full"
              />

              <div className="flex-1 text-sm">{a}</div>
              <div className="text-xs text-gray-400">2m</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Training */}
      <div>
        <div className="text-sm font-medium">Ready For Training</div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-2 rounded-lg text-center text-xs">Mike</div>
          <div className="bg-gray-50 p-2 rounded-lg text-center text-xs">Anna</div>
          <div className="bg-gray-50 p-2 rounded-lg text-center text-xs">John</div>
          <div className="bg-gray-50 p-2 rounded-lg text-center text-xs">Sara</div>
        </div>
      </div>
    </aside>
  );
}
