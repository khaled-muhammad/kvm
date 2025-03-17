import React from "react";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  return (
    <main className={styles.main}>
      {/* Profile Information Section */}
      <section className={styles.profileInfo}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/168/168905.png"
          alt="Profile Picture"
          className={styles.profileImage}
        />
        <h2>Malak Sabry</h2>
        <p>
          Passionate thinker, creative innovator, and Thoughty enthusiast.
        </p>
        <div className={styles.stats}>
          <div>
            <h3>150</h3>
            <p>Thoughts Posted</p>
          </div>
          <div>
            <h3>75</h3>
            <p>Mind Battles</p>
          </div>
          <div>
            <h3>200</h3>
            <p>Mind Tokens</p>
          </div>
        </div>
        <div className={styles.badges}>
          <span className={styles.badge}>
            <i className="fas fa-award"></i> Top Thinker
          </span>
          <span className={styles.badge}>
            <i className="fas fa-star"></i> Innovator
          </span>
        </div>
      </section>

      {/* User's Posted Thoughts & Battles */}
      <section className={styles.sec2}>
        <h3 className={styles.sectionTitle}>Your Thoughts & Battles</h3>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h4>How to Revolutionize Education?</h4>
            <p>
              Exploring innovative ways to modernize the traditional education
              system...
            </p>
          </article>
          <article className={styles.card}>
            <h4>Debate: AI in Society</h4>
            <p>
              A discussion on the implications of artificial intelligence and its
              role in shaping the future...
            </p>
          </article>
        </div>
      </section>

      {/* AI Thought Insights Section */}
      <section className={styles.sec3}>
        <h3 className={styles.sectionTitle}>AI Thought Insights</h3>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h4>Top Topic: Technology</h4>
            <p>
              Your thoughts frequently touch on advancements in technology and
              its impact on society.
            </p>
          </article>
          <article className={styles.card}>
            <h4>Top Topic: Education</h4>
            <p>
              You show a strong interest in reimagining education for the
              future.
            </p>
          </article>
          <article className={styles.card}>
            <h4>Top Topic: Sustainability</h4>
            <p>
              Your ideas often revolve around sustainable living and eco-friendly
              practices.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
