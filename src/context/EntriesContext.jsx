// EntriesContext.jsx
// -----------------------------------------------------------------------------
// Shares the list of diary entries across pages — WITHOUT a database.
//
// The problem:
//   The Dashboard and the EntryEditor are two separate pages (routes). Normally
//   each page has its own state, so a new entry written in the editor would be
//   invisible to the dashboard. They need to share ONE list.
//
// The React answer: Context.
//   We lift the `entries` list UP to a provider that wraps the whole app. Any
//   page inside it can then read the list and add to it. The data lives in
//   memory (it resets on a full page refresh) — later this is exactly where the
//   real database/API will plug in.
//
// How pages use it:
//   const { entries, addEntry } = useEntries();
// -----------------------------------------------------------------------------

import { createContext, useContext, useState, useRef } from "react";

// The starter entries shown the first time the dashboard loads.
const SAMPLE_ENTRIES = [
  {
    id: 1, mood: "😊", moodClass: "mood-happy", moodTitle: "Happy", date: "Today · 8:14 AM",
    title: "A calm start to the day",
    body: "Woke up early and made coffee before the house got busy. There's something about the quiet that makes everything feel possible…",
    tags: ["morning", "gratitude"],
  },
  {
    id: 2, mood: "🥰", moodClass: "mood-grateful", moodTitle: "Grateful", date: "Yesterday · 9:42 PM",
    title: "Dinner with old friends",
    body: "We laughed about things that happened years ago. I forgot how good it feels to be fully known by people who've stayed…",
    tags: ["friends", "memories"],
  },
  {
    id: 3, mood: "😮‍💨", moodClass: "mood-tired", moodTitle: "Tired", date: "Jun 7 · 11:10 PM",
    title: "Long but worth it",
    body: "Pushed through a heavy workload today. Tired, but proud of how much I got done. Reminding myself rest is earned…",
    tags: ["work", "reflection"],
  },
  {
    id: 4, mood: "🤔", moodClass: "mood-thoughtful", moodTitle: "Thoughtful", date: "Jun 5 · 7:30 AM",
    title: "Thinking about the year ahead",
    body: "Started jotting down a few goals. Nothing too rigid — just gentle directions I'd like my life to drift toward…",
    tags: ["goals", "planning"],
  },
];

// 1. Create the context "box" that will carry our shared data.
const EntriesContext = createContext(null);

// 2. The Provider holds the actual state and hands it to everything inside it.
export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState(SAMPLE_ENTRIES);

  // Gives each new entry a unique id. The samples use 1–4, so we start at 5.
  const nextId = useRef(5);

  // Add a brand-new entry to the TOP of the list (newest first).
  // `newEntry` only needs { mood, title, body, tags } — we fill in the rest.
  const addEntry = (newEntry) => {
    setEntries((prev) => [
      {
        id: nextId.current++,
        date: "Just now",
        ...newEntry,
      },
      ...prev,
    ]);
  };

  // Update an existing entry: keep everything, overwrite the changed fields.
  const updateEntry = (id, changes) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...changes } : entry))
    );
  };

  // Remove an entry by id.
  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <EntriesContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}

// 3. A tiny helper hook so pages can grab the data with one clean line.
export function useEntries() {
  return useContext(EntriesContext);
}