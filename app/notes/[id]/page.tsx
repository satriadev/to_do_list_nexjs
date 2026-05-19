"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useNotes } from "@/hooks/useNotes";

export default function NoteDetailPage()
{
    const params = useParams<{id: string}>();
    const router = useRouter();
    const noteId = params.id;

    const {notes, isLoading, updateNoteText} = useNotes();
    const [noteText, setNoteText] = useState("");
    const note = notes.find((n) => n.id === noteId);

    useEffect(() => {
        if (note) {
            setNoteText(note.text);
        }
    }, [note]);

    const handleSave = async () => {
        if (!note || noteText.trim() === "") return;
        await updateNoteText(noteId, noteText);
        router.push("/");
    };

    const handleCancel = () => {
        router.push("/");
    };

    if (isLoading) {
        return (
        <main className="max-w-xl mx-auto mt-10 p-4">
            <p>Memuat...</p>
        </main>
        );
    }

    if (!note) {
        return (
        <main className="max-w-xl mx-auto mt-10 p-4">
            <p className="text-red-500">Catatan tidak ditemukan.</p>
            <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:underline mt-2"
            >
            Kembali
            </button>
        </main>
        );
    }

    return(
        <main className="max-w-xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Catatan</h1>
        <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
        />
        <div className="flex gap-2">
        <button
        onClick={handleSave}
        disabled={noteText.trim() === ""}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
        Simpan
        </button>
        <button
        onClick={handleCancel}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
        Batal
        </button>
        </div>
    </main>
    );
}