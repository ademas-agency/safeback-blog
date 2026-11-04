import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

/**
 * Cette application ne sert que `/blog`. L'adresse de base est celle du site
 * principal : c'est sous `safe-back.fr` que les pages sont lues, pas sous
 * l'adresse du déploiement — ce qui compte pour les liens de partage et pour
 * les moteurs de recherche.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://safe-back.fr"),
  title: { default: "Le journal", template: "%s · SafeBack" },
  description:
    "Conseils de sécurité au quotidien, lieux partenaires et actualités de SafeBack.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-nuit">{children}</body>
    </html>
  );
}
