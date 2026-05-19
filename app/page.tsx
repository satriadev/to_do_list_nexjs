"use client";

import { useState } from "react";

interface Note {
  id: Number;
  text: String;
  isDone: Boolean
}

export default function Home()
{
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const addNote = () => {
    if (inputText.trim() === "") return;
    const newNote: Note = {
      id: Date.now(),
      text: inputText,
    };
    setNotes([...notes, newNote]);
    setInputText("");
  };

  const delNote = (id: Number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };


  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
  <h1 className="text-2xl font-bold mb-4">Catatan Harian</h1>

  {/* Input + tombol */}
  <div className="flex gap-2 mb-6">
    <input
      type="text"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      placeholder="Tulis catatan..."
      className="flex-1 border px-3 py-2 rounded"
    />
    <button
      onClick={addNote}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Tambah
    </button>
  </div>

  {/* Daftar catatan */}
  <ul className="space-y-2">
    {notes.map((note) => (
      <li
        key={note.id}
        className="flex justify-between items-center border-b pb-2"
      >
        <span>{note.text}</span>
        <button
          onClick={() => delNote(note.id)}
          className="text-red-500 hover:text-red-700"
        >
          Hapus
        </button>
      </li>
    ))}
  </ul>

  {/* Pesan jika kosong */}
  {notes.length === 0 && (
    <p className="text-gray-500">Belum ada catatan.</p>
  )}
</main>
  );
}