"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { categories as categoryData } from "@/lib/doctors";

type Category = {
  id: number;
  label: string;
  icon: string;
};

export default function     Categories() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="mt-6">
      <h2 className="text-sm font-semibold mb-3">Specialties</h2>

      {/* Lista de categorias */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categoryData.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition"
          >
            {/* ícone em cima */}
            <span className="text-4xl">{cat.icon}</span>
            {/* nome embaixo */}
            <p className="text-xs mt-2 text-gray-600 font-semibold">{cat.label}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Transition appear show={!!selectedCategory} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setSelectedCategory(null)}
          className="relative z-50 text-gray-700"
        >
          {/* Fundo escuro */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>

          {/* Conteúdo do modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-6 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-6 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
                {selectedCategory && (
                  <>
                    <div className="flex flex-col items-center">
                      {/* ícone em cima */}
                      <span className="text-6xl">{selectedCategory.icon}</span>
                      {/* nome */}
                      <h3 className="mt-3 text-lg font-bold text-center">
                        {selectedCategory.label}
                      </h3>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="px-5 py-2 text-sm rounded-md bg-teal-600 text-white"
                      >
                        Fechar
                      </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
