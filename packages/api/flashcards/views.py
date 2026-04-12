from django.shortcuts import render
from rest_framework import viewsets
from .models import Flashcard
from .serializers import FlashcardSerializer
from rest_framework.permissions import IsAuthenticated

class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Flashcard.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


