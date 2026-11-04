/**
 * L'entête et le pied du blog.
 *
 * Volontairement autonomes et minimaux : cette application ne partage aucun
 * code avec le site principal, c'est ce qui la rend inoffensive. Les liens
 * pointent vers le site par des adresses absolues de chemin (`/produit`,
 * `/telecharger`) — c'est le site principal qui les sert, puisque les deux
 * applications vivent sous le même domaine.
 */

const LIENS = [
  { href: "/produit", texte: "L'application" },
  { href: "/offres", texte: "Offres" },
  { href: "/partenaires", texte: "Partenaires" },
  { href: "/blog", texte: "Le journal" },
];

export function Entete() {
  return (
    <header className="border-b border-white/5">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-5 sm:px-8 py-5">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="#2F6BFF" />
            <path
              d="M7.5 12.5l3 3 6-7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-sm font-extrabold tracking-wide">
            <span className="text-white">SAFE</span>
            <span className="text-lavande">BACK</span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 text-sm text-white/60 sm:flex">
          {LIENS.map((lien) => (
            <li key={lien.href}>
              <a href={lien.href} className="transition-colors hover:text-white">
                {lien.texte}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/telecharger"
          className="shrink-0 rounded-full bg-blue px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Télécharger
        </a>
      </nav>
    </header>
  );
}

export function Pied() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8 py-10 text-sm text-white/40">
        <p>© {new Date().getFullYear()} SafeBack</p>
        <ul className="flex flex-wrap gap-5">
          <li><a href="/cgu" className="hover:text-white">CGU</a></li>
          <li><a href="/confidentialite" className="hover:text-white">Confidentialité</a></li>
          <li><a href="/contact" className="hover:text-white">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
