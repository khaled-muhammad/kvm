from django.urls import path
from .views import FirebaseRegisterAPIView

urlpatterns = [
    path('register/', FirebaseRegisterAPIView.as_view(), name='firebase-register'),
]
