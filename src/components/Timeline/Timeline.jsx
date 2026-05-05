import React, { useRef } from "react";
import "./Timeline.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { timeline } from "../../constants/timelineConstants";

gsap.registerPlugin(ScrollTrigger);

const typeColors = {
  education: "#a78bfa",
  project: "#38bdf8",
  achievement: "#818cf8",
  skill: "#2dd4bf",
  goal: "#c084fc",
};

const Timeline = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".timeline-badge", {
      opacity: 0, y: 18, duration: 0.5, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true }
    });
    gsap.from(".timeline-heading", {
      opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }, delay: 0.1
    });
    gsap.from(".timeline-line-fill", {
      scaleY: 0, transformOrigin: "top center", duration: 1.4, ease: "power2.out",
      scrollTrigger: { trigger: ".timeline-track", start: "top 70%", once: true }
    });
    gsap.from(".tl-item", {
      opacity: 0, x: (i) => (i % 2 === 0 ? -50 : 50), stagger: 0.15, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".timeline-track", start: "top 72%", once: true }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="timeline-section" id="timeline" aria-labelledby="timeline-title">
      <div className="timeline-grid-lines" aria-hidden="true"><span /><span /><span /></div>

      <div className="timeline-container">
        <span className="timeline-badge">My Journey</span>
        <h2 className="timeline-heading" id="timeline-title">
          The <span className="timeline-highlight">Story So Far</span>
        </h2>

        <div className="timeline-track">
          <div className="timeline-line">
            <div className="timeline-line-fill" />
          </div>

          {timeline.map((item, i) => (
            <div key={i} className={`tl-item tl-item--${i % 2 === 0 ? "left" : "right"}`}>
              <div className="tl-card">
                <div className="tl-icon" style={{ background: `${typeColors[item.type]}22`, borderColor: `${typeColors[item.type]}55`, color: typeColors[item.type] }}>
                  {item.icon}
                </div>
                <div className="tl-content">
                  <span className="tl-year" style={{ color: typeColors[item.type] }}>{item.year}</span>
                  <h3 className="tl-title">{item.title}</h3>
                  <p className="tl-desc">{item.description}</p>
                </div>
                <div className="tl-connector" />
              </div>
              <div className="tl-dot" style={{ background: typeColors[item.type], boxShadow: `0 0 12px ${typeColors[item.type]}88` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
