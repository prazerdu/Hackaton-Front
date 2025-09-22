import Carousel from "./Carrossel";

export default function HeroBanner() {
  const images = [
    "https://i.pinimg.com/736x/72/e2/0d/72e20dd3a0d3d1b28c5d8f3d874f6f16.jpg",
    "https://i.pinimg.com/1200x/96/80/03/96800303d257eb3dab691f0aea9b3bc6.jpg",
    "https://i.pinimg.com/736x/c1/ff/9e/c1ff9eaf00a160c4724df31b42118b40.jpg",
  ];

  return (
    <section className="relative w-full h-80 bg-gray-200 rounded-xl overflow-hidden">
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
