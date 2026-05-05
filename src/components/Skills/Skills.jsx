import React, { useRef } from "react";
import "./Skills.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skillCategories } from "../../constants/skillsConstants";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".sk-badge", {
      opacity: 0, y: 18, duration: 0.5, ease: "power3.out", immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
    });
    gsap.from(".sk-title", {
      opacity: 0, y: 40, duration: 0.7, ease: "power3.out", immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true }, delay: 0.1
    });
    gsap.from(".sk-cat-card", {
      opacity: 0, y: 40, stagger: 0.1, duration: 0.6, ease: "power3.out", immediateRender: false,
      scrollTrigger: { trigger: ".sk-grid", start: "top 85%", once: true }
    });
    gsap.from(".sk-pill", {
      opacity: 0, scale: 0.85, stagger: 0.025, duration: 0.35, ease: "back.out(1.7)",
      immediateRender: false,
      scrollTrigger: { trigger: ".sk-grid", start: "top 80%", once: true }, delay: 0.25
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="sk-section" id="skills" aria-labelledby="skills-title">
      <div className="sk-bg-lines" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="sk-container">
        <span className="sk-badge">Tech Arsenal</span>
        <h2 className="sk-title" id="skills-title">
          Skills &amp; <span className="sk-highlight">Technologies</span>
        </h2>

        <div className="sk-grid">
          {skillCategories.map((cat) => (
            <div key={cat.category} className="sk-cat-card">
              <div className="sk-cat-header">
                <span className="sk-cat-icon">{cat.icon}</span>
                <h3 className="sk-cat-name">{cat.category}</h3>
              </div>
              <div className="sk-pills-wrap">
                {cat.skills.map((skill) => (
                  <span key={skill} className="sk-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
