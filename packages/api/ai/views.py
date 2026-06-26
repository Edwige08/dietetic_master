from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle

from .services import generate_flashcards, generate_patient_case, FlashcardGenerationError
from .client import OpenRouterError


class AIGenerationThrottle(UserRateThrottle):
    rate = "10/hour"  # important pour ne pas exploser le quota OpenRouter partagé


class GenerateFlashcardsView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [AIGenerationThrottle]

    def post(self, request):
        topic = request.data.get("topic")
        difficulty = request.data.get("difficulty", "intermédiaire")
        count = min(int(request.data.get("count", 5)), 10)  # cap pour limiter les coûts/tokens

        if not topic:
            return Response({"error": "Le champ 'topic' est requis."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            flashcards = generate_flashcards(topic, difficulty, count)
        except FlashcardGenerationError as e:
            return Response({"error": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        return Response({"flashcards": flashcards}, status=status.HTTP_200_OK)


class GeneratePatientCaseView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [AIGenerationThrottle]

    def post(self, request):
        pathology = request.data.get("pathology")
        level = request.data.get("level", "L2")

        if not pathology:
            return Response({"error": "Le champ 'pathology' est requis."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            case_text = generate_patient_case(pathology, level)
        except OpenRouterError:
            return Response(
                {"error": "Service IA temporairement indisponible."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response({"case": case_text}, status=status.HTTP_200_OK)