"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Activity,
  CheckSquare,
  BarChart2,
  Grid,
  Settings,
  FileText,
  Inbox,
  ChevronDown,
  ChevronUp,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  //  Se o usuario marcar pra sidebar fechar, quando reiniciar a pagina, mantem fechada
  useEffect(() => {
    const saved = localStorage.getItem("sidebarOpen");
    if (saved !== null) {
      setOpen(saved === "true");
    }
  }, []);

  // Salvar sempre que mudar
  useEffect(() => {
    localStorage.setItem("sidebarOpen", String(open));
  }, [open]);

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white flex flex-col p-4 transform transition-transform duration-300 z-20
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-500"></div>
          <div>
            <h1 className="text-sm font-semibold">Usuario X</h1>
            <p className="text-xs text-gray-500">ananan@gmail.com</p>
          </div>
        </div>

        {/* Switch - Mostrar/Esconder */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
          >
            <LayoutDashboard size={18} />{" "}
            {open ? "Mostrar barra lateral" : "Esconder barra lateral"}
          </button>

          {/* Toggle estilizado */}
          <div
            onClick={() => setOpen(!close)}
            className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition
              ${open ? "bg-blue-100" : "bg-gray-200"}`}
          >
            <div
              className={`w-4 h-4 rounded-full shadow-md transform transition
                ${open ? "translate-x-5 bg-blue-600" : "translate-x-0 bg-gray-400"}`}
            />
          </div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1 text-sm">
          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <LayoutDashboard size={16} /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <Activity size={16} /> Activity
            </span>
            <span className="bg-gray-200 text-xs px-2 rounded">10</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <CheckSquare size={16} /> My tasks
            </span>
            <span className="bg-gray-200 text-xs px-2 rounded">8</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <BarChart2 size={16} /> Analytics
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <Grid size={16} /> Projects
          </a>

          {/* Settings Dropdown */}
          <div>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Settings size={16} /> Settings
              </span>
              {settingsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {settingsOpen && (
              <div className="ml-6 flex flex-col gap-1 mt-1">
                <a href="#" className="px-2 py-1 rounded-lg hover:bg-gray-100">
                  General
                </a>
                <a href="#" className="px-2 py-1 rounded-lg hover:bg-gray-100">
                  Domains
                </a>
                <a href="#" className="px-2 py-1 rounded-lg hover:bg-gray-100">
                  Integrations
                </a>
                <a
                  href="#"
                  className="px-2 py-1 rounded-lg bg-blue-50 text-blue-600"
                >
                  Billing
                </a>
                <a href="#" className="px-2 py-1 rounded-lg hover:bg-gray-100">
                  Payouts
                </a>
              </div>
            )}
          </div>

          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <FileText size={16} /> Documentation
          </a>
          <a
            href="#"
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <Inbox size={16} /> Inbox
            </span>
            <span className="bg-gray-200 text-xs px-2 rounded">2</span>
          </a>
        </nav>

      </aside>

      {/* Ícone pra quando sidebar estiver fechada */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="absolute top-6 left-5 p-2 rounded-md z-10"
        >
          <Menu size={24} className="text-teal-600" />
        </button>
      )}

      {/* Conteúdo principal */}
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          open ? "ml-64" : "ml-0"
        }`}
      >
      </main>
    </div>
  );
}
