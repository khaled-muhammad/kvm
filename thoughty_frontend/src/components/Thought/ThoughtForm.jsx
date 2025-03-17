import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createThought } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { marked } from "marked";
import styles from "./ThoughtForm.module.css";

const suggestedTags = ["Innovation", "Philosophy", "Creativity", "Tech", "Society"];

export default function ThoughtForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Update live preview whenever content changes
  useEffect(() => {
    setPreview(marked.parse(content));
  }, [content]);

  // Enable submit button only if title and content are provided
  const isSubmitEnabled = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to create a thought");
      return;
    }
    try {
      await createThought({
        title,
        content,
        // If posting anonymously, you might set a flag or override the author_id as needed
        author_id: anonymous ? "anonymous" : user.uid,
      });
      navigate("/");
    } catch (err) {
      setError("Failed to create thought: " + err.message);
    }
  };

  // When a suggested tag is clicked (here, simply alerting for demonstration)
  const handleTagClick = (tag) => {
    alert(`Filtering by ${tag}`);
  };

  return (
    <div className={styles.container}>
      <h2>Share Your Thought</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title (Max 100 characters)"
          maxLength="100"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          rows="5"
          placeholder="Write your thought... (Markdown supported)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />
        <div>
          <strong>Suggested Tags:</strong>
          <div className={styles.tagContainer}>
            {suggestedTags.map((tag) => (
              <span key={tag} className={styles.tag} onClick={() => handleTagClick(tag)}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.anonymousToggle}>
          <input
            type="checkbox"
            id="anonymous"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="anonymous">Post Anonymously</label>
        </div>
        <h4>Live Preview:</h4>
        <div className={styles.preview} dangerouslySetInnerHTML={{ __html: preview }} />
        <button
          type="submit"
          className={`${styles.submitBtn} ${isSubmitEnabled ? styles.active : ""}`}
          disabled={!isSubmitEnabled}
        >
          Post Thought
        </button>
      </form>
    </div>
  );
}
