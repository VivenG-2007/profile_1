import { useEffect, useRef, useState } from "react";
import "./wrap.scss";


export default function WrapSpeed() {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const audio = new Audio('/Recording.mp3');
        audio.loop = true;
        audio.muted = true;
        audio.volume = 1;
        audio.preload = 'auto';
        audio.load();
        audioRef.current = audio;

        const syncState = () => setIsPlaying(!audio.paused);
        audio.addEventListener('play', syncState);
        audio.addEventListener('pause', syncState);
        audio.addEventListener('playing', syncState);

        const attemptAutoplay = async () => {
            try {
                await audio.play();
            } catch (err) {
            }
        };

        const wakeUp = () => {
            if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.play()
                    .then(() => console.log("Audio unmuted and playing via interaction."))
                    .catch(e => console.error("Audio play failed on interaction:", e));
            }
            ['click', 'keydown', 'touchstart', 'mousedown'].forEach(ev => window.removeEventListener(ev, wakeUp));
        };

        audio.load();
        setTimeout(attemptAutoplay, 500);

        ['click', 'keydown', 'touchstart', 'mousedown'].forEach(ev => window.addEventListener(ev, wakeUp, { once: true }));

        return () => {
            audio.pause();
            audio.removeEventListener('play', syncState);
            audio.removeEventListener('pause', syncState);
            audio.removeEventListener('playing', syncState);
            audio.src = '';
            ['click', 'keydown', 'touchstart', 'mousedown'].forEach(ev => window.removeEventListener(ev, wakeUp));
        };
    }, []);

    const toggleSound = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = false;
        if (audio.paused) {
            audio.play().catch(() => { });
        } else {
            audio.pause();
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let w = 0;
        let h = 0;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        resize();

        let xMod = 0;
        let yMod = 0;
        let wrapSpeed = 0;

        const setWrap = (on) => (wrapSpeed = on ? 1 : 0);

        function Star() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.c = 0;
        }

        Star.prototype.updateColor = function () {
            this.c = Math.min(255, this.c + 5);
        };

        Star.prototype.updatePos = function () {
            const speedMult = wrapSpeed ? 0.028 : 0.02;

            const cx = w / 2;
            const cy = h / 2;

            this.x += xMod + (this.x - cx) * speedMult;
            this.y += yMod + (this.y - cy) * speedMult;

            this.updateColor();

            if (this.x > w || this.x < 0 || this.y > h || this.y < 0) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.c = 0;
            }
        };

        const STAR_COUNT = 200;
        const stars = Array.from({ length: STAR_COUNT }, () => new Star());

        const onKeyDown = (e) => {
            const code = e.keyCode || e.which;

            switch (code) {
                case 32:
                    setWrap(true);
                    break;
                case 37:
                    xMod = Math.min(6, xMod + 0.3);
                    break;
                case 38:
                    yMod = Math.min(6, yMod + 0.3);
                    break;
                case 39:
                    xMod = Math.max(-6, xMod - 0.3);
                    break;
                case 40:
                    yMod = Math.max(-6, yMod - 0.3);
                    break;
                default:
                    return;
            }

            e.preventDefault();
        };

        const onKeyUp = (e) => {
            const code = e.keyCode || e.which;

            switch (code) {
                case 32:
                    setWrap(false);
                    break;
                case 37:
                case 39:
                    xMod = 0;
                    break;
                case 38:
                case 40:
                    yMod = 0;
                    break;
                default:
                    return;
            }

            e.preventDefault();
        };


        const draw = () => {
            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.fillRect(0, 0, w, h);

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                const c = s.c;

                if (wrapSpeed) {
                    ctx.fillStyle = `rgb(${c},${Math.floor(c * 0.45)},0)`;
                } else {
                    ctx.fillStyle = `rgb(${c},${c},${c})`;
                }

                const size = c / 120;
                ctx.fillRect(s.x, s.y, size, size);

                s.updatePos();
            }

            rafRef.current = requestAnimationFrame(draw);
        };
        rafRef.current = requestAnimationFrame(draw);

        window.addEventListener("keydown", onKeyDown, { passive: false });
        window.addEventListener("keyup", onKeyUp, { passive: false });
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    return (
        <div className="wrap-wrap">
            <canvas ref={canvasRef} className="wrap-canvas"></canvas>

            <button
                className={`sound-toggle ${isPlaying ? 'playing' : ''}`}
                onClick={toggleSound}
                aria-label={isPlaying ? 'Pause sound' : 'Play sound'}
            >
                <span className="sound-ring" />
                <svg className="sound-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {isPlaying ? (
                        <>
                            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </>
                    ) : (
                        <>
                            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                            <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </>
                    )}
                </svg>
            </button>
        </div>
    )

}