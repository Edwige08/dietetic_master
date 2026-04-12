from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),

    # API
    path('api/', include('flashcards.urls')),
    path("api/register/", RegisterView.as_view(), name="register"),
    # path("api/", include("users.urls")),

    # AUTH JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
