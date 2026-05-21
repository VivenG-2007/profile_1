import { useEffect, useRef } from "react";
import "./wrap.scss";


export default function WrapSpeed() {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);

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
            // Don't capture keyboard events if user is typing in a form input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

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
        </div>
    )

}