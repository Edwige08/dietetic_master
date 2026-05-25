import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";


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
            <li>Accueil</li>
            <li>À propos</li>
            <li>Politique de confidentialité</li>
            <li><a href="/mentions-legales">Mentions légales</a></li>
          </ul>
          <p>Copyright © 2026 Dietetic Master. Tous droits réservés.</p>
        </footer>
      </body>

    </html>
  );
}
