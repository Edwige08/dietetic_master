'use client';

import { Button, Input } from "@monorepo/design-system";
import { FormEvent, useState } from "react";
import { createFlashcardSet } from "@/lib/flashcards";

export default function CreateFlashcardSet() {
  const [formData, setFormData] = useState({title: '', description: '',});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateFlashcardSet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    if (!formData.title.trim()) {
      setErrorMessage('Le titre est obligatoire.');
      setIsSubmitting(false);
      return;
    }

    try {
      await createFlashcardSet({
        title: formData.title,
        description: formData.description,
      });
      setSuccessMessage('Ton set de flascards a bien été créé.');
    } catch {
      setErrorMessage('Impossible de créer le set de flashcards.');
    } finally {
      setIsSubmitting(false);
    }
  }
    return (
        <div>
            <div>
                {/* <h2>Créer des flashcards</h2> */}
                <p>Pour commencer, donne un titre à ton set de flashcards :</p>
                {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
                {successMessage ? <p>{successMessage}</p> : null}
            </div>

            <form className="flex-column flashcard-form" onSubmit={handleCreateFlashcardSet}>
                {/* TO DO : faire un composant de ce formulaire. Et demander à Koni si on le met dans Storybook ou plutôt dans un dossier components côté front */}
                <Input placeholder="ex : Biochimie - Les macronutriments" label="Titre du set de flashcards" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <Input placeholder="Description" label="Description du set (facultatif)" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <Button variant="primary" type="submit" isLoading={isSubmitting} loadingLabel="Creation..." className="mt-2">Valider le titre</Button>
            </form>
        </div>
    )
}