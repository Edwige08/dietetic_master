import pytest
from django.contrib.auth import get_user_model
from django.db import IntegrityError

Utilisateur = get_user_model()

pytestmark = pytest.mark.django_db


def test_creation_par_email():
    u = Utilisateur.objects.create_user(
        email="Test@Example.com", password="Password123!!!"
    )
    assert u.email == "Test@example.com"
    assert u.role == Utilisateur.Role.ETUDIANT
    assert u.check_password("Password123!!!")
    assert u.password != "Password123!!!"


def test_email_unique():
    Utilisateur.objects.create_user(email="unique@example.com", password="x")
    with pytest.raises(IntegrityError):
        Utilisateur.objects.create_user(email="unique@example.com", password="y")


def test_superutilisateur_est_admin():
    admin = Utilisateur.objects.create_superuser(
        email="admin@example.com", password="x"
    )
    assert admin.is_staff and admin.is_superuser
    assert admin.role == Utilisateur.Role.ADMIN


def test_role_invalide_refuse_par_la_base():
    with pytest.raises(IntegrityError):
        Utilisateur.objects.create_user(
            email="invalid@example.com", password="x", role="pirate"
        )
