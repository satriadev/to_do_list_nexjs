"useClient";

interface NoteInputProps {
    inputText: string;
    setInputText: (text: string) => void;
    addNote: ()=> void;
}

export default function NoteInput({inputText, setInputText, addNote}: NoteInputProps)
{
    return
    (
        <div className="flex gap-2 mb-6">
            <input 
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            type="text"
            placeholder="Tulis Catatan..."
            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            />
            <button
            onClick={addNote}
            disabled={inputText.trim() === ""}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                +Add
            </button>
        </div>
    );
}