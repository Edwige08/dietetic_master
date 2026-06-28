'use client';

import { Dock, Navbar } from "@monorepo/design-system";
import CreateFlashcardSet from '@/components/CreateFlashcardSet';
import CreateFlashcard from '@/components/CreateFlashcard';
import BackButton from '@/components/BackButton';

export default function Home() {
  
  return (
    <div>
      <Navbar activeItem="profile" />
      <main >

        <div>
          <BackButton fallbackHref="/flashcards" />
        </div>

        <div className="center">
          <h1>Création de flashcards</h1>
        </div>

        <CreateFlashcardSet />
        <CreateFlashcard setId={1} /> {/* Remplacez 1 par l'ID réel du set de flashcards créé */}


        {/* Mapper sur le tableau des flashcards déjà crées */}
        {/* + ajoute un bouton pour créer une nouvelle flashcard dans ce set */}
        {/* finalement après la création du set de flashcard, je vais rediriger vers une page dynamique de ce set, où l'utilisateur peut ajouter ou modifier des flashcards */}
        {/* ne pas oublier de faire la migration del a base de données */}
        <h2>Flashcards</h2>
        <div>
          <p>Quels sont 3 macronutriments ?</p>
          <p>Protéines, Lipides et Glucides</p>
        </div>

        
        <Dock />
      </main>
    </div>
  );
}
