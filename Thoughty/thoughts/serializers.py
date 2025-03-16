from rest_framework import serializers
from .models import Thought, Comment

class ThoughtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thought
        fields = ['id', 'title', 'content', 'upvotes', 'author_id', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'thought', 'content', 'author_id', 'created_at']
