import type { JSX } from "react";

export interface StatItem {
  label: string;
  value: string;
  icon: JSX.Element;
  iconBg: string;
}

export interface MentorItem {
  name: string;
  role: string;
  tags: string[];
  progress: string;
  image: string;
  cta: string;
  type: "schedule" | "resume";
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "danger";
}

// ------------------------------------------------------------
// UI COMPONENTS (Card + Button)
// ------------------------------------------------------------

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`rounded-2xl border bg-[#FFFDF7] shadow-sm ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = "" }: CardProps) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold text-gray-900">{children}</h3>
);

export const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const Button = ({ children, className = "", variant = "default", ...props }: ButtonProps) => {
  const base =
    "px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  } as const;

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ------------------------------------------------------------
// MOCK DATA (Stats + Mentors)
// ------------------------------------------------------------

const stats: StatItem[] = [
  {
    label: "Skills Developed", iconBg: "bg-green-100", value: "12", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 7H22V13" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    )
  },
  {
    label: "Total Sessions", iconBg: "bg-blue-100", value: "23", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2V6" stroke="#193CB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2V6" stroke="#193CB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#193CB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10H21" stroke="#193CB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    )
  },
  {
    label: "Network Growth", value: "+8", iconBg: "bg-gray-200", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="#002147" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3.12793C16.8578 3.3503 17.6174 3.85119 18.1597 4.55199C18.702 5.25279 18.9962 6.11382 18.9962 6.99993C18.9962 7.88604 18.702 8.74707 18.1597 9.44787C17.6174 10.1487 16.8578 10.6496 16 10.8719" stroke="#002147" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 20.9999V18.9999C21.9993 18.1136 21.7044 17.2527 21.1614 16.5522C20.6184 15.8517 19.8581 15.3515 19 15.1299" stroke="#002147" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#002147" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    )
  },
  {
    label: "Career Readiness", iconBg: "bg-yellow-100", value: "75%", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.4768 12.8899L16.9918 21.4159C17.0087 21.5163 16.9946 21.6195 16.9514 21.7116C16.9081 21.8038 16.8377 21.8806 16.7497 21.9317C16.6616 21.9828 16.56 22.0058 16.4586 21.9976C16.3571 21.9894 16.2605 21.9504 16.1818 21.8859L12.6018 19.1989C12.4289 19.0698 12.219 19 12.0033 19C11.7875 19 11.5776 19.0698 11.4048 19.1989L7.81875 21.8849C7.74007 21.9493 7.64361 21.9882 7.54225 21.9964C7.44088 22.0046 7.33942 21.9817 7.25141 21.9308C7.16341 21.8798 7.09303 21.8032 7.04967 21.7112C7.00631 21.6192 6.99204 21.5162 7.00875 21.4159L8.52275 12.8899" stroke="#FFB81C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14Z" stroke="#FFB81C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    )
  },
];

const mentors: MentorItem[] = [
  {
    name: "Sophia Turner",
    role: "Software Engineer, Google",
    tags: ["Career Growth", "UX Design", "Leadership"],
    progress: "3 of 5 completed",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    cta: "Schedule Session",
    type: "schedule",
  },
  {
    name: "Victor Marcus",
    role: "Product Designer, Code Nation",
    tags: ["Full Stack", "Cloud Architecture", "Mentoring"],
    progress: "4 of 6 completed",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    cta: "Schedule Session",
    type: "schedule",
  },
  {
    name: "Sophia Turner",
    role: "Software Engineer, Google",
    tags: ["Career Growth", "UX Design", "Leadership"],
    progress: "3 of 5 completed",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    cta: "Resume Mentorship",
    type: "resume",
  },
];

// ------------------------------------------------------------
// MAIN COMPONENT — Mentors Dashboard (RESPONSIVE)
// ------------------------------------------------------------

export default function MentorsDashboard(): JSX.Element {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-2 sm:mb-4">My Mentors</h1>
      <p className="text-[#6B7280] text-base sm:text-lg mb-6 sm:mb-8 lg:mb-10">
        Connect, learn, and grow through mentorship that matches your goals.
      </p>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mb-14 lg:grid-cols-4 lg:gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="rounded-xl sm:rounded-2xl border border-[#FFD700] shadow-sm bg-yellow-50/30"
          >
            <CardContent className="p-3 sm:p-4 lg:p-6 relative flex flex-col justify-center h-full min-h-[110px] sm:min-h-[130px]">
              {/* Text Content */}
              <div>
                <p className="text-[#6B7280] text-xs sm:text-sm mb-1 sm:mb-2">{stat.label}</p>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F]">{stat.value}</span>
              </div>

              {/* Icon (Top Right) */}
              <div
                className={`absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-lg sm:rounded-xl ${stat.iconBg}`}
              >
                <div className="scale-75 sm:scale-90 lg:scale-100">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mentors Section */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#001F3F] mb-1 sm:mb-2">Your Mentors Activity</h2>
      <p className="text-[#6B7280] text-sm sm:text-base mb-6 sm:mb-8">Stay connected with mentors guiding your journey.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {mentors.map((m, i) => (
          <Card key={i} className="rounded-xl sm:rounded-2xl border-[#0000001A] shadow-md">
            <CardContent className="p-4 sm:p-5 lg:p-6">
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <img
                  src={m.image}
                  alt="mentor"
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg text-[#001F3F] truncate">{m.name}</h3>
                  <p className="text-[#4A5565] text-xs sm:text-sm truncate">{m.role}</p>
                  <div className="flex text-[#D7263D] mt-1 text-sm">★★★★★</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {m.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-2 sm:px-3 py-1 text-xs bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress */}
              <p className="text-gray-700 text-xs sm:text-sm mb-1">Session Progress</p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gray-900 w-1/2"></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{m.progress}</p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <button className="bg-[#D7263D] px-3 sm:px-4 py-2 text-white rounded-xl text-xs sm:text-sm font-medium transition flex items-center justify-center gap-2 flex-1 sm:flex-initial">
                  <span className="truncate">{m.cta}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M5.33301 1.33325V3.99992" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.667 1.33325V3.99992" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.6667 2.66675H3.33333C2.59695 2.66675 2 3.2637 2 4.00008V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V4.00008C14 3.2637 13.403 2.66675 12.6667 2.66675Z" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 6.66675H14" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <Button variant="outline" className="flex-1 sm:flex-initial justify-center">
                  Message 
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M14.6663 11.3333C14.6663 11.687 14.5259 12.0261 14.2758 12.2761C14.0258 12.5262 13.6866 12.6667 13.333 12.6667H4.55167C4.19808 12.6667 3.859 12.8073 3.60901 13.0573L2.14101 14.5253C2.07481 14.5915 1.99048 14.6366 1.89867 14.6548C1.80686 14.6731 1.7117 14.6637 1.62521 14.6279C1.53873 14.5921 1.46481 14.5314 1.4128 14.4536C1.36079 14.3758 1.33302 14.2843 1.33301 14.1907V3.33333C1.33301 2.97971 1.47348 2.64057 1.72353 2.39052C1.97358 2.14048 2.31272 2 2.66634 2H13.333C13.6866 2 14.0258 2.14048 14.2758 2.39052C14.5259 2.64057 14.6663 2.97971 14.6663 3.33333V11.3333Z" stroke="#001F3F" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}