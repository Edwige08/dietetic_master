from rest_framework import serializers
from .models import Flashcard

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
