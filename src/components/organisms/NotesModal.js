import NoteForm from "../molecules/NoteForm";

export default function NoteModal({ isOpen, onClose, onNoteCreated }) {
  if (!isOpen) return null;

  const handleSave = async (note) => {
    onNoteCreated(note); // you can replace with axios POST call later
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Note</h2>
        <NoteForm onSave={handleSave} />
        <button className="mt-4 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
