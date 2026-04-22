import { useState } from "react";

// ─── Tailwind config extension (paste into tailwind.config.js) ───────────────
// colors, fontFamily, borderRadius from the Clinical Precision design system
// are consumed here via inline class names that match the token names.

const TOKEN = {
  surface:                  "#0b1326",
  surfaceContainer:         "#171f33",
  surfaceContainerHigh:     "#222a3d",
  surfaceContainerHighest:  "#2d3449",
  surfaceContainerLow:      "#131b2e",
  surfaceContainerLowest:   "#060e20",
  surfaceBright:            "#31394d",
  surfaceVariant:           "#2d3449",
  onSurface:                "#dae2fd",
  onSurfaceVariant:         "#c6c6cd",
  outlineVariant:           "#45464d",
  primary:                  "#7bd0ff",
  primaryFixedDim:          "#7bd0ff",
  onPrimary:                "#00354a",
  onPrimaryContainer:       "#008abb",
  error:                    "#ffb4ab",
  tertiary:                 "#ffb95f",
};

// ─── CSS injected once at module level ───────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: ${TOKEN.surface};
    color: ${TOKEN.onSurface};
    font-family: 'Inter', sans-serif;
    min-height: 100dvh;
  }

  .font-headline { font-family: 'Manrope', sans-serif; }

  .glass-panel {
    background: rgba(45, 52, 73, 0.60);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .primary-gradient {
    background: linear-gradient(135deg, ${TOKEN.primary} 0%, ${TOKEN.onPrimaryContainer} 100%);
  }

  .input-field {
    display: block;
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2.75rem;
    background: ${TOKEN.surfaceContainerHighest};
    border: none;
    border-radius: 0.125rem;
    color: ${TOKEN.onSurface};
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: background 0.2s, box-shadow 0.2s;
  }

  .input-field::placeholder { color: ${TOKEN.outlineVariant}; }

  .input-field:focus {
    background: ${TOKEN.surfaceBright};
    box-shadow: 0 0 0 1px rgba(123, 208, 255, 0.40);
  }

  .btn-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    color: ${TOKEN.onPrimary};
    box-shadow: 0 4px 24px rgba(123, 208, 255, 0.10);
    transition: opacity 0.15s, transform 0.1s;
  }

  .btn-primary:hover  { opacity: 0.90; }
  .btn-primary:active { transform: scale(0.98); }

  .label-meta {
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${TOKEN.onSurfaceVariant};
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 1.5rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.625rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    border-radius: 0.375rem;
    cursor: pointer;
    transform: scale(0.95);
    transition: transform 0.15s, color 0.15s;
  }
  .nav-item:active { transform: scale(0.90); }

  .checkbox-custom {
    width: 1rem;
    height: 1rem;
    border-radius: 0.125rem;
    background: ${TOKEN.surfaceContainerHighest};
    border: none;
    accent-color: ${TOKEN.primary};
    cursor: pointer;
  }
