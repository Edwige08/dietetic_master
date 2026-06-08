import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import Link from "next/dist/client/link";


const atkinsonHyperlegible = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  variable: "--font-atkinson",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dietetic Master",
  description: "Maîtrisez la diététique par la pratique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={atkinsonHyperlegible.variable}>
      <body>
        {children}

        <footer>
          <h2>Dietetic Master</h2>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            <li>À propos</li>
            <li><Link href="/politique-confidentialite">Politique de confidentialité</Link></li>
            <li><Link href="/mentions-legales">Mentions légales</Link></li>
            <li><Link href="/accessibilite">Accessibilité : non conforme</Link></li>
          </ul>
          <p>Copyright © 2026 Dietetic Master. Tous droits réservés.</p>
        </footer>
      </body>

    </html>
  );
}
