import { useEffect, useState } from "react";
import {
  getContacts,
  deleteContact,
  updateContact,
} from "../api/contacts";

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const load = () => {
    getContacts().then(setContacts);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteContact(id);
    load();
  };

  const handleEdit = (c: any) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone,
    });
  };

  const handleSave = async () => {
    if (!editingId) return;

    await updateContact(editingId, form);
    setEditingId(null);
    load();
  };

  return (
    <div>
      <h1>Contacts</h1>

      {contacts.map((c) => (
        <div key={c.id}>
          <b>{c.name}</b> — {c.email} — {c.phone}

          <button onClick={() => handleDelete(c.id)}>
            Delete
          </button>

          <button onClick={() => handleEdit(c)}>
            Edit
          </button>
        </div>
      ))}

      {editingId && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit contact</h3>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Name"
          />

          <input
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="Email"
          />

          <input
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            placeholder="Phone"
          />

          <button onClick={handleSave}>
            Save
          </button>

          <button onClick={() => setEditingId(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}