'use client';

import { Dock, Navbar } from "@monorepo/design-system";
import "../globals.css";
import BackButton from "@/components/BackButton";

export default function Home() {
  return (
    <div>
      <Navbar activeItem="profile" />
      <main >
        <div>
          <BackButton fallbackHref="/dashboard" />
        </div>

        <div className="center">
          <h1>Quiz</h1>
          <p>Prêt pour te lancer dans les révisions ?</p>
        </div>

        <div>
          <h2>Mes quiz</h2>
          <div className="activity-button bg-primary-light">Créer un quiz</div>
        </div>
        
        <Dock activeItem="profile" />
      </main>
    </div>
  );
}
