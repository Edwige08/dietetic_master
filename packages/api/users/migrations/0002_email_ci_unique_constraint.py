from django.db import migrations, models
from django.db.models import Q
from django.db.models.functions import Lower


def check_duplicate_emails(apps, schema_editor):
    User = apps.get_model("users", "User")

    emails = {}
    duplicates = []

    for user in User.objects.exclude(email="").only("id", "email"):
        normalized = user.email.strip().lower()
        if normalized in emails:
            duplicates.append((normalized, emails[normalized], user.id))
        else:
            emails[normalized] = user.id

    if duplicates:
        preview = ", ".join(
            [f"{email} (ids: {first_id}, {second_id})" for email, first_id, second_id in duplicates[:5]]
        )
        raise RuntimeError(
            "Impossible d'ajouter la contrainte email unique (insensible a la casse). "
            f"Doublons detectes: {preview}. "
            "Corrige les emails en base puis relance la migration."
        )


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(check_duplicate_emails, migrations.RunPython.noop),
        migrations.AddConstraint(
            model_name="user",
            constraint=models.UniqueConstraint(
                Lower("email"),
                condition=~Q(email=""),
                name="users_user_email_ci_unique",
            ),
        ),
    ]
