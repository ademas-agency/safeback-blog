import type { NextConfig } from "next";

/**
 * Cette application est une « zone » du site safe-back.fr : elle sert
 * uniquement les adresses qui commencent par `/blog`. Le site principal lui
 * renvoie ces requêtes, et rien d'autre — ni `/`, ni `/a/`, ni `/.well-known/`,
 * qui font vivre l'application mobile et ne doivent jamais dépendre d'ici.
 *
 * `assetPrefix` sert cette séparation : nos scripts et nos styles sont servis
 * sous `/blog-static/`, pour qu'ils ne puissent jamais entrer en collision
 * avec ceux du site principal.
 */
const nextConfig: NextConfig = {
  assetPrefix: "/blog-static",
};

export default nextConfig;
