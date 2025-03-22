import PropTypes from "prop-types";
import { PencilLine, Trash2 } from "lucide-react";

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col w-full bg-white shadow-sm hover:shadow-lg p-4 rounded-md">
      <div className="flex-1">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h3 className="text-md font-medium flex-1 min-w-0 break-words">
          {note.title}
        </h3>
        <div className="flex gap-4 shrink-0">
          <button
            onClick={() => onEdit(note)}
            className="text-yellow-500 cursor-pointer">
            <PencilLine size={20} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-red-500 cursor-pointer">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      <p className="text-sm whitespace-pre-line break-words mb-4">{note.content}</p>
      </div>
      <div className="text-sm text-gray-500">
        Last updated: {note.updatedAt.toLocaleDateString()}
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteItem;
