import django.db.models.deletion
import django.db.models.functions.text
import django.utils.timezone
from django.db import migrations, models

TYPES_DE_FORMATION = (
    ("bts", "BTS"),
    ("but", "BUT"),
    ("autre", "Autre"),
)


def creer_types_de_formation(apps, schema_editor):
    TypeFormation = apps.get_model("comptes", "TypeFormation")
    for code, label in TYPES_DE_FORMATION:
        TypeFormation.objects.get_or_create(code=code, defaults={"label": label})


def emails_en_minuscules(apps, schema_editor):
    """Met en minuscules les emails déjà enregistrés, avant la contrainte sans casse."""
    Utilisateur = apps.get_model("comptes", "Utilisateur")
    for utilisateur in Utilisateur.objects.all():
        email = utilisateur.email.strip().lower()
        if email != utilisateur.email:
            utilisateur.email = email
            utilisateur.save(update_fields=["email"])


class Migration(migrations.Migration):
    dependencies = [
        ("comptes", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="TypeFormation",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "code",
                    models.CharField(max_length=20, unique=True, verbose_name="code"),
                ),
                ("label", models.CharField(max_length=100, verbose_name="libellé")),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="créé le"),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="modifié le"),
                ),
            ],
            options={
                "verbose_name": "type de formation",
                "verbose_name_plural": "types de formation",
                "db_table": "training_types",
                "ordering": ("label",),
            },
        ),
        migrations.RunPython(creer_types_de_formation, migrations.RunPython.noop),
        migrations.AddField(
            model_name="utilisateur",
            name="training_type",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="utilisateurs",
                to="comptes.typeformation",
                verbose_name="type de formation",
            ),
        ),
        migrations.AddField(
            model_name="utilisateur",
            name="experience_points",
            field=models.PositiveBigIntegerField(
                blank=True, null=True, verbose_name="points d'expérience"
            ),
        ),
        # Les lignes existantes reçoivent la date de la migration.
        migrations.AddField(
            model_name="utilisateur",
            name="updated_at",
            field=models.DateTimeField(
                auto_now=True,
                default=django.utils.timezone.now,
                verbose_name="modifié le",
            ),
            preserve_default=False,
        ),
        # Renommage pour suivre le nom de la table (users).
        migrations.RemoveConstraint(
            model_name="utilisateur",
            name="utilisateur_role_check",
        ),
        migrations.AddConstraint(
            model_name="utilisateur",
            constraint=models.CheckConstraint(
                condition=models.Q(("role__in", ["etudiant", "enseignant", "admin"])),
                name="users_role_check",
                violation_error_message="Le rôle n'est pas valide.",
            ),
        ),
        migrations.AddConstraint(
            model_name="utilisateur",
            constraint=models.CheckConstraint(
                condition=models.Q(
                    models.Q(
                        ("experience_points__isnull", False),
                        ("role", "etudiant"),
                        ("training_type__isnull", False),
                    ),
                    models.Q(
                        ("experience_points__isnull", True),
                        ("role__in", ["enseignant", "admin"]),
                        ("training_type__isnull", True),
                    ),
                    _connector="OR",
                ),
                name="users_profil_check",
                violation_error_message=(
                    "Un étudiant doit avoir un type de formation et des points "
                    "d'expérience ; un enseignant ou un administrateur n'en a pas."
                ),
            ),
        ),
        migrations.RunPython(emails_en_minuscules, migrations.RunPython.noop),
        migrations.AddConstraint(
            model_name="utilisateur",
            constraint=models.UniqueConstraint(
                django.db.models.functions.text.Lower("email"),
                name="users_email_unique_sans_casse",
                violation_error_message=(
                    "Un compte existe déjà avec cette adresse email."
                ),
            ),
        ),
    ]
