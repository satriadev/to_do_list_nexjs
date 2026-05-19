"use client";

import { useState } from "react";
import NoteInput from "@/components/NoteInput";
import NoteList from "@/components/NoteList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Note } from "@/types";

export default function Home()
{
  const [notes, setNotes, isLoaded] = useLocalStorage<Note[]>("notes", []);
  const [inputText, setInputText] = useState<string>("");


  const addNote = () => {
    if (inputText.trim() === "") return;
    const newNote: Note = {
      id: crypto.randomUUID(),
      text: inputText,
      isDone: false,
    };
    setNotes([...notes, newNote]);
    setInputText("");
  };

  const delNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleNote = (id: string) => {
    setNotes(
      notes.map(
        (note) => note.id === id? {...note, isDone: !note.isDone} : note
      )
    );
  };

  const delCompleted = () => {
    if (notes.some((note) => note.isDone)) {
      if (window.confirm("Hapus semua yang sudah selesai?")){
        setNotes(notes.filter((note) => !note.isDone));
      }
    }
  };

  const completedNotes = notes.filter((note) => note.isDone).length;
  const totalNotes = notes.length;

  const resetNotes = () => {
    if (window.confirm(`Yakin menghapus semua?`)){
      setNotes([]);
    }
  }

  if(!isLoaded) {
    return(
      <main className="max-w-xl mx-auto mt-10 p-4">
        <p>Memuat catatan...</p>
      </main>
    );
  }

  return (
  <main className="max-w-xl mx-auto mt-10 p-4">
    <h1 className="text-2xl font-bold mb-4">Catatan Harian</h1>
    <NoteInput
      inputText={inputText}
      setInputText={setInputText}
      addNote={addNote}
    />
    <button
      onClick={resetNotes}
    >
      Delete All
    </button>
     {totalNotes > 0 && (
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-600">
            {completedNotes} dari {totalNotes} selesai
          </p>
          {completedNotes > 0 && (
            <button
              onClick={delCompleted}
              className="text-sm text-red-600 hover:text-red-800 transition"
            >
              Hapus yang selesai
            </button>
          )}
        </div>
      )}

    <NoteList
      notes={notes}
      onToggle={toggleNote}
      onDelete={delNote}
    />
  </main>
  );
}