'use client';

import { useRouter } from 'next/navigation';
import { Button, Dock, Input, Navbar } from "@monorepo/design-system";
import { useState } from "react";
import CreateFlashcardSet from '@/components/CreateFlashcardSet';
import CreateFlashcard from '@/components/CreateFlashcard';

export default function Home() {
  const router = useRouter();

  const handleBack = () => {
    router.back()
  }
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleCreated, setTitleCreated] = useState(false);


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
