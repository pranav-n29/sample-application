import { lazy, Suspense, useEffect, useState } from "react";
import { getApiMessage } from "./api.js";

const HeavyPanel = lazy(() => import("./HeavyPanel.jsx"));

const skills = ["React", "Node.js", "Express", "Vite", "MongoDB", "REST APIs"];

const experience = [
  {
    year: "2026",
    title: "Frontend Developer",
    description: "Built fast, accessible interfaces with React and Vite for school and personal projects.",
  },
  {
    year: "2025",
    title: "Full-Stack Learner",
    description: "Connected UI, backend APIs, and deployment workflows into one smooth delivery process.",
  },
  {
    year: "2024",
    title: "Project Builder",
    description: "Created small apps, dashboards, and experiments to learn practical web development.",
  },
];

export default function App() {
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    getApiMessage()
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="layout portfolio">
      <section className="hero card">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio / Full-Stack Developer</p>
          <h1>Building clean interfaces and dependable web apps.</h1>
          <p className="lead">
            I design and build responsive experiences, connect them to APIs, and ship them with production-ready deployment.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">View Projects</a>
            <a className="button secondary" href="#contact">Contact Me</a>
          </div>
        </div>

        <aside className="status-panel">
          <span className="status-label">Backend status</span>
          <strong>{error || message}</strong>
          <p>This confirms the frontend is connected to the API.</p>
        </aside>
      </section>

      <section className="grid two-up">
        <article className="card">
          <h2>About Me</h2>
          <p>
            I focus on practical full-stack development with an emphasis on speed, clarity, and maintainable code.
          </p>
          <p>
            My goal is to build products that feel polished on the first click and stay reliable after deployment.
          </p>
        </article>

        <article className="card">
          <h2>Core Skills</h2>
          <div className="tag-list">
            {skills.map((skill) => (
              <span className="tag" key={skill}>{skill}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="card" id="projects">
        <div className="section-head">
          <h2>Selected Work</h2>
          <p>Lazy-loaded project highlights that keep the first page load small.</p>
        </div>

      <Suspense fallback={<section className="card">Loading deferred chunk...</section>}>
        <HeavyPanel />
      </Suspense>

      </section>

      <section className="card">
        <div className="section-head">
          <h2>Experience</h2>
          <p>A short timeline showing how the portfolio story grows over time.</p>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={item.year}>
              <span className="timeline-year">{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card contact-card" id="contact">
        <h2>Contact</h2>
        <p>Open to internships, school projects, and freelance-style web work.</p>
        <a className="button primary" href="mailto:pranav@gmail.com">pranav@gmail.com</a>
      </section>
    </main>
  );
}
