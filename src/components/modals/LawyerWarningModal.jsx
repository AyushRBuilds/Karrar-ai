/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

export function LawyerWarningModal({ analysis, onContinue, onLawyer }) {
    const critical = analysis.clauses.filter(c => c.riskLevel === "Critical" || c.riskLevel === "High").slice(0, 2);
    const rc = (r) => r === "Critical" || r === "High" ? "#ef4444" : r === "Medium" ? "#f59e0b" : "#22c55e";
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(14px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <motion.div initial={{ scale: 0.93, y: 18 }} animate={{ scale: 1, y: 0 }} style={{ background: "#0D0F13", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 18, padding: "28px", maxWidth: 500, width: "100%" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", flexShrink: 0 }}>
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    </div>
                    <div>
                        <div style={{ fontFamily: "Playfair Display,serif", fontSize: 19, fontWeight: 700, color: "#FFF", marginBottom: 3 }}>High Risk Contract Detected</div>
                        <div style={{ fontSize: 12, color: "#ef4444" }}>Overall Risk Score: {analysis.overallScore}/10 — {analysis.riskLevel}</div>
                    </div>
                </div>
                <div style={{ fontSize: 13, color: "#777", marginBottom: 16, lineHeight: 1.7 }}>
                    Our system has identified <strong style={{ color: "#ef4444" }}>{analysis.agentOutputs.risk.critical} critical</strong> and <strong style={{ color: "#f59e0b" }}>{analysis.agentOutputs.risk.high} high-risk</strong> clauses. We strongly recommend consulting a lawyer before signing.
                </div>
                <div style={{ marginBottom: 18 }}>
                    {critical.map(c => (
                        <div key={c.id} style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.14)", borderRadius: 10, padding: "11px 13px", marginBottom: 9 }}>
                            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: "#DDD" }}>{c.title}</span>
                                <span style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "1px 7px", fontSize: 10, color: "#ef4444", fontFamily: "IBM Plex Mono,monospace" }}>{c.riskScore}/100</span>
                            </div>
                            <div style={{ fontSize: 11, color: "#666" }}>{c.plain}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <motion.button whileHover={{ scale: 1.02 }} onClick={onLawyer} style={{ flex: 1, padding: "11px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 10, color: "#c4b5fd", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "DM Sans,sans-serif" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
                            Consult a Lawyer First
                        </div>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} onClick={onContinue} style={{ flex: 1, padding: "11px", background: "linear-gradient(135deg,#C49E6C,#F5D08A)", border: "none", borderRadius: 10, color: "#000", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "DM Sans,sans-serif" }}>
                        View Full Report →
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}
