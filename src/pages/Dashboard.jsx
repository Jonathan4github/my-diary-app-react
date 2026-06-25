import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgBlob from "../components/BgBlob.jsx";
import { loadEntries, getUser, clearUser } from "../lib/storage.js";
import {
  GridIcon, BookIcon, CalendarIcon, HeartIcon, SettingsIcon, LogoutIcon,
  MenuIcon, SearchIcon, PlusIcon, BookSolidIcon, FlameIcon, SmileyIcon,
  HomeIcon, StatsIcon, ProfileIcon,
} from "../components/Icons.jsx";

// Sample cards shown after any real entries (mirrors the original static markup).
const SAMPLE_CARDS = [
  {
    mood: "😊", moodClass: "mood-happy", moodTitle: "Happy", date: "Today · 8:14 AM",
    title: "A calm start to the day",
    body: "Woke up early and made coffee before the house got busy. There's something about the quiet that makes everything feel possible…",
    tags: ["morning", "gratitude"],
  },
  {
    mood: "🥰", moodClass: "mood-grateful", moodTitle: "Grateful", date: "Yesterday · 9:42 PM",
    title: "Dinner with old friends",
    body: "We laughed about things that happened years ago. I forgot how good it feels to be fully known by people who've stayed…",
    tags: ["friends", "memories"],
  },
  {
    mood: "😮‍💨", moodClass: "mood-tired", moodTitle: "Tired", date: "Jun 7 · 11:10 PM",
    title: "Long but worth it",
    body: "Pushed through a heavy workload today. Tired, but proud of how much I got done. Reminding myself rest is earned…",
    tags: ["work", "reflection"],
  },
  {
    mood: "🤔", moodClass: "mood-thoughtful", moodTitle: "Thoughtful", date: "Jun 5 · 7:30 AM",
    title: "Thinking about the year ahead",
    body: "Started jotting down a few goals. Nothing too rigid — just gentle directions I'd like my life to drift toward…",
    tags: ["goals", "planning"],
  },
];

