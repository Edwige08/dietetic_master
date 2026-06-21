from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FlashcardSetViewSet, FlashcardViewSet

router = DefaultRouter()
router.register(r'flashcards', FlashcardViewSet)
router.register(r'sets', FlashcardSetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
