"use client";

import { useState } from "react";

interface Note {
  id: number;
  body: string;
  pinned: boolean;
  archived: boolean;
}

let nextId = 4;
const seed: Note[] = [
  { id: 1, body: "Draft the Q3 planning doc", pinned: true, archived: false },
  { id: 2, body: "Book dentist appointment", pinned: false, archived: false },
  { id: 3, body: "Ideas for the launch email", pinned: false, archived: false },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(seed);
  const [draft, setDraft] = useState("");

  function createNote(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    const note: Note = { id: nextId++, body, pinned: false, archived: false };
    setNotes((n) => [note, ...n]);
    setDraft("");
    // No product analytics wired in yet — the handler just logs the action.
    console.log("note_created", { id: note.id });
  }

  function togglePin(id: number) {
    setNotes((n) => n.map((x) => (x.id === id ? { ...x, pinned: !x.pinned } : x)));
    console.log("note_pinned", { id });
  }

  function archive(id: number) {
    setNotes((n) => n.map((x) => (x.id === id ? { ...x, archived: true } : x)));
    console.log("note_archived", { id });
  }

  const visible = notes
    .filter((n) => !n.archived)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: "#0e7c66" }} />
        <strong style={{ fontSize: 16 }}>Atlas</strong>
      </header>

      <form onSubmit={createNote} style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a note…"
          style={{ flex: 1, padding: "11px 13px", borderRadius: 9, border: "1px solid #e4e4e0", fontSize: 15, background: "#fff" }}
        />
        <button type="submit" style={{ padding: "11px 18px", borderRadius: 9, border: 0, background: "#0e7c66", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
          Add
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
        {visible.map((note) => (
          <li
            key={note.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "13px 15px",
              borderRadius: 11,
              border: "1px solid #ececE8",
              background: note.pinned ? "#f2faf7" : "#fff",
            }}
          >
            <span style={{ fontSize: 15 }}>
              {note.pinned ? "📌 " : ""}
              {note.body}
            </span>
            <span style={{ display: "flex", gap: 8 }}>
              <button onClick={() => togglePin(note.id)} style={smallBtn}>
                {note.pinned ? "Unpin" : "Pin"}
              </button>
              <button onClick={() => archive(note.id)} style={smallBtn}>
                Archive
              </button>
            </span>
          </li>
        ))}
        {visible.length === 0 && <p style={{ color: "#8a8f88" }}>No notes yet — add one above.</p>}
      </ul>
    </main>
  );
}

const smallBtn: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 7,
  border: "1px solid #e4e4e0",
  background: "#fff",
  fontSize: 13,
  cursor: "pointer",
};
