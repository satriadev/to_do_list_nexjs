"use client";

import { useState } from "react";
import NoteInput from "@/components/NoteInput";
import NoteList from "@/components/NoteList";
import { useNotes } from "@/hooks/useNotes";

export default function Home()
{
  const {
    notes, 
    isLoading,
    error,
    addNote,
    toggleNote,
    deleteNote,
    deleteCompleted,
   } = useNotes();
  
  const [inputText, setInputText] = useState<string>("");


  const handleAdd = async() => {
    if (inputText.trim() === "") return;
    await addNote(inputText.trim());
    setInputText("");
  };

  const completedNotes = notes.filter((note) => note.isDone).length;
  const totalNotes = notes.length;

  if(isLoading) {
    return(
      <main className="max-w-xl mx-auto mt-10 p-4">
        <p>Memuat catatan...</p>
      </main>
    );
  }

  if (error) {
    return(
      <main className="max-w-xl mx-auto mt-10 p-4">
        <p className="text-red-500">Error {error}</p>
      </main>
    );
  }

  return (
  <main className="max-w-xl mx-auto mt-10 p-4">
    <h1 className="text-2xl font-bold mb-4">Catatan Harian</h1>
    <NoteInput
      inputText={inputText}
      setInputText={setInputText}
      addNote={handleAdd}
    />

    {totalNotes > 0 && (
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-600">
            {completedNotes} dari {totalNotes} selesai
          </p>
          {completedNotes > 0 && (
            <button
              onClick={deleteCompleted}
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
      onDelete={deleteNote}
    />
  </main>
  );
}