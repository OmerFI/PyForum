from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from .models import Profile

User = get_user_model()


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=Profile)
def post_save_profile(sender, instance, **kwargs):
    instance.user.first_name = instance.first_name
    instance.user.last_name = instance.last_name
    instance.user.save()
