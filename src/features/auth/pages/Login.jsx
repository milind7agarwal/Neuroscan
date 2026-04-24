import { useState } from "react";
import { loginUser } from "../services/auth.api";
import "./Login.css";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  surface:                 "#0b1326",
  surfaceContainer:        "#171f33",
  surfaceContainerHigh:    "#222a3d",
  surfaceContainerHighest: "#2d3449",
  surfaceContainerLow:     "#131b2e",
  surfaceContainerLowest:  "#060e20",
  surfaceBright:           "#31394d",
  onSurface:               "#dae2fd",
  onSurfaceVariant:        "#c6c6cd",
  outlineVariant:          "#45464d",
  primary:                 "#7bd0ff",
  onPrimary:               "#00354a",
  onPrimaryContainer:      "#008abb",
  error:                   "#ffb4ab",
  tertiary:                "#ffb95f",
};

// ─── Icon helper ──────────────────────────────────────────────────────────────
function Icon({ name, fill = 0, size = "1.25rem", color, style = {} }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontVariationSettings: `'FILL' ${fill}`,
        fontSize: size,
        color,
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
    >
      {name}
    </span>
  );
}

// ─── Avatar data ──────────────────────────────────────────────────────────────
const AVATARS = [
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6rA1En8AOXo2DLolIcyguiXwWQyxc8sMPXLNhg5Kfik1iV4vHxSj7Mdvs1RYeoql3XsKmPna1GUscainjxAZqnvQjt206EF_Rj8LtUknict9Lo1dE9qJc0DpkZpVotWlWbcuB48eb2Ft97QhXGaEkpKv1ROdfi3XSiAvBdN8kjZB0qhdQj8435cvc08NJQZ7m7usVsvOPRV9rVmMyjZKPDtj9gk1Q1LwL3Q_CIJ-f_obrp2jMYsr6bOtE4KT7yusaw6yloPZTJ6Fs", alt: "Female doctor" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuOA7eYllHZxajEav3k8doT1dhyga9yW8fadrrghwSuA-OCZhznSb6p3Zb86X9IYkiU3P06YYDCGlElvHKAl25XL4DKD38tgjjcUis92vPDU5q5_1bGDcv7K_x8nYOP-6yepPR9pVKUBB0dz3nD2y1TKuj4KrXG0-QwKgtbn8YyH04V1Fkxsl12q9JIS1v0rpqbYZg20c8-JlYgOhXoPjhGHB6cmg9PfJKFqzObhwgxcYu5CpIEBcDdQneof-6wWKfes7YyHWywTeB", alt: "Male physician" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0isZx4-Q7hCVakk2Usy1QRZtApsPfO7w-vFdHsE4-h8Wbjle0wnQP3yZ8NhztkoEwl8OjFeWNiR7NW0XNErDmbL1XOcCCCfahVXYfq5Sx2ffh1nEz7oTKACcFkLK5dacerZbL5zGJTI4UIYQYpQlAGc1FXuGAdiaPo71kM8bRa3MrHquMK4jbo9xY-5YwhG1QgPqd3pfhI-1bA4QouLoJ-xNw19QSe559THNh0lV1klLvSSyN3rriEy-tJNAJ7kH7TIHfw-Vy6Pbz", alt: "Specialist doctor" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function NeuroScanLogin() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
  
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("accessToken", data.token);
      setSuccess(data.message || "Login successful");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ══════════════════════ HEADER ══════════════════════ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "4rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1.25rem",
        background: T.surface,
        borderBottom: "1px solid rgba(69,70,77,0.25)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Icon name="shield_with_heart" fill={1} color={T.primary} size="1.4rem" />
          <span style={{
            fontFamily: "Manrope, sans-serif", fontWeight: 800,
            fontSize: "0.9375rem", letterSpacing: "-0.02em", color: T.onSurface,
          }}>
            NEUROSCAN AI
          </span>
        </div>
        <span style={{
          fontFamily: "Manrope, sans-serif", fontSize: "0.6875rem",
          fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", color: T.primary,
        }}>
          CLINICAL PRECISION
        </span>
      </header>

      {/* ══════════════════════ MAIN ══════════════════════ */}
      <main
        className="ns-main"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",        /* mobile: stacked */
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "4rem 0 5.5rem",       /* mobile: header + nav clearance */
          minHeight: "100dvh",
        }}
      >
        {/* ── LEFT PANEL: desktop only ─────────────────────────────── */}
        <div
          className="ns-left-panel"
          style={{
            flex: "1 1 300px", maxWidth: "460px",
            flexDirection: "column", gap: "1.5rem", padding: "0 1.5rem",
          }}
        >
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: "0.625rem",
            fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: T.primary,
          }}>
            Diagnostic Authorization System
          </span>
          <h1 style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 800, color: T.onSurface,
            lineHeight: 1.15, letterSpacing: "-0.025em",
          }}>
            Precision in every<br />
            <span style={{ color: T.primary }}>neural scan.</span>
          </h1>
          <div style={{
            background: T.surfaceContainer, borderRadius: "0.25rem",
            borderLeft: `4px solid rgba(123,208,255,0.40)`,
            padding: "1.25rem 1.5rem",
          }}>
            <p style={{ color: T.onSurfaceVariant, fontSize: "0.875rem", lineHeight: 1.7 }}>
              Accessing the NeuroScan clinical environment requires multi-factor
              authentication. Ensure you are utilizing a secure, hospital-validated
              terminal for all diagnostic reviews.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "0.5rem" }}>
            <div style={{ display: "flex" }}>
              {AVATARS.map((av, i) => (
                <img key={i} src={av.src} alt={av.alt} style={{
                  width: "2.5rem", height: "2.5rem", borderRadius: "9999px",
                  objectFit: "cover", border: `2px solid ${T.surface}`,
                  marginLeft: i === 0 ? 0 : "-0.75rem",
                }} />
              ))}
            </div>
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: "0.625rem",
              fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.12em", color: T.onSurfaceVariant,
            }}>
              Trusted by 4+ Radiologists
            </span>
          </div>
        </div>

        {/* ── SHIELD ICON: mobile only, overlaps card top ──────────── */}
        <div
          className="ns-mobile-shield"
          style={{
            justifyContent: "center",
            paddingTop: "2.5rem",
            marginBottom: "-1.5rem",
            position: "relative", zIndex: 2,
          }}
        >
          <Icon name="shield_with_heart" fill={1} color={T.primary} size="3.5rem" />
        </div>

        {/* ── LOGIN CARD ────────────────────────────────────────────── */}
        <div
          className="ns-card-wrap"
          style={{
            width: "100%",
            padding: "0 1rem",            /* mobile: edge gutters */
          }}
        >
          <div className="ns-card" style={{
            width: "100%",
            borderRadius: "1rem",
            border: "1px solid rgba(69,70,77,0.12)",
            boxShadow: "0 40px 80px rgba(5,10,30,0.55)",
            padding: "2.5rem 1.75rem 2rem",
          }}>

            {/* Card header */}
            <div style={{ marginBottom: "1.75rem" }}>
              <h2 style={{
                fontFamily: "Manrope, sans-serif", fontSize: "1.75rem",
                fontWeight: 700, color: T.onSurface,
                letterSpacing: "-0.02em", lineHeight: 1.2,
              }}>
                Welcome Back
              </h2>
              <p style={{ color: T.onSurfaceVariant, fontSize: "0.9375rem", marginTop: "0.3rem" }}>
                Initialize clinical session
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {error ? <p style={{ color: T.error, fontSize: "0.875rem" }}>{error}</p> : null}
            {success ? <p style={{ color: T.primary, fontSize: "0.875rem" }}>{success}</p> : null}
              {/* Email */}
              <div>
                <label className="ns-label" htmlFor="ns-email">Email Address</label>
                <div style={{ position: "relative" }}>
                  <Icon name="medical_services" color={T.onSurfaceVariant} size="1.2rem" style={{
                    position: "absolute", left: "0.875rem", top: "50%",
                    transform: "translateY(-50%)", pointerEvents: "none",
                  }} />
                  <input
                    id="ns-email" type="email" className="ns-input"
                    placeholder="name@domain.com" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div >
                  <label className="ns-label" htmlFor="ns-password" style={{ margin: 0 }}>Access Key</label>
                  <a href="#" style={{
                    fontSize: "0.6875rem", fontWeight: 700, color: T.primary,
                    textTransform: "uppercase", letterSpacing: "0.04em", textDecoration: "none",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <Icon name="lock" color={T.onSurfaceVariant} size="1.2rem" style={{
                    position: "absolute", left: "0.875rem", top: "50%",
                    transform: "translateY(-50%)", pointerEvents: "none",
                  }} />
                  <input
                    id="ns-password" type="password" className="ns-input"
                    placeholder="••••••••" required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Remember me */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.25rem 0" }}>
                <input
                  id="ns-remember" type="checkbox" className="ns-check"
                  checked={remember} onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="ns-remember" style={{
                  fontSize: "0.875rem", color: T.onSurfaceVariant, cursor: "pointer",
                }}>
                  Maintain session on this terminal
                </label>
              </div>

              {/* CTA */}
              <button type="submit" className="ns-btn" style={{ marginTop: "0.25rem" }} disabled={isSubmitting}>
                <Icon name="login" fill={1} color={T.onPrimary} size="1.2rem" />
                {isSubmitting ? "Authenticating..." : "AUTHENTICATE SESSION"}
              </button>
            </form>

            {/* Card footer */}
            <div style={{
              marginTop: "2rem", paddingTop: "1.5rem",
              borderTop: "1px solid rgba(69,70,77,0.12)",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "0.9375rem", color: T.onSurfaceVariant }}>
                New to the network?{" "}
                <a href="#" style={{ color: T.primary, fontWeight: 700, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  Request Physician Access
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>


      {/* ══════════════════════ BOTTOM NAV (mobile) ══════════════════════ */}
      <nav className="ns-bottom-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        height: "5rem",
        alignItems: "center", justifyContent: "space-around",
        padding: "0 2rem",
        background: T.surfaceContainer,
        borderTop: "1px solid rgba(218,226,253,0.08)",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.45)",
      }}>
        {/* Active: Login */}
        <button className="ns-nav-btn" style={{ background: T.surfaceContainerHighest, color: T.primary }}>
          <Icon name="login" fill={1} color={T.primary} size="1.375rem" />
          <span>Login</span>
        </button>
        {/* Inactive: Register */}
        <button
          className="ns-nav-btn"
          style={{ background: "transparent", color: "rgba(218,226,253,0.45)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(218,226,253,0.45)")}
        >
          <Icon name="person_add" size="1.375rem" style={{ color: "inherit" }} />
          <span>Register</span>
        </button>
      </nav>

      {/* ══════════════════════ DECORATIVE TRIANGLE ══════════════════════ */}
      <div style={{
        position: "fixed", top: 0, right: 0,
        width: "33%", height: "100%",
        opacity: 0.05, pointerEvents: "none", overflow: "hidden",
      }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", fill: T.primary }}>
          <path d="M0 100 L100 0 L100 100 Z" />
        </svg>
      </div>
    </>
  );
}