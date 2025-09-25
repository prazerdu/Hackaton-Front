const rows = [
  { id: 1, name: "John Doe", role: "UI/UX Designer", status: "Tech Interview" },
  { id: 2, name: "Sam Emmanuel", role: "UI/UX Designer", status: "Task" },
  { id: 3, name: "John Samuel", role: "PHP Developer", status: "Resume Review" },
  { id: 4, name: "Jane Doe", role: "Content Designer", status: "Final Interview" },
];

export default function RecruitmentTable() {
  return (
    <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Recruitment Progress</h4>
        <button className="text-sm text-indigo-600  cursor-pointer">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400">
              <th className="py-2">Full name</th>
              <th className="py-2">Designation</th>
              <th className="py-2">Status</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-3">{r.name}</td>
                <td>{r.role}</td>
                <td>{r.status}</td>
                <td className="text-right">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
