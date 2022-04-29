from django.conf import settings
from rest_framework.permissions import BasePermission, SAFE_METHODS
import jwt


def is_authenticated(request, *args, **kwargs):
    if not request.user or not request.user.is_authenticated:
        return False
    token = request.headers.get("Authorization").replace("Bearer", "").strip()
    decoded = jwt.decode(
        token,
        settings.SECRET_KEY,
        algorithms=[settings.SIMPLE_JWT.get("ALGORITHM")],
    )
    user_id = decoded.get("user_id")
    return bool(str(user_id) == str(request.user.id))


class IsAuthenticated(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        return is_authenticated(request)


class IsAuthenticatedOrReadOnly(BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """

    def has_permission(self, request, view):
        return bool(request.method in SAFE_METHODS or is_authenticated(request))


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
