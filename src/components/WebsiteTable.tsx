export default function WebsiteTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Websites</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="pb-2 text-left">Domain</th>
            <th className="pb-2 text-left">Expiration</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-t">
            <td className="py-2">treehousehub.com</td>
            <td>2026-02-25</td>
          </tr>
          <tr className="border-t">
            <td className="py-2">ironoflekswarrior.com</td>
            <td>2026-05-30</td>
          </tr>
          <tr className="border-t">
            <td className="py-2">jomasband.org</td>
            <td>2026-05-26</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
