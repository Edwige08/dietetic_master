from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class UserAuthApiTests(APITestCase):
	def _extract_detail(self, response):
		detail = response.data.get("detail")
		if isinstance(detail, list) and detail:
			detail = detail[0]
		return str(detail) if detail is not None else None

	def test_register_creates_user(self):
		payload = {
			"email": "alice@example.com",
			"password": "strong-pass-123",
			"first_name": "Alice",
			"last_name": "Martin",
		}

		response = self.client.post(reverse("register"), payload, format="json")

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertTrue(User.objects.filter(email="alice@example.com").exists())

	def test_register_rejects_duplicate_email_case_insensitive(self):
		User.objects.create_user(
			username="existing",
			email="existing@example.com",
			password="strong-pass-123",
			first_name="Already",
			last_name="Existing",
		)

		payload = {
			"email": "EXISTING@example.com",
			"password": "strong-pass-123",
			"first_name": "Already",
			"last_name": "Existing",
		}

		response = self.client.post(reverse("register"), payload, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertIn("email", response.data)

	def test_token_obtain_with_email_success(self):
		user = User.objects.create_user(
			username="john",
			email="john@example.com",
			password="strong-pass-123",
			first_name="John",
			last_name="Doe",
		)

		response = self.client.post(
			reverse("token_obtain_pair"),
			{"email": user.email, "password": "strong-pass-123"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertIn("access", response.data)
		self.assertIn("refresh", response.data)

	def test_token_obtain_returns_specific_error_when_email_unknown(self):
		response = self.client.post(
			reverse("token_obtain_pair"),
			{"email": "unknown@example.com", "password": "strong-pass-123"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertEqual(self._extract_detail(response), "Aucun compte trouvé avec cet email.")

	def test_token_obtain_returns_specific_error_when_password_invalid(self):
		User.objects.create_user(
			username="john",
			email="john@example.com",
			password="strong-pass-123",
			first_name="John",
			last_name="Doe",
		)

		response = self.client.post(
			reverse("token_obtain_pair"),
			{"email": "john@example.com", "password": "wrong-password"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertEqual(self._extract_detail(response), "Mot de passe incorrect.")
