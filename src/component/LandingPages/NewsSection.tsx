"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { fetchLatestNews, type UiNewsArticle } from "../../lib/newsApi";

export default function NewsSection() {
  const [articles, setArticles] = useState<UiNewsArticle[] | null>(null);

  useEffect(() => {
    fetchLatestNews(3)
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  // Nothing to show and nothing loading — don't leave an empty section
  // sitting on the landing page.
  if (articles !== null && articles.length === 0) return null;

  return (
    <section className="w-full bg-[#FFFDF7] py-12 sm:py-16 mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block bg-[#F5F5F5] text-[#001F3F] px-3 py-1 rounded-full text-base sm:text-base mb-4">
            News
          </span>

          <h2 className="font-open-sans text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#001F3F] leading-tight">
            Latest from GMBTE
          </h2>

          <p className="text-sm sm:text-[18px] md:text-[20px] text-[#6B7280] mt-4 sm:mt-6 leading-relaxed px-2">
            Announcements, press coverage, and updates from across the community.
          </p>
        </div>

        {articles === null ? (
          <p className="mt-14 text-center text-[#6B7280]">Loading news…</p>
        ) : (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {articles.map((article) => {
              const href = article.hasDetailPage
                ? `/news/${article.id}`
                : article.externalLink ?? "#";
              const isExternal = !article.hasDetailPage && !!article.externalLink;

              const card = (
                <article
                  key={article.id}
                  className="bg-white rounded-[14px] border-l-[4px] border-[#FAD941] shadow-md overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 h-full"
                >
                  <div className="relative h-[200px] sm:h-[220px] overflow-hidden group">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover rounded-t-[14px] transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    {article.isFeatured && (
                      <div className="absolute top-3 right-3 bg-[#FAD941] text-[#001F3F] text-xs font-semibold px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#001F3F]">
                        {article.title}
                      </h3>
                      <p className="text-[14px] sm:text-[15px] text-[#6B7280] mt-2 leading-[22px] line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-[13px] sm:text-[14px] text-[#4B5563]">
                        <Calendar className="w-4 h-4 text-[#C1283C]" />
                        <span>{article.date}</span>
                      </div>
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 text-[#D7263D] font-medium">
                      {isExternal ? "Read more" : "Read article"}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              );

              return isExternal ? (
                <a key={article.id} href={href} target="_blank" rel="noreferrer" className="block h-full">
                  {card}
                </a>
              ) : (
                <Link key={article.id} to={href} className="block h-full">
                  {card}
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 sm:gap-3 bg-[#D7263D] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl shadow hover:bg-[#A31F32] transition"
          >
            View All News
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
