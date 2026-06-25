// localStorage helpers — same data model as the original vanilla app
// so any entries written before the React rewrite still load.

const ENTRIES_KEY = "diaryEntries";
const USER_KEY = "diaryUser";

export function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(ENTRIES_KEY)) || [];
  } catch (err) {
    return [];
  }
}

export function saveEntries(entries) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export function getEntry(id) {
  return loadEntries().find((e) => e.id === id);
}

export function getUser() {
  return localStorage.getItem(USER_KEY);
}

export function setUser(email) {
  localStorage.setItem(USER_KEY, email);
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}
