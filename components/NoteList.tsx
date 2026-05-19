"use Client";

import NoteItem from "./NoteItem";
import type { Note } from "@/types";

interface NoteListProps {
    notes: Note[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function NoteList({notes, onToggle, onDelete}: NoteListProps)
{
    if (notes.length === 0) {
        return <p className="text-gray-500">Belum ada catatan.</p>;
    }
    return (
        <ul className="space-y-2">
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}