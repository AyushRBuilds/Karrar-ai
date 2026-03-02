/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps, react-refresh/only-export-components */
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Motion Helpers ───────────────────────────────────────────────
export const FadeUp = ({ children, delay = 0, duration = 0.7, y = 40, style = {}, className = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
            style={style}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const ScaleIn = ({ children, delay = 0, style = {} }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            style={style}
        >
            {children}
        </motion.div>
    );
};

export const StaggerContainer = ({ children, stagger = 0.1, delay = 0, style = {} }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
            style={style}
        >
            {children}
        </motion.div>
    );
};

export const StaggerChild = ({ children, y = 30, style = {} }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
        }}
        style={style}
    >
        {children}
    </motion.div>
);

// Dramatic headline — each WORD slides up with stagger + blur
export const AnimatedHeadline = ({ children, style = {} }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const segments = Array.isArray(children) ? children : [children];
    let globalIdx = 0;
    return (
        <motion.h1 ref={ref} style={{ ...style, overflow: "visible" }}>
            {segments.map((seg, si) => {
                if (typeof seg !== "string") {
                    // Animated span element (e.g. italic gold text)
                    const idx = globalIdx++;
                    return (
                        <motion.span
                            key={si}
                            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                            transition={{ duration: 0.85, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
                            style={{ display: "inline-block" }}
                        >
                            {seg}
                        </motion.span>
                    );
                }
                return seg.split(" ").filter(Boolean).map((word, wi) => {
                    const idx = globalIdx++;
                    return (
                        <motion.span
                            key={`${si}-${wi}`}
                            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                            transition={{ duration: 0.85, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
                            style={{ display: "inline-block", marginRight: "0.28em", transformOrigin: "bottom center" }}
                        >
                            {word}
                        </motion.span>
                    );
                });
            })}
        </motion.h1>
    );
};

// Animated floating badge
export const FloatingBadge = ({ children, style = {} }) => (
    <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={style}
    >
        {children}
    </motion.div>
);

// Motion card wrapper with lift + glow on hover
export const MotionCard = ({ children, color = "#C49E6C", style = {}, ...rest }) => (
    <motion.div
        whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 50px ${color}28, inset 0 1px 0 ${color}20`, borderColor: `${color}60`, scale: 1.01 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ cursor: "default", ...style }}
        {...rest}
    >
        {children}
    </motion.div>
);

// ── Scroll Progress Hook ────────────────────────────────────────
export function useScrollProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setProgress((winScroll / height) * 100);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return progress;
}

// ── Animated Counter ────────────────────────────────────────────
export function Counter({ target, suffix = "", duration = 1600 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                let start = 0, step = target / (duration / 16);
                const t = setInterval(() => { start += step; if (start >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(start)); }, 16);
                obs.disconnect();
            }
        }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);
    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Risk Badge ──────────────────────────────────────────────────
export const RiskBadge = ({ score, size = "sm" }) => {
    const color = score >= 8 ? "#ef4444" : score >= 6 ? "#f59e0b" : "#22c55e";
    return (
        <span style={{ background: color + "18", color, border: `1px solid ${color}35`, borderRadius: 6, padding: size === "lg" ? "5px 12px" : "3px 8px", fontSize: size === "lg" ? 13 : 11, fontFamily: "IBM Plex Mono, monospace", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" /></svg>
            Risk {score.toFixed(1)}
        </span>
    );
};
