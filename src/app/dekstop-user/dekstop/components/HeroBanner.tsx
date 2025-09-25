import Carousel from "./Carrossel";

export default function HeroBanner() {
  const images = [
    "https://i.pinimg.com/1200x/b6/2e/60/b62e601d24dbb13caa4beb4ec9ced105.jpg",
    "https://i.pinimg.com/1200x/b6/2e/60/b62e601d24dbb13caa4beb4ec9ced105.jpg",
    "https://i.pinimg.com/1200x/b6/2e/60/b62e601d24dbb13caa4beb4ec9ced105.jpg",
  ];

  return (
   <section className="relative w-full h-56 md:h-80 bg-gray-200 rounded-xl overflow-hidden">
  <Carousel images={images} />
</section>

  );
}
