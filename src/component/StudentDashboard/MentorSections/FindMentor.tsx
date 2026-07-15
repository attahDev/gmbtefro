export default function FindMentor() {
  const mentors = [
    {
      name: "James Ade",
      role: "Software Engineer, Google",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      badges: ["Career Growth", "UX Design", "Leadership"],
      description:
        "Passionate about bridging creativity and real world design for impactful products.",
    },
    {
      name: "Elena Rodriguez",
      role: "Software Engineer, Google",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      badges: ["Career Growth", "UX Design", "Leadership"],
      description:
        "Helping students navigate the exciting world of artificial intelligence and data science.",
    },
    {
      name: "David Chen",
      role: "Software Engineer, Google",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      badges: ["Career Growth", "UX Design", "Leadership"],
      description:
        "Dedicated to building a safer digital world through mentorship and education.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2545] mb-2">Find a Mentor</h2>
      <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-3xl">
        Explore experienced professionals ready to guide your career in tech.
      </p>

      {/* Filters + Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">

        {/* Filters (LEFT) */}
        <div className="flex gap-2 sm:gap-3 lg:gap-4 flex-wrap">
          {["UI/UX", "Engineering", "Marketing", "AI", "Cybersecurity"].map(
            (filter) => (
              <button
                key={filter}
                className="
                  px-3 sm:px-4 lg:px-6 
                  py-1.5 sm:py-2
                  rounded-lg sm:rounded-xl
                  border-2 border-[#FFD700]
                  text-[#0B2545]
                  text-xs sm:text-sm lg:text-base
                  font-medium
                  bg-white
                  hover:bg-yellow-50
                  transition
                "
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Search (RIGHT) */}
        <div className="w-full min-w-0 lg:max-w-xl lg:shrink-0">
          <div className="bg-gray-100 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-3 text-[#6B7280]">
            <span className="text-lg sm:text-xl flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9998 14L11.1064 11.1067" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search for mentors and career leaders..."
              className="bg-transparent outline-none w-full text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
            />
          </div>
        </div>
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {mentors.map((m, index) => (
          <div
            key={index}
            className="bg-[#FFFDF7] rounded-2xl sm:rounded-3xl shadow-md p-4 sm:p-5 lg:p-6 flex flex-col border border-[#0000001A] hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="relative flex-shrink-0">
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-16 w-16 rounded-full object-cover sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20"
                />
                <span className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 bg-[#00C950] border-2 border-white rounded-full"></span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#0B2545] truncate">{m.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm truncate">{m.role}</p>

                {/* Rating */}
                <div className="flex text-[#D7263D] mt-1 text-sm sm:text-base">{'★★★★★'}</div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 sm:gap-3 flex-wrap mb-3 sm:mb-4">
              {m.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 sm:px-3 lg:px-4 py-1 bg-yellow-50 text-[#001F3F] rounded-lg sm:rounded-xl border border-yellow-100 text-xs"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-[#4A5565] text-xs sm:text-sm mb-4 sm:mb-5 lg:mb-6 leading-relaxed flex-grow">
              {m.description}
            </p>

            <button className="w-full bg-[#D7263D] hover:bg-[#B91C32] text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition">
              Request Mentorship
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}