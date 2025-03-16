from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Thought, Comment
from .serializers import ThoughtSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# List all thoughts and allow posting new thoughts (authenticated)
class ThoughtListCreateAPIView(generics.ListCreateAPIView):
    queryset = Thought.objects.all().order_by('-created_at')
    serializer_class = ThoughtSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Get Firebase UID from the authenticated token (decoded token)
        firebase_user = self.request.user
        uid = firebase_user.firebase_uid
        serializer.save(author_id=uid)

# Retrieve a single thought
class ThoughtRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Thought.objects.all()
    serializer_class = ThoughtSerializer

# Upvote a thought
class ThoughtUpvoteAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def patch(self, request, pk, format=None):
        try:
            thought = Thought.objects.get(pk=pk)
        except Thought.DoesNotExist:
            return Response({"error": "Thought not found"}, status=status.HTTP_404_NOT_FOUND)
        thought.upvotes += 1
        thought.save()
        serializer = ThoughtSerializer(thought)
        return Response(serializer.data)

class CommentListCreateAPIView(generics.ListCreateAPIView):
    """
    GET: List all comments for a specific thought.
    POST: Create a new comment for the thought.
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Extract the 'thought_id' from the URL kwargs.
        thought_id = self.kwargs.get('thought_id')
        return Comment.objects.filter(thought_id=thought_id).order_by('created_at')

    def perform_create(self, serializer):
        # Retrieve the thought_id from the URL and the Firebase UID from the authenticated user.
        thought_id = self.kwargs.get('thought_id')
        firebase_user = self.request.user  # Our custom FirebaseAuthentication returns a dict
        uid = firebase_user.get('uid')
        serializer.save(thought_id=thought_id, author_id=uid)