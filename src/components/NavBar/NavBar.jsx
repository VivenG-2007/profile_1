import React, { useRef, useState } from "react";
import { navLinks } from "../../constants/navbarConstants";
import "./NavBar.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NavBar = () => {
    const panelRef = useRef(null);
    const [open, setOpen] = useState(false);

    // GSAP animation for the mobile panel
    const animatePanel = (next) => {
        const panel = panelRef.current;
        if (!panel) return;
        gsap.to(panel, {
            height: next ? "auto" : 0,
            opacity: next ? 1 : 0,
            y: next ? 0 : -8,
            duration: 0.3,
            ease: "power2.out",
            onStart: () => {
                if (next) gsap.set(panel, { pointerEvents: "auto" });
            },
            onComplete: () => {
                if (!next) gsap.set(panel, { pointerEvents: "none" });
            }
        });
    };

    const toggle = () => {
        setOpen((prev) => {
            const next = !prev;
            animatePanel(next);
            return next;
        });
    };

    const goTo = (id) => (e) => {
        e.preventDefault();
        const el = id === "home" ? 0 : document.getElementById(id);

        if (open) {
            setOpen(false);
            animatePanel(false);
        }

        gsap.to(window, {
            duration: 1,
            scrollTo: id === "home" ? 0 : { y: el, offsetY: 80 },
            ease: "power3.out",
            onComplete: () => {
                ScrollTrigger.refresh();
            }
        });
    };

    // Initial state for GSAP
    useGSAP(() => {
        if (panelRef.current) {
            gsap.set(panelRef.current, {
                height: 0,
                opacity: 0,
                y: -8,
                pointerEvents: "none"
            });
        }
    }, { scope: panelRef });

    return (
        <nav className="navbar">
            <div className="navbar-wrapper">
                <a className="nav-home" href="#home" onClick={goTo("home")} aria-label="Home">
                    <img src="/home.svg" alt="Home" />
                </a>

                <ul className="nav-links">
                    {navLinks && navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={link.href || `#${link.id}`} onClick={goTo(link.id)}>{link.label}</a>
                        </li>
                    ))}
                </ul>

                <div className="nav-right-actions">
                    <a href="/assets/files/cv.pdf" className="download-btn" download="cv.pdf">
                        RESUME
                    </a>

                    <button
                        type="button"
                        className={`nav-burger ${open ? "is-open" : ""}`}
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        aria-controls="nav-panel"
                        onClick={toggle}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </div>

            <div ref={panelRef} id="nav-panel" className="nav-panel">
                {navLinks && navLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.href || `#${link.id}`}
                        onClick={goTo(link.id)}
                        className="panel-link"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;