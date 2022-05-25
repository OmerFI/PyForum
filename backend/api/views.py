from msilib.schema import ListView
from django.http import Http404
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    AllowAny,
)
from .permissions import ReadOnly

from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    UpdateAPIView,
)
from .generics import ListCreateUpdateDestroyAPIView, ListUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser, FileUploadParser
from rest_framework.exceptions import NotAcceptable

from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import Profile

from .serializers import *
from .utils import RequestDataChanger


# --- Authentication ---


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
        return Profile.objects.get(user_id=self.request.user.id)


class ProfileUpdateImageView(APIView):
    parser_classes = (MultiPartParser, FileUploadParser)
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user_id=self.request.user.id)

    def put(self, request, *args, **kwargs):
        try:
            image_obj = request.data["image"]
        except Exception as e:
            raise NotAcceptable(detail="No image provided!")
        image_name = image_obj.name
        profile = self.get_object()
        try:
            profile.image.save(image_name, image_obj)
        except Exception as e:
            raise NotAcceptable(detail="Unidentified image!")
        profile.save()

        return Response({"message": "Image updated"})


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

    def create(self, request, *args, **kwargs):
        with RequestDataChanger(request.data):
            request.data["author"] = request.user.id
            request.data["owner_category"] = self.kwargs.get("category_id")
        return super().create(request, *args, **kwargs)

    def get_object(self):
        try:
            post = Post.objects.get(id=self.request.user.id)
        except Exception as e:
            print(e)
            raise Http404
        return post


class LatestPostsView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    POST_COUNT = 10

    def get_queryset(self):
        try:
            posts = Post.objects.all()[: self.POST_COUNT]
        except Exception as e:
            raise Http404
        return posts


class CommentView(ListCreateUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        try:
            comments = Comment.objects.filter(owner_post_id=self.kwargs.get("post_id"))
        except Comment.DoesNotExist:
            comments = None
        return comments

    def create(self, request, *args, **kwargs):
        with RequestDataChanger(request.data):
            request.data["author"] = request.user.id
            request.data["owner_post"] = self.kwargs.get("post_id")
        return super().create(request, *args, **kwargs)

    def get_object(self):
        try:
            comment = Comment.objects.get(
                author=self.request.user.id, id=self.request.data.get("id")
            )
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
