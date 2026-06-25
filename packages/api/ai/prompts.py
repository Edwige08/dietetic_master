FLASHCARD_GENERATION_SYSTEM_PROMPT = """Tu es un expert en nutrition et diététique clinique, \
spécialisé dans la formation des étudiants français en diététique (BTS Diététique, BUT Génie Biologique option Diététique).
Tu génères des flashcards pédagogiques précises, basées sur les recommandations \
françaises et européennes actuelles (ANSES, PNNS, HAS).
Réponds uniquement en JSON valide, sans texte avant ou après."""

def build_flashcard_prompt(topic: str, difficulty: str, count: int) -> list[dict]:
    return [
        {"role": "system", "content": FLASHCARD_GENERATION_SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                f"Génère {count} flashcards sur le thème : {topic}.\n"
                f"Niveau de difficulté : {difficulty}.\n"
                f'Format JSON attendu : {{"flashcards": [{{"question": "...", "answer": "..."}}]}}'
            ),
        },
    ]


# TODO : ajouter un prompt pour générer des quiz


PATIENT_CASE_SYSTEM_PROMPT = """Tu es un formateur clinique en diététique. Tu crées des cas \
patients réalistes et pédagogiques pour des étudiants français, avec des données cohérentes \
(IMC, biologie, anamnèse) et conformes aux pratiques diététiques françaises.
Les cas doivent rester fictifs et anonymisés, à but uniquement pédagogique."""

def build_patient_case_prompt(pathology: str, level: str) -> list[dict]:
    return [
        {"role": "system", "content": PATIENT_CASE_SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                f"Crée un cas patient fictif concernant : {pathology}.\n"
                f"Niveau étudiant visé : {level}.\n"
                "Inclus : contexte, anamnèse, données anthropométriques et biologiques, "
                "puis 3 questions ouvertes pour l'étudiant."
            ),
        },
    ]