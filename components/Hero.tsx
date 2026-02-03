export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Large Background Text */}
      <div className="relative w-full flex items-center justify-center pointer-events-none mb-8">
        <h2 className="text-[30vw] xl:text-[25rem] font-bold text-gray-800/20 select-none leading-none hello">
          Hello
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-semibold text-white">
          👋 I&apos;m Matthew Gajo
        </h1>
        <p className="text-xl text-text-muted mb-3 font-semibold">
          Full-Stack Software Engineer
        </p>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#80EFB6]/10 rounded-full">
          <div className="w-2 h-2 bg-[#80EFB6] rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">
            Open to all opportunities
          </span>
        </div>
      </div>
    </section>
  );
}
