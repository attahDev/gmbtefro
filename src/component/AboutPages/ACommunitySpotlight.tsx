import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FC } from "react";
import { useEffect, useState } from "react";

interface SpotlightCardProps {
  image: string;
  name: string;
  lname: string;
  description: string;
}

const SpotlightCard: FC<SpotlightCardProps> = ({
  image,
  name,
  lname,
  description,
}) => (
  <div className="flex w-full min-w-full shrink-0 flex-col overflow-hidden rounded-xl border-l-4 border-[#FFD700] bg-white shadow transition-all duration-300 hover:shadow-lg sm:min-w-[calc(50%-12px)] sm:w-[calc(50%-12px)] sm:shrink lg:min-w-[calc(33.333%-16px)] lg:w-[calc(33.333%-16px)]">
    {/* Image Section */}
    <div className="group relative h-56 w-full overflow-hidden sm:h-64 md:h-72">
      <img
        src={image}
        alt={`Headshot of ${name} ${lname}`}
        className="pointer-events-none h-full w-full object-cover object-[50%_10%] transition-transform duration-500 ease-in-out group-hover:scale-110"
        draggable={false}
      />
      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] text-lg font-bold text-[#001F3F] shadow-md sm:top-4 sm:right-4 sm:h-10 sm:w-10 sm:text-xl">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
        >
          <path
            d="M16 3C15.47 3 14.96 3.21 14.59 3.59C14.21 3.96 14 4.47 14 5V11C14 11.53 14.21 12.04 14.59 12.41C14.96 12.79 15.47 13 16 13C16.27 13 16.52 13.11 16.71 13.29C16.89 13.48 17 13.73 17 14V15C17 15.53 16.79 16.04 16.41 16.41C16.04 16.79 15.53 17 15 17C14.73 17 14.48 17.11 14.29 17.29C14.11 17.48 14 17.73 14 18V20C14 20.27 14.11 20.52 14.29 20.71C14.48 20.89 14.73 21 15 21C16.59 21 18.12 20.37 19.24 19.24C20.37 18.12 21 16.59 21 15V5C21 4.47 20.79 3.96 20.41 3.59C20.04 3.21 19.53 3 19 3H16Z"
            stroke="#001F3F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 3C4.47 3 3.96 3.21 3.59 3.59C3.21 3.96 3 4.47 3 5V11C3 11.53 3.21 12.04 3.59 12.41C3.96 12.79 4.47 13 5 13C5.27 13 5.52 13.11 5.71 13.29C5.89 13.48 6 13.73 6 14V15C6 15.53 5.79 16.04 5.41 16.41C5.04 16.79 4.53 17 4 17C3.73 17 3.48 17.11 3.29 17.29C3.11 17.48 3 17.73 3 18V20C3 20.27 3.11 20.52 3.29 20.71C3.48 20.89 3.73 21 4 21C5.59 21 7.12 20.37 8.24 19.24C9.37 18.12 10 16.59 10 15V5C10 4.47 9.79 3.96 9.41 3.59C9.04 3.21 8.53 3 8 3H5Z"
            stroke="#001F3F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>

    {/* Card Content */}
    <div className="flex grow flex-col gap-2 p-7 sm:p-8">
      <h3 className="text-lg font-extrabold text-[#001F3F] sm:text-xl">
        {name} <span className="text-[#D7263D]">{lname}</span>
      </h3>
      <p className="grow text-sm leading-relaxed text-gray-700 sm:text-base">
        {description}
      </p>
    </div>
  </div>
);

