import type { MetadataRoute } from "next";
import { listerArticles } from "@/lib/articles";

/**
 * Le plan du blog, servi sur `https://safe-back.fr/blog/sitemap.xml`.
 *
 * Il ne liste que les pages de cette zone. Le site principal a le sien, et le
 * `robots.txt` du domaine désigne les deux — c'est ce qui permet à chaque
 * équipe de publier sans toucher au fichier de l'autre.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = listerArticles();
  return [
    {
      url: "https://safe-back.fr/blog",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `https://safe-back.fr/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
