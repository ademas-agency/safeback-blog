import { Fragment, type ReactNode } from "react";

/**
 * Le corps d'un article, écrit en Markdown, rendu en éléments React.
 *
 * Pourquoi pas une bibliothèque : le texte vient d'un éditeur externe, et à
 * terme d'agents automatiques. Passer du HTML produit ailleurs dans
 * `dangerouslySetInnerHTML` ouvrirait la porte à l'injection de script sur un
 * site de sécurité. Ici, rien n'est interprété comme du HTML : on construit
 * des éléments React, donc tout caractère écrit par l'auteur reste du texte.
 *
 * Le sous-ensemble couvert est délibérément petit — titres, paragraphes,
 * listes, gras, liens — parce que c'est ce dont un article a besoin. À
 * élargir si un vrai besoin apparaît, jamais « au cas où ».
 */

/** Gras et liens à l'intérieur d'une ligne. Les liens sortent en nouvel onglet. */
function enrichir(ligne: string, clef: string): ReactNode[] {
  const morceaux: ReactNode[] = [];
  // Un seul passage pour les deux formes, pour ne pas avoir à gérer leur
  // imbrication : **gras** et [texte](adresse).
  const motif = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let position = 0;
  let trouve: RegExpExecArray | null;
  let index = 0;

  while ((trouve = motif.exec(ligne)) !== null) {
    if (trouve.index > position) {
      morceaux.push(ligne.slice(position, trouve.index));
    }
    if (trouve[1] !== undefined) {
      morceaux.push(<strong key={`${clef}-g${index}`}>{trouve[1]}</strong>);
    } else {
      morceaux.push(
        <a
          key={`${clef}-l${index}`}
          href={trouve[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:no-underline"
        >
          {trouve[2]}
        </a>
      );
    }
    position = trouve.index + trouve[0].length;
    index += 1;
  }
  if (position < ligne.length) morceaux.push(ligne.slice(position));
  return morceaux;
}

export function Markdown({ texte }: { texte: string }) {
  // Les blocs sont séparés par une ligne vide, comme dans n'importe quel
  // éditeur de texte.
  const blocs = texte.replace(/\r\n/g, "\n").split(/\n{2,}/);

  return (
    <>
      {blocs.map((bloc, i) => {
        const brut = bloc.trim();
        if (!brut) return null;
        const clef = `b${i}`;

        if (brut.startsWith("### ")) {
          return (
            <h3 key={clef} className="mt-8 text-lg font-semibold">
              {enrichir(brut.slice(4), clef)}
            </h3>
          );
        }
        if (brut.startsWith("## ")) {
          return (
            <h2 key={clef} className="mt-10 text-2xl font-semibold">
              {enrichir(brut.slice(3), clef)}
            </h2>
          );
        }

        const lignes = brut.split("\n");
        if (lignes.every((l) => l.startsWith("- "))) {
          return (
            <ul key={clef} className="mt-4 list-disc space-y-2 pl-5">
              {lignes.map((l, j) => (
                <li key={`${clef}-${j}`}>{enrichir(l.slice(2), `${clef}-${j}`)}</li>
              ))}
            </ul>
          );
        }

        // Un retour à la ligne simple reste un retour à la ligne.
        return (
          <p key={clef} className="mt-4">
            {lignes.map((l, j) => (
              <Fragment key={`${clef}-${j}`}>
                {j > 0 && <br />}
                {enrichir(l, `${clef}-${j}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}
