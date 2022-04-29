from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # --- User ---
    path("users/register/", views.RegisterView.as_view(), name="register"),
    path("profile/<uuid:user_id>/", views.ProfileView.as_view(), name="profile"),
    path(
        "profile/update/",
        views.ProfileUpdateView.as_view(),
        name="profile_update",
    ),
    path(
        "profile/update/image/",
        views.ProfileUpdateImageView.as_view(),
        name="profile_update_image",
    ),
    # --- Main ---
    path("category/", views.CategoryView.as_view(), name="category"),
    path("category/<uuid:category_id>/", views.PostView.as_view(), name="post"),
    path(
        "category/<uuid:category_id>/<uuid:post_id>/",
        views.CommentView.as_view(),
        name="comment",
    ),
    path(
        "category/<uuid:category_id>/<uuid:post_id>/<uuid:comment_id>/",
        views.ReplyView.as_view(),
        name="reply",
    ),
    # --- Authentication ---
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
