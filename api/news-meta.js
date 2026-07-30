// Serves real per-article <meta>/<title> tags to link-preview crawlers
// (Facebook/WhatsApp, Twitter, Slack, LinkedIn, Discord, Telegram, etc.)
// hitting /news/:id. These bots don't execute JavaScript, so the
// client-side title fix in NewsArticlePage.tsx never runs for them —
// without this, they fall back to the raw URL/id as the link label.
//
// vercel.json rewrites /news/:id to this function ONLY when the
// request's User-Agent matches a known bot. Real visitors never hit
// this file; they get the normal SPA.

const BACKEND_BASE_URL = "https://gmbtebac.onrender.com";
const SITE_URL = "https://www.gmblacktechexpo.co.uk";
const FALLBACK_IMAGE = `${SITE_URL}/logo/logo.svg`;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = async (req, res) => {
  const { id } = req.query;

  let article = null;
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/news/${id}`);
    if (response.ok) {
      article = await response.json();
    }
  } catch {
    // fall through to the generic-site fallback below
  }

  const title = article?.title
    ? `${article.title} | GM Black Tech Expo`
    : "Greater Manchester Black Tech Expo";
  const description =
    article?.excerpt ||
    "Empowering Black talent across Greater Manchester through tech education, green impact programmes, mentorship and opportunity.";
  const image = article?.coverImageUrl || FALLBACK_IMAGE;
  const url = `${SITE_URL}/news/${id}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(url)}" />
  <meta property="og:title" content="${escapeHtml(article?.title || title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:site_name" content="Greater Manchester Black Tech Expo" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(article?.title || title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />
  <meta http-equiv="refresh" content="0; url=${escapeHtml(url)}" />
</head>
<body>
  <p><a href="${escapeHtml(url)}">${escapeHtml(article?.title || "View this article")}</a></p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.status(200).send(html);
};
