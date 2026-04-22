from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from users.views import EmailTokenObtainPairView, LogoutView, RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),

    # API
    path('api/', include('flashcards.urls')),
    path("api/register/", RegisterView.as_view(), name="register"),
    # path("api/", include("users.urls")),

    # AUTH JWT
    path('api/token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
]
