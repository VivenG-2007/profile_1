import React, { useRef, useState } from "react";
import "./Contact.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  useGSAP(() => {
    gsap.from(".contact-badge", { opacity: 0, y: 18, duration: 0.5, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true }
    });
    gsap.from(".contact-heading", { opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }, delay: 0.1
    });
    gsap.from(".contact-card", { opacity: 0, y: 50, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-card", start: "top 80%", once: true }
    });
    gsap.from(".contact-info-item", { opacity: 0, x: -30, stagger: 0.1, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: ".contact-card", start: "top 75%", once: true }, delay: 0.2
    });
  }, { scope: sectionRef });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulated submit — wire to EmailJS or backend as needed
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section ref={sectionRef} className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid-lines" aria-hidden="true"><span /><span /><span /></div>

      <div className="contact-container">
        <span className="contact-badge">Get In Touch</span>
        <h2 className="contact-heading" id="contact-title">
          Let's <span className="contact-highlight">Connect</span>
        </h2>
        <p className="contact-subtext">
          Whether you have a project idea, an opportunity, or just want to say hi — my inbox is always open.
        </p>

        <div className="contact-card">
          {/* Left — Info */}
          <div className="contact-info">
            <a
              href="mailto:vivengorantla@gmail.com"
              className="contact-info-item"
              aria-label="Email"
            >
              <span className="contact-info-icon">✉️</span>
              <div>
                <span className="contact-info-label">Email</span>
                <span className="contact-info-value">vivengorantla@gmail.com</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/viven-gorantla-19a73b3ab"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-item"
              aria-label="LinkedIn"
            >
              <span className="contact-info-icon">💼</span>
              <div>
                <span className="contact-info-label">LinkedIn</span>
                <span className="contact-info-value">viven-gorantla</span>
              </div>
            </a>

            <a
              href="https://github.com/VivenG-2007"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-item"
              aria-label="GitHub"
            >
              <span className="contact-info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </span>
              <div>
                <span className="contact-info-label">GitHub</span>
                <span className="contact-info-value">VivenG-2007</span>
              </div>
            </a>

            <div className="contact-info-item location-item">
              <span className="contact-info-icon">📍</span>
              <div>
                <span className="contact-info-label">Location</span>
                <span className="contact-info-value">Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            <button type="submit" className="contact-submit" disabled={status === "sending"}>
              {status === "sending" ? (
                <span className="btn-sending">Sending…</span>
              ) : status === "sent" ? (
                <span className="btn-sent">✓ Message Sent!</span>
              ) : (
                "Send Message"
              )}
            </button>
            {status === "error" && (
              <p className="form-error">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <p>Designed &amp; Built by <span className="footer-name">Viven Gorantla</span></p>
        <p className="footer-sub">Turning Logic into Magic ✨</p>
      </footer>
    </section>
  );
};

export default Contact;
