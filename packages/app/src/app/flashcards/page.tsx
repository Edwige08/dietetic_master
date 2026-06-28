'use client';

import { Dock, FlashcardsTable, Navbar } from "@monorepo/design-system";
import Link from 'next/link';
import BackButton from '@/components/BackButton';

export default function Home() {
  return (
    <div>
      <Navbar activeItem="profile" />
      <main >

        <div>
          <BackButton fallbackHref="/dashboard" />
        </div>
        <div className="center">
          <h1>Flashcards</h1>
          <p>Prêt pour te lancer dans les révisions ?</p>
        </div>

        <div>
          <h2>Mes flashcards</h2>
        </div>

        <div>
          <FlashcardsTable title="Mes flashcards" />
        </div>

        <Link href="/flashcards/create" className="activity-button bg-secondary-light">Créer un set de flashcard</Link>
        
        <Dock />
      </main>
    </div>
  );
}
