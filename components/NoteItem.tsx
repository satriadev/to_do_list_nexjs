"useClient";

interface NoteItemProps {
    note: {
        id: number;
        text: string;
        isDone: boolean;
    };
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function NoteItem({note, onToggle, onDelete}: NoteItemProps)
{
    return (
        <li className="flex items-center gap-3 border-b pb-2">
            <input 
            type="checkbox"
            checked={note.isDone}
            onChange={()=>onToggle(note.id)}
            className="h-5 w-5 accent-blue-600"
            />
            <span className={`flex-1 ${note.isDone ? "line-through text-gray-400" : ""}`}>
                {note.text}
            </span>
            <button
            onClick={() => onDelete(note.id)}
            className="text-red-500 hover:text-red-700 transition"
            >
                Delete
            </button>
        </li>
    );
}
