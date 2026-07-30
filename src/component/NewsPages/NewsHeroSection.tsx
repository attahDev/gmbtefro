import React from "react";

const NewsHeroSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 sm:py-28 md:py-32 flex items-center justify-center text-center overflow-hidden bg-[#001F3F]">
      {/* Yellow gradient glow at bottom, same treatment as EventHeroSection */}
      <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-yellow-400/60 via-yellow-400/30 to-transparent blur-2xl" />

      <div className="relative z-10 text-[#FFFDF7] px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-extrabold leading-tight mb-4">
          News &amp; Updates
        </h1>

        <p className="font-open-sans mt-4 sm:mt-6 text-[16px] sm:text-[18px] md:text-[22px] text-[#FFFDF7CC]/80 max-w-3xl mx-auto leading-relaxed px-2">
          Announcements, press coverage, and updates from across the GMBTE community.
        </p>
      </div>
    </section>
  );
};

export default NewsHeroSection;
