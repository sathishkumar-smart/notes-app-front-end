import { useState, useEffect } from "react";
import Input from "../atoms/Input";
import Textarea from "../atoms/Textarea";
import Button from "../atoms/Button";

export default function NoteForm({ onSave, initialData, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.note_title);
      setContent(initialData.note_content);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSave({ note_title: title, note_content: content, note_id: initialData?.note_id });
    if (!initialData) {  // only reset on new note
      setTitle("");
      setContent("");
    }
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col gap-2">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note Title" />
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Note Content" />
      <Button onClick={handleSubmit}>{initialData ? "Update" : "Save"}</Button>
    </div>
  );
}
