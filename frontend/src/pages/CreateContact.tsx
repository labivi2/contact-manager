import { useState } from "react";
import { createContact } from "../api/contacts";

export default function CreateContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
	const [group, setGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError("Заповни всі поля");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createContact({ name, email, phone, group });

      setName("");
      setEmail("");
      setPhone("");

      alert("Створено");
    } catch (e) {
      setError("Помилка при створені контакта");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Contact</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
		
		<input
		placeholder="Group"
		value={group}
		onChange={(e) => setGroup(e.target.value)}
		/>

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}