export default function InvoiceTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Invoicing</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="pb-2 text-left">Invoice</th>
            <th className="pb-2 text-left">Package</th>
            <th className="pb-2 text-left">Due Date</th>
            <th className="pb-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-t">
            <td className="py-2">6313807</td>
            <td>Cloud Hatchling</td>
            <td className="text-red-500 font-medium">2023-06-04</td>
            <td>$2.99</td>
          </tr>
          <tr className="border-t">
            <td className="py-2">6318879</td>
            <td>Find 1 Month</td>
            <td className="text-green-500 font-medium">2023-06-12</td>
            <td>$2.99</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
