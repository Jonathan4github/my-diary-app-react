# My Diary

A simple, beautiful journaling web app — write daily entries, tag them, track moods, and keep a writing streak. Built with **React + Vite** and **React Router**. Entries are stored locally in the browser (`localStorage`), so no backend is required.

## Features

- ✍️ Create, edit, view, and delete diary entries
- 😊 Mood tracking with emoji
- 🏷️ Tags per entry
- 📊 Dashboard stats: total entries, current streak, entries this month, top mood
- 🔒 Placeholder login / signup (stored locally — not real auth yet)
- 📱 Responsive layout with a mobile bottom nav

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) (dev server + build)
- [React Router](https://reactrouter.com/) (client-side routing)

## Prerequisites

- [Node.js](https://nodejs.org/) **18 or newer** (includes `npm`)

Check your version:

```bash
node --version
```

## Getting started

### 1. Clone the repo

```bash
git clone https://github.com/Jonathan4github/my-diary-app-react.git
cd my-diary-app-react
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Vite prints a local URL (default **http://localhost:5173**). Open it in your browser — the page hot-reloads as you edit files.

## Available scripts

| Command           | What it does                                            |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload               |
| `npm run build`   | Build a production bundle into `dist/`                  |
| `npm run preview` | Serve the production build locally to preview it        |

## Project structure

```
my-diary-app-react/
├── index.html            # Vite HTML entry point
├── public/
│   └── images/           # Static images (served at /images/*)
├── src/
│   ├── main.jsx          # App bootstrap (router + root render)
│   ├── App.jsx           # Route definitions
│   ├── index.css         # Global styles
│   ├── lib/
│   │   └── storage.js    # localStorage helpers (entries + user)
│   ├── components/       # Shared UI (Icons, BgBlob, BottomNav, …)
│   └── pages/            # Home, Login, Signup, Dashboard, EntryEditor, EntryViewer
├── package.json
└── vite.config.js
```

## Routes

| Path          | Page                          |
| ------------- | ----------------------------- |
| `/`           | Landing page                  |
| `/login`      | Log in                        |
| `/signup`     | Sign up                       |
| `/dashboard`  | Dashboard (stats + entries)   |
| `/entry`      | New entry                     |
| `/entry/:id`  | Edit an existing entry        |
| `/view/:id`   | Read an entry                 |

## Notes

- **Data is stored in the browser.** Entries live in `localStorage` under the `diaryEntries` key and the signed-in user under `diaryUser`. Clearing your browser storage will erase entries, and data does not sync between devices or browsers.
- **Auth is a placeholder.** Login/signup just remember a name/email locally — there is no real authentication or server yet.
