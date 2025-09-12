"use client";

import { useState } from "react";
import Navbar from "./NavBar";
import ProductCard from "./ProductCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Dashboard() {
  const [products, setProducts] = useState<{ id: string; title: string }[]>([]);
  const [newListTitle, setNewListTitle] = useState(""); 
  const [isAdding, setIsAdding] = useState(false); 

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reordered = Array.from(products);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setProducts(reordered);
  };

  const addNewCard = () => {
    if (!newListTitle.trim()) return;

    const newId = (products.length + 1).toString();
    setProducts([...products, { id: newId, title: newListTitle }]);
    setNewListTitle("");
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] p-8">
      <Navbar />

      <div className="mt-10">
        <h1 className="text-2xl font-bold text-gray-800">Hello Martin!</h1>
        <p className="text-gray-500 text-sm">
          Welcome to your overview of your account.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          My Products
        </h2>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="products" direction="horizontal">
            {(provided) => (
              <div
                className="flex gap-6 overflow-x-auto pb-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {products.map((product, index) => (
                  <Draggable key={product.id} draggableId={product.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cursor-grab"
                      >
                        <ProductCard title={product.title} />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}

                {/* Botão de Add Card */}
                <div className="flex-none">
                  {!isAdding ? (
                    <button
                      onClick={() => setIsAdding(true)}
                      className="bg-gradient-to-tr from-blue-500 to-purple-500 
                                 rounded-2xl p-6 flex flex-col items-center justify-center 
                                 text-white shadow-md hover:scale-105 transition"
                    >
                      <span className="text-lg font-semibold">
                        {products.length === 0 ? "Adicionar uma lista" : "+ Add new"}
                      </span>
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Nome da lista"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        className="p-2 border rounded w-40"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addNewCard();
                        }}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addNewCard}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                          Adicionar
                        </button>
                        <button
                          onClick={() => {
                            setIsAdding(false);
                            setNewListTitle("");
                          }}
                          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
}
