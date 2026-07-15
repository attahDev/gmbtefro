import { Heart, MessageCircle, Share2, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommunitySpotlight() {
  const stories = [
    {
      id: 1,
      title: "From Student to Senior Developer",
      description: "How mentorship transformed James' journey from feeling uncertain about his future to gaining the confidence, guidance and skills he needed. With the support of a dedicated mentor, he landed his dream job at a Manchester tech startup and other opportunities",
      author: "James Wilson",
      role: "Software Developer",
      avatar: "JW",
      avatarColor: "bg-red-600",
      image: "/dashboard/envent/boy.jpg",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 12
    },
    {
      id: 2,
      title: "£50K Seed Funding Secured",
      description: "From a small idea nurtured in Manchester to a growing force in artificial intelligence, TechStart Solutions has successfully raised seed funding to expand their AI platform. This milestone is more than just financial support for John. It represents belief in vision",
      author: "James Henry",
      role: "CEO, TechStart Solutions",
      avatar: "JH",
      avatarColor: "bg-red-600",
      image: "/dashboard/envent/man.jpg",
      timestamp: "1 day ago",
      likes: 42,
      comments: 12
    },
    {
      id: 3,
      title: "Code Club Reaches 200 Students",
      description: "The Manchester Community Foundation's coding initiative has reached a major milestone, transforming the lives of countless young people. What began as a small community effort has grown into a thriving program, giving students the tools, confidence, and skills",
      author: "Marcus Thompson",
      role: "Community Manager",
      avatar: "JH",
      avatarColor: "bg-red-600",
      image: "/dashboard/envent/commmm.jpg",
      timestamp: "24 hours ago",
      likes: 42,
      comments: 12
    }
  ];

  return (
    <div className="w-full bg-[#FFFDF7] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="bg-[#FFFDF7] rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" fill="currentColor" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Community Spotlight</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">Celebrating our community's achievements and milestones</p>
          </div>

          {/* Stories */}
          <div className="space-y-4 sm:space-y-6">
            {stories.map((story) => (
              <div key={story.id} className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full sm:w-28 md:w-32 h-48 sm:h-28 md:h-32 rounded-xl object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{story.title}</h3>
                      <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap sm:ml-4">{story.timestamp}</span>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{story.description}</p>

                    {/* Author and Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 ${story.avatarColor} rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm`}>
                          {story.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-xs sm:text-sm">{story.author}</p>
                          <p className="text-gray-600 text-[10px] sm:text-xs">{story.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6">
                        <button className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-red-600 transition">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-xs sm:text-sm font-medium">{story.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-blue-600 transition">
                          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-xs sm:text-sm font-medium">{story.comments}</span>
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition">
                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/dashboard/community"
              className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 font-semibold text-sm sm:text-base transition"
            >
              View All Stories
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}