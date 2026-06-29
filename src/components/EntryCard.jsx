// EntryCard.jsx
// -----------------------------------------------------------------------------
// A reusable card that shows ONE diary entry in the dashboard grid.
//
// The dashboard has many entries, and they all look identical apart from their
// content. Instead of repeating the same markup for every entry, we describe a
// single card here and let the parent hand us one `entry` object to display.
//
// The whole card is a <Link>, so clicking it opens that entry's viewer page
// (/view/:id).
//
// Props:
//   entry - an object shaped like:
//     {
//       id,                          // used to build the /view/:id link
//       mood, moodClass, moodTitle,  // the emoji + its colour + hover text
//       date,                        // ready-to-show date string
//       title, body,                 // the entry's text
//       tags                         // array of strings
//     }
// -----------------------------------------------------------------------------

import { Link } from "react-router-dom";

export default function EntryCard({ entry }) {
  return (
    <Link to={`/view/${entry.id}`} className="entry-card entry-link">
      <div className="entry-top">
        <span className={`entry-mood ${entry.moodClass || ""}`} title={entry.moodTitle}>
          {entry.mood}
        </span>
        <span className="entry-date">{entry.date}</span>
      </div>

      <h3>{entry.title}</h3>
      <p>{entry.body}</p>

      {/* Show the tags row only if there are any tags. */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="entry-tags">
          {entry.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </Link>
  );
}