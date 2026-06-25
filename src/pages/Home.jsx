import { Link } from "react-router-dom";
import BgBlob from "../components/BgBlob.jsx";
import { PencilIcon, CalendarIcon, LockIcon, HeartIcon, SparklesIcon } from "../components/Icons.jsx";

export default function Home() {
  return (
    <header className="hero">
      <BgBlob />

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="/images/logo-trimmed.png" alt="My Diary Logo" />
        </Link>
      </nav>

      {/* HERO CONTENT */}
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-text">
          <h1>
            Your thoughts.<br />
            <span className="accent">Your story.</span><br />
            <span className="last-line">
              Your safe space.
              <svg className="heart-doodle" viewBox="0 0 32 29" fill="none" stroke="#ff8fb1" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M16 27C16 27 2 19 2 9.5C2 5 5.5 2 9 2C12 2 14.5 4 16 6.5C17.5 4 20 2 23 2C26.5 2 30 5 30 9.5C30 19 16 27 16 27Z" />
              </svg>
            </span>
          </h1>

          <p className="subtitle">
            Capture your thoughts, reflect on your day,<br />
            and cherish your memories forever.
          </p>

          {/* BUTTONS */}
          <div className="hero-buttons">
            <Link to="/login" className="btn primary-btn">
              <PencilIcon />
              Start Writing
            </Link>

            <Link to="/dashboard" className="btn secondary-btn">
              <CalendarIcon />
              View Entries
            </Link>
          </div>

          {/* HANDWRITTEN DOODLE */}
          <div className="doodle">
            <svg className="doodle-sparkle" viewBox="0 0 24 24" fill="#7c6cf0" aria-hidden="true">
              <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
            </svg>
            <span className="doodle-text">A journal that<br />understands you.</span>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="hero-image">
          <img src="/images/notebook-trimmed.png" alt="Lavender notebook" className="notebook" />
          <img src="/images/phone-trimmed.png" alt="My Diary app preview" className="phone-image" />
          <img src="/images/coffee-trimmed.png" alt="Coffee cup" className="coffee" />
          <img src="/images/pen-trimmed.png" alt="Pen" className="pen" />
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="features">
        <div className="feature-card">
          <span className="feature-icon icon-purple">
            <LockIcon />
          </span>
          <div className="feature-info">
            <h3>Private &amp; Secure</h3>
            <p>Your secrets are always safe.</p>
          </div>
        </div>

        <div className="feature-card">
          <span className="feature-icon icon-pink">
            <HeartIcon />
          </span>
          <div className="feature-info">
            <h3>Beautiful &amp; Simple</h3>
            <p>Minimal design for distraction-free writing.</p>
          </div>
        </div>

        <div className="feature-card">
          <span className="feature-icon icon-purple">
            <SparklesIcon />
          </span>
          <div className="feature-info">
            <h3>Reflect &amp; Grow</h3>
            <p>Understand yourself better every day.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
