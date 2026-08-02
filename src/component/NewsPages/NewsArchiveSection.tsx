"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { fetchAllNews, type UiNewsArticle } from "../../lib/newsApi";

export default function NewsArchiveSection() {
  const [articles, setArticles] = useState<UiNewsArticle[] | null>(null);

  useEffect(() => {
    fetchAllNews()
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  return (
    <section id="news-archive" className="w-full bg-[#FFFDF7] py-12 sm:py-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {articles === null ? (
          <p className="mt-4 text-center text-[#6B7280]">Loading news…</p>
        ) : articles.length === 0 ? (
          <p className="mt-4 text-center text-[#6B7280]">
            No articles yet — check back soon.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {articles.map((article) => {
              const href = article.hasDetailPage
                ? `/news/${article.id}`
                : article.externalLink ?? "#";
              const isExternal = !article.hasDetailPage && !!article.externalLink;

              const card = (
                <article className="bg-white rounded-[14px] border-l-[4px] border-[#FAD941] shadow-md overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 h-full">
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

                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {article.tags.map((t) => (
                            <span
                              key={t}
                              className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
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
      </div>
    </section>
  );
}
