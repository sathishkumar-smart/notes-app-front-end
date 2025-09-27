"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NotesGrid from "../components/organisms/NotesGrid";
import NoteModal from "../components/organisms/NoteModal";
import IconButton from "../components/atoms/IconButton";
import axiosInstance from "../lib/axios";
import Head from "next/head";


/**
 * HomePage Component
 * - Shows all notes for the logged-in user
 * - Allows creating, editing, deleting notes
 * - Fetches user info from /auth/me
 * - All API calls send JWT token in Authorization header
 */
export default function HomePage() {
  const [notes, setNotes] = useState([]);       // List of notes
  const [modalOpen, setModalOpen] = useState(false); // Controls Note Modal
  const [editNote, setEditNote] = useState(null);    // Note being edited
  const [user, setUser] = useState(null);            // Current user info
  const router = useRouter();

  /**
   * Fetch current logged-in user
   * - Redirects to login if token missing or invalid
   */
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return router.push("/auth/login");

      const res = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      localStorage.removeItem("access_token");
      router.push("/auth/login");
    }
  };

  /**
   * Fetch all notes for the logged-in user
   */
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await axiosInstance.get("/notes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  /**
   * Save or update a note
   * - If note_id exists → update
   * - Else → create
   */
  const handleSaveNote = async (note) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return router.push("/auth/login");

      let res;
      if (note.note_id) {
        res = await axiosInstance.put(`/notes/${note.note_id}`, note, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes((prev) =>
          prev.map((n) => (n.note_id === note.note_id ? res.data : n))
        );
      } else {
        res = await axiosInstance.post("/notes/", note, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes((prev) => [...prev, res.data]);
      }

      setModalOpen(false); // Close modal after save
    } catch (err) {
      console.error("Error saving note:", err);
      alert("Failed to save note");
    }
  };

  /**
   * Delete a note by ID
   */
  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return router.push("/auth/login");

      await axiosInstance.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((n) => n.note_id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note");
    }
  };

  // Fetch user and notes on component mount
  useEffect(() => {
    fetchUser();
    fetchNotes();
  }, []);

  return (
    <div>
       <Head>
        <title>Keep Notes - Your Personal Notes App</title>
        <meta name="description" content="Create, edit, and manage notes securely with Keep Notes." />
        <meta property="og:title" content="Keep Notes App" />
        <meta property="og:description" content="Organize your notes efficiently and visually." />
        <meta name="keywords" content="notes, productivity, fastapi, nextjs, tailwind" />
      </Head>
      
      {/* Welcome message */}
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user ? user.user_name : "Guest"}
      </h2>

      {/* Notes Grid */}
      <NotesGrid
        notes={notes}
        onEdit={(note) => {
          setEditNote(note);
          setModalOpen(true);
        }}
        onDelete={handleDeleteNote}
      />

      {/* Floating Add Note Button */}
      <IconButton
        onClick={() => {
          setEditNote(null);
          setModalOpen(true);
        }}
      >
        +
      </IconButton>

      {/* Note Modal */}
      <NoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveNote}
        initialData={editNote}
      />
    </div>
  );
}
