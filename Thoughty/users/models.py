# users/models.py (create a new app called "users" if needed)
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    firebase_uid = models.CharField(
        max_length=128,
        unique=True,
        blank=True,
        null=True,
        help_text="Firebase UID for authentication"
    )