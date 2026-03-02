import { useState, useRef, useEffect } from "react";

export function Counter({ target, suffix = "", duration = 1600 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                let start = 0, step = target / (duration / 16);
                const t = setInterval(() => {
                    start += step;
                    if (start >= target) {
                        setCount(target);
                        clearInterval(t);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);
                obs.disconnect();
            }
        }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
