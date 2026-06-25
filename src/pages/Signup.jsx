import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgBlob from "../components/BgBlob.jsx";
import { setUser } from "../lib/storage.js";
import { UserIcon, MailIcon, LockIcon, EyeIcon, PencilIcon, GoogleIcon } from "../components/Icons.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    // TODO: replace with real authentication.
    // Remember the new user (prefer their name) and open the dashboard.
    setUser(name.trim() || email.trim());
    navigate("/dashboard");
  };

  return (
    <main className="auth">
      <BgBlob />

      <section className="auth-card">
        <Link to="/" className="auth-logo">
          <img src="/images/logo-trimmed.png" alt="My Diary Logo" />
        </Link>

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start your story today — it's free.</p>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          {/* NAME */}
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

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <LockIcon className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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

          {/* TERMS */}
          <div className="auth-options">
            <label className="remember">
              <input type="checkbox" name="terms" required />
              <span>I agree to the <a href="#" className="forgot-link">Terms</a></span>
            </label>
          </div>

          {/* SUBMIT */}
          <button type="submit" className="btn primary-btn auth-submit">
            <PencilIcon />
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
