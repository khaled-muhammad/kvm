from django.db import models

# Create your models here.
class Thought(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    upvotes = models.IntegerField(default=0)
    author_id = models.CharField(max_length=255)  # This will store the Firebase UID
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    thought = models.ForeignKey(Thought, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    author_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment on {self.thought.title}"

