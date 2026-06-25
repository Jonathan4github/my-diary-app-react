import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BgBlob from "../components/BgBlob.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { loadEntries, saveEntries } from "../lib/storage.js";
import { BackIcon, SaveIcon, TagIcon } from "../components/Icons.jsx";

const MOODS = [
  { value: "😊", label: "😊 Happy" },
  { value: "🥰", label: "🥰 Grateful" },
  { value: "😌", label: "😌 Calm" },
  { value: "🤔", label: "🤔 Thoughtful" },
  { value: "😮‍💨", label: "😮‍💨 Tired" },
  { value: "😔", label: "😔 Low" },
];

export default function EntryEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editId = id ? Number(id) : null;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [mood, setMood] = useState("😊");
  const [createdAt, setCreatedAt] = useState(() => new Date());
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("");

  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  // Load the entry being edited (if any)
  useEffect(() => {
    if (editId == null) return;
    const existing = loadEntries().find((e) => e.id === editId);
    if (existing) {
      setEditing(true);
      setTitle(existing.title);
      setBody(existing.body);
      setTags((existing.tags || []).join(", "));
      setMood(existing.mood || "😊");
      setCreatedAt(new Date(existing.createdAt));
      document.title = "Edit Entry · My Diary";
    }
  }, [editId]);

  const dateLabel = createdAt.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle || !trimmedBody) {
      (trimmedTitle ? bodyRef : titleRef).current?.focus();
      return;
    }

    const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
    const entries = loadEntries();

    let targetId = editId;
    if (editing && editId != null) {
      const idx = entries.findIndex((en) => en.id === editId);
      if (idx !== -1) {
        entries[idx] = {
          ...entries[idx],
          title: trimmedTitle,
          body: trimmedBody,
          mood,
          tags: tagList,
          updatedAt: new Date().toISOString(),
        };
      }
    } else {
      const now = new Date();
      targetId = now.getTime();
      entries.unshift({
        id: targetId,
        title: trimmedTitle,
        body: trimmedBody,
        mood,
        tags: tagList,
        createdAt: now.toISOString(),
      });
    }

    saveEntries(entries);
    setStatus("Saved ✓");
    setTimeout(() => {
      navigate(editing ? `/view/${targetId}` : "/dashboard");
    }, 600);
  };

  return (
    <div className="editor">
      <BgBlob />

      <form className="editor-card" noValidate onSubmit={handleSubmit}>
        {/* TOPBAR */}
        <header className="editor-topbar">
          <Link to="/dashboard" className="editor-back">
            <BackIcon />
            Back
          </Link>

          <span className="editor-date">{dateLabel}</span>

          <div className="editor-actions">
            <span className="editor-saved" aria-live="polite">{status}</span>
            <button type="submit" className="btn primary-btn editor-save">
              <SaveIcon />
              Save entry
            </button>
          </div>
        </header>

        {/* MOOD */}
        <fieldset className="editor-mood">
          <legend>How are you feeling?</legend>
          <div className="mood-options" role="radiogroup" aria-label="Mood">
            {MOODS.map((m) => (
              <label key={m.value} className="mood-chip">
                <input
                  type="radio"
                  name="mood"
                  value={m.value}
                  checked={mood === m.value}
                  onChange={() => setMood(m.value)}
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* TITLE */}
        <input
          type="text"
          ref={titleRef}
          className="editor-title"
          placeholder="Give your day a title…"
          autoComplete="off"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* BODY */}
        <textarea
          ref={bodyRef}
          className="editor-body"
          placeholder="Dear diary…"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {/* FOOTER */}
        <footer className="editor-footer">
          <div className="field editor-tags-field">
            <label htmlFor="entry-tags">Tags</label>
            <div className="input-wrap">
              <TagIcon className="input-icon" />
              <input
                type="text"
                id="entry-tags"
                placeholder="morning, gratitude (comma separated)"
                autoComplete="off"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          <span className="editor-count">{wordCount} {wordCount === 1 ? "word" : "words"}</span>
        </footer>
      </form>

      <BottomNav />
    </div>
  );
}
