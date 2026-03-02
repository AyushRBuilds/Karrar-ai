import { useState } from "react";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

export function DisclaimerModal({ onAccept }) {
    const [dontShow, setDontShow] = useState(false);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(14px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <motion.div initial={{ scale: 0.93, y: 18 }} animate={{ scale: 1, y: 0 }} style={{ background: "#0D0F13", border: "1px solid rgba(196,158,108,0.2)", borderRadius: 18, padding: "32px 28px", maxWidth: 520, width: "100%" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(196,158,108,0.1)", border: "1px solid rgba(196,158,108,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C49E6C", marginBottom: 16 }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
                </div>
                <div style={{ fontFamily: "Playfair Display,serif", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Before You Read This Report</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 18 }}>
                    Karrar.ai provides <strong style={{ color: "#CCC" }}>AI-generated legal intelligence</strong>, not legal advice. We are not a law firm and this output does not constitute legal advice under the Advocates Act, 1961.<br /><br />
                    All findings should be <strong style={{ color: "#CCC" }}>verified with a licensed advocate</strong> for critical decisions. Analysis is grounded in Indian law but may not reflect the most recent amendments or case law.<br /><br />
                    <span style={{ color: "#C49E6C", fontWeight: 600 }}>Confidence scores</span> are shown on every clause — treat lower-confidence findings with additional caution.
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", marginBottom: 18 }}>
                    <input type="checkbox" checked={dontShow} onChange={e => setDontShow(e.target.checked)} style={{ width: 14, height: 14, accentColor: "#C49E6C" }} />
                    <span style={{ fontSize: 12, color: "#555" }}>Don't show this again</span>
                </label>
                <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(196,158,108,0.3)" }} whileTap={{ scale: 0.97 }} onClick={() => onAccept(dontShow)}
                    style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg,#C49E6C,#F5D08A)", color: "#000", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "DM Sans,sans-serif" }}>
                    I Understand — Show My Report
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
