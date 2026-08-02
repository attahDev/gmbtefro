"use client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { fetchNewsArticle, type UiNewsArticle } from "../../lib/newsApi";
import {
  fetchNewsComments,
  addNewsComment,
  deleteOwnNewsComment,
  type NewsComment,
} from "../../lib/newsApi";
import { useAuth } from "../../contexts/mainuseAuth";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

function displayName(c: NewsComment): string {
  if (c.user) return `${c.user.firstname} ${c.user.lastname}`;
  return c.authorName || "Anonymous";
}

function CommentThread({ articleId }: { articleId: string }) {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<NewsComment[] | null>(null);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNewsComments(articleId)
      .then(setComments)
      .catch(() => setComments([]));
  }, [articleId]);

  const canSubmit = text.trim() && (isAuthenticated || name.trim());

  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const comment = await addNewsComment(
        articleId,
        text.trim(),
        isAuthenticated ? undefined : name.trim(),
      );
      setComments((prev) => [...(prev ?? []), comment]);
      setText("");
    } catch (err: any) {
      // leave their draft text in place so they can retry
      if (err?.response?.status === 429) {
        setError("You're commenting too fast — wait a minute and try again.");
      } else {
        setError(err?.response?.data?.message || "Couldn't post that comment. Try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (commentId: string) => {
    try {
      await deleteOwnNewsComment(commentId);
      setComments((prev) => (prev ?? []).filter((c) => c.id !== commentId));
    } catch {
      // best-effort — leave it in place if the delete failed
    }
  };

  return (
    <div className="mt-10 border-t border-gray-200 pt-6">
      <h2 className="text-[18px] font-semibold text-[#001F3F]">Comments</h2>

      <div className="mt-4 space-y-3">
        {comments === null && <p className="text-sm text-gray-400">Loading comments…</p>}
        {comments?.length === 0 && (
          <p className="text-sm text-gray-400">No comments yet — be the first to say something.</p>
        )}
        {comments?.map((c) => (
          <div key={c.id} className="flex gap-2 text-sm">
            <div className="h-7 w-7 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-semibold text-gray-600">
              {initials(displayName(c))}
            </div>
            <div className="flex-1">
              <span className="font-semibold text-gray-900 mr-1.5">{displayName(c)}</span>
              <span className="text-gray-600">{c.content}</span>
            </div>
            {isAuthenticated && user?.id === c.userId && (
              <button
                type="button"
                onClick={() => remove(c.id)}
                className="text-xs text-gray-400 hover:text-[#D7263D]"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Open to everyone — accounts/login aren't public yet. Logged-in
       * users skip the name field; it's auto-filled from their account
       * on the backend regardless of what's submitted here. */}
      <div className="mt-5 space-y-2">
        {!isAuthenticated && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={80}
            className="w-full sm:w-64 rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#001F3F]"
          />
        )}
        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Write a comment…"
            maxLength={2000}
            className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#001F3F]"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!canSubmit || submitting}
            className="rounded-full bg-[#001F3F] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
        {error && <p className="text-xs text-[#D7263D]">{error}</p>}
      </div>
    </div>
  );
}

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

        {article.hasDetailPage && <CommentThread articleId={article.id} />}
      </div>
    </article>
  );
}
