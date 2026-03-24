import React, { useRef } from "react";
import "./whoami.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  name,
  aboutmeDescription,
  tagline,
  tags,
} from "../../../constants/aboutmeConstants";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { label: "React & Next.js", level: 90 },
  { label: "Node.js / Express", level: 85 },
  { label: "Python", level: 80 },
  { label: "TypeScript", level: 78 },
  { label: "PostgreSQL", level: 72 },
  { label: "Docker & DevOps", level: 65 },
];

const stats = [
  { value: "1+", label: "Years Coding" },
  { value: "20+", label: "Projects Built" },
  { value: "136", label: "Problems Solved" },
];

const Whoami = () => {
  const sectionRef = useRef(null);

  /* ── Scroll-triggered entrance ── */
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl.from(".whoami-badge", {
        opacity: 0, y: 18, duration: 0.5, ease: "power3.out",
      })
        .from(".whoami-heading-line", {
          opacity: 0, y: 40, stagger: 0.14, duration: 0.7, ease: "power3.out",
        }, "-=0.2")
        .from(".whoami-desc", {
          opacity: 0, y: 24, duration: 0.6, ease: "power2.out",
        }, "-=0.3")
        .from(".whoami-tag", {
          opacity: 0, scale: 0.8, stagger: 0.08, duration: 0.4, ease: "back.out(1.7)",
        }, "-=0.2")
        .from(".stat-card", {
          opacity: 0, y: 20, stagger: 0.1, duration: 0.45, ease: "power2.out",
        }, "-=0.2")
        .from(".whoami-skills-card", {
          opacity: 0, y: 30, duration: 0.6, ease: "power3.out",
        }, "-=0.6")
        .from(".skill-label", {
          opacity: 0, x: -14, stagger: 0.07, duration: 0.35, ease: "power2.out",
        }, "-=0.3")
        .from(".skill-bar-fill", {
          scaleX: 0,
          transformOrigin: "left center",
          stagger: 0.09,
          duration: 0.7,
          ease: "power3.out",
        }, "-=0.4");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="whoami-section"
      id="aboutMe"
      aria-labelledby="whoami-title"
    >
      {/* Subtle grid lines */}
      <div className="whoami-grid-lines" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="whoami-container">
        {/* ── LEFT ── */}
        <div className="whoami-left">
          <span className="whoami-badge">Who Am I</span>

          <h2 className="whoami-heading" id="whoami-title">
            <span className="whoami-heading-line">
              I&apos;m{" "}
              <span className="whoami-name-highlight">
                {name || "Viven Gorantla"}
              </span>
            </span>
            <span className="whoami-heading-line whoami-heading-sub">
              {tagline || "I'm mostly the following"}
            </span>
          </h2>

          <p className="whoami-desc">
            {aboutmeDescription ||
              "Full-stack developer building clean backend systems, secure APIs, and responsive frontends — turning ideas into real things that actually work."}
          </p>

          <div className="whoami-tags" aria-label="Roles">
            {(tags || ["I DESIGN", "I DEVELOP", "I GET THINGS DONE"]).map(
              (tag) => (
                <span className="whoami-tag" key={tag}>{tag}</span>
              )
            )}
          </div>

          <div className="whoami-stats">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="whoami-right">
          <div className="whoami-orb" aria-hidden="true" />

          <div className="whoami-skills-card">
            <p className="skills-heading">Tech Stack</p>
            <div className="whoami-skills" aria-label="Skill levels">
              {skills.map((skill) => (
                <div className="skill-row" key={skill.label}>
                  <div className="skill-meta">
                    <span className="skill-label">{skill.label}</span>
                    <span className="skill-pct">{skill.level}%</span>
                  </div>
                  <div
                    className="skill-bar"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.label} proficiency`}
                  >
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whoami;