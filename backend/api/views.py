from django.http import Http404, HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    IsAdminUser,
    BasePermission,
    SAFE_METHODS,
)

from rest_framework.views import APIView
from rest_framework.generics import (
    GenericAPIView,
    CreateAPIView,
    ListAPIView,
    UpdateAPIView,
    ListCreateAPIView,
)
from rest_framework import mixins
from rest_framework.parsers import MultiPartParser, FileUploadParser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import Profile

from .serializers import *


# --- Authentication ---


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["is_admin"] = user.is_staff
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# --- User ---


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer


class ProfileView(APIView):
    def get(self, request, user_id):
        profile = Profile.objects.get(user_id=user_id)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class ProfileUpdateView(UpdateAPIView):
    serializer_class = ProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user_id=self.kwargs.get("user_id"))


class ProfileUpdateImageView(APIView):
    parser_classes = (MultiPartParser, FileUploadParser)
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user_id=self.kwargs.get("user_id"))

    def put(self, request, *args, **kwargs):
        try:
            image_obj = request.data["image"]
        except:
            try:
                image_obj = request.data["file"]
            except:
                raise HttpResponseBadRequest("No image provided!")
        image_name = image_obj.name
        profile = self.get_object()
        profile.image.save(image_name, image_obj)
        profile.save()

        return Response({"message": "Image updated"})


# --- Utils ---


class ListCreateUpdateDestroyAPIView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    GenericAPIView,
):
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


# --- Main ---


class CategoryView(ListCreateUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser | ReadOnly]

    def get_queryset(self):
        try:
            category_id = self.request.query_params.get("category_id")
            try:
                if category_id:
                    categories = Category.objects.filter(id=category_id)
                else:
                    categories = Category.objects.all()
            except Exception:
                raise Http404
        except Category.DoesNotExist:
            categories = None
        return categories

    def get_object(self):
        try:
            category = Category.objects.get(id=self.request.data.get("id"))
        except Exception as e:
            raise Http404
        return category


class PostView(ListCreateUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        try:
            post_id = self.request.query_params.get("post_id")
            try:
                if post_id:
                    posts = Post.objects.filter(id=post_id)
                else:
                    posts = Post.objects.filter(
                        owner_category_id=self.kwargs.get("category_id")
                    )
            except Exception:
                raise Http404
        except Post.DoesNotExist:
            posts = None
        return posts

    def get_object(self):
        try:
            post = Post.objects.get(id=self.request.data.get("id"))
        except Exception as e:
            print(e)
            raise Http404
        return post


class CommentView(ListCreateUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        try:
            comments = Comment.objects.filter(owner_post_id=self.kwargs.get("post_id"))
        except Comment.DoesNotExist:
            comments = None
        return comments

    def get_object(self):
        try:
            comment = Comment.objects.get(id=self.request.data.get("id"))
        except Exception as e:
            print(e)
            raise Http404
        return comment


class ReplyView(ListCreateUpdateDestroyAPIView):
    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        try:
            replies = Reply.objects.filter(
                owner_comment_id=self.kwargs.get("comment_id")
            )
        except Reply.DoesNotExist:
            replies = None
        return replies

    def get_object(self):
        try:
            reply = Reply.objects.get(id=self.request.data.get("id"))
        except Exception as e:
            print(e)
            raise Http404
        return reply
