import { news } from "@/data/news";
import { siteConfig } from "@/lib/site";

/** RSS feed artikel berita — diakses di /feed.xml. */
export async function GET() {
  const escape = (text: string) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const items = news
    .slice(0, 20)
    .map(
      (article) => `    <item>
      <title>${escape(article.title)}</title>
      <link>${siteConfig.url}/berita/${article.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/berita/${article.slug}</guid>
      <description>${escape(article.excerpt)}</description>
      <category>${escape(article.category)}</category>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Berita ${escape(siteConfig.legalName)}</title>
    <link>${siteConfig.url}</link>
    <description>${escape(siteConfig.description)}</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
