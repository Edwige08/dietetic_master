import requests
import logging
from django.conf import settings

logger = logging.getLogger(__name__)


class OpenRouterError(Exception):
    """Erreur générique levée par le client OpenRouter."""
    pass


class OpenRouterRateLimitError(OpenRouterError):
    """Levée quand on atteint la limite de requêtes (429)."""
    pass


class OpenRouterClient:
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY
        self.base_url = settings.OPENROUTER_BASE_URL
        self.default_model = settings.OPENROUTER_DEFAULT_MODEL
        self.fallback_models = settings.OPENROUTER_FALLBACK_MODELS

        if not self.api_key:
            raise OpenRouterError("OPENROUTER_API_KEY n'est pas configurée.")

    def _headers(self):
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            # Recommandés par OpenRouter, optionnels mais bonne pratique
            "HTTP-Referer": settings.OPENROUTER_SITE_URL,
            "X-Title": settings.OPENROUTER_SITE_NAME,
        }

    def chat_completion(
        self,
        messages: list[dict],
        model: str | None = None,
        temperature: float = 0.7,
        max_tokens: int = 1000,
        response_format: dict | None = None,
        timeout: int = 30,
    ) -> dict:
        """
        Envoie une requête de chat completion à OpenRouter.
        Tente le modèle principal, puis bascule sur les fallbacks si erreur.
        """
        models_to_try = [model or self.default_model] + (self.fallback_models or [])
        models_to_try = [m for m in models_to_try if m]

        last_error = None
        for current_model in models_to_try:
            try:
                return self._send_request(
                    current_model, messages, temperature, max_tokens, response_format, timeout
                )
            except OpenRouterRateLimitError as e:
                logger.warning(f"Rate limit atteint pour {current_model}, on essaie le suivant.")
                last_error = e
                continue
            except OpenRouterError as e:
                logger.warning(f"Erreur avec {current_model}: {e}. On essaie le suivant.")
                last_error = e
                continue

        raise last_error or OpenRouterError("Tous les modèles ont échoué.")

    def _send_request(self, model, messages, temperature, max_tokens, response_format, timeout):
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }
        if response_format:
            payload["response_format"] = response_format

        try:
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=self._headers(),
                json=payload,
                timeout=timeout,
            )
        except requests.RequestException as e:
            raise OpenRouterError(f"Erreur réseau: {e}")

        if response.status_code == 429:
            raise OpenRouterRateLimitError("Limite de requêtes atteinte.")

        if not response.ok:
            raise OpenRouterError(
                f"Erreur OpenRouter ({response.status_code}): {response.text}"
            )

        data = response.json()
        try:
            return {
                "content": data["choices"][0]["message"]["content"],
                "model_used": data.get("model", model),
                "usage": data.get("usage", {}),
            }
        except (KeyError, IndexError) as e:
            raise OpenRouterError(f"Réponse inattendue d'OpenRouter: {data}") from e


# Instance singleton réutilisable
openrouter_client = OpenRouterClient()

