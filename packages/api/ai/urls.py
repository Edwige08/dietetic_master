from django.urls import path
from .views import GenerateFlashcardsView, GeneratePatientCaseView

urlpatterns = [
    path("flashcards/generate/", GenerateFlashcardsView.as_view(), name="generate-flashcards"),
    path("patient-cases/generate/", GeneratePatientCaseView.as_view(), name="generate-patient-case"),
]
