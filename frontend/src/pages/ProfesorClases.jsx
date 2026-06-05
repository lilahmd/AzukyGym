import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API_URL from '../config';

export default function ProfesorClases() {
  const { token, usuario } = useAuth();
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (usuario?.tipo !== 'profesor') return;
    axios.get(`${API_URL}/api/admin/mis-clases`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setClases(res.data))
      .catch(err => console.error(err))
      .finally(() => setCargando(false));
  }, []);

  if (usuario?.tipo !== 'profesor') {
    return (
      <div className="container mt-5 text-center">
        <h4>Acceso restringido</h4>
        <Link to="/dashboard" className="btn btn-danger mt-3">Volver</Link>
      </div>
    );
  }

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
            Mis <span style={{ color: '#e94560' }}>Clases</span>
          </h2>
          <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">← Volver</Link>
        </div>

        {clases.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted">No tienes clases asignadas</h5>
          </div>
        ) : (
          clases.map(clase => {
            const totalAlumnos = clase.Horarios?.reduce((acc, h) => acc + (h.Reservas?.length || 0), 0);
            return (
              <div key={clase.id} className="card shadow mb-4">
                <div className="card-header d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
                  <h5 className="mb-0 fw-bold">🏋️ {clase.nombre}</h5>
                  <span className="badge" style={{ backgroundColor: '#e94560' }}>
                    {totalAlumnos} alumno{totalAlumnos !== 1 ? 's' : ''} en total
                  </span>
                </div>

                {clase.Horarios?.length === 0 ? (
                  <div className="card-body text-muted">Sin horarios asignados</div>
                ) : (
                  clase.Horarios?.map(horario => (
                    <div key={horario.id} className="card-body border-bottom pb-3">
                      <h6 className="fw-bold text-capitalize mb-3" style={{ color: '#e94560' }}>
                        📅 {horario.dia_semana} — {horario.hora_inicio?.slice(0, 5)} a {horario.hora_fin?.slice(0, 5)}
                      </h6>

                      {horario.Reservas?.length === 0 ? (
                        <p className="text-muted small mb-0">Sin alumnos reservados</p>
                      ) : (
                        <table className="table table-hover mb-0">
                          <thead style={{ backgroundColor: '#f8f9fa' }}>
                            <tr>
                              <th className="ps-3">#</th>
                              <th>Nombre</th>
                              <th>Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            {horario.Reservas.filter(r => r.Usuario).map((r,i)=> (
                              <tr key={r.id}>
                                <td className="ps-3 text-muted">{i + 1}</td>
                                <td className="fw-bold">{r.Usuario?.nombre}</td>
                                <td className="text-muted">{r.Usuario?.email}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  ))
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}