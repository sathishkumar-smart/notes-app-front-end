"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

/**
 * NotesGrid Component
 * - Displays all notes in a responsive grid
 * - Animates card entry using Framer Motion
 * - Edit/Delete actions are icons for clean UI
 * - Delete uses a custom confirmation modal
 */
export default function NotesGrid({ notes, onEdit, onDelete }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleDeleteClick = (note) => {
    setNoteToDelete(note);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(noteToDelete.note_id);
    setDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <motion.div
            key={note.note_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-yellow-100 p-5 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-shadow relative border-l-4 border-yellow-400"
          >
            {/* Note Title */}
            <h3 className="font-bold text-lg mb-2 text-yellow-900 truncate">{note.title}</h3>

            {/* Note Content */}
            <div
              className="text-gray-800 text-sm mb-4 max-h-40 overflow-hidden break-words"
              dangerouslySetInnerHTML={{ __html: note.body }}
            />

            {/* Edit/Delete Icons */}
            <div className="absolute top-3 right-3 flex space-x-2">
              <PencilIcon
                className="w-5 h-5 text-yellow-700 hover:text-yellow-900 cursor-pointer transition-colors"
                onClick={() => onEdit(note)}
              />
              <TrashIcon
                className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                onClick={() => handleDeleteClick(note)}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete <strong>{noteToDelete?.title}</strong>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
