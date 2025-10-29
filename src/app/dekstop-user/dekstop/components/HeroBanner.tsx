import Carousel from "./Carrossel";

export default function HeroBanner() {
  const images = [
    "https://i.pinimg.com/1200x/b3/be/3a/b3be3a3d7253c5e0d796574cae5a3391.jpg",
    "https://i.pinimg.com/1200x/0d/13/46/0d1346fe637831714d4a0a704c4c48a8.jpg",
    "https://i.pinimg.com/736x/8d/10/e5/8d10e56b7a906782808833a3ee9a62f4.jpg",
  ];

  return (
   <section className="relative w-full h-60 md:h-96 rounded-xl overflow-hidden">
  <Carousel images={images} />
</section>

  );
}
