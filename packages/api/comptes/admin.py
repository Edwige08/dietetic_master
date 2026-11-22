from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import TypeFormation, Utilisateur


@admin.register(TypeFormation)
class TypeFormationAdmin(admin.ModelAdmin):
    list_display = ("label", "code", "updated_at")
    search_fields = ("label", "code")

    def get_readonly_fields(self, request, obj=None):
        # Le code ne change plus une fois créé : l'application s'en sert.
        return ("code",) if obj else ()


@admin.register(Utilisateur)
class UtilisateurAdmin(UserAdmin):
    ordering = ("email",)
    list_display = (
        "email",
        "first_name",
        "last_name",
        "role",
        "training_type",
        "is_active",
    )
    list_filter = ("role", "training_type", "is_active", "is_staff")
    search_fields = ("email", "first_name", "last_name")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Identité", {"fields": ("first_name", "last_name")}),
        ("Profil étudiant", {"fields": ("training_type", "experience_points")}),
        (
            "Rôle et droits",
            {
                "fields": (
                    "role",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "role",
                    "training_type",
                    "usable_password",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
