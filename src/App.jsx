import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EntryEditor from "./pages/EntryEditor.jsx";
import EntryViewer from "./pages/EntryViewer.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* /entry = new entry, /entry/:id = edit existing */}
      <Route path="/entry" element={<EntryEditor />} />
      <Route path="/entry/:id" element={<EntryEditor />} />
      {/* /view/:id = read-only viewer */}
      <Route path="/view" element={<EntryViewer />} />
      <Route path="/view/:id" element={<EntryViewer />} />
    </Routes>
  );
}
