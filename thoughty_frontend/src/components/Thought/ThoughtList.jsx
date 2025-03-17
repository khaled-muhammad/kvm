import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchThoughts, upvoteThought } from "../../services/api";
import { marked } from "marked";

const styles = {
  section: {
    margin: "0 3rem",
    padding: "20px 0",
    height: "80vh"
  },
  header: {
    padding: "20px",
    textAlign: "center",
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  headerH1: {
    marginBottom: "10px",
    fontSize: "32px"
  },
  filters: {
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },
  filterButton: {
    background: "#e0e0e0",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background 0.3s",
    fontSize: "14px"
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    width: "calc((100% / 4) - 20px)"
  },
  cardHeader: {
    position: "relative",
    width: "100%",
    paddingBottom: "56.25%" // 16:9 aspect ratio
  },
  projectPreview: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px 10px 0 0"
  },
  cardBody: {
    padding: "1rem"
  },
  titleSection: {
    marginBottom: "0.75rem"
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  projectTitle: {
    fontSize: "1.25rem",
    fontWeight: 600
  },
  author: {
    fontSize: "0.9rem",
    color: "#555"
  },
  btnsGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  upvoteButton: {
    width: "40px",
    height: "40px",
    borderRadius: "100%",
    background: "#98b7c9",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  actionButton: {
    padding: "0.75rem",
    background: "#98b7c9",
    color: "#fff",
    border: "1px solid #98b7c9",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s"
  }
};

const getFilterButtonStyle = (active) => ({
  ...styles.filterButton,
  background: active ? "#98b7c9" : "#e0e0e0",
  color: active ? "#fff" : "#000"
});

export default function Feed() {
  const [thoughts, setThoughts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const loadThoughts = async () => {
      try {
        const { data } = await fetchThoughts();
        setThoughts(data);
      } catch (error) {
        console.error("Error fetching thoughts:", error);
      }
    };
    loadThoughts();
  }, []);

  const handleUpvote = async (id) => {
    try {
      await upvoteThought(id);
      setThoughts(thoughts.map(thought =>
        thought.id === id
          ? { ...thought, upvotes: thought.upvotes + 1 }
          : thought
      ));
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const filteredThoughts =
    activeFilter === "all"
      ? thoughts
      : thoughts.filter((thought) => thought.category === activeFilter);

  // Dummy infinite scroll listener (for demonstration)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2
      ) {
        console.log("Reached bottom. Load more thoughts...");
        // Here you could fetch or append more data
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section style={styles.section}>
      <header style={styles.header}>
        <h1 style={styles.headerH1}>Marketplace</h1>
        <div style={styles.filters}>
          <button
            style={getFilterButtonStyle(activeFilter === "all")}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            style={getFilterButtonStyle(activeFilter === "trending")}
            onClick={() => setActiveFilter("trending")}
          >
            Trending
          </button>
          <button
            style={getFilterButtonStyle(activeFilter === "new")}
            onClick={() => setActiveFilter("new")}
          >
            New
          </button>
          <button
            style={getFilterButtonStyle(activeFilter === "challenged")}
            onClick={() => setActiveFilter("challenged")}
          >
            Most Challenged
          </button>
        </div>
      </header>
      <br />
      <div style={styles.cards}>
  {filteredThoughts.map((thought) => (
    <div
      key={thought.id}
      style={styles.card}
      data-category={thought.category}
    >
      <div style={styles.cardHeader}>
        <div
          style={{ padding: "10px" }}
          dangerouslySetInnerHTML={{ __html: marked.parse(thought.content) }}
        />
      </div>
      <div style={styles.cardBody}>
        <div style={styles.titleSection}>
          <div style={styles.info}>
            <h2 style={styles.projectTitle}>{thought.title}</h2>
            <img
              src={thought.userImg || "https://cdn-icons-png.flaticon.com/512/168/168905.png"}
              alt="User"
              width="50px"
              style={{ borderRadius: "100%" }}
            />
          </div>
          <p style={styles.author}>by {thought.author || "Unknown"}</p>
        </div>
        <div style={styles.btnsGroup}>
          <button
            style={styles.upvoteButton}
            onClick={() => handleUpvote(thought.id)}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button style={styles.actionButton}>{thought.upvotes} Votes</button>
        </div>
      </div>
    </div>
  ))}
</div>
    </section>
  );
}
