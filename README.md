# SafeBack — le journal

Le blog de [safe-back.fr](https://safe-back.fr). Application Next.js autonome,
déployée séparément du site principal.

## Ce que ce dépôt peut faire, et ce qu'il ne peut pas

Ce dépôt sert **uniquement** les adresses qui commencent par `/blog`. Le site
principal lui renvoie ces requêtes et rien d'autre.

Vous pouvez tout changer ici : la mise en page, les couleurs, la structure des
pages, les rubriques, les composants. Déployez aussi souvent que vous voulez.
Un déploiement raté ne casse que `/blog`.

Ce dépôt n'a **aucun** accès au reste : ni à la page d'accueil, ni aux pages
produit, ni aux pages `/a/` et `/i/` qui font vivre l'application mobile, ni
aux fichiers `/.well-known/` qui permettent aux liens de s'ouvrir dans l'app.
C'est volontaire, et c'est ce qui vous laisse les mains libres ici.

## Publier un article

Un article est un fichier Markdown dans `articles/`. Le nom du fichier devient
l'adresse : `articles/mon-article.md` → `safe-back.fr/blog/mon-article`.

```markdown
---
titre: Trois réflexes avant de rentrer seule le soir
chapo: Une phrase d'accroche, affichée sous le titre et dans la liste.
date: 2026-11-04
ville: Paris
image: https://…            # facultatif
seo_titre: …                # facultatif, remplace le titre dans Google
seo_description: …          # facultatif
brouillon: true             # facultatif : garde l'article hors du site
---

## Un intertitre

Le corps de l'article. **Gras**, [liens](https://exemple.fr) et listes à puces.
```

Seuls `titre` et `date` sont obligatoires. Ajouter le fichier, pousser,
déployer : l'article est en ligne.

## Développer

```bash
npm install
npm run dev     # http://localhost:3000/blog
npm run build
```

## Rendu du Markdown

Le corps est rendu **sans jamais interpréter de HTML**, par choix : le texte
peut venir d'un outil automatique, et du HTML écrit ailleurs ouvrirait la porte
à l'injection de script sur un site de sécurité. Le jeu couvert — titres,
paragraphes, listes, gras, liens — est dans `lib/markdown.tsx`, à élargir au
besoin réel.

## Points à ne pas défaire

- `assetPrefix: "/blog-static"` dans `next.config.ts` : il garantit que les
  scripts et styles de cette application ne se mélangent pas à ceux du site
  principal. Le site renvoie ce chemin vers ici.
- Les pages vivent sous `app/blog/`. Une page créée ailleurs ne sera jamais
  servie, puisque le site ne renvoie que `/blog`.
- `metadataBase` pointe sur `https://safe-back.fr` : les liens de partage et
  les adresses canoniques doivent désigner le domaine public, pas l'adresse du
  déploiement.
