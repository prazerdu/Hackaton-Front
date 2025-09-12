type Category = {
  id: number;
  label: string;
  icon: string;
};

export default function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold">Find your doctor</h4>
        <button className="text-xs text-teal-600">See all</button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex-shrink-0 w-20 h-20 bg-white rounded-xl flex flex-col items-center justify-center shadow-sm"
          >
            <div className="text-2xl">{c.icon}</div>
            <div className="text-xs mt-2 text-gray-600 text-center">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
