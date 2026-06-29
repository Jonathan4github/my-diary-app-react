// MoodPicker.jsx
// -----------------------------------------------------------------------------
// A reusable mood selector: a row of emoji "chips" where the user picks ONE.
//
// We pulled this out of the editor so the choice of moods lives in one place and
// the picker can be reused on any screen (e.g. a future "filter by mood").
//
// It is a "controlled" component: it does NOT keep its own state. The parent
// owns the selected value and passes it in, and we tell the parent when the
// user picks a new one. That keeps a single source of truth.
//
// Props:
//   value    - the currently selected mood emoji (e.g. "😊")
//   onChange - function called with the new emoji when the user picks one
// -----------------------------------------------------------------------------

// The moods to choose from — plain UI data, not from any database.
// Each mood carries:
//   value     - the emoji that is stored on the entry
//   title     - the plain-word name (used as the tooltip)
//   className - the CSS class that gives the mood its colour (see index.css)
// We `export` this so other files can reuse the SAME mood definitions.
export const MOODS = [
  { value: "😊", title: "Happy", className: "mood-happy" },
  { value: "🥰", title: "Grateful", className: "mood-grateful" },
  { value: "😌", title: "Calm", className: "mood-calm" },
  { value: "🤔", title: "Thoughtful", className: "mood-thoughtful" },
  { value: "😮‍💨", title: "Tired", className: "mood-tired" },
  { value: "😔", title: "Low", className: "mood-low" },
];

// Look up a mood by its emoji. Falls back to the first mood if not found.
export function getMood(value) {
  return MOODS.find((m) => m.value === value) || MOODS[0];
}

export default function MoodPicker({ value, onChange }) {
  return (
    <fieldset className="editor-mood">
      <legend>How are you feeling?</legend>
      <div className="mood-options" role="radiogroup" aria-label="Mood">
        {MOODS.map((m) => (
          <label key={m.value} className="mood-chip">
            <input
              type="radio"
              name="mood"
              value={m.value}
              checked={value === m.value}     // highlight the chosen mood
              onChange={() => onChange(m.value)} // tell the parent about the pick
            />
            <span>{m.value} {m.title}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}