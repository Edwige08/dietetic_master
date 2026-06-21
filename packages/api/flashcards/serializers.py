from rest_framework import serializers
from .models import Flashcard, FlashcardSet

class FlashcardSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashcardSet
        fields = ["id", "user", "title", "description", "created_at", "updated_at"]
        read_only_fields = ["id", "user", "created_at", "updated_at"]

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = [
            "id",
            "user",
            "question",
            "answer",
            "category",
            "status",
            "is_public",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "created_at", "updated_at"]
