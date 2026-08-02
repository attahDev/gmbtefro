import { api } from "./api";

/** Raw shape coming back from the NestJS backend's NewsArticle model. */
export type BackendNewsArticle = {
  id: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  body: string | null;
  externalLink: string | null;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type UiNewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  body: string | null;
  externalLink: string | null;
  tags: string[];
  isFeatured: boolean;
  date: string;
  publishedAt: string;
  /** True when this article has its own /news/:id detail page (has a
   * body). Link-only articles route straight out via externalLink
   * instead. */
  hasDetailPage: boolean;
};

/** Same idea as eventsApi's placeholder cycling — older/quick-drop
 * articles that skip a cover image still get a consistent-looking card
 * instead of a blank one. Reuses the events placeholder set since news
 * cards share the same aspect ratio and there's no news-specific art yet. */
const PLACEHOLDER_IMAGES = [
  "/dashboard/envent/plannede/imm1.jpg",
  "/dashboard/envent/plannede/imm2.jpg",
  "/dashboard/envent/plannede/imm3.jpg",
  "/dashboard/envent/plannede/imm4.jpg",
  "/dashboard/envent/plannede/imm5.jpg",
];

function placeholderImageFor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return PLACEHOLDER_IMAGES[hash % PLACEHOLDER_IMAGES.length];
}

function toUiArticle(article: BackendNewsArticle): UiNewsArticle {
  const published = new Date(article.publishedAt);

  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt ?? "",
    image: article.coverImageUrl ?? placeholderImageFor(article.id),
    body: article.body,
    externalLink: article.externalLink,
    tags: article.tags ?? [],
    isFeatured: article.isFeatured,
    date: published.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    publishedAt: article.publishedAt,
    hasDetailPage: !!article.body?.trim(),
  };
}

/** GET /news — landing page teaser, newest/featured first. */
export async function fetchLatestNews(limit = 3): Promise<UiNewsArticle[]> {
  const { data } = await api.get("/news", { params: { limit } });
  const articles: BackendNewsArticle[] = data?.data ?? data;
  return articles.map(toUiArticle);
}

/** GET /news/all — the full public archive for the dedicated /news page. */
export async function fetchAllNews(search?: string): Promise<UiNewsArticle[]> {
  const { data } = await api.get("/news/all", { params: search ? { search } : undefined });
  const articles: BackendNewsArticle[] = data?.data ?? data;
  return articles.map(toUiArticle);
}

/** GET /news/:id — single article detail page. */
export async function fetchNewsArticle(id: string): Promise<UiNewsArticle> {
  const { data } = await api.get(`/news/${id}`);
  const article: BackendNewsArticle = data?.data ?? data;
  return toUiArticle(article);
}

// ───────────────────────── Admin ─────────────────────────

/** GET /news/admin/all — every article regardless of isActive, for the
 * admin panel table. */
export async function fetchAllNewsAdmin(): Promise<BackendNewsArticle[]> {
  const { data } = await api.get("/news/admin/all");
  return data?.data ?? data;
}

export type NewsArticleInput = {
  title: string;
  excerpt?: string;
  body?: string;
  externalLink?: string;
  publishedAt?: string; // ISO
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  image?: File;
};

export async function createNewsArticle(input: NewsArticleInput) {
  const form = new FormData();
  form.append("title", input.title);
  if (input.excerpt) form.append("excerpt", input.excerpt);
  if (input.body) form.append("body", input.body);
  if (input.externalLink) form.append("externalLink", input.externalLink);
  if (input.publishedAt) form.append("publishedAt", input.publishedAt);
  if (input.isActive !== undefined) form.append("isActive", String(input.isActive));
  if (input.isFeatured !== undefined) form.append("isFeatured", String(input.isFeatured));
  if (input.tags?.length) form.append("tags", input.tags.join(","));
  if (input.image) form.append("image", input.image);

  const { data } = await api.post("/news", form);
  return data;
}

export async function updateNewsArticle(id: string, input: Partial<NewsArticleInput>) {
  const form = new FormData();
  if (input.title !== undefined) form.append("title", input.title);
  if (input.excerpt !== undefined) form.append("excerpt", input.excerpt);
  if (input.body !== undefined) form.append("body", input.body);
  if (input.externalLink !== undefined) form.append("externalLink", input.externalLink);
  if (input.publishedAt !== undefined) form.append("publishedAt", input.publishedAt);
  if (input.isActive !== undefined) form.append("isActive", String(input.isActive));
  if (input.isFeatured !== undefined) form.append("isFeatured", String(input.isFeatured));
  if (input.tags !== undefined) form.append("tags", input.tags.join(","));
  if (input.image) form.append("image", input.image);

  const { data } = await api.patch(`/news/${id}`, form);
  return data;
}

export async function deleteNewsArticle(id: string) {
  const { data } = await api.delete(`/news/${id}`);
  return data;
}

// ───────────────────────── Comments ─────────────────────────

export type NewsComment = {
  id: string;
  articleId: string;
  userId: string | null;
  authorName: string | null;
  content: string;
  createdAt: string;
  user: { firstname: string; lastname: string } | null;
};

/** GET /news/:id/comments — public, no auth required to read. */
export async function fetchNewsComments(articleId: string): Promise<NewsComment[]> {
  const { data } = await api.get(`/news/${articleId}/comments`);
  return data?.data ?? data;
}

/** POST /news/:id/comments — open to everyone (accounts/login aren't
 *  public yet). If the caller happens to have a valid token, the backend
 *  auto-attributes the comment to their account and ignores authorName;
 *  otherwise authorName is required so the comment has a display name. */
export async function addNewsComment(
  articleId: string,
  content: string,
  authorName?: string,
): Promise<NewsComment> {
  const { data } = await api.post(`/news/${articleId}/comments`, { content, authorName });
  return data?.data ?? data;
}

export async function deleteOwnNewsComment(commentId: string) {
  const { data } = await api.delete(`/news/comments/${commentId}`);
  return data;
}