`;

// ─── Icon helper ─────────────────────────────────────────────────────────────
function Icon({ name, fill = 0, style = {} }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontVariationSettings: `'FILL' ${fill}`, ...style }}
    >
      {name}
    </span>
  );
}

// ─── Doctor avatar stack ──────────────────────────────────────────────────────
const AVATARS = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6rA1En8AOXo2DLolIcyguiXwWQyxc8sMPXLNhg5Kfik1iV4vHxSj7Mdvs1RYeoql3XsKmPna1GUscainjxAZqnvQjt206EF_Rj8LtUknict9Lo1dE9qJc0DpkZpVotWlWbcuB48eb2Ft97QhXGaEkpKv1ROdfi3XSiAvBdN8kjZB0qhdQj8435cvc08NJQZ7m7usVsvOPRV9rVmMyjZKPDtj9gk1Q1LwL3Q_CIJ-f_obrp2jMYsr6bOtE4KT7yusaw6yloPZTJ6Fs",
    alt: "Female doctor headshot portrait",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuOA7eYllHZxajEav3k8doT1dhyga9yW8fadrrghwSuA-OCZhznSb6p3Zb86X9IYkiU3P06YYDCGlElvHKAl25XL4DKD38tgjjcUis92vPDU5q5_1bGDcv7K_x8nYOP-6yepPR9pVKUBB0dz3nD2y1TKuj4KrXG0-QwKgtbn8YyH04V1Fkxsl12q9JIS1v0rpqbYZg20c8-JlYgOhXoPjhGHB6cmg9PfJKFqzObhwgxcYu5CpIEBcDdQneof-6wWKfes7YyHWywTeB",
    alt: "Male physician headshot portrait",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0isZx4-Q7hCVakk2Usy1QRZtApsPfO7w-vFdHsE4-h8Wbjle0wnQP3yZ8NhztkoEwl8OjFeWNiR7NW0XNErDmbL1XOcCCCfahVXYfq5Sx2ffh1nEz7oTKACcFkLK5dacerZbL5zGJTI4UIYQYpQlAGc1FXuGAdiaPo71kM8bRa3MrHquMK4jbo9xY-5YwhG1QgPqd3pfhI-1bA4QouLoJ-xNw19QSe559THNh0lV1klLvSSyN3rriEy-tJNAJ7kH7TIHfw-Vy6Pbz",
    alt: "Specialist doctor profile picture",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function NeuroScanLogin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up authentication
    console.log("Authenticate:", { email, remember });
  };

  return (
    <>
      {/* Inject global styles once */}
      <style>{globalStyles}</style>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        style={{
          background: TOKEN.surface,
          borderBottom: `1px solid rgba(69,70,77,0.3)`,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Icon name="shield_with_heart" fill={1} style={{ color: TOKEN.primary }} />
          <span
            className="font-headline"
            style={{
              color: TOKEN.onSurface,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            NEUROSCAN AI
          </span>
        </div>

        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.05rem",
            fontSize: "0.625rem",
            fontWeight: 700,
            color: TOKEN.primary,
          }}
        >
          CLINICAL PRECISION
        </span>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "7rem 1.5rem 6rem",
          minHeight: "100dvh",
        }}
      >
        {/* ── Left Panel ─────────────────────────────────────────────────── */}
        <div
          style={{
            flex: "1 1 320px",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                color: TOKEN.primary,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "0.625rem",
                fontWeight: 700,
              }}
            >
              Diagnostic Authorization System
            </span>

            <h1
              className="font-headline"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                color: TOKEN.onSurface,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Precision in every
              <br />
              <span style={{ color: TOKEN.primaryFixedDim }}>neural scan.</span>
            </h1>
          </div>

          {/* Info card */}
          <div
            style={{
              background: TOKEN.surfaceContainer,
              padding: "1.5rem",
              borderRadius: "0.25rem",
              borderLeft: `4px solid rgba(123,208,255,0.40)`,
            }}
          >
            <p
              style={{
                color: TOKEN.onSurfaceVariant,
                fontSize: "0.875rem",
                lineHeight: 1.7,
              }}
            >
              Accessing the NeuroScan clinical environment requires multi-factor
              authentication. Ensure you are utilizing a secure, hospital-validated
              terminal for all diagnostic reviews.
            </p>
          </div>

          {/* Avatar stack */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1rem" }}>
            <div style={{ display: "flex" }}>
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "9999px",
                    border: `2px solid ${TOKEN.surface}`,
                    background: TOKEN.surfaceBright,
                    overflow: "hidden",
                    marginLeft: i === 0 ? 0 : "-0.75rem",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={av.src}
                    alt={av.alt}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.625rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: TOKEN.onSurfaceVariant,
              }}
            >
              Trusted by 4,000+ Radiologists
            </span>
          </div>
        </div>

        {/* ── Login Card ─────────────────────────────────────────────────── */}
        <div
          className="glass-panel"
          style={{
            flex: "0 0 auto",
            width: "min(440px, 100%)",
            padding: "2.5rem",
            borderRadius: "0.5rem",
            border: `1px solid rgba(69,70,77,0.10)`,
            boxShadow: `0 40px 80px rgba(13,18,38,0.60)`,
            position: "relative",
          }}
        >
          {/* Card header */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              className="font-headline"
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: TOKEN.onSurface,
                letterSpacing: "-0.02em",
              }}
            >
              Welcome Back
            </h2>
            <p
              style={{
                color: TOKEN.onSurfaceVariant,
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              Initialize clinical session
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label className="label-meta" htmlFor="email">
                Medical ID / Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: TOKEN.onSurfaceVariant,
                    fontSize: "1.125rem",
                    pointerEvents: "none",
                  }}
                >
                  medical_services
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="name@hospital.org"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label className="label-meta" htmlFor="password">
                  Access Key
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    color: TOKEN.primary,
                    textTransform: "uppercase",
                    letterSpacing: "-0.03em",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = TOKEN.primaryFixedDim)}
                  onMouseLeave={(e) => (e.target.style.color = TOKEN.primary)}
                >
                  Forgot Password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: TOKEN.onSurfaceVariant,
                    fontSize: "1.125rem",
                    pointerEvents: "none",
                  }}
                >
                  lock
                </span>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="input-field"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Remember */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                paddingTop: "0.25rem",
              }}
            >
              <input
                id="remember"
                type="checkbox"
                className="checkbox-custom"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label
                htmlFor="remember"
                style={{
                  fontSize: "0.75rem",
                  color: TOKEN.onSurfaceVariant,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Maintain session on this terminal
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-primary primary-gradient">
              <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>
                login
              </span>
              AUTHENTICATE SESSION
            </button>
          </form>

          {/* Footer */}
          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "2rem",
              borderTop: `1px solid rgba(69,70,77,0.10)`,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.875rem", color: TOKEN.onSurfaceVariant }}>
              New to the network?{" "}
              <a
                href="#"
                style={{
                  color: TOKEN.primary,
                  fontWeight: 700,
                  textDecoration: "none",
                  marginLeft: "0.25rem",
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Request Physician Access
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* ── HIPAA badge (large screens) ────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: "2.5rem",
          left: "2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          color: "rgba(198,198,205,0.35)",
        }}
        className="hipaa-badge"
      >
        <Icon name="verified_user" style={{ fontSize: "1.125rem" }} />
        <span
          style={{
            fontSize: "0.625rem",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontWeight: 600,
          }}
        >
          HIPAA COMPLIANT ENVIRONMENT
        </span>
      </div>

      {/* ── Bottom nav (mobile) ────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "5rem",
          background: TOKEN.surfaceContainer,
          borderTop: `1px solid rgba(218,226,253,0.10)`,
          boxShadow: "0 -8px 32px rgba(0,0,0,0.40)",
          padding: "0 2rem",
        }}
        className="mobile-nav"
      >
        {/* Active: Login */}
        <button
          className="nav-item"
          style={{
            background: TOKEN.surfaceContainerHighest,
            color: TOKEN.primary,
          }}
        >
          <Icon name="login" fill={1} />
          <span>Login</span>
        </button>

        {/* Inactive: Register */}
        <button
          className="nav-item"
          style={{
            color: "rgba(218,226,253,0.50)",
            background: "transparent",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = TOKEN.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(218,226,253,0.50)")}
        >
          <Icon name="person_add" />
          <span>Register</span>
        </button>
      </nav>

      {/* ── Decorative corner triangle ─────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "33%",
          height: "100%",
          opacity: 0.05,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", fill: TOKEN.primary }}
        >
          <path d="M0 100 L100 0 L100 100 Z" />
        </svg>
      </div>

      {/* Hide mobile nav on md+, hide HIPAA badge on < xl */}
      <style>{`
        @media (min-width: 768px) { .mobile-nav { display: none !important; } }
        @media (max-width: 1279px) { .hipaa-badge { display: none !important; } }
      `}</style>
    </>
  );
}