export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl p-6 mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">Good Morning Sara</h2>
        <p className="mt-1 text-sm opacity-90">
          You have 25 new applications. It's a lot of work for today! So let's
          start.
        </p>
        <div className="mt-4">
          <button className="bg-white/20 px-3 py-2 rounded-md text-sm">
            Review all
          </button>
        </div>
      </div>

      <div className="w-44 h-36 bg-white/10 rounded-lg flex items-center justify-center">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2c2.761 0 5 2.239 5 5v2h-10V7c0-2.761 2.239-5 5-5z"
            fill="#fff"
            fillOpacity="0.9"
          />
          <path
            d="M6 15c0-3.314 2.686-6 6-6s6 2.686 6 6v1H6v-1z"
            fill="#fff"
            fillOpacity="0.6"
          />
        </svg>
      </div>
    </section>
  );
}
