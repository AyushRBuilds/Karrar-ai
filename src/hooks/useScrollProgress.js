/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

// ── Scroll Progress Hook ────────────────────────────────────────
// Tracks how far a referenced element has scrolled through the viewport.
export function useScrollProgress(ref) {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const handler = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            const start = windowH;
            const end = windowH * 0.2;
            const current = rect.top;
            const p = Math.min(1, Math.max(0, (start - current) / (start - end)));
            setProgress(p);
        };
        window.addEventListener("scroll", handler, { passive: true });
        handler();
        return () => window.removeEventListener("scroll", handler);
    }, []);
    return progress;
}
