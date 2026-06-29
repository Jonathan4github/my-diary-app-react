// EntryEditor.jsx
// -----------------------------------------------------------------------------
// A PURE React form that handles BOTH writing a new entry AND editing one.
//
//   /entry      -> blank form for a NEW entry
//   /entry/:id  -> the form pre-filled with an EXISTING entry to edit
//
// The form only manages what the user is typing (title, body, tags, mood) using
// React state. On save it either adds a new entry or updates the existing one
// in the shared context. (Later, those calls become real database requests —
// see the `TODO (database)` note in handleSubmit.)
// -----------------------------------------------------------------------------

import { useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BgBlob from "../components/BgBlob.jsx";
import BottomNav from "../components/BottomNav.jsx";
import MoodPicker, { getMood } from "../components/MoodPicker.jsx";
import { useEntries } from "../context/EntriesContext.jsx";
import { BackIcon, SaveIcon, TagIcon } from "../components/Icons.jsx";

export default function EntryEditor() {
  // Lets us change pages from code (after a successful save).
  const navigate = useNavigate();

  // Shared list + the functions to change it.
  const { entries, addEntry, updateEntry } = useEntries();

  // Is there an :id in the URL? If so, we are EDITING that entry.
  const { id } = useParams();
  const editId = id ? Number(id) : null;
  const existing = entries.find((e) => e.id === editId);

  // ---- Form state (controlled inputs) ---------------------------------------
  // Start the fields from the existing entry when editing, or empty when new.
  // (The data is in memory, so it's ready on the very first render — no effect.)
  const [title, setTitle] = useState(existing ? existing.title : "");
  const [body, setBody] = useState(existing ? existing.body : "");
  const [tags, setTags] = useState(existing ? existing.tags.join(", ") : "");
  const [mood, setMood] = useState(existing ? existing.mood : "😊");
  const [status, setStatus] = useState("");  // the little "Saved ✓" message

  // The date label: the entry's own date when editing, otherwise "Today".
  const dateLabel = existing ? existing.date : "Today";

  // Refs let us move focus to a field that needs fixing during validation.
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  // Live word count — pure React, recalculated as the user types.
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e) => {
    // Stop the browser from reloading the page on submit.
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    // Simple validation: both title and body are required. Focus the empty one.
    if (!trimmedTitle || !trimmedBody) {
      (trimmedTitle ? bodyRef : titleRef).current?.focus();
      return;
    }

    // Turn the comma-separated tags string into a clean array.
    const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);

    // Look up the colour + name for the chosen mood so the card matches the
    // sample cards (e.g. "😊" -> mood-happy / "Happy").
    const moodMeta = getMood(mood);

    const fields = {
      mood,
      moodClass: moodMeta.className,
      moodTitle: moodMeta.title,
      title: trimmedTitle,
      body: trimmedBody,
      tags: tagList,
    };

    // TODO (database): replace these context calls with real API requests, e.g.
    //   POST /api/entries        (new)
    //   PUT  /api/entries/:id    (edit)
    if (existing) {
      // EDITING: update the entry in place, then show it in the viewer.
      updateEntry(editId, fields);
      setStatus("Saved ✓");
      setTimeout(() => navigate(`/view/${editId}`), 600);
    } else {
      // NEW: add it to the top of the list, then go to the dashboard.
      addEntry(fields);
      setStatus("Saved ✓");
      setTimeout(() => navigate("/dashboard"), 600);
    }
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

        {/* MOOD — reusable picker; this page just owns the selected value. */}
        <MoodPicker value={mood} onChange={setMood} />

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