const cards = [
  {
    image: "/about/spolight/mrmike.jpeg",
    name: "Michael",
    lname: "Ekpechue",
    role: "Software Engineer at MediaCityUK",
    description:
      "Black Tech Expo isn’t just an event. It’s a movement built on purpose, progress, and people",
  },
  {
    image: "/about/spolight/annate.jpeg",
    name: "Annette",
    lname: "Joseph",
    role: "Tech Entrepreneur & Founder",
    description:
      "Innovation begins when voices long silenced are finally heard. Every idea deserves a seat at the table, that’s how transformation begins.",
  },
  {
    image: "/about/spolight/mary.jpeg",
    name: "Mary",
    lname: "Fashanu",
    role: "UX Designer at Manchester Digital",
    description:
      "This is just the beginning. Let’s build local, scale global. The power of visibility changes everything when women see each other rise",
  },
  {
    image: "/spotlight/bimbo.png",
    name: "Bimbo",
    lname: "Ponmile",
    role: "Tech Entrepreneur & Founder",
    description:
      "Let’s keep building workplaces where people dont have to shrink to succeed",
  },
];

const SWIPE_OFFSET = 60;
const SWIPE_VELOCITY = 500;

const ACommunitySpotlight: FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setItemsPerView(3);
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    setStartIndex(0);
  }, [itemsPerView]);

  const maxStartIndex = Math.max(cards.length - itemsPerView, 0);
  const canPrev = startIndex > 0;
  const canNext = startIndex < maxStartIndex;

  const handleNext = () => {
    if (!canNext) return;
    setStartIndex((prev) => Math.min(prev + itemsPerView, maxStartIndex));
  };

  const handlePrev = () => {
    if (!canPrev) return;
    setStartIndex((prev) => Math.max(prev - itemsPerView, 0));
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY) {
      handleNext();
    } else if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY) {
      handlePrev();
    }
  };

  const displayed = cards.slice(startIndex, startIndex + itemsPerView);

  return (
    <section className="relative overflow-hidden bg-linear-to from-[#FFFEFB] to-white px-4 py-20 sm:py-24 md:px-8 lg:px-16">
      <div className="relative mx-auto max-w-[1500px]">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16">
          <span className="mb-5 rounded-full bg-gray-100 px-4 py-2 text-sm font-normal tracking-wider text-gray-700 sm:px-5">
            Featured Stories
          </span>
          <h2 className="mt-4 mb-2 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-3xl">
            Community Spotlight
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
            Stories that show how technology is changing lives across Manchester.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-2 flex w-full items-center justify-center">
          {/* Left Button — overlaps left card edge */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous stories"
            aria-disabled={!canPrev}
            className={`absolute left-2 z-20 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full shadow-md transition sm:flex md:left-0 md:h-12 md:w-12 ${
              canPrev
                ? "bg-[#001F3F] text-white hover:scale-105"
                : "cursor-not-allowed bg-[#001F3F]/40 text-white/35"
            }`}
          >
            <ChevronLeft size={22} />
          </button>

          <div className="w-full overflow-hidden touch-pan-y">
            <AnimatePresence mode="wait">
              <motion.div
                key={startIndex}
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
                transition={{ duration: 0.45 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={handleDragEnd}
                className="flex cursor-grab flex-nowrap justify-start gap-4 active:cursor-grabbing sm:cursor-default sm:gap-6 sm:justify-between"
              >
                {displayed.map((card, index) => (
                  <SpotlightCard key={`${card.name}-${card.lname}-${index}`} {...card} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Button — overlaps right card edge */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next stories"
            aria-disabled={!canNext}
            className={`absolute right-2 z-20 hidden h-11 w-11 translate-x-1/2 items-center justify-center rounded-full shadow-md transition sm:flex md:right-0 md:h-12 md:w-12 ${
              canNext
                ? "bg-[#001F3F] text-white hover:scale-105"
                : "cursor-not-allowed bg-[#001F3F]/40 text-white/35"
            }`}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Mobile dot indicators */}
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          {Array.from({ length: Math.ceil(cards.length / itemsPerView) }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setStartIndex(Math.min(i * itemsPerView, maxStartIndex))}
              className={`h-2 rounded-full transition-all ${
                Math.floor(startIndex / itemsPerView) === i
                  ? "w-6 bg-[#001F3F]"
                  : "w-2 bg-[#001F3F]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ACommunitySpotlight;
