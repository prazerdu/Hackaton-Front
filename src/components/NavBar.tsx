import Image from "next/image";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white rounded-2xl shadow-sm px-8 py-4">
      {/* Logo + Menu */}
      <div className="flex items-center gap-10">
        <span className="text-xl font-bold text-indigo-600">sheeld</span>
        <nav className="flex gap-6 text-gray-600 font-medium text-sm">
          <a href="#" className="text-indigo-600">Dashboard</a>
          <a href="#">Marketplace</a>
          <a href="#">Hosting</a>
          <a href="#">Domains</a>
        </nav>
      </div>

      {/* Botões */}
      <div className="flex items-center gap-4">
        <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm hover:bg-gray-50 transition">
          Select Account
        </button>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          Launch cPanel
        </button>
        <Image
          width={200}
          height={200}
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-9 h-9 rounded-full border border-gray-200"
        />
      </div>
    </header>
  );
}
