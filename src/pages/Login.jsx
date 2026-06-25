import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgBlob from "../components/BgBlob.jsx";
import { setUser } from "../lib/storage.js";
import { MailIcon, LockIcon, EyeIcon, PencilIcon, GoogleIcon } from "../components/Icons.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    // TODO: replace with real authentication.
    // For now, remember who logged in and send them to the dashboard.
    setUser(email.trim());
    navigate("/dashboard");
  };

  return (
    <main className="auth">
      <BgBlob />

      <section className="auth-card">
        <Link to="/" className="auth-logo">
          <img src="/images/logo-trimmed.png" alt="My Diary Logo" />
        </Link>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Your safe space is waiting for you.</p>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
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
                placeholder="••••••••"
                autoComplete="current-password"
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

          {/* OPTIONS */}
          <div className="auth-options">
            <label className="remember">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          {/* SUBMIT */}
          <button type="submit" className="btn primary-btn auth-submit">
            <PencilIcon />
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
}
