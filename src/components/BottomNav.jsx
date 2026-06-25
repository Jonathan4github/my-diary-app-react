import { Link } from "react-router-dom";
import { HomeIcon, CalendarIcon, PlusIcon, StatsIcon, ProfileIcon } from "./Icons.jsx";

// Mobile-only bottom navigation (shown ≤760px). `home` highlights the Home tab.
export default function BottomNav({ home = false }) {
  return (
    <nav className="dash-bottomnav">
      <Link to="/dashboard" className={`dash-bottom-link${home ? " active" : ""}`}>
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
  );
}
