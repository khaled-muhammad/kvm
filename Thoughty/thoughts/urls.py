from django.urls import path
from .views import (
    ThoughtListCreateAPIView, 
    ThoughtRetrieveAPIView, 
    ThoughtUpvoteAPIView, 
    CommentListCreateAPIView
)

urlpatterns = [
    path('thoughts/', ThoughtListCreateAPIView.as_view(), name='thought-list-create'),
    path('thoughts/<int:pk>/', ThoughtRetrieveAPIView.as_view(), name='thought-detail'),
    path('thoughts/<int:pk>/upvote/', ThoughtUpvoteAPIView.as_view(), name='thought-upvote'),
    path('thoughts/<int:thought_id>/comments/', CommentListCreateAPIView.as_view(), name='comment-list-create'),
]
