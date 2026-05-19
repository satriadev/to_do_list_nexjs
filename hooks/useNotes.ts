"use client";

import { useState, useEffect, useCallback } from "react";
import type { Note } from "@/types";

export function useNotes()
{
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchNotes = useCallback(async() => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/notes");
            if (!res.ok) throw new Error("Gagal memuat");
            const data = await res.json();
            setNotes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(()=>{fetchNotes();}, [fetchNotes]);

    const addNote = async (text: string) => {
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text}),
        });
        if (res.ok) {
            const newNote = await res.json();
            setNotes((prev) => [newNote, ...prev]);
        }
    };

    const toggleNote = async(id: string) => {
        const note = notes.find((n) => n.id === id)
        if (!note) return;
        const res = await fetch(`/api/notes/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({isDone: !note.isDone}),
        });
        if (res.ok) {
            const updated = await res.json();
            setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
        }
    };

    const deleteNote = async(id: string) => {
        const res = await fetch(`/api/notes/${id}`);
        if (res.ok) {
            setNotes((prev) => prev.filter((n) => n.id !== id));
        }
    };

    const updateNoteText = async (id: string, text: string) => {
        const res = await fetch(`/api/notes/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text}),
        });
        if (res.ok) {
            const updated = await res.json();
            setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
        }
    };

    const deleteCompleted = async() => {
        const completedId = notes.filter((n) => n.isDone).map((n) => n.id);
        await Promise.all(completedId.map((id) => deleteNote(id)));
    };

    return {
        notes,
        isLoading,
        error,
        addNote,
        deleteNote,
        toggleNote,
        updateNoteText,
        deleteCompleted,
        refresh: fetchNotes,
    };
}

