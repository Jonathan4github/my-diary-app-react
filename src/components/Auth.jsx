// Auth.jsx
// -----------------------------------------------------------------------------
// A SINGLE reusable component that renders BOTH the Login and the Signup screens.
//
// Why build it this way?
//   The old Login and Signup pages were ~95% identical (same card, same logo,
//   same email/password inputs, same submit logic). Copy-pasting that markup in
//   two files means every future tweak has to be made twice. Instead we write
//   the shared UI ONCE here and let a single `mode` prop decide the few things
//   that actually differ between the two screens.
//
// How the parent uses it:
//   <Auth mode="login" />     -> renders the Login screen
//   <Auth mode="signup" />    -> renders the Signup screen
// -----------------------------------------------------------------------------

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgBlob from "./BgBlob.jsx";
import { setUser } from "../lib/storage.js";
import { UserIcon, MailIcon, LockIcon, EyeIcon, PencilIcon } from "./Icons.jsx";
import MODES from "./AuthData.js";


// `mode` defaults to "login" so a forgetful caller still gets a valid screen.
export default function Auth({ mode = "login" }) {
  // Pick the text/flags for the current mode from the config above.
  const config = MODES[mode];

  // useNavigate lets us send the user to another route from code (after submit).
  const navigate = useNavigate();

  // ---- Form state -----------------------------------------------------------
  // Each input is a "controlled component": React state is the single source of
  // truth, and the <input> just reflects it. That is why every field has both a
  // `value={...}` and an `onChange={...}` below.
  const [name, setName] = useState("");          // only used in signup mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // eye toggle

  // ---- Submit handler -------------------------------------------------------
  const handleSubmit = (e) => {
    // Stop the browser's default behaviour of reloading the page on submit.
    e.preventDefault();

    // Very light validation: bail out if email or password is empty.
    if (!email.trim() || !password) return;

    // TODO: replace with real authentication (call an API, verify a password…).
    // For this teaching app we just remember WHO is "logged in" in localStorage.
    // On signup we prefer the typed name; otherwise we fall back to the email.
    const identity = config.showNameField
      ? name.trim() || email.trim()
      : email.trim();

    setUser(identity);
    navigate("/dashboard"); // send the user into the app
  };

  // ---- UI -------------------------------------------------------------------
  return (
    <main className="auth">
      {/* Decorative animated background blobs. */}
      <BgBlob />

      <section className="auth-card">
        {/* Logo doubles as a link back to the landing page. */}
        <Link to="/" className="auth-logo">
          <img src="/images/logo-trimmed.png" alt="My Diary Logo" />
        </Link>

        {/* Heading + subtitle change per mode (pulled from the config). */}
        <h1 className="auth-title">{config.title}</h1>
        <p className="auth-subtitle">{config.subtitle}</p>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          {/* NAME — rendered ONLY in signup mode.
              `{condition && <jsx/>}` is the React way to show something
              conditionally: if the condition is false, nothing is rendered. */}
          {config.showNameField && (
            <div className="field">
              <label htmlFor="name">Name</label>
              <div className="input-wrap">
                <UserIcon className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* EMAIL — shown in both modes. */}
          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="input-wrap">
              <MailIcon className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD — shown in both modes; placeholder/autocomplete differ. */}
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <LockIcon className="input-icon" />
              <input
                // Flip between "password" (dots) and "text" (readable) using the
                // showPassword toggle below.
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder={config.passwordPlaceholder}
                autoComplete={config.passwordAutoComplete}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* The eye button toggles password visibility. type="button" keeps
                  it from submitting the form when clicked. */}
              <button
                type="button"
                className="toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
              >
                <EyeIcon />
              </button>
            </div>
          </div>

          {/* OPTIONS — login shows "Remember me / Forgot password",
              signup shows a "I agree to the Terms" checkbox. */}
          <div className="auth-options">
            {config.showNameField ? (
              <label className="remember">
                <input type="checkbox" name="terms" required />
                <span>
                  I agree to the <a href="#" className="forgot-link">Terms</a>
                </span>
              </label>
            ) : (
              <>
                <label className="remember">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </>
            )}
          </div>

          {/* SUBMIT — label changes per mode. */}
          <button type="submit" className="btn primary-btn auth-submit">
            <PencilIcon />
            {config.submitLabel}
          </button>
        </form>

        {/* Footer link to switch to the other screen. */}
        <p className="auth-switch">
          {config.switchText}{" "}
          <Link to={config.switchTo}>{config.switchLinkText}</Link>
        </p>
      </section>
    </main>
  );
}
