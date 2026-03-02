// ── Karrar.ai Logo Components ───────────────────────────────────

export const KarrarLogoMark = ({ size = 40 }) => (
    <img
        src="/karrarlogo.svg"
        alt="Karrar.ai"
        style={{ height: size, width: "auto", display: "block" }}
    />
);

export const KarrarLogo = ({ size = 40, wordmark = true }) => (
    <div style={{ display: "flex", alignItems: "center", gap: Math.round(size * 0.28) }}>
        <img
            src="/karrarlogo.svg"
            alt="Karrar.ai"
            style={{ height: size, width: "auto", display: "block", flexShrink: 0 }}
        />
        {wordmark && (
            <span style={{
                fontFamily: "Playfair Display, serif",
                fontSize: Math.round(size * 0.72),
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
                lineHeight: 1,
                whiteSpace: "nowrap",
            }}>
                Karrar.ai
            </span>
        )}
    </div>
);
