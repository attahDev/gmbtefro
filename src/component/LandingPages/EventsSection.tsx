"use client";
import { ArrowRight, Calendar, Clock, MapPin, Monitor, Users } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

type EventType = "in-person" | "virtual" | "hybrid";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  image: string;
  alt: string;
  type: EventType;
}

const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Tech Networking Mixer",
    description:
      "Connect with fellow tech professionals, entrepreneurs and innovators in Greater Manchester's vibrant tech scene.",
    date: "Nov 15, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Manchester Tech Hub",
    tags: ["Leadership", "Networking", "+1"],
    image: "/events/e1.jpg",
    alt: "Three people engage in lively conversation at a tech expo. One man laughs in a white shirt, while two women gesture animatedly.",
    type: "in-person",
  },
  {
    id: "2",
    title: "AI & Machine Learning Workshop",
    description:
      "Exploring the latest developments in AI and machine learning. Perfect for beginners and experienced developers.",
    date: "Nov 22, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Innovation Centre",
    tags: ["AI/ML", "Coding", "+1"],
    image: "/events/e2.jpg",
    alt: "A person in a beige sweater uses a virtual reality headset in a modern setting, conveying a sense of focus and innovation at a tech summit.",
    type: "hybrid",
  },
  {
    id: "3",
    title: "Virtual Career Panel: Breaking Into Tech",
    description:
      "Exploring the latest developments in AI and machine learning. Perfect for beginners and experienced developers.",
    date: "Nov 28, 2025",
    time: "7:00 PM - 8:30 PM",
    location: "Virtual Event",
    tags: ["AI/ML", "Career", "+1"],
    image: "/events/e3.jpg",
    alt: "Two men seated, conversing in front of a presentation screen. One holds a microphone, gesturing. Background shows colorful data visuals, fostering an engaging atmosphere.",
    type: "virtual",
  },
  {
    id: "4",
    title: "Startup Pitch Night",
    description:
      "Watch Black-led startups pitch their ideas to investors and community members. Networking reception to follow.",
    date: "Dec 5, 2025",
    time: "4:00 PM - 8:30 PM",
    location: "Manchester Business School",
    tags: ["Startups", "Funding", "+1"],
    image: "/events/e6.jpg",
    alt: "A man in a gray hoodie presents to three seated men in a room with white walls and modern lighting. The seated men appear attentive and engaged.",
    type: "in-person",
  },
  {
    id: "5",
    title: "Web Development Bootcamp",
    description:
      "Intensive bootcamp covering modern web development technologies including React, Node.js and cloud deployment.",
    date: "Dec 12, 2025",
    time: "10:00 AM - 4:30 PM",
    location: "Digital Skills Academy",
    tags: ["Mentorship", "Career", "+1"],
    image: "/events/e5.jpg",
    alt: "A group of people are gathered in a brightly lit room with a projector screen in the background. Three men stand near a podium; one is speaking, while others are seated and listening attentively.",
    type: "hybrid",
  },
  {
    id: "6",
    title: "Women in Tech Leadership Summit",
    description:
      "Empowering Black women in tech through leadership workshops, panel discussions and networking opportunities.",
    date: "Dec 18, 2025",
    time: "9:00 AM - 3:30 PM",
    location: "Conference Centre Manchester",
    tags: ["Women in Tech", "Career", "+1"],
    image: "/events/e4.jpg",
    alt: "Four women sit on chairs in a panel discussion. One woman in red speaks into a microphone. Others listen attentively with neutral expressions. A screen in the background reads “Power of Expression.",
    type: "in-person",
  },
];

const FILTERS: { id: string; label: string; type?: EventType | "all" }[] = [
  { id: "all", label: "All Events", type: "all" },
  { id: "in-person", label: "In person", type: "in-person" },
  { id: "virtual", label: "Virtual", type: "virtual" },
  { id: "hybrid", label: "Hybrid", type: "hybrid" },
];

