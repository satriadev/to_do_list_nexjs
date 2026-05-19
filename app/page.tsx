"use client";

import { useState } from "react";
import NoteInput from "@/components/NoteInput";
import NoteList from "@/components/NoteList";

interface Note {
  id: number;
  text: string;
  isDone: boolean;
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
      isDone: false,
    };
    setNotes([...notes, newNote]);
    setInputText("");
  };

  const delNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleNote = (id: number) => {
    setNotes(
      notes.map(
        (note) => note.id === id? {...note, isDone: !note.isDone} : note
      )
    );
  };


  return (
  <main className="max-w-xl mx-auto mt-10 p-4">
    <h1 className="text-2xl font-bold mb-4">Catatan Harian</h1>
    <NoteInput
      inputText={inputText}
      setInputText={setInputText}
      addNote={addNote}
    />
    <NoteList
      notes={notes}
      onToggle={toggleNote}
      onDelete={delNote}
    />
  </main>
  );
}