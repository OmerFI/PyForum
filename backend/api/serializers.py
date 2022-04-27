from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import generics
from django.contrib.auth import get_user_model
from base.models import Profile, Category, Post, Comment, Reply

User = get_user_model()

# --- User ---


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ProfileSerializer(ModelSerializer):
    username = SerializerMethodField()
    full_name = SerializerMethodField()
    posts = SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "user",
            "username",
            "first_name",
            "last_name",
            "full_name",
            "image",
            "posts",
        )

    def get_username(self, obj):
        return obj.user.username

    def get_full_name(self, obj):
        full_name = f"{obj.first_name} {obj.last_name}".strip()
        return full_name

    def get_posts(self, obj):
        posts = Post.objects.filter(author=obj.user)
        return PostSerializer(posts, many=True).data


class ProfileUpdateSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ("first_name", "last_name")


# --- Main ---


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "title")


class PostSerializer(ModelSerializer):
    username = SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id",
            "author",
            "username",
            "title",
            "content",
            "created_at",
            "owner_category",
        )

    def get_username(self, obj):
        return obj.author.username


class CommentSerializer(ModelSerializer):
    replies = SerializerMethodField()

    class Meta:
        model = Comment
        fields = (
            "id",
            "author",
            "content",
            "created_at",
            "replies",
            "owner_post",
        )

    def get_replies(self, obj):
        return ReplySerializer(obj.replies.all(), many=True).data


class ReplySerializer(ModelSerializer):
    class Meta:
        model = Reply
        fields = ("id", "author", "content", "created_at", "owner_comment")
