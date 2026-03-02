/* eslint-disable no-unused-vars */
// ── RISK BADGE COMPONENT ──
export const RiskBadge = ({ score, size = "sm" }) => {
    const color = score >= 8 ? "#ef4444" : score >= 6 ? "#f59e0b" : "#22c55e";
    const label = score >= 8 ? "HIGH" : score >= 6 ? "MED" : "LOW";
    return (
        <span style={{
            background: color + "18",
            color,
            border: `1px solid ${color}35`,
            borderRadius: 6,
            padding: size === "lg" ? "5px 12px" : "3px 8px",
            fontSize: size === "lg" ? 13 : 11,
            fontFamily: "IBM Plex Mono, monospace",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            whiteSpace: "nowrap"
        }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" /></svg>
            Risk {score.toFixed(1)}
        </span>
    );
};
