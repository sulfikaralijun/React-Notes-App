import { X } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
const NoteForm = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
    setTitle("");
    setContent("");
    onClose()
  };

  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-300">
          <h2 className="text-xl font-semibold">Create Note</h2>
          <button onClick={onClose} className="cursor-pointer">
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="title" className="mb-2 block font-medium text-md">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-300 text-sm"
              placeholder="Note title"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="content" className="mb-2 block font-medium text-md">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-300 text-sm h-48"
              placeholder="Note content"
              required
            />
          </div>
          <div className="flex justify-end gap-4 text-sm">
            <button onClick={onClose} type="button">
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-primary text-white rounded-lg focus:bg-blue-700 cursor-pointer">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

NoteForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default NoteForm;
