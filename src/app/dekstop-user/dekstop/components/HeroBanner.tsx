import Carousel from "./Carrossel";

export default function HeroBanner() {
  const images = [
    // "https://i.pinimg.com/736x/72/e2/0d/72e20dd3a0d3d1b28c5d8f3d874f6f16.jpg",
    "https://i.pinimg.com/1200x/b6/2e/60/b62e601d24dbb13caa4beb4ec9ced105.jpg",
    "https://i.pinimg.com/1200x/b6/2e/60/b62e601d24dbb13caa4beb4ec9ced105.jpg",
    "https://i.pinimg.com/1200x/b6/2e/60/b62e601d24dbb13caa4beb4ec9ced105.jpg",
    // "https://i.pinimg.com/1200x/8f/7d/62/8f7d6231bf261077cd00951f73ca7e14.jpg",
  ];

  return (
    <section className="relative w-full h-80 bg-gray-200 rounded-xl overflow-hidden">
      <Carousel images={images} />

      {/* <div className="absolute top-6 left-6 text-white drop-shadow-lg">
        <h2 className="text-2xl font-semibold">Bom dia ...</h2>   */}
        {/* vai ser o nome do usuario */}
        {/* <p className="mt-1 text-sm opacity-90">
          Você tem 19 novos desafios. Toque para começar */}
          {/* a quantidade de desafios vai mudar de 12 em 12h */}
        {/* </p>
        <div className="mt-4"> */}
          {/* <button className="px-4 py-2 bg-blue-900 text-white rounded-md">
            Clique aqui
          </button> */}

        {/* </div> */}
      {/* </div> */}
    </section>
  );
}
