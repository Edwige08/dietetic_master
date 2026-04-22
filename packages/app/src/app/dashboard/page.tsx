'use client';

import { Dock } from "@monorepo/design-system";
import "../globals.css";

export default function Home() {
  return (
      <main >

        <div className="center">
          <h1>Bienvenue</h1>
          <p>Vous êtes connecté à <span className="bold">Dietetic Master</span>.</p>
        </div>

        <Dock activeItem="profile" />

      </main>
  );
}
