"use client";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import HireCards from "@/app/dekstop-user/dekstop/components/HireCards";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: string;
  price: string;
  avatar: string;
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Card do médico */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 text-gray-600 font-semibold bg-white rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md transition"
      >
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="text-sm font-semibold">{doctor.name}</div>
          <div className="text-xs text-gray-500">
            {doctor.specialty} · {doctor.rating}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-xs text-gray-500">From</div>
          <div className="text-sm font-semibold">{doctor.price}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="mt-1 bg-teal-600 text-white text-xs px-3 py-1 rounded-md"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal com animação */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setIsOpen(false)}
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
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          {/* Conteúdo do modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
                <div className="mt-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <p className="mt-3 text-center font-semibold">{doctor.price}</p>
                </div>
                <Dialog.Title className="text-lg font-bold">
                  {doctor.name}
                </Dialog.Title>
                <p className="text-sm text-gray-500">
                  {doctor.specialty} · {doctor.rating}
                </p>

                <div className="mt-6 flex justify-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-7 py-2 text-sm rounded-md shadow-md"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm rounded-md bg-teal-600 text-white">
                    Confirmar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
