import pytest
from django.contrib.auth import authenticate, get_user_model
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.db.models import ProtectedError

from comptes.models import TypeFormation

Utilisateur = get_user_model()

pytestmark = pytest.mark.django_db


def formation(code):
    # Les types de formation sont créés par la migration de données.
    return TypeFormation.objects.get(code=code)


def creer_etudiant(email="etudiant@example.com", **champs):
    champs.setdefault("training_type", formation("bts"))
    return Utilisateur.objects.create_user(email=email, password="x", **champs)


def creer_enseignant(email="prof@example.com", **champs):
    return Utilisateur.objects.create_user(
        email=email, password="x", role=Utilisateur.Role.ENSEIGNANT, **champs
    )


# Email et connexion


def test_creation_par_email():
    u = Utilisateur.objects.create_user(
        email="Test@Example.com",
        password="Password123!!!",
        training_type=formation("bts"),
    )
    assert u.email == "test@example.com"
    assert u.role == Utilisateur.Role.ETUDIANT
    assert u.check_password("Password123!!!")
    assert u.password != "Password123!!!"


def test_email_unique():
    creer_etudiant(email="unique@example.com")
    with pytest.raises(IntegrityError):
        creer_etudiant(email="unique@example.com")


def test_email_unique_sans_tenir_compte_de_la_casse():
    creer_etudiant(email="casse@example.com")
    with pytest.raises(IntegrityError):
        creer_etudiant(email="CASSE@example.com")


def test_email_unique_sans_casse_impose_par_la_base():
    creer_etudiant(email="base@example.com")
    # update() contourne save() : seule la contrainte en base protège.
    autre = creer_etudiant(email="autre@example.com")
    with pytest.raises(IntegrityError):
        Utilisateur.objects.filter(pk=autre.pk).update(email="BASE@example.com")


def test_email_en_minuscules_a_la_sauvegarde():
    u = creer_etudiant()
    u.email = "Nouveau@Example.COM"
    u.save()
    u.refresh_from_db()
    assert u.email == "nouveau@example.com"


def test_connexion_quelle_que_soit_la_casse():
    creer_etudiant(email="connexion@example.com")
    assert authenticate(username="Connexion@EXAMPLE.com", password="x") is not None


# Rôles et profil


def test_superutilisateur_est_admin():
    admin = Utilisateur.objects.create_superuser(
        email="admin@example.com", password="x"
    )
    assert admin.is_staff and admin.is_superuser
    assert admin.role == Utilisateur.Role.ADMIN
    assert admin.training_type is None
    assert admin.experience_points is None


def test_etudiant_commence_a_zero_point():
    u = creer_etudiant()
    assert u.training_type.code == "bts"
    assert u.experience_points == 0
    assert u.updated_at is not None


def test_enseignant_sans_formation_ni_points():
    u = creer_enseignant()
    assert u.training_type is None
    assert u.experience_points is None


def test_etudiant_sans_formation_refuse_par_la_base():
    with pytest.raises(IntegrityError):
        Utilisateur.objects.create_user(email="sans@example.com", password="x")


def test_enseignant_avec_formation_refuse_par_la_base():
    with pytest.raises(IntegrityError):
        creer_enseignant(training_type=formation("bts"))


def test_enseignant_avec_points_refuse_par_la_base():
    with pytest.raises(IntegrityError):
        creer_enseignant(experience_points=10)


# Types de formation


def test_types_de_formation_crees_par_la_migration():
    codes = set(TypeFormation.objects.values_list("code", flat=True))
    assert {"bts", "but", "autre"} <= codes


def test_etudiant_en_formation_autre():
    u = creer_etudiant(training_type=formation("autre"))
    assert u.training_type.code == "autre"


def test_code_de_formation_unique():
    with pytest.raises(IntegrityError):
        TypeFormation.objects.create(code="bts", label="Doublon")


def test_type_de_formation_utilise_non_supprimable():
    creer_etudiant()
    with pytest.raises(ProtectedError):
        formation("bts").delete()


def test_ajout_d_un_type_de_formation():
    licence = TypeFormation.objects.create(code="licence", label="Licence")
    u = creer_etudiant(training_type=licence)
    assert u.training_type.label == "Licence"


def test_role_invalide_refuse_par_la_base():
    with pytest.raises(IntegrityError):
        Utilisateur.objects.create_user(
            email="invalid@example.com", password="x", role="pirate"
        )


def test_clean_etudiant_sans_formation():
    u = Utilisateur(email="clean@example.com")
    with pytest.raises(ValidationError) as erreur:
        u.full_clean(exclude=["password"])
    assert "training_type" in erreur.value.message_dict


def test_clean_enseignant_avec_formation_et_points():
    u = Utilisateur(
        email="clean@example.com",
        role=Utilisateur.Role.ENSEIGNANT,
        training_type=formation("bts"),
        experience_points=5,
    )
    with pytest.raises(ValidationError) as erreur:
        u.full_clean(exclude=["password"])
    assert "training_type" in erreur.value.message_dict
    assert "experience_points" in erreur.value.message_dict


def test_clean_etudiant_valide():
    u = Utilisateur(email="Clean@Example.com", training_type=formation("but"))
    u.full_clean(exclude=["password"])
    assert u.email == "clean@example.com"
    assert u.experience_points == 0


# Dates


def test_updated_at_mis_a_jour_a_la_sauvegarde():
    u = creer_etudiant(email="maj@example.com")
    avant = u.updated_at
    u.experience_points = 10
    u.save()
    assert u.updated_at > avant
