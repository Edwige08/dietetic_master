'use client';

import { Button, Input } from "@monorepo/design-system";
import { FormEvent, useState } from "react";
import { createFlashcard } from "@/lib/flashcards";

export default function CreateFlashcard({ setId }: { setId: number }) {
  const [formData, setFormData] = useState({question: '', answer: '',});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateFlashcard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    if (!formData.question.trim()) {
      setErrorMessage('La question est obligatoire.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.answer.trim()) {
      setErrorMessage('La réponse est obligatoire.');
      setIsSubmitting(false);
      return;
    }

    try {
      await createFlashcard({
        set: setId, // Utilisez l'ID réel du set de flashcards passé en tant que prop
        question: formData.question,
        answer: formData.answer,
      });
      setSuccessMessage('Ta flashcard a bien été créée.');
    } catch {
      setErrorMessage('Impossible de créer la flashcard.');
    } finally {
      setIsSubmitting(false);
    }
  }
    return (
        <div>
            <div>
                <p>Maintenant crée ta flashcard :</p>
                {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
                {successMessage ? <p>{successMessage}</p> : null}
            </div>

            <form className="flex-column flashcard-form" onSubmit={handleCreateFlashcard}>
                {/* TO DO : faire un composant de ce formulaire. Et demander à Koni si on le met dans Storybook ou plutôt dans un dossier components côté front */}
                <Input placeholder="ex : Quels sont 3 macronutriments ?" label="Question" value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} />
                <Input placeholder="ex : Protéines, Lipides et Glucides" label="Réponse" value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} />
                <Button variant="primary" type="submit" isLoading={isSubmitting} loadingLabel="Creation..." className="mt-2">Valider la flashcard</Button>
            </form>
        </div>
    )
}