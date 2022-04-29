from django.contrib import admin
from .models import User, Profile, Category, Post, Comment, Reply

# Register your models here.


class CommentAdmin(admin.ModelAdmin):
    list_display = ("content", "author", "created_at")
    list_filter = ("created_at",)
    ordering = ("-created_at",)
    search_fields = ("content", "author__username")


class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at")
    list_filter = ("created_at",)
    ordering = ("-created_at",)
    search_fields = ("title", "author__username")


class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "first_name", "last_name", "image")
    ordering = ("user__username",)
    search_fields = ("user__username",)


class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "first_name", "last_name")
    ordering = ("username",)
    search_fields = ("username", "email", "first_name", "last_name")


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Category)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Reply)
