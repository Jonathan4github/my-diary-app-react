// Dashboard.jsx
// -----------------------------------------------------------------------------
// A PURE React dashboard. No localStorage, no plain-JS data crunching.
//
// Right now every piece of data (the user, the stats, the entries) is just
// placeholder React state defined at the top of this file. The UI only knows
// how to RENDER that state — it does not care where the data came from.
//
// Later, when we connect a real database/API, we will only change WHERE the
// state is filled in (see the `TODO` notes inside the component). The JSX below
// will not need to change at all. That separation — data vs. display — is the
// whole point of building it this way.
// -----------------------------------------------------------------------------

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgBlob from "../components/BgBlob.jsx";
import StatCard from "../components/StatCard.jsx";
import EntryCard from "../components/EntryCard.jsx";
import { useEntries } from "../context/EntriesContext.jsx";
import {
  GridIcon, CalendarIcon, HeartIcon, SettingsIcon, LogoutIcon,
  MenuIcon, SearchIcon, PlusIcon, BookSolidIcon, FlameIcon, SmileyIcon,
  HomeIcon, StatsIcon, ProfileIcon,
} from "../components/Icons.jsx";

// -----------------------------------------------------------------------------
// PLACEHOLDER DATA
// -----------------------------------------------------------------------------
// These are stand-ins for data that will later come from the database.
// They are plain objects/arrays so the dashboard has something to show today.

// Who is logged in (later: fetched from the logged-in user's account).
const SAMPLE_USER = {
  name: "friend",
  avatar: "F",
  greeting: "Good morning",
  subtitle: "Let's capture today's thoughts.",
};

// The other three stat numbers (later: calculated by the backend).
// "Total entries" is NOT here — we read that live from the shared entries list.
const SAMPLE_STATS = {
  streak: 5,
  month: 12,
  topMood: "😊",
};

export default function Dashboard() {
  // useNavigate lets us change pages from code (used by the logout button).
  const navigate = useNavigate();

  // Is the mobile sidebar drawer open? This is real UI state React owns.
  const [menuOpen, setMenuOpen] = useState(false);

  // ---- App data -------------------------------------------------------------
  // The entries come from the shared context, so anything added in the editor
  // shows up here automatically.
  const { entries } = useEntries();

  // The user is still a placeholder for now.
  // TODO (database): replace this with the logged-in user's data from your API.
  const [user] = useState(SAMPLE_USER);

  // Stats: "Total entries" is the live count; the rest are placeholders.
  const stats = { ...SAMPLE_STATS, total: entries.length };

  const handleLogout = () => {
    // TODO (database): also tell the backend to end the session here.
    navigate("/login");
  };

  // Describe the four stat cards as data, then render them with one <StatCard>.
  // Adding or changing a card now means editing this list — not copying markup.
  const statCards = [
    { icon: <BookSolidIcon />, iconClass: "icon-purple", value: stats.total, label: "Total entries" },
    { icon: <FlameIcon />, iconClass: "icon-pink", value: `${stats.streak} ${stats.streak === 1 ? "day" : "days"}`, label: "Current streak" },
    { icon: <CalendarIcon />, iconClass: "icon-purple", value: stats.month, label: "This month" },
    { icon: <SmileyIcon />, iconClass: "icon-pink", value: stats.topMood, label: "Top mood" },
  ];

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

        {/* TOPBAR — greeting comes straight from the user data above. */}
        <header className="dash-topbar">
          <div className="dash-greeting">
            <h1>{user.greeting}, <span className="accent">{user.name}</span> 👋</h1>
            <p>{user.subtitle}</p>
          </div>

          <div className="dash-topbar-actions">
            <Link to="/entry" className="btn primary-btn dash-new-entry">
              <PlusIcon />
              New Entry
            </Link>
            <span className="dash-avatar" aria-hidden="true">{user.avatar}</span>
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

        {/* STAT CARDS — one reusable <StatCard> per item in the list above. */}
        <section className="dash-stats">
          {statCards.map((card, i) => (
            <StatCard
              key={i}
              icon={card.icon}
              iconClass={card.iconClass}
              value={card.value}
              label={card.label}
            />
          ))}
        </section>

        {/* RECENT ENTRIES */}
        <section className="dash-section">
          <div className="dash-section-head">
            <h2>Recent entries</h2>
            <a href="#" className="dash-see-all">See all</a>
          </div>

          <div className="entry-grid">
            {/* Loop over the entries and render one reusable <EntryCard> each.
                `key` helps React tell the cards apart when the list changes. */}
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}

            {/* New entry tile — takes the user to the editor page. */}
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