function formatCardDate(createdAt) {
  return new Date(createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function computeStats(entries) {
  const now = new Date();

  const month = entries.filter((e) => {
    const d = new Date(e.createdAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const counts = {};
  entries.forEach((e) => {
    if (e.mood) counts[e.mood] = (counts[e.mood] || 0) + 1;
  });
  const topMood = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || "—";

  // Current streak: consecutive days up to today (or yesterday) with an entry.
  const days = new Set(entries.map((e) => new Date(e.createdAt).toDateString()));
  let streak = 0;
  const cursor = new Date();
  if (!days.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { total: entries.length, month, topMood, streak };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  // Greeting + name derived from the stored user
  const stored = getUser();
  const displayName = stored
    ? stored.includes("@") ? stored.split("@")[0] : stored
    : "friend";
  const avatar = displayName.charAt(0);

  const hour = new Date().getHours();
  const part = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

  const todayDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const stats = useMemo(() => computeStats(entries), [entries]);

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  return (
    <div className="dash">
      <BgBlob />

      {/* SIDEBAR */}
      <aside className={`dash-sidebar${menuOpen ? " open" : ""}`}>
        <Link to="/" className="dash-logo" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo-trimmed.png" alt="My Diary Logo" />
        </Link>

        <nav className="dash-nav">
          <Link to="/dashboard" className="dash-nav-link active" onClick={() => setMenuOpen(false)}>
            <GridIcon />
            Dashboard
          </Link>
          <a href="#" className="dash-nav-link" onClick={() => setMenuOpen(false)}>
            <BookIcon />
            My Entries
          </a>
          <a href="#" className="dash-nav-link" onClick={() => setMenuOpen(false)}>
            <CalendarIcon />
            Calendar
          </a>
          <a href="#" className="dash-nav-link" onClick={() => setMenuOpen(false)}>
            <HeartIcon />
            Favourites
          </a>
          <a href="#" className="dash-nav-link" onClick={() => setMenuOpen(false)}>
            <SettingsIcon />
            Settings
          </a>
        </nav>

        <button type="button" className="dash-nav-link dash-logout" onClick={handleLogout}>
          <LogoutIcon />
          Log out
        </button>
      </aside>

      {/* MAIN */}
      <main className="dash-main">
        {/* MOBILE TOP BAR */}
        <div className="dash-mobilebar">
          <button type="button" className="dash-iconbtn" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </button>
          <button type="button" className="dash-iconbtn" aria-label="Search">
            <SearchIcon />
          </button>
        </div>

        {/* TOPBAR */}
        <header className="dash-topbar">
          <div className="dash-greeting">
            <h1>Good {part}, <span className="accent">{displayName}</span> 👋</h1>
            <p>{todayDate} · Let's capture today's thoughts.</p>
          </div>

          <div className="dash-topbar-actions">
            <Link to="/entry" className="btn primary-btn dash-new-entry">
              <PlusIcon />
              New Entry
            </Link>
            <span className="dash-avatar" aria-hidden="true">{avatar}</span>
          </div>
        </header>

        {/* DAILY QUOTE */}
        <section className="dash-quote">
          <div className="dash-quote-head">
            <span>Daily Quote</span>
            <HeartIcon />
          </div>
          <p>"The pages you write today can change your tomorrow."</p>
        </section>

        {/* STAT CARDS */}
        <section className="dash-stats">
          <article className="stat-card">
            <span className="stat-icon icon-purple"><BookSolidIcon /></span>
            <div className="stat-info">
              <strong>{stats.total}</strong>
              <span>Total entries</span>
            </div>
          </article>

          <article className="stat-card">
            <span className="stat-icon icon-pink"><FlameIcon /></span>
            <div className="stat-info">
              <strong>{stats.streak} {stats.streak === 1 ? "day" : "days"}</strong>
              <span>Current streak</span>
            </div>
          </article>

          <article className="stat-card">
            <span className="stat-icon icon-purple"><CalendarIcon /></span>
            <div className="stat-info">
              <strong>{stats.month}</strong>
              <span>This month</span>
            </div>
          </article>

          <article className="stat-card">
            <span className="stat-icon icon-pink"><SmileyIcon /></span>
            <div className="stat-info">
              <strong>{stats.topMood}</strong>
              <span>Top mood</span>
            </div>
          </article>
        </section>

        {/* RECENT ENTRIES */}
        <section className="dash-section">
          <div className="dash-section-head">
            <h2>Recent entries</h2>
            <a href="#" className="dash-see-all">See all</a>
          </div>

          <div className="entry-grid">
            {/* Saved entries first, newest first */}
            {entries.map((entry) => (
              <Link key={entry.id} to={`/view/${entry.id}`} className="entry-card entry-link">
                <div className="entry-top">
                  <span className="entry-mood">{entry.mood || "📝"}</span>
                  <span className="entry-date">{formatCardDate(entry.createdAt)}</span>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.body}</p>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="entry-tags">
                    {entry.tags.map((t, i) => (
                      <span key={i} className="tag">{t}</span>
                    ))}
                  </div>
                )}
              </Link>
            ))}

            {/* Sample cards */}
            {SAMPLE_CARDS.map((card, i) => (
              <article key={`sample-${i}`} className="entry-card">
                <div className="entry-top">
                  <span className={`entry-mood ${card.moodClass}`} title={card.moodTitle}>{card.mood}</span>
                  <span className="entry-date">{card.date}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <div className="entry-tags">
                  {card.tags.map((t, j) => (
                    <span key={j} className="tag">{t}</span>
                  ))}
                </div>
              </article>
            ))}

            {/* New entry tile */}
            <button type="button" className="entry-card entry-new" onClick={() => navigate("/entry")}>
              <span className="entry-new-icon"><PlusIcon /></span>
              <span className="entry-new-text">Write a new entry</span>
            </button>
          </div>
        </section>
      </main>

      {/* dim overlay behind the sidebar drawer on mobile */}
      {menuOpen && <div className="dash-overlay" onClick={() => setMenuOpen(false)} />}

      {/* MOBILE BOTTOM NAV */}
      <nav className="dash-bottomnav">
        <Link to="/dashboard" className="dash-bottom-link active">
          <HomeIcon />
          <span>Home</span>
        </Link>
        <a href="#" className="dash-bottom-link">
          <CalendarIcon />
          <span>Calendar</span>
        </a>
        <Link to="/entry" className="dash-fab" aria-label="New entry">
          <PlusIcon strokeWidth={2.5} />
        </Link>
        <a href="#" className="dash-bottom-link">
          <StatsIcon />
          <span>Stats</span>
        </a>
        <a href="#" className="dash-bottom-link">
          <ProfileIcon />
          <span>Profile</span>
        </a>
      </nav>
    </div>
  );
}
