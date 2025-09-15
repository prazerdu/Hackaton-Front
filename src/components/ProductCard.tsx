"use client";

import { useState } from "react";

type Props = {
  title: string;
};

export default function ProductCard({ title }: Props) {
  const [items, setItems] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem]);
      setNewItem("");
      setAdding(false);
    }
  };

  return (
    <div className="bg-[#111] text-white rounded-lg p-4 w-64 shadow-md">
      {/* Título */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{title}</h3>
        <button className="text-gray-400 hover:text-gray-200">⋯</button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800 text-sm rounded-md px-3 py-2 shadow-sm"
          >
            {item}
          </div>
        ))}

        {/* Adicionar novo card */}
        {adding ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="w-full rounded-md px-2 py-1 text-white text-sm outline-none"
              placeholder="Digite o título..."
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Adicionar
              </button>
              <button
                onClick={() => {
                  setAdding(false);
                  setNewItem("");
                }}
                className="text-gray-400 text-xs hover:text-gray-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mt-2"
          >
            + Adicionar um card
          </button>
        )}
      </div>
    </div>
  );
}
