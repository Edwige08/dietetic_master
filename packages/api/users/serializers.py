from uuid import uuid4

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "email", "password", "first_name", "last_name"]
        read_only_fields = ["id"]

    def validate_email(self, value):
        normalized_email = value.strip().lower()
        if User.objects.filter(email__iexact=normalized_email).exists():
            raise serializers.ValidationError("Un compte avec cet email existe déjà.")
        return normalized_email

    def create(self, validated_data):
        email = validated_data["email"]
        base_username = email.split("@")[0].strip().lower().replace(" ", "")
        username = base_username or f"user-{uuid4().hex[:8]}"

        while User.objects.filter(username=username).exists():
            username = f"{base_username}-{uuid4().hex[:6]}"

        return User.objects.create_user(username=username, **validated_data)


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop(self.username_field, None)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist as exc:
            raise serializers.ValidationError({"detail": "Aucun compte trouvé avec cet email."}) from exc

        if not user.is_active:
            raise serializers.ValidationError({"detail": "Ce compte est désactivé."})

        if not user.check_password(password):
            raise serializers.ValidationError({"detail": "Mot de passe incorrect."})

        refresh = self.get_token(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
