export default function HeavyPanel() {
  return (
    <div className="project-grid">
      <article className="project-card">
        <span className="project-label">Featured Project</span>
        <h3>Student Dashboard</h3>
        <p>
          A responsive dashboard with analytics cards, API-driven updates, and a clean information layout.
        </p>
      </article>

      <article className="project-card">
        <span className="project-label">Case Study</span>
        <h3>Portfolio Landing Page</h3>
        <p>
          A polished personal site with section-based storytelling, smooth layout spacing, and production deployment.
        </p>
      </article>

      <article className="project-card accent">
        <span className="project-label">Performance</span>
        <h3>Optimized Delivery</h3>
        <p>
          Lazy loading, chunk splitting, and smaller initial bundles keep the app fast to open.
        </p>
      </article>
    </div>
  );
}
