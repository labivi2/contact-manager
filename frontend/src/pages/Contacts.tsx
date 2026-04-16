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
    group: "",
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getContacts();
      setContacts(data);
    } catch (e) {
      setError("Помилка завантаження контактів");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);
      load();
    } catch (e) {
      setError("Помилка видалення");
    }
  };

  const handleEdit = (c: any) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone,
      group: c.group || "",
    });
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      await updateContact(editingId, form);
      setEditingId(null);
      load();
    } catch (e) {
      setError("Помилка оновлення");
    }
  };

  const filtered = contacts
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) => (filter ? c.group === filter : true));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contacts</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Пошук по Імені"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All groups</option>
        <option value="Друзі">Friends</option>
        <option value="Робота">Work</option>
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        filtered.map((c) => (
          <div key={c.id} style={{ marginBottom: "10px" }}>
            <b>{c.name}</b> — {c.email} — {c.phone} — {c.group}

            <button onClick={() => handleDelete(c.id)}>
              Delete
            </button>

            <button onClick={() => handleEdit(c)}>
              Edit
            </button>
          </div>
        ))
      )}

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

          <input
            value={form.group}
            onChange={(e) =>
              setForm({ ...form, group: e.target.value })
            }
            placeholder="Group"
          />

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditingId(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}