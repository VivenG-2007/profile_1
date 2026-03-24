import React, { useRef } from "react";
import "./Hero.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { tagline, scrollIndicator } from "../../constants/landingPageConstants";
import { name } from "../../constants/aboutmeConstants";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);

    useGSAP(() => {
        // ── Entrance animation ──
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set([".hero-name", ".hero-tagline", ".scroll-indicator"], {
            opacity: 0,
            y: 30,
        });

        tl.to(".hero-name", { opacity: 1, y: 0, duration: 1, delay: 0.3 })
          .to(".hero-tagline", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
          .to(".scroll-indicator", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

        // ── Scroll-out: fade + scale hero content as user scrolls down ──
        gsap.to(".hero-content", {
            opacity: 0,
            y: -40,
            scale: 0.95,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "20% top",
                scrub: true,
            },
        });

        gsap.to(".scroll-indicator", {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "8% top",
                scrub: true,
            },
        });
    }, { scope: heroRef });

    return (
        <section ref={heroRef} className="hero" id="home">
            <div className="hero-content">
                <h1 className="hero-name">{name || "Viven Gorantla"}</h1>
                <p className="hero-tagline">{tagline || "Full-Stack Engineer"}</p>
            </div>
            <div className="scroll-indicator">
                <span>{scrollIndicator || "Scroll to explore"}</span>
                <div className="scroll-icon"></div>
            </div>
        </section>
    );
}

export default Hero;

