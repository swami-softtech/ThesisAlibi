import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { savePage } from "../services/pageApi";
import { PAGE_TYPES } from "../constants/pageTypes";

export default function PageFormModal({
  isOpen,
  onClose,
  selectedPage,
  onSaved,
}) {
  const editor = useRef(null);

  const [form, setForm] = useState({
    type: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    if (selectedPage) setForm(selectedPage);
    else setForm({ type: "", title: "", content: "" });
  }, [selectedPage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await savePage(form);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          {selectedPage ? "Edit Page" : "Create Page"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PAGE TYPE */}
          <select
            value={form.type}
            disabled={!!selectedPage}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Page Type</option>
            {PAGE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* TITLE */}
          <input
            type="text"
            placeholder="Page Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />

          {/* CONTENT (JODIT) */}
          <JoditEditor
            ref={editor}
            value={form.content}
            config={{
              readonly: false,
              height: 350,
              toolbarAdaptive: false,
              toolbarSticky: false,
              buttons: [
                "bold",
                "italic",
                "underline",
                "ul",
                "ol",
                "link",
                "image",
                "align",
                "undo",
                "redo",
                "hr",
                "eraser",
                "source",
              ],
            }}
            onBlur={(newContent) =>
              setForm({ ...form, content: newContent })
            }
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-black text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
