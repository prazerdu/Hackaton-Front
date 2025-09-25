
import Image from "next/image";

export default function Banner() {
  return (
    <section className="mt-6 mb-4 space-y-4">
      <HeroBanner />
      
      {/* <div className="relative rounded-xl bg-teal-600 text-white p-4 flex gap-3 items-center">
        <div className="flex-1">
          <h3 className="text-sm font-semibold">Looking for</h3>
          <p className="text-base font-bold">desired doctor?</p>
          <button className="mt-3 bg-white/20 px-3 py-1 rounded-md text-sm">
            Search now
          </button>
        </div>
        <Image
          width={200}
          height={200}
          src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400"
          alt="doctor"
          className="w-20 h-20 rounded-lg object-cover shadow-md"
        />
      </div> */}
    </section>
  );
}
