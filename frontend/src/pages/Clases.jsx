 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Clases() {
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [reservando, setReservando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:3001/api/clases')
      .then(res => setClases(res.data))
      .finally(() => setCargando(false));
  }, []);

  const reservar = async (horario_id) => {
    if (!token) {
      setMensaje('Debes iniciar sesión para reservar');
      return;
    }
    setReservando(horario_id);
    try {
      const fecha = new Date().toISOString().split('T')[0];
      await axios.post('http://localhost:3001/api/reservas',
        { horario_id, fecha },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensaje('¡Reserva realizada correctamente!');
      const res = await axios.get('http://localhost:3001/api/clases');
      setClases(res.data);
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al reservar');
    } finally {
      setReservando(null);
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  if (cargando) return <div className="text-center mt-5"><div className="spinner-border" style={{ color: '#e94560' }}></div></div>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Nuestras <span style={{ color: '#e94560' }}>Clases</span></h2>

      {mensaje && (
        <div className={`alert ${mensaje.includes('correctamente') ? 'alert-success' : 'alert-danger'}`}>
          {mensaje}
        </div>
      )}

      <div className="row">
        {clases.map(clase => (
          <div key={clase.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow h-100">
              {clase.imagen_url && (
                <img src={clase.imagen_url} className="card-img-top" alt={clase.nombre} style={{ height: '180px', objectFit: 'cover' }} />
              )}
              <div className="card-body">
                <h5 className="fw-bold" style={{ color: '#e94560' }}>{clase.nombre}</h5>
                <p className="text-muted small">{clase.descripcion}</p>
                <p className="mb-1"><strong>Instructor:</strong> {clase.instructor}</p>
                <p className="mb-2"><strong>Duración:</strong> {clase.duracion_minutos} min</p>

                {clase.Horarios && clase.Horarios.length > 0 && (
                  <>
                    <h6 className="fw-bold mt-3">Horarios:</h6>
                    {diasSemana.map(dia => {
                      const horariosDelDia = clase.Horarios.filter(h => h.dia_semana === dia);
                      if (horariosDelDia.length === 0) return null;
                      return (
                        <div key={dia} className="mb-2">
                          <small className="text-muted text-capitalize fw-bold">{dia}</small>
                          {horariosDelDia.map(h => (
                            <div key={h.id} className="d-flex justify-content-between align-items-center mt-1">
                              <span className="small">{h.hora_inicio.slice(0, 5)} - {h.hora_fin.slice(0, 5)}</span>
                              <span className="small text-muted">{h.aforo_maximo - h.plazas_ocupadas} plazas</span>
                              <button
                                className="btn btn-sm text-white"
                                style={{ backgroundColor: '#e94560', fontSize: '11px' }}
                                onClick={() => reservar(h.id)}
                                disabled={reservando === h.id || h.plazas_ocupadas >= h.aforo_maximo}
                              >
                                {h.plazas_ocupadas >= h.aforo_maximo ? 'Completo' : reservando === h.id ? '...' : 'Reservar'}
                              </button>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}