import { redirect } from "next/navigation";

/**
 * Cette application n'a pas de racine à elle : le site principal sert `/`.
 * Si quelqu'un atteint cette page, c'est qu'il est arrivé par l'adresse du
 * déploiement plutôt que par safe-back.fr — on le renvoie au journal.
 */
export default function Racine() {
  redirect("/blog");
}
