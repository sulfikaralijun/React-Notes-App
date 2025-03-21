import PropTypes from "prop-types";
import { PencilLine, Trash2 } from "lucide-react";
import { useEffect } from "react";

const NoteItem = ({ note }) => {
  useEffect(() => {
    console.log(note.content.split(""));
    
  }, [note])
  return (
    <div className="w-full bg-white shadow-sm hover:shadow-lg p-4 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{note.title}</h3>
        <div className="flex gap-4">
          <button className="text-yellow-500 cursor-pointer">
            <PencilLine size={20}/>
          </button>
          <button className="text-red-500 cursor-pointer">
            <Trash2 size={20}/>
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm whitespace-pre-line">{note.content}</p>
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
};

export default NoteItem;
