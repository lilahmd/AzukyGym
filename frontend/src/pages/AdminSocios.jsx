import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API_URL from '../config';

export default function AdminSocios() {
  const { token, usuario } = useAuth();
  const [socios, setSocios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const cargarSocios = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/socios`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSocios(res.data);
    } catch {
      setMensaje('Error al cargar socios');
    } finally {
      setTimeout(() => setCargando(false), 0);
    }
  };

  useEffect(() => {
    if (usuario?.tipo !== 'admin') return;
    cargarSocios();
  }, []);

  const toggleSocio = async (id, activo) => {
    try {
      await axios.put(`${API_URL}/api/admin/socios/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje(`Socio ${activo ? 'desactivado' : 'activado'} correctamente`);
      cargarSocios();
      setTimeout(() => setMensaje(''), 3000);
    } catch {
      setMensaje('Error al actualizar el socio');
    }
  };

 const cuotaMes = (socio) => {
  const c = socio.cuotaMesActual;
  if (!c) return null;
  if (Array.isArray(c)) return c[0] || null;
  return c;
};

  if (usuario?.tipo !== 'admin') {
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
            Gestión de <span style={{ color: '#e94560' }}>Socios</span>
          </h2>
          <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">← Volver</Link>
        </div>

        {mensaje && (
          <div className={`alert ${mensaje.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
            {mensaje}
          </div>
        )}

        <div className="card shadow">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
                  <tr>
                    <th className="ps-3">#</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Cuota mes actual</th>
                    <th>Estado cuenta</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {socios.map((s, i) => {
                    const cuota = cuotaMes(s);
                    const pagada = cuota?.estado === 'pagada';
                    const pendiente = cuota?.estado === 'pendiente';
                    return (
                      <tr key={s.id}>
                        <td className="ps-3 text-muted">{i + 1}</td>
                        <td className="fw-bold">{s.nombre}</td>
                        <td className="text-muted">{s.email}</td>
                        <td className="text-muted">{s.telefono || '–'}</td>
                        <td>
                          {pagada ? (
                            <span className="badge bg-success">✅ Pagada</span>
                          ) : pendiente ? (
                            <span className="badge bg-warning text-dark">⏳ Pendiente</span>
                          ) : (
                            <span className="badge bg-secondary">— Sin cuota</span>
                          )}
                        </td>
                        <td>
                          <span className={`badge ${s.activo ? 'bg-success' : 'bg-danger'}`}>
                            {s.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${s.activo ? 'btn-outline-danger' : 'btn-outline-success'}`}
                            onClick={() => toggleSocio(s.id, s.activo)}
                          >
                            {s.activo ? 'Desactivar' : 'Activar'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="text-muted small mt-3">
          Total: {socios.length} socio{socios.length !== 1 ? 's' : ''} registrado{socios.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}