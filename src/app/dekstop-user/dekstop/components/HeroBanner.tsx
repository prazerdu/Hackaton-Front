import Carousel from "./Carrossel";

export default function HeroBanner() {
  const images = [
    "https://picsum.photos/800/400?1",
    "https://picsum.photos/800/400?2",
    "https://picsum.photos/800/400?3",
  ];

  return (
    <section className="relative w-full h-64 bg-gray-200 rounded-xl overflow-hidden">
      <Carousel images={images} />

      {/* Texto sobre o carrossel */}
      <div className="absolute top-6 left-6 text-white drop-shadow-lg">
        <h2 className="text-2xl font-semibold">Good Morning Sara</h2>
        <p className="mt-1 text-sm opacity-90">
          You have 25 new applications. It's a lot of work for today! So let's start.
        </p>
        <div className="mt-4">
          <button className="bg-white/20 px-3 py-2 rounded-md text-sm">
            Review all
          </button>
        </div>
      </div>
    </section>
  );
}
