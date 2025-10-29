"use client";

export function InlineProgress({ value }: { value: number }) {
  const width = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full h-2 rounded-full overflow-hidden bg-gray-200">
      <div
        style={{ width: `${width}%` }}
        className="h-full bg-blue-500 transition-all"
      />
    </div>
  );
}
