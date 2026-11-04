import fs from "node:fs";
import path from "node:path";

/**
 * Les articles, lus dans le dossier `articles/`.
 *
 * Pas de base de données : un article est un fichier Markdown, versionné avec
 * le reste. Publier, c'est ajouter un fichier et déployer — ce que des agents
 * automatiques savent faire aussi bien qu'un humain, et qui laisse une
 * trace lisible de qui a écrit quoi.
 *
 * L'en-tête du fichier, entre deux lignes `---`, porte les métadonnées :
 *
 *   ---
 *   titre: Trois réflexes avant de rentrer seule le soir
 *   chapo: Rien de spectaculaire…
 *   date: 2026-11-04
 *   ville: Paris
 *   image: https://…
 *   seo_titre: …
 *   seo_description: …
 *   brouillon: true
 *   ---
 *
 * Seuls `titre` et `date` sont obligatoires. `brouillon: true` garde l'article
 * hors du site tout en le laissant dans le dépôt.
 */

const DOSSIER = path.join(process.cwd(), "articles");

export type Article = {
  slug: string;
  titre: string;
  chapo?: string;
  date: string;
  ville?: string;
  image?: string;
  seo_titre?: string;
  seo_description?: string;
  brouillon: boolean;
  corps: string;
};

/** Découpe l'en-tête du corps. Volontairement simple : une clé par ligne. */
function analyser(fichier: string, brut: string): Article | null {
  const texte = brut.replace(/\r\n/g, "\n");
  const correspondance = texte.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!correspondance) return null;

  const entete: Record<string, string> = {};
  for (const ligne of correspondance[1].split("\n")) {
    const separateur = ligne.indexOf(":");
    if (separateur === -1) continue;
    const cle = ligne.slice(0, separateur).trim();
    const valeur = ligne.slice(separateur + 1).trim();
    if (cle) entete[cle] = valeur;
  }

  if (!entete.titre || !entete.date) return null;

  return {
    slug: fichier.replace(/\.md$/, ""),
    titre: entete.titre,
    chapo: entete.chapo || undefined,
    date: entete.date,
    ville: entete.ville || undefined,
    image: entete.image || undefined,
    seo_titre: entete.seo_titre || undefined,
    seo_description: entete.seo_description || undefined,
    brouillon: entete.brouillon === "true",
    corps: texte.slice(correspondance[0].length).trim(),
  };
}

/** Les articles publiés, du plus récent au plus ancien. */
export function listerArticles(): Article[] {
  if (!fs.existsSync(DOSSIER)) return [];
  return fs
    .readdirSync(DOSSIER)
    .filter((f) => f.endsWith(".md"))
    .map((f) => analyser(f, fs.readFileSync(path.join(DOSSIER, f), "utf8")))
    .filter((a): a is Article => a !== null && !a.brouillon)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function lireArticle(slug: string): Article | null {
  return listerArticles().find((a) => a.slug === slug) ?? null;
}

/** « 4 novembre 2026 » — la date telle qu'elle se lit sous un titre. */
export function dateLisible(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
