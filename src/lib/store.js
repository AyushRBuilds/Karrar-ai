// ── Persistent Storage Helpers ──────────────────────────────────
// Wraps localStorage with JSON serialization. When a real backend
// is added, only this file needs to change.

export const Store = {
    get: async (key) => {
        try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch { return null; }
    },
    set: async (key, val) => {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
    },
};
