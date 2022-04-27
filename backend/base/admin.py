from django.contrib import admin
from .models import User, Profile, Category, Post, Comment, Reply

# Register your models here.

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Reply)
