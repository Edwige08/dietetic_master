import { api } from "./api";

export type FlashcardSet = {
  id: number;
  user: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type Flashcard = {
  id: number;
  user: number;
  set: number;
  question: string;
  answer: string;
  category: number | null;
  status: "draft" | "submitted" | "validated" | "rejected";
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateFlashcardSetPayload = {
  title: string;
  description: string;
};

export type CreateFlashcardPayload = {
  set: number;
  question: string;
  answer: string;
  category?: number | null;
  status?: "draft" | "submitted" | "validated" | "rejected";
  is_public?: boolean;
};

// Afficher les flashcards d'un set de l'utilisateur connecté
export async function getFlashcards() {
  const { data } = await api.get<Flashcard[]>("/flashcards/");
  return data;
}

// Afficher les sets de flashcards de l'utilisateur connecté
export async function getFlashcardSets(payload: { title: string; description?: string }) {
  const { data } = await api.get<FlashcardSet[]>("/flashcards/sets/", { params: payload });
  return data;
}

// Créer un set de flashcard
export async function createFlashcardSet(payload: CreateFlashcardSetPayload) {
  const { data } = await api.post<FlashcardSet>("/sets/", payload);
  return data;
}

// Créer une flashcard dans un set
export async function createFlashcard(payload: CreateFlashcardPayload) {
  const { data } = await api.post<Flashcard>("/flashcards/", payload);
  return data;
}