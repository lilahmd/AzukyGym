 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API_URL from '../config';

export default function AdminClases() {
  const { token, usuario } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroClase, setFiltroClase] = useState('todas');
  const [filtroDia, setFiltroDia] = useState('todos');

  useEffect(() => {
    if (usuario?.tipo !== 'admin') return;
    axios.get(`${API_URL}/api/reservas/todas`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setReservas(res.data))
      .finally(() => setCargando(false));
  }, []);

  if (usuario?.tipo !== 'admin') {
    return (
      <div className="container mt-5 text-center">
        <h4>Acceso restringido</h4>
        <Link to="/dashboard" className="btn btn-danger mt-3">Volver</Link>
      </div>
    );
  }

  const clases = [...new Set(reservas.map(r => r.Horario?.Clase?.nombre).filter(Boolean))];
  const dias = [...new Set(reservas.map(r => r.Horario?.dia_semana).filter(Boolean))];

  const reservasFiltradas = reservas.filter(r => {
    const claseOk = filtroClase === 'todas' || r.Horario?.Clase?.nombre === filtroClase;
    const diaOk = filtroDia === 'todos' || r.Horario?.dia_semana === filtroDia;
    return claseOk && diaOk && r.estado === 'confirmada';
  });

  const agrupadoPorClase = {};
  reservasFiltradas.forEach(r => {
    const key = `${r.Horario?.Clase?.nombre} – ${r.Horario?.dia_semana} ${r.Horario?.hora_inicio?.slice(0,5)}`;
    if (!agrupadoPorClase[key]) agrupadoPorClase[key] = [];
    agrupadoPorClase[key].push(r);
  });

  if (cargando) return (
    <div className="text-center mt-5">
      <div className="spinner-border" style={{ color: '#e94560' }}></div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">
            Alumnos por <span style={{ color: '#e94560' }}>Clase</span>
          </h2>
          <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">← Volver</Link>
        </div>

        {/* FILTROS */}
        <div className="row mb-4">
          <div className="col-md-4 mb-2">
            <select className="form-select" value={filtroClase} onChange={e => setFiltroClase(e.target.value)}>
              <option value="todas">Todas las clases</option>
              {clases.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-4 mb-2">
            <select className="form-select" value={filtroDia} onChange={e => setFiltroDia(e.target.value)}>
              <option value="todos">Todos los días</option>
              {dias.map(d => <option key={d} value={d} className="text-capitalize">{d}</option>)}
            </select>
          </div>
          <div className="col-md-4 mb-2 d-flex align-items-center">
            <span className="text-muted small">
              {reservasFiltradas.length} reservas confirmadas encontradas
            </span>
          </div>
        </div>

        {Object.keys(agrupadoPorClase).length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted">No hay reservas confirmadas con estos filtros</h5>
          </div>
        ) : (
          Object.entries(agrupadoPorClase).map(([key, reservasGrupo]) => (
            <div key={key} className="card shadow mb-4">
              <div className="card-header d-flex justify-content-between align-items-center"
                style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
                <h5 className="mb-0 fw-bold">🏋️ {key}</h5>
                <span className="badge" style={{ backgroundColor: '#e94560' }}>
                  {reservasGrupo.length} alumno{reservasGrupo.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th className="ps-3">#</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Fecha reserva</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservasGrupo.map((r, i) => (
                      <tr key={r.id}>
                        <td className="ps-3 text-muted">{i + 1}</td>
                        <td className="fw-bold">{r.Usuario?.nombre}</td>
                        <td className="text-muted">{r.Usuario?.email}</td>
                        <td className="text-muted">{r.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}