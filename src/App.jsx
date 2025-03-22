import { Notebook, CirclePlus } from "lucide-react";
import { useState } from "react";
import NoteForm from "./components/NoteForm";
import { useEffect } from "react";
import NoteItem from "./components/NoteItem";
import { Fragment } from "react";

const App = () => {
  const [notes, setNotes] = useState(
    () =>
      JSON.parse(localStorage.getItem("notes"), (key, val) => {
        if (
          typeof val === "string" &&
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(val)
        ) {
          return new Date(val);
        }
        return val;
      }) || []
  );
  const [noteEdit, setNoteEdit] = useState(undefined);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleNoteSave = (noteData) => {
    if (!noteData) return;
    if (noteEdit) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteEdit.id
            ? { ...note, ...noteData, updatedAt: new Date() }
            : note
        )
      );
    } else {
      const newNote = {
        id: new Date().getTime().toString(),
        ...noteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes((prev) => [...prev, newNote]);
    }
  };

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleEdit = (note) => {
    setNoteEdit(note);
    setIsEditorOpen(true);
  };

  return (
    <div className="min-h-screen relative bg-gray-100">
      <header className="py-6 px-12 flex items-center justify-between shadow-sm bg-white">
        <div className="flex gap-2.5 items-center">
          <Notebook size={28} className="text-primary" />
          <h1 className="text-2xl font-bold">Notes App</h1>
        </div>
        <div>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="flex items-center gap-2 bg-primary py-2 px-4 rounded-lg text-white hover:bg-blue-700 cursor-pointer">
            <CirclePlus size={20} />
            <span className="text-md">New Note</span>
          </button>
        </div>
      </header>
      <main className="">
        {notes.length === 0 ? (
          <div className="flex flex-col gap-4 items-center mt-30">
            <Notebook size={48} className="text-gray-400" />
            <h3 className="font-semibold">No notes yet</h3>
            <p className="text-sm text-gray-500">
              Create your first note by clicking the "New Note" button.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 p-6">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </main>
      {isEditorOpen && (
        <NoteForm
          note={noteEdit}
          onSave={handleNoteSave}
          onClose={() => {
            setIsEditorOpen(false);
            setNoteEdit(undefined);
          }}
        />
      )}
    </div>
  );
};

export default App;
