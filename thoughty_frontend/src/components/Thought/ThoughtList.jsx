import React, { useState, useEffect } from 'react';

const styles = {
  // Outer container
  section: {
    margin: "0 3rem",
    padding: "20px 0",
    height: "80vh"
  },
  // Header container
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
  // Filters container and buttons
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
  // Cards container
  cards: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  },
  // Card container
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    width: "calc((100% / 4) - 20px)"
  },
  // Card header
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
  // Card body
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
  // Buttons group at bottom of card
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

// Helper function to get filter button style based on active state
const getFilterButtonStyle = (active) => ({
  ...styles.filterButton,
  background: active ? "#98b7c9" : "#e0e0e0",
  color: active ? "#fff" : "#000"
});

const cardData = [
  {
    id: 1,
    title: "Fiberta",
    author: "John Doe",
    category: "trending",
    preview: "./img/landscape.jpeg",
    userImg: "./img/user.webp"
  },
  {
    id: 2,
    title: "Fiberta",
    author: "John Doe",
    category: "new",
    preview: "./img/landscape.jpeg",
    userImg: "./img/user.webp"
  },
  {
    id: 3,
    title: "Fiberta",
    author: "John Doe",
    category: "challenged",
    preview: "./img/landscape.jpeg",
    userImg: "./img/user.webp"
  },
  {
    id: 4,
    title: "Fiberta",
    author: "John Doe",
    category: "trending",
    preview: "./img/landscape.jpeg",
    userImg: "./img/user.webp"
  },
  {
    id: 5,
    title: "Fiberta",
    author: "John Doe",
    category: "new",
    preview: "./img/landscape.jpeg",
    userImg: "./img/user.webp"
  },
  {
    id: 6,
    title: "Fiberta",
    author: "John Doe",
    category: "challenged",
    preview: "./img/landscape.jpeg",
    userImg: "./img/user.webp"
  },
  {
    id: 7,
    title: "Fiberta",
    author: "John Doe",
    category: "trending",
    preview: "./img/landscape.jpeg",
    userImg: "./img/user.webp"
  }
];

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter cards based on active filter ("all" shows all cards)
  const filteredCards =
    activeFilter === "all"
      ? cardData
      : cardData.filter((card) => card.category === activeFilter);

  // Dummy infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2
      ) {
        console.log("Reached bottom. Load more cards...");
        // Here you could fetch or append more card data
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section style={styles.section}>
      <header style={styles.header}>
        <h1 style={styles.headerH1}>MindVerse</h1>
        <div style={styles.filters}>
          <button
            style={getFilterButtonStyle(activeFilter === "all")}
            onClick={() => setActiveFilter("all")}
            data-filter="all"
          >
            All
          </button>
          <button
            style={getFilterButtonStyle(activeFilter === "trending")}
            onClick={() => setActiveFilter("trending")}
            data-filter="trending"
          >
            Trending
          </button>
          <button
            style={getFilterButtonStyle(activeFilter === "new")}
            onClick={() => setActiveFilter("new")}
            data-filter="new"
          >
            New
          </button>
          <button
            style={getFilterButtonStyle(activeFilter === "challenged")}
            onClick={() => setActiveFilter("challenged")}
            data-filter="challenged"
          >
            Most Challenged
          </button>
        </div>
      </header>
      <div style={styles.cards}>
        {filteredCards.map((card) => (
          <div
            key={card.id}
            style={styles.card}
            data-category={card.category}
          >
            <div style={styles.cardHeader}>
              <img
                style={styles.projectPreview}
                src={card.preview}
                alt="Project preview"
              />
            </div>
            <div style={styles.cardBody}>
              <div style={styles.titleSection}>
                <div style={styles.info}>
                  <h2 style={styles.projectTitle}>{card.title}</h2>
                  <img
                    src={card.userImg}
                    alt="User"
                    width="50px"
                    style={{ borderRadius: "100%" }}
                  />
                </div>
                <p style={styles.author}>by {card.author}</p>
              </div>
              <div style={styles.btnsGroup}>
                <button style={styles.upvoteButton}>
                  <i className="fa-solid fa-arrow-up"></i>
                </button>
                <button style={styles.actionButton}>Earn 10 coins</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feed;
