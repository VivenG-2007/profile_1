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
        console.log("Hero component rendered for:", name);
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
