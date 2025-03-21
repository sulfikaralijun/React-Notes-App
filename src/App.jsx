import { Notebook, CirclePlus } from "lucide-react";
import { useState } from "react";
import NoteForm from "./components/NoteForm";
import { useEffect } from "react";
import NoteItem from "./components/NoteItem";
import { Fragment } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleNoteSave = (note) => {
    if (!note) return;
    const newNote = {
      id: new Date().getTime().toString(),
      ...note,
    };
    setNotes((prev) => [...prev, newNote]);
  };

  useEffect(() => {
    console.log(notes);
  }, [notes]);

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
        {notes.length !== 0 && (
          <div className="grid grid-cols-3 gap-6 p-6">
            {notes.map(note => (
              <Fragment key={note.id}>
                <NoteItem note={note}/>
              </Fragment>
            ))}
          </div>
        )}
      </main>
      {isEditorOpen && (
        <NoteForm
          onSave={handleNoteSave}
          onClose={() => {
            setIsEditorOpen(false);

          }}
        />
      )}
    </div>
  );
};

export default App;
