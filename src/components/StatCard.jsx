// StatCard.jsx
// -----------------------------------------------------------------------------
// A small, reusable card for the dashboard's "stats" row
// (Total entries, Current streak, This month, Top mood).
//
// All four cards look the same — only the icon, colour, number and label
// change. So we write the card ONCE here and pass those differences in as
// "props". The parent decides what each card says; this component only draws it.
//
// Props:
//   icon      - the icon element to show (e.g. <FlameIcon />)
//   iconClass - colour class for the icon badge (e.g. "icon-pink")
//   value     - the big number/text (e.g. 24 or "5 days")
//   label     - the small description under it (e.g. "Total entries")
// -----------------------------------------------------------------------------

export default function StatCard({ icon, iconClass, value, label }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${iconClass}`}>{icon}</span>
      <div className="stat-info">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}
