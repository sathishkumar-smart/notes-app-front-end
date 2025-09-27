export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-yellow-100 p-4 rounded-md shadow-md w-64 relative">
      <h3 className="font-bold">{note.title}</h3>
      <p className="mt-2 text-gray-700 text-sm">{note.body}</p>
      <p className="mt-2 text-xs text-gray-500">
        {new Date(note.created_on).toLocaleString()}
      </p>

      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => onEdit(note)}
          className="text-blue-600 text-sm hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.note_id)}
          className="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