function TypePill({ type }: { type: EventType }) {
  const map: Record<
    EventType,
    { bg: string; text: string; icon: ReactNode; label: string }
  > = {
    "in-person": {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      icon: <MapPin className="w-3.5 h-3.5 text-emerald-700" />,
      label: "In-Person",
    },
    virtual: {
      bg: "bg-sky-100",
      text: "text-sky-800",
      icon: <Monitor className="w-3.5 h-3.5 text-sky-700" />,
      label: "Virtual",
    },
    hybrid: {
      bg: "bg-violet-100",
      text: "text-violet-800",
      icon: <Users className="w-3.5 h-3.5 text-violet-700" />,
      label: "Hybrid",
    },
  };

  const cls = map[type];
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full shadow-sm ${cls.bg} ${cls.text}`}
    >
      {cls.icon}
      {cls.label}
    </span>
  );
}

function getBorderColor(type: EventType): string {
  const borders: Record<EventType, string> = {
    "in-person": "border-[#FAD941]",
    virtual: "border-[#FAD941]",
    hybrid: "border-[#FAD941]",
  };
  return borders[type];
}

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | EventType | string>("all");

  const counts = useMemo(() => {
    const all = EVENTS.length;
    const inPerson = EVENTS.filter((e) => e.type === "in-person").length;
    const virtual = EVENTS.filter((e) => e.type === "virtual").length;
    const hybrid = EVENTS.filter((e) => e.type === "hybrid").length;
    return { all, inPerson, virtual, hybrid };
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return EVENTS;
    return EVENTS.filter((e) => e.type === activeFilter);
  }, [activeFilter]);

  return (
    <section className="w-full bg-[#FFFDF7] py-12 sm:py-16 mt-12 sm:mt-16 md:mt-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block bg-[#F5F5F5] text-[#001F3F] px-3 py-1 rounded-full text-base sm:text-base mb-4">
            Upcoming Events
          </span>

          <h2 className="text-[24px] sm:text-[26px] md:text-[30px] lg:text-[38px] font-bold text-[#001F3F] leading-tight">
            Don’t Miss Out on These Events
          </h2>

          <p className="text-sm sm:text-[18px] md:text-[20px] text-[#6B7280] mt-4 sm:mt-6 leading-relaxed px-2">
            From workshops and networking events to conferences and panel{" "}
            <br className="hidden sm:block" />
            discussions, there’s always something exciting happening in our
            community.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-6">
          {FILTERS.map((f) => {
            const isActive =
              activeFilter === f.type || (f.id === "all" && activeFilter === "all");
            const count =
              f.id === "all"
                ? counts.all
                : f.id === "in-person"
                  ? counts.inPerson
                  : f.id === "virtual"
                    ? counts.virtual
                    : counts.hybrid;

            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.type ?? "all")}
                className={`inline-flex items-center gap-3 px-5 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-200 ${isActive
                    ? "bg-[#FAD941] text-[#001F3F] shadow-[0_4px_0_#D7263D]"
                    : "bg-white text-[#001F3F] border border-slate-100 hover:shadow-sm"
                  }`}
              >
                <span>{f.label}</span>
                <span
                  className={`inline-flex items-center justify-center rounded-full min-w-[22px] sm:min-w-[24px] h-[22px] sm:h-[24px] px-2 text-xs sm:text-sm font-semibold ${isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {filtered.map((ev) => (
            <article
              key={ev.id}
              className={`overflow-hidden rounded-2xl border-[3px] bg-[#FFFDF7] ${getBorderColor(
                ev.type
              )} flex flex-col shadow-[0_5px_12px_rgba(0,31,63,0.14)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,31,63,0.18)]`}
            >
              {/* Image (only this scales on hover) */}
              <div className="group relative h-[190px] overflow-hidden sm:h-[210px]">
                <img
                  src={ev.image}
                  alt={ev.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute right-4 top-4">
                  <TypePill type={ev.type} />
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-md font-semibold text-[#001F3F] sm:text-lg">
                    {ev.title}
                  </h3>
                  <p className="mt-2 text-sm leading-5 text-[#526075] sm:text-[13px]">
                    {ev.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-[#526075] sm:text-[13px]">
                    <li className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 shrink-0 text-[#D7263D]" />
                      <span>{ev.date}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-[#D7263D]" />
                      <span>{ev.time}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 shrink-0 text-[#D7263D]" />
                      <span>{ev.location}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {ev.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-100 px-2 py-1 text-xs text-[#001F3F]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="inline-flex min-h-[46px] w-full items-center justify-center gap-3 rounded-xl bg-[#D7263D] px-4 py-2.5 text-base font-medium text-white transition-colors duration-300 hover:bg-[#B41F33]">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex  justify-center">
          <a
            href="/events"
            className="inline-flex items-center gap-2 rounded-xl bg-[#D7263D] px-5 py-2 text-white shadow transition hover:bg-[#A31F32] sm:gap-3 sm:px-6 sm:py-3"
          >
            View All Events

            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.3335 1.33337V4.00004" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10.6665 1.33337V4.00004" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.6667 2.66663H3.33333C2.59695 2.66663 2 3.26358 2 3.99996V13.3333C2 14.0697 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0697 14 13.3333V3.99996C14 3.26358 13.403 2.66663 12.6667 2.66663Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 6.66663H14" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </a>
        </div>
      </div>
    </section>
  );
}
