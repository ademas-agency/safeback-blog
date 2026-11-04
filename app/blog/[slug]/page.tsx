import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dateLisible, lireArticle, listerArticles } from "@/lib/articles";
import { Markdown } from "@/lib/markdown";
import { Entete, Pied } from "@/app/chrome";

type Params = { params: Promise<{ slug: string }> };

/** Chaque article devient une page fixe au build : rien à calculer en ligne. */
export function generateStaticParams() {
  return listerArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = lireArticle(slug);
  if (!article) return { title: "Article introuvable" };

  const description = article.seo_description ?? article.chapo;
  return {
    title: article.seo_titre ?? article.titre,
    description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.seo_titre ?? article.titre,
      description,
      images: article.image ? [article.image] : undefined,
      publishedTime: article.date,
    },
  };
}

export default async function Article({ params }: Params) {
  const { slug } = await params;
  const article = lireArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Entete />
      <main>
        <article className="mx-auto w-full max-w-2xl px-5 sm:px-8 py-16 sm:py-24">
          <Link
            href="/blog"
            className="text-sm text-white/40 transition-colors hover:text-lavande"
          >
            ← Le journal
          </Link>

          <p className="mt-12 text-sm text-white/40">
            {[dateLisible(article.date), article.ville].filter(Boolean).join(" · ")}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-white text-balance">
            {article.titre}
          </h1>
          {article.chapo && (
            <p className="mt-6 text-xl leading-relaxed text-white/70">
              {article.chapo}
            </p>
          )}

          {article.image && (
            // Une image d'article vient d'une adresse extérieure : balise
            // simple plutôt que next/image, qui exigerait de déclarer chaque
            // domaine et ferait échouer la publication au mauvais moment.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.image}
              alt=""
              className="mt-12 h-auto w-full rounded-2xl object-cover"
            />
          )}

          <div className="mt-12 text-[17px] leading-[1.75] text-white/75 [&_a]:text-lavande [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white">
            <Markdown texte={article.corps} />
          </div>

          <hr className="mt-16 border-white/5" />
          <a
            href="/telecharger"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Télécharger SafeBack
          </a>
        </article>
      </main>
      <Pied />
    </>
  );
}
