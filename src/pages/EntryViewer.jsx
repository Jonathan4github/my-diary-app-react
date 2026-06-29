// EntryViewer.jsx
// -----------------------------------------------------------------------------
// A PURE React, read-only page that shows ONE diary entry. No localStorage.
//
// It finds the entry to show in the shared list (our EntriesContext) using the
// id from the URL, e.g. /view/3. Delete also goes through the context, so the
// dashboard updates the moment an entry is removed.
// -----------------------------------------------------------------------------

import { Link, useNavigate, useParams } from "react-router-dom";
import BgBlob from "../components/BgBlob.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { useEntries } from "../context/EntriesContext.jsx";
import { BackIcon, PencilIcon, TrashIcon } from "../components/Icons.jsx";

// Shown when no real entry matches the URL (e.g. visiting /view with no id).
const SAMPLE = {
  id: null,
  mood: "😊",
  moodClass: "mood-happy",
  moodTitle: "Happy",
  date: "Today",
  title: "A calm start to the day",
  tags: ["morning", "gratitude"],
  body:
    "Woke up early today before the house got busy. Made a cup of coffee and " +
    "sat by the window for a while, just watching the light come up.\n\n" +
    "There's something about the quiet of the morning that makes everything " +
    "feel possible. No rush, no noise — just me and my thoughts.\n\n" +
    "I want to remember this feeling. Grateful for the small, slow moments.",
};

export default function EntryViewer() {
  const navigate = useNavigate();

  // Read the id from the URL (/view/:id) and turn it into a number.
  const { id } = useParams();
  const viewId = id ? Number(id) : null;

  const { entries, deleteEntry } = useEntries();

  // Find the matching entry. If there isn't one, fall back to the sample.
  const realEntry = entries.find((e) => e.id === viewId);
  const entry = realEntry || SAMPLE;
  const isSample = !realEntry;

  const handleDelete = () => {
    // Ask before deleting, then remove it from the shared list.
    if (!window.confirm("Delete this entry? This can't be undone.")) return;
    deleteEntry(entry.id);
    navigate("/dashboard");
  };

  return (
    <div className="editor">
      <BgBlob />

      <article className="editor-card viewer-card">
        {/* TOPBAR */}
        <header className="editor-topbar">
          <Link to="/dashboard" className="editor-back">
            <BackIcon />
            Back
          </Link>

          <span className="editor-date">{entry.date}</span>

          {/* Edit/Delete only make sense for a real saved entry, not the sample. */}
          {!isSample && (
            <div className="editor-actions">
              <Link to={`/entry/${entry.id}`} className="btn secondary-btn viewer-edit">
                <PencilIcon />
                Edit
              </Link>
              <button type="button" className="btn viewer-delete" onClick={handleDelete}>
                <TrashIcon />
                Delete
              </button>
            </div>
          )}
        </header>

        {/* CONTENT */}
        <div>
          <div className={`viewer-mood ${entry.moodClass || ""}`} title={entry.moodTitle}>
            {entry.mood || "📝"}
          </div>
          <h1 className="viewer-title">{entry.title}</h1>
          <div className="viewer-body">{entry.body}</div>
          {entry.tags && entry.tags.length > 0 && (
            <div className="viewer-tags">
              {entry.tags.map((t, i) => (
                <span key={i} className="tag">{t}</span>
              ))}
            </div>
          )}
        </div>
      </article>

      <BottomNav />
    </div>
  );
}