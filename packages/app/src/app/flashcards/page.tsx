'use client';

import { useRouter } from 'next/navigation';
import { Dock, FlashcardsTable, Navbar } from "@monorepo/design-system";
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const handleBack = () => {
    router.back()
  }

  return (
    <div>
      <Navbar activeItem="profile" />
      <main >

        <div>
          <button onClick={handleBack}>
            Retour à la page précédente
          </button>
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
