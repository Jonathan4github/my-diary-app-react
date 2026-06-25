import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BgBlob from "../components/BgBlob.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { loadEntries, saveEntries } from "../lib/storage.js";
import { BackIcon, PencilIcon, TrashIcon } from "../components/Icons.jsx";

// Shown when no real entry is requested (e.g. previewing the page).
const SAMPLE = {
  title: "A calm start to the day",
  mood: "😊",
  createdAt: new Date().toISOString(),
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
  const { id } = useParams();
  const viewId = id ? Number(id) : null;

  const realEntry = useMemo(
    () => (viewId != null ? loadEntries().find((e) => e.id === viewId) : undefined),
    [viewId]
  );
  const entry = realEntry || SAMPLE;
  const isSample = !realEntry;

  const dateLabel = new Date(entry.createdAt).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDelete = () => {
    if (!window.confirm("Delete this entry? This can't be undone.")) return;
    saveEntries(loadEntries().filter((e) => e.id !== entry.id));
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

          <span className="editor-date">{dateLabel}</span>

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
          <div className="viewer-mood">{entry.mood || "📝"}</div>
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
