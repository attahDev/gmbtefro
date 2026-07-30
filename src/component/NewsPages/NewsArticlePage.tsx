"use client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { fetchNewsArticle, type UiNewsArticle } from "../../lib/newsApi";

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<UiNewsArticle | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    setArticle(null);
    setNotFound(false);
    fetchNewsArticle(id)
      .then(setArticle)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <section className="w-full bg-[#FFFDF7] py-24 text-center">
        <p className="text-[#6B7280]">This article couldn&apos;t be found.</p>
        <Link to="/news" className="inline-flex items-center gap-2 mt-6 text-[#D7263D] font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="w-full bg-[#FFFDF7] py-24 text-center text-[#6B7280]">
        Loading article…
      </section>
    );
  }

  return (
    <article className="w-full bg-[#FFFDF7] py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to="/news" className="inline-flex items-center gap-2 text-[#D7263D] font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>

        <div className="relative h-[240px] sm:h-[340px] rounded-[14px] overflow-hidden mt-6">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-[#001F3F] mt-8 leading-tight">
          {article.title}
        </h1>

        <div className="mt-4 flex items-center gap-2 text-[14px] text-[#4B5563]">
          <Calendar className="w-4 h-4 text-[#C1283C]" />
          <span>{article.date}</span>
        </div>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((t) => (
              <span key={t} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 text-[16px] sm:text-[17px] text-[#374151] leading-relaxed whitespace-pre-line">
          {article.body}
        </div>

        {article.externalLink && (
          <a
            href={article.externalLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-[#D7263D] font-medium"
          >
            Original source
          </a>
        )}
      </div>
    </article>
  );
}
