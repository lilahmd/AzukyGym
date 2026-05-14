 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const { token } = useAuth();

  const cargarReservas = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/reservas/mis-reservas', {
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
      await axios.put(`http://localhost:3001/api/reservas/${id}/cancelar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('Reserva cancelada correctamente');
      cargarReservas();
      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al cancelar');
    }
  };

  if (cargando) return <div className="text-center mt-5"><div className="spinner-border" style={{ color: '#e94560' }}></div></div>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Mis <span style={{ color: '#e94560' }}>Reservas</span></h2>

      {mensaje && (
        <div className={`alert ${mensaje.includes('correctamente') ? 'alert-success' : 'alert-danger'}`}>
          {mensaje}
        </div>
      )}

      {reservas.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No tienes reservas todavía</h4>
          <p className="text-muted">Ve a la sección de clases y reserva una plaza</p>
        </div>
      ) : (
        <div className="row">
          {reservas.map(reserva => (
            <div key={reserva.id} className="col-md-6 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="fw-bold" style={{ color: '#e94560' }}>
                        {reserva.Horario?.Clase?.nombre}
                      </h5>
                      <p className="mb-1">
                        <strong>Día:</strong> {reserva.Horario?.dia_semana}
                      </p>
                      <p className="mb-1">
                        <strong>Hora:</strong> {reserva.Horario?.hora_inicio?.slice(0, 5)} - {reserva.Horario?.hora_fin?.slice(0, 5)}
                      </p>
                      <p className="mb-1">
                        <strong>Fecha:</strong> {reserva.fecha}
                      </p>
                    </div>
                    <span className={`badge ${reserva.estado === 'confirmada' ? 'bg-success' : 'bg-danger'}`}>
                      {reserva.estado}
                    </span>
                  </div>
                  {reserva.estado === 'confirmada' && (
                    <button
                      className="btn btn-outline-danger btn-sm mt-2"
                      onClick={() => cancelar(reserva.id)}
                    >
                      Cancelar reserva
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}