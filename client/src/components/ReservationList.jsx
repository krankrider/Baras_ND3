// Sąrašas: rodo visas rezervacijas su Edit/Delete mygtukais
export default function ReservationList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p className="empty">Rezervacijų dar nėra.</p>;
  }

  const fmt = (iso) => new Date(iso).toLocaleDateString('lt-LT');

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Vardas</th>
          <th>El. paštas</th>
          <th>Data</th>
          <th>Žm.</th>
          <th>Veiksmai</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r) => (
          <tr key={r._id}>
            <td>{r.vardas}</td>
            <td>{r.elPastas}</td>
            <td>{fmt(r.data)}</td>
            <td>{r.zmoniuSk}</td>
            <td>
              <button onClick={() => onEdit(r)} className="btn-edit">✏️ Redaguoti</button>
              <button onClick={() => onDelete(r._id)} className="btn-delete">🗑️ Ištrinti</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
