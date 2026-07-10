// src/lib/leadflow.ts
export interface LeadFlowConfig { apiBaseUrl: string; projectSlug: string; cookieDomain?: string; }
export interface SignupData {
  email?: string; phone?: string; name?: string;
  outcomeType?: "newsletter_signup" | "webinar_signup" | "other";
  productId?: string;
}
const STORAGE_KEY = "lf_attribution";
const VISITOR_COOKIE = "lf_vid";
const isBrowser = () => typeof window !== "undefined";

function readCookie(name: string) {
  if (!isBrowser()) return null;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}
function writeCookie(name: string, value: string, domain?: string) {
  if (!isBrowser()) return;
  const exp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 730).toUTCString();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  const dom = domain ? "; domain=" + domain : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/${dom}; SameSite=Lax${secure}`;
}
function urlParams() {
  if (!isBrowser()) return {} as Record<string, string>;
  const p = new URLSearchParams(location.search); const o: Record<string, string> = {};
  ["lf_visitor_id", "lf_link_id", "lf_click_id"].forEach((k) => { const v = p.get(k); if (v) o[k] = v; });
  return o;
}

export function createLeadFlow(cfg: LeadFlowConfig) {
  function getAttribution() {
    let stored: Record<string, string> = {};
    try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch {}
    const merged = { ...stored, ...urlParams() };
    const vid = merged["lf_visitor_id"] || readCookie(VISITOR_COOKIE);
    if (vid) { merged["lf_visitor_id"] = vid; writeCookie(VISITOR_COOKIE, vid, cfg.cookieDomain); }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch {}
    return merged;
  }
  async function trackSignup(data: SignupData) {
    const a = getAttribution();
    const res = await fetch(`${cfg.apiBaseUrl}/events/signup`, {
      method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
      body: JSON.stringify({
        projectSlug: cfg.projectSlug,
        lfVisitorId: a["lf_visitor_id"], lfLinkId: a["lf_link_id"], lfClickId: a["lf_click_id"],
        outcomeType: data.outcomeType ?? "webinar_signup", productId: data.productId,
        email: data.email, phone: data.phone, name: data.name,
      }),
    });
    if (!res.ok) throw new Error(`trackSignup failed: ${res.status}`);
    return res.json() as Promise<{ leadId?: string }>;
  }
  return { getAttribution, trackSignup };
}