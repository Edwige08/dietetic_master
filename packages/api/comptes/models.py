from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class UtilisateurManager(BaseUserManager):
    """
    Crée les utilisateurs à partir de leur email et non de leur nom d'utilisateur.
    """

    use_in_migrations = True

    def _creer(self, email, password, **extra_fields):
        if not email:
            raise ValueError("L'adresse email est obligatoire")
        email = self.normalize_email(email)
        utilisateur = self.model(email=email, **extra_fields)
        utilisateur.set_password(password)
        utilisateur.save(using=self._db)
        return utilisateur

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._creer(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")
        if (
            extra_fields["is_staff"] is not True
            or extra_fields["is_superuser"] is not True
        ):
            raise ValueError(
                "Un superutilisateur doit avoir is_staff et is_superuser à True"
            )
        return self._creer(email, password, **extra_fields)


class Utilisateur(AbstractUser):
    class Role(models.TextChoices):
        ETUDIANT = "etudiant", "Étudiant"
        ENSEIGNANT = "enseignant", "Enseignant"
        ADMIN = "admin", "Administrateur"

    username = None
    email = models.EmailField("adresse email", unique=True)
    role = models.CharField(
        "rôle", max_length=20, choices=Role.choices, default=Role.ETUDIANT
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ()

    objects = UtilisateurManager()

    class Meta:
        db_table = "users"
        verbose_name = "utilisateur"
        verbose_name_plural = "utilisateurs"
        constraints = (
            models.CheckConstraint(
                condition=models.Q(role__in=["etudiant", "enseignant", "admin"]),
                name="utilisateur_role_check",
            ),
        )

    def __str__(self):
        return self.email
