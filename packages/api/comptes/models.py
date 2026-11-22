from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.functions import Lower


class UtilisateurManager(BaseUserManager):
    """
    Crée les utilisateurs à partir de leur email et non de leur nom d'utilisateur.
    """

    use_in_migrations = True

    @classmethod
    def normalize_email(cls, email):
        """
        Met toute l'adresse en minuscules, et pas seulement le domaine
        comme le fait Django.
        """
        return (email or "").strip().lower()

    def get_by_natural_key(self, username):
        # Permet de se connecter quelle que soit la casse saisie.
        return self.get(**{self.model.USERNAME_FIELD: self.normalize_email(username)})

    def _creer(self, email, password, **extra_fields):
        if not email:
            raise ValueError("L'adresse email est obligatoire")
        email = self.normalize_email(email)
        utilisateur = self.model(email=email, **extra_fields)
        utilisateur.set_password(password)
        utilisateur.save(using=self._db)
        return utilisateur

    def create_user(self, email, password=None, **extra_fields):
        # create_user est la méthode publique pour créer un utilisateur standard. Elle définit is_staff et is_superuser à False par défaut.
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


class TypeFormation(models.Model):
    """
    Table de référence des types de formation (BTS, BUT, autre).
    Ajouter une formation se fait en insérant une ligne, sans migration de schéma.
    """

    # Ne change jamais : l'application s'en sert. Seul le libellé est modifiable.
    code = models.CharField("code", max_length=20, unique=True)
    label = models.CharField("libellé", max_length=100)
    created_at = models.DateTimeField("créé le", auto_now_add=True)
    updated_at = models.DateTimeField("modifié le", auto_now=True)

    class Meta:
        db_table = "training_types"
        verbose_name = "type de formation"
        verbose_name_plural = "types de formation"
        ordering = ("label",)

    def __str__(self):
        return self.label


class Utilisateur(AbstractUser):
    class Role(models.TextChoices):
        ETUDIANT = "etudiant", "Étudiant"
        ENSEIGNANT = "enseignant", "Enseignant"
        ADMIN = "admin", "Administrateur"

    username = None
    # email tjrs enregistré en minuscules (voir _preparer_profil)
    email = models.EmailField("adresse email", unique=True)
    role = models.CharField(
        "rôle", max_length=20, choices=Role.choices, default=Role.ETUDIANT
    )
    # Obligatoire pour un étudiant, vide pour un enseignant ou un administrateur.
    # Colonne training_type_id en base.
    training_type = models.ForeignKey(
        TypeFormation,
        verbose_name="type de formation",
        on_delete=models.PROTECT,
        related_name="utilisateurs",
        null=True,
        blank=True,
    )
    experience_points = models.PositiveBigIntegerField(
        "points d'expérience", null=True, blank=True
    )
    updated_at = models.DateTimeField("modifié le", auto_now=True)

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
                name="users_role_check",
                violation_error_message="Le rôle n'est pas valide.",
            ),
            # Les IS NOT NULL explicites sont indispensables : une contrainte
            # CHECK dont le résultat est NULL est considérée comme respectée.
            models.CheckConstraint(
                condition=models.Q(
                    role="etudiant",
                    training_type__isnull=False,
                    experience_points__isnull=False,
                )
                | models.Q(
                    role__in=["enseignant", "admin"],
                    training_type__isnull=True,
                    experience_points__isnull=True,
                ),
                name="users_profil_check",
                violation_error_message=(
                    "Un étudiant doit avoir un type de formation et des points "
                    "d'expérience ; un enseignant ou un administrateur n'en a pas."
                ),
            ),
            models.UniqueConstraint(
                Lower("email"),
                name="users_email_unique_sans_casse",
                violation_error_message=(
                    "Un compte existe déjà avec cette adresse email."
                ),
            ),
        )

    def __str__(self):
        return self.email

    def _preparer_profil(self):
        """Met l'email en minuscules et donne 0 XP à un étudiant qui n'en a pas."""
        if self.email:
            self.email = UtilisateurManager.normalize_email(self.email)
        if self.role == self.Role.ETUDIANT and self.experience_points is None:
            self.experience_points = 0

    def clean(self):
        super().clean()
        self._preparer_profil()
        erreurs = {}
        if self.role == self.Role.ETUDIANT:
            if self.training_type_id is None:
                erreurs["training_type"] = (
                    "Le type de formation est obligatoire pour un étudiant."
                )
        else:
            if self.training_type_id is not None:
                erreurs["training_type"] = (
                    "Seul un étudiant peut avoir un type de formation."
                )
            if self.experience_points is not None:
                erreurs["experience_points"] = (
                    "Seul un étudiant peut avoir des points d'expérience."
                )
        if erreurs:
            raise ValidationError(erreurs)

    def save(self, *args, **kwargs):
        self._preparer_profil()
        super().save(*args, **kwargs)
