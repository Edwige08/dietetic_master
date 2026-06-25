import json
import logging
from .client import openrouter_client, OpenRouterError
from .prompts import build_flashcard_prompt, build_patient_case_prompt

logger = logging.getLogger(__name__)


class FlashcardGenerationError(Exception):
    pass


class PatientCaseGenerationError(Exception):
    pass


def generate_flashcards(topic: str, difficulty: str = "intermédiaire", count: int = 5) -> list[dict]:
    messages = build_flashcard_prompt(topic, difficulty, count)

    try:
        result = openrouter_client.chat_completion(
            messages=messages,
            temperature=0.6,
            max_tokens=1500,
            response_format={"type": "json_object"},  # supporté par certains modèles uniquement
        )
    except OpenRouterError as e:
        logger.error(f"Échec génération flashcards: {e}")
        raise FlashcardGenerationError("Impossible de générer les flashcards actuellement.") from e

    try:
        parsed = json.loads(result["content"])
        return parsed.get("flashcards", [])
    except json.JSONDecodeError as e:
        logger.error(f"JSON invalide reçu du modèle: {result['content']}")
        raise FlashcardGenerationError("Réponse mal formée du modèle IA.") from e


def generate_patient_case(pathology: str, level: str = "L2") -> str:
    messages = build_patient_case_prompt(pathology, level)
    try:
        result = openrouter_client.chat_completion(
            messages=messages, temperature=0.8, max_tokens=2000
        )
        return result["content"]
    except OpenRouterError as e:
        logger.error(f"Échec génération cas patient: {e}")
        raise PatientCaseGenerationError("Impossible de générer le cas patient actuellement.") from e
