import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchThoughtDetail, createComment } from "../../services/api";

export default function ThoughtDetail() {
  const { id } = useParams();
  const [thought, setThought] = useState(null);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const loadThought = async () => {
      const { data } = await fetchThoughtDetail(id);
      setThought(data);
    };
    loadThought();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await createComment(id, commentContent);
    setCommentContent("");
    // Refresh comments
    const { data } = await fetchThoughtDetail(id);
    setThought(data);
  };

  if (!thought) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{thought.title}</h1>
      <p className="text-gray-600 mb-8">{thought.content}</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Add a comment..."
            required
          />
          <button 
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Post Comment
          </button>
        </form>
        
        {thought.comments.map(comment => (
          <div key={comment.id} className="bg-gray-50 p-3 rounded mb-2">
            <p className="text-gray-600">{comment.content}</p>
            <p className="text-sm text-gray-400 mt-1">
              by {comment.author_id} • {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}