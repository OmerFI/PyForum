from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth import get_user_model

import uuid
from django_resized import ResizedImageField


# --- User ---


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # email = models.EmailField(unique=True)


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    image = ResizedImageField(upload_to="profile_pics", default="default.jpg")

    def __str__(self):
        return f"{self.user.username} Profile"


# --- Post ---


class Reply(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    owner_comment = models.ForeignKey("Comment", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author.username} Reply : {self.content[0:20]}..."

    class Meta:
        verbose_name_plural = "replies"


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    replies = models.ManyToManyField(Reply, blank=True)
    owner_post = models.ForeignKey("Post", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author.username} Comment : {self.content[0:20]}..."


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=100, unique=True)
    content = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    comments = models.ManyToManyField(Comment, blank=True)
    owner_category = models.ForeignKey("Category", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.author.username} Post : {self.title}"


class Category(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    title = models.CharField(max_length=50, unique=True)
    posts = models.ManyToManyField(Post, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name_plural = "categories"
        ordering = ["-created_at"]
