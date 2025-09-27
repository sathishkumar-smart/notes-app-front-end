"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * NoteModal Component
 * - Modal for creating/editing notes
 * - Simple styled textarea instead of rich text
 * - Inline validation for title
 */
export default function NoteModal({ isOpen, onClose, onSave, initialData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(""); // Inline error state

  // Populate modal fields when editing a note
  useEffect(() => {
    setTitle(initialData?.title || "");
    setContent(initialData?.body || "");
    setError("");
  }, [initialData]);

  // Handle save action
  const handleSave = () => {
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    onSave({
      note_id: initialData?.note_id,
      title: title,
      body: content,
    });

    onClose(); // Close modal after save
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Note" : "Add Note"}
        </h2>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(""); // Clear error inline
          }}
          placeholder="Title"
          className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D19C4F] transition"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        {/* Simple Textarea for content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          className="w-full p-2 mb-4 border border-gray-300 rounded min-h-[150px] focus:outline-none focus:ring-2 focus:ring-[#D19C4F] transition resize-none"
        />

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-[#D19C4F] hover:bg-[#C77B39] text-white transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

NoteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    note_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    note_title: PropTypes.string,
    note_content: PropTypes.string,
  }),
};
