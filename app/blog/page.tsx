import type { Metadata } from "next";
import Link from "next/link";
import { dateLisible, listerArticles } from "@/lib/articles";
import { Entete, Pied } from "@/app/chrome";

export const metadata: Metadata = {
  title: "Le journal",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const articles = listerArticles();

  return (
    <>
      <Entete />
      <main className="mx-auto w-full max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lavande">
          Le journal
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white text-balance">
          Rentrer, sortir, se déplacer — sans y penser
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/60">
          Conseils de sécurité au quotidien, lieux partenaires et nouvelles de
          l&apos;application.
        </p>

        {articles.length === 0 ? (
          <p className="mt-20 text-white/40">Aucun article pour le moment.</p>
        ) : (
          <ul className="mt-16 divide-y divide-white/5 border-t border-white/5">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col gap-2 py-8 sm:flex-row sm:gap-10"
                >
                  <p className="text-sm text-white/40 sm:w-40 sm:shrink-0 sm:pt-1">
                    {[dateLisible(article.date), article.ville]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white text-balance transition-colors group-hover:text-lavande">
                      {article.titre}
                    </h2>
                    {article.chapo && (
                      <p className="mt-2 leading-relaxed text-white/60">
                        {article.chapo}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Pied />
    </>
  );
}
