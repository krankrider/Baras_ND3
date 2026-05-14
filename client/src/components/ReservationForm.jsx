import { useState } from 'react';

// Forma: naudojama ir kūrimui, ir redagavimui
export default function ReservationForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    vardas:   initial?.vardas   || '',
    elPastas: initial?.elPastas || '',
    data:     initial?.data ? initial.data.slice(0, 10) : '',
    zmoniuSk: initial?.zmoniuSk || 2,
  });

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, zmoniuSk: Number(form.zmoniuSk) });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Vardas
        <input value={form.vardas} onChange={update('vardas')} required />
      </label>
      <label>
        El. paštas
        <input type="email" value={form.elPastas} onChange={update('elPastas')} required />
      </label>
      <label>
        Data
        <input type="date" value={form.data} onChange={update('data')} required />
      </label>
      <label>
        Žmonių skaičius
        <input
          type="number"
          min="1"
          max="20"
          value={form.zmoniuSk}
          onChange={update('zmoniuSk')}
          required
        />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initial ? 'Atnaujinti' : 'Sukurti'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Atšaukti
          </button>
        )}
      </div>
    </form>
  );
}
