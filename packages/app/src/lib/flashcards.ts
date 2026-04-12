import { api } from "./api";

export type Flashcard = {
  id: number;
  user: number;
  question: string;
  answer: string;
  category: number | null;
  status: "draft" | "submitted" | "validated" | "rejected";
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateFlashcardPayload = {
  question: string;
  answer: string;
  category?: number | null;
  status?: "draft" | "submitted" | "validated" | "rejected";
  is_public?: boolean;
};

export async function getFlashcards() {
  const { data } = await api.get<Flashcard[]>("/flashcards/");
  return data;
}

export async function createFlashcard(payload: CreateFlashcardPayload) {
  const { data } = await api.post<Flashcard>("/flashcards/", payload);
  return data;
}