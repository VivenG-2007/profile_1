import React, { useRef } from "react";
import "./Projects.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../../constants/projectsConstants";

gsap.registerPlugin(ScrollTrigger);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Projects = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".projects-badge", { opacity: 0, y: 18, duration: 0.5, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true }
    });
    gsap.from(".projects-heading", { opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }, delay: 0.1
    });
    gsap.from(".project-card", {
      opacity: 0, y: 50, stagger: 0.12, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".projects-grid", start: "top 78%", once: true }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="projects-grid-lines" aria-hidden="true"><span /><span /><span /></div>

      <div className="projects-container">
        <span className="projects-badge">What I've Built</span>
        <h2 className="projects-heading" id="projects-title">
          Featured <span className="projects-highlight">Projects</span>
        </h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className={`project-card ${project.featured ? "featured" : ""}`}>
              <div className="project-card-inner">
                <div className="project-header">
                  <div className="project-folder-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div className="project-links">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live site" className="project-link-btn">
                        <ExternalIcon />
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub repo" className="project-link-btn">
                      <GithubIcon />
                    </a>
                  </div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-card-glow" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="projects-cta">
          <a
            href="https://github.com/VivenG-2007?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-btn"
          >
            <GithubIcon />
            View All Repositories
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
