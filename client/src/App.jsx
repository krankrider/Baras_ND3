import { useEffect, useState } from 'react';
import { api } from './api';
import ReservationForm from './components/ReservationForm.jsx';
import ReservationList from './components/ReservationList.jsx';

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null = "create new", otherwise reservation object
  const [error, setError] = useState('');

  // READ - užkrauti visus įrašus
  const load = async () => {
    try {
      setItems(await api.list());
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { load(); }, []);

  // CREATE / UPDATE
  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.update(editing._id, data);
      } else {
        await api.create(data);
      }
      setEditing(null);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm('Ar tikrai ištrinti šią rezervaciją?')) return;
    try {
      await api.remove(id);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🍸 Kokteilių Maišykla — Rezervacijų administravimas</h1>
        <a href="../site/index.html" className="link-back">← Atgal į svetainę</a>
      </header>

      {error && <div className="error">⚠️ {error}</div>}

      <section className="card">
        <h2>{editing ? 'Redaguoti rezervaciją' : 'Nauja rezervacija'}</h2>
        <ReservationForm
          key={editing?._id || 'new'}
          initial={editing}
          onSubmit={handleSave}
          onCancel={editing ? () => setEditing(null) : null}
        />
      </section>

      <section className="card">
        <h2>Visos rezervacijos ({items.length})</h2>
        <ReservationList
          items={items}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
