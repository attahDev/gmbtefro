import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type NewsRow = {
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
};

const EMPTY = {
  title: "",
  excerpt: "",
  body: "",
  externalLink: "",
  imageUrl: "",
  tagsText: "",
  publishedAt: "",
  isFeatured: false,
};

// datetime-local inputs need "YYYY-MM-DDTHH:mm" with no timezone suffix.
function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminNews() {
  const [articles, setArticles] = useState<NewsRow[] | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [formImage, setFormImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(EMPTY);
  const [editImage, setEditImage] = useState<File | null>(null);

  const load = () => {
    api
      .get("/news/admin/all")
      .then(({ data }) => setArticles(data?.data ?? data ?? []))
      .catch(() => setArticles([]));
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!form.title || (!form.body && !form.externalLink)) return;
    setSubmitting(true);
    try {
      const tags = form.tagsText.split(",").map((t) => t.trim()).filter(Boolean);
      const publishedAtIso = form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined;

      const fd = new FormData();
      fd.append("title", form.title);
      if (form.excerpt) fd.append("excerpt", form.excerpt);
      if (form.body) fd.append("body", form.body);
      if (form.externalLink) fd.append("externalLink", form.externalLink);
      if (!formImage && form.imageUrl) fd.append("coverImageUrl", form.imageUrl);
      if (publishedAtIso) fd.append("publishedAt", publishedAtIso);
      fd.append("tags", tags.join(","));
      fd.append("isFeatured", String(form.isFeatured));
      if (formImage) fd.append("image", formImage);

      await api.post("/news", fd);
      setForm(EMPTY);
      setFormImage(null);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (a: NewsRow) => {
    setEditingId(a.id);
    setEditImage(null);
    setEditForm({
      title: a.title,
      excerpt: a.excerpt ?? "",
      body: a.body ?? "",
      externalLink: a.externalLink ?? "",
      imageUrl: a.coverImageUrl ?? "",
      tagsText: a.tags.join(", "),
      publishedAt: toLocalInput(a.publishedAt),
      isFeatured: a.isFeatured,
    });
  };

  const saveEdit = async (id: string) => {
    if (!editForm.body && !editForm.externalLink) return;
    setSubmitting(true);
    try {
      const tags = editForm.tagsText.split(",").map((t) => t.trim()).filter(Boolean);
      const publishedAtIso = editForm.publishedAt ? new Date(editForm.publishedAt).toISOString() : undefined;

      const fd = new FormData();
      fd.append("title", editForm.title);
      fd.append("excerpt", editForm.excerpt);
      fd.append("body", editForm.body);
      fd.append("externalLink", editForm.externalLink);
      if (!editImage) fd.append("coverImageUrl", editForm.imageUrl);
      if (publishedAtIso) fd.append("publishedAt", publishedAtIso);
      fd.append("tags", tags.join(","));
      fd.append("isFeatured", String(editForm.isFeatured));
      if (editImage) fd.append("image", editImage);

      await api.patch(`/news/${id}`, fd);
      setEditingId(null);
      setEditImage(null);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  // Backend soft-deletes (isActive: false) — same convention as
  // AdminEvents' Remove/Restore.
  const toggleActive = async (a: NewsRow) => {
    setSubmitting(true);
    try {
      if (a.isActive) {
        await api.delete(`/news/${a.id}`);
      } else {
        await api.patch(`/news/${a.id}`, { isActive: true });
      }
      load();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Drop an article</h2>
        <p className="mt-1 text-xs text-gray-500">
          Give it a body to publish it on GMBTE with its own page, an external link to point out to
          coverage elsewhere, or both.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
          <textarea
            placeholder="Excerpt — short standfirst shown on cards (optional)"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
          <textarea
            placeholder="Body — full article text, published on its own GMBTE page (optional if using an external link)"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={5}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
          <input
            placeholder="External link — press coverage, partner post, etc (optional if using a body)"
            value={form.externalLink}
            onChange={(e) => setForm({ ...form, externalLink: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
          <div className="sm:col-span-2 flex flex-wrap items-center gap-2">
            <input
              placeholder="Cover image URL (used if no file is chosen below)"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="flex-1 min-w-[200px] rounded border border-gray-300 px-2 py-1 text-sm"
            />
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => setFormImage(e.target.files?.[0] ?? null)}
              className="flex-1 min-w-[200px] text-xs text-gray-600 file:mr-3 file:rounded file:border-0 file:bg-gray-100 file:px-2 file:py-1 file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
            />
            {formImage && (
              <img
                src={URL.createObjectURL(formImage)}
                alt=""
                className="h-10 w-10 rounded border border-gray-200 object-cover"
              />
            )}
          </div>
          <input
            placeholder="Tags, comma-separated (e.g. Press, Partnerships)"
            value={form.tagsText}
            onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <label className="text-xs text-gray-500">
            Publish date (blank = now)
            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
              className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-600 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            />
            Feature this article (pins it first on the landing teaser and /news)
          </label>
        </div>

        <button
          onClick={create}
          disabled={submitting || !form.title || (!form.body && !form.externalLink)}
          className="mt-3 rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Publish article
        </button>
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Articles</h2>

        {articles === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : articles.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No articles yet.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {articles.map((a) =>
              editingId === a.id ? (
                <div key={a.id} className="rounded border border-[#001F3F] p-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Title"
                      className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
                    />
                    <textarea
                      value={editForm.excerpt}
                      onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                      placeholder="Excerpt"
                      className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
                    />
                    <textarea
                      value={editForm.body}
                      onChange={(e) => setEditForm({ ...editForm, body: e.target.value })}
                      placeholder="Body"
                      rows={5}
                      className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
                    />
                    <input
                      value={editForm.externalLink}
                      onChange={(e) => setEditForm({ ...editForm, externalLink: e.target.value })}
                      placeholder="External link"
                      className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
                    />
                    <div className="sm:col-span-2 flex flex-wrap items-center gap-2">
                      <input
                        value={editForm.imageUrl}
                        onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                        placeholder="Cover image URL (used if no file is chosen below)"
                        className="flex-1 min-w-[200px] rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        onChange={(e) => setEditImage(e.target.files?.[0] ?? null)}
                        className="flex-1 min-w-[200px] text-xs text-gray-600 file:mr-3 file:rounded file:border-0 file:bg-gray-100 file:px-2 file:py-1 file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                      />
                      <img
                        src={editImage ? URL.createObjectURL(editImage) : editForm.imageUrl || undefined}
                        alt=""
                        className={`h-10 w-10 rounded border border-gray-200 object-cover ${
                          editImage || editForm.imageUrl ? "" : "hidden"
                        }`}
                      />
                    </div>
                    <input
                      value={editForm.tagsText}
                      onChange={(e) => setEditForm({ ...editForm, tagsText: e.target.value })}
                      placeholder="Tags, comma-separated"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <label className="text-xs text-gray-500">
                      Publish date
                      <input
                        type="datetime-local"
                        value={editForm.publishedAt}
                        onChange={(e) => setEditForm({ ...editForm, publishedAt: e.target.value })}
                        className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                    </label>
                    <label className="flex items-center gap-2 text-xs text-gray-600 sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={editForm.isFeatured}
                        onChange={(e) => setEditForm({ ...editForm, isFeatured: e.target.checked })}
                      />
                      Featured
                    </label>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => saveEdit(a.id)}
                      disabled={submitting}
                      className="rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={a.id}
                  className={`flex flex-wrap items-center justify-between gap-2 rounded border border-gray-200 p-3 text-sm ${
                    !a.isActive ? "opacity-50" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-[#001F3F]">
                      {a.title} {a.isFeatured && <span className="text-xs text-[#D7263D]">★ Featured</span>}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(a.publishedAt).toLocaleString()} ·{" "}
                      {a.body ? "In-platform" : "External link only"}
                      {!a.isActive && " · Removed"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(a)}
                      className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(a)}
                      disabled={submitting}
                      className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600 disabled:opacity-50"
                    >
                      {a.isActive ? "Remove" : "Restore"}
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
