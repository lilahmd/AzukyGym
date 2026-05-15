import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API_URL from '../config';

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const { token } = useAuth();

  const cargarReservas = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/reservas/mis-reservas`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(res.data);
    } catch (err) {
      setMensaje('Error al cargar reservas');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const cancelar = async (id) => {
    try {
      await axios.put(`${API_URL}/api/reservas/${id}/cancelar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('Reserva cancelada correctamente');
      cargarReservas();
      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al cancelar');
    }
  };

  if (cargando) return (
    <div className="text-center mt-5">
      <div className="spinner-border" style={{ color: '#e94560' }}></div>
    </div>
  );

  const reservasConfirmadas = reservas.filter(r => r.estado === 'confirmada');
  const reservasCanceladas = reservas.filter(r => r.estado === 'cancelada');

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-5">
        <h2 className="fw-bold mb-2">Mis <span style={{ color: '#e94560' }}>Reservas</span></h2>
        <p className="text-muted mb-4">Gestiona tus clases reservadas</p>

        {mensaje && (
          <div className={`alert ${mensaje.includes('correctamente') ? 'alert-success' : 'alert-danger'}`}>
            {mensaje}
          </div>
        )}

        {reservas.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '60px' }}>📅</div>
            <h4 className="fw-bold mt-3">No tienes ninguna clase reservada</h4>
            <p className="text-muted">¡Anímate a reservar tu primera clase!</p>
            <Link to="/clases" className="btn text-white fw-bold px-4" style={{ backgroundColor: '#e94560' }}>
              Ver clases disponibles
            </Link>
          </div>
        ) : (
          <>
            {reservasConfirmadas.length > 0 && (
              <>
                <h5 className="fw-bold mb-3">
                  ✅ Clases confirmadas ({reservasConfirmadas.length})
                </h5>
                <div className="row mb-4">
                  {reservasConfirmadas.map(reserva => (
                    <div key={reserva.id} className="col-md-6 mb-3">
                      <div className="card shadow" style={{ border: '1px solid #e94560' }}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h5 className="fw-bold" style={{ color: '#e94560' }}>
                                🏋️ {reserva.Horario?.Clase?.nombre}
                              </h5>
                              <p className="mb-1">
                                <strong>Día:</strong> <span className="text-capitalize">{reserva.Horario?.dia_semana}</span>
                              </p>
                              <p className="mb-1">
                                <strong>Hora:</strong> {reserva.Horario?.hora_inicio?.slice(0, 5)} - {reserva.Horario?.hora_fin?.slice(0, 5)}
                              </p>
                              <p className="mb-1">
                                <strong>Fecha:</strong> {reserva.fecha}
                              </p>
                              <p className="mb-0">
                                <strong>Instructor:</strong> {reserva.Horario?.Clase?.instructor}
                              </p>
                            </div>
                            <span className="badge bg-success">confirmada</span>
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm mt-3 w-100"
                            onClick={() => cancelar(reserva.id)}
                          >
                            Cancelar reserva
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {reservasCanceladas.length > 0 && (
              <>
                <h5 className="fw-bold mb-3 text-muted">
                  ❌ Clases canceladas ({reservasCanceladas.length})
                </h5>
                <div className="row">
                  {reservasCanceladas.map(reserva => (
                    <div key={reserva.id} className="col-md-6 mb-3">
                      <div className="card" style={{ opacity: '0.6', border: '1px solid #dee2e6' }}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h5 className="fw-bold text-muted">
                                {reserva.Horario?.Clase?.nombre}
                              </h5>
                              <p className="mb-1 text-muted small">
                                <strong>Día:</strong> <span className="text-capitalize">{reserva.Horario?.dia_semana}</span>
                              </p>
                              <p className="mb-1 text-muted small">
                                <strong>Fecha:</strong> {reserva.fecha}
                              </p>
                            </div>
                            <span className="badge bg-danger">cancelada</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}