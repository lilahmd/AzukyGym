import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API_URL from '../config';

export default function Clases() {
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [reservando, setReservando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [claseActiva, setClaseActiva] = useState('todas');
  const { token, usuario } = useAuth();

  useEffect(() => {
    axios.get(`${API_URL}/api/clases`)
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
      await axios.post(`${API_URL}/api/reservas`,
        { horario_id, fecha },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensaje('¡Reserva realizada correctamente!');
      const res = await axios.get(`${API_URL}/api/clases`);
      setClases(res.data);
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al reservar');
    } finally {
      setReservando(null);
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  if (cargando) return (
    <div className="text-center mt-5">
      <div className="spinner-border" style={{ color: '#e94560' }}></div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-5">
        <h2 className="fw-bold mb-2">Nuestras <span style={{ color: '#e94560' }}>Clases</span></h2>
        <p className="text-muted mb-4">Elige tu actividad favorita y reserva tu plaza</p>

        {mensaje && (
          <div className={`alert ${mensaje.includes('correctamente') ? 'alert-success' : 'alert-danger'} alert-dismissible`}>
            {mensaje}
          </div>
        )}

        {!usuario && (
          <div className="alert" style={{ backgroundColor: '#1a1a2e', color: 'white', border: '1px solid #e94560' }}>
            💪 <strong>¿Quieres reservar una clase?</strong> <Link to="/registro" style={{ color: '#e94560' }}>Regístrate gratis</Link> o <Link to="/login" style={{ color: '#e94560' }}>inicia sesión</Link>
          </div>
        )}

        <div className="row">
          {clases.map(clase => (
            <div key={clase.id} className="col-md-6 col-lg-4 mb-4">
              <div
                className="card shadow h-100"
                style={{ cursor: 'pointer', border: claseActiva === clase.id ? '2px solid #e94560' : '1px solid #dee2e6', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {clase.imagen_url && (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={clase.imagen_url}
                      className="card-img-top"
                      alt={clase.nombre}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', bottom: '10px', left: '10px',
                      backgroundColor: '#e94560', color: 'white',
                      padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                    }}>
                      {clase.duracion_minutos} min
                    </div>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="fw-bold" style={{ color: '#e94560' }}>{clase.nombre}</h5>
                  <p className="text-muted small mb-3">{clase.descripcion}</p>

                  {clase.instructor_foto && (
                    <div className="d-flex align-items-center mb-3 p-2" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                      <img
                        src={clase.instructor_foto}
                        alt={clase.instructor}
                        style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e94560' }}
                      />
                      <div className="ms-2">
                        <p className="mb-0 fw-bold small">{clase.instructor}</p>
                        <p className="mb-0 text-muted" style={{ fontSize: '11px' }}>{clase.instructor_bio}</p>
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-bold">Aforo máximo: {clase.aforo_maximo} personas</span>
                  </div>

                  <button
                    className="btn btn-sm w-100 mb-3"
                    style={{ backgroundColor: '#1a1a2e', color: 'white' }}
                    onClick={() => setClaseActiva(claseActiva === clase.id ? 'todas' : clase.id)}
                  >
                    {claseActiva === clase.id ? '▲ Ocultar horarios' : '▼ Ver horarios'}
                  </button>

                  {(claseActiva === 'todas' || claseActiva === clase.id) && clase.Horarios && clase.Horarios.length > 0 && (
                    <div>
                      <h6 className="fw-bold">Horarios disponibles:</h6>
                      {diasSemana.map(dia => {
                        const horariosDelDia = clase.Horarios.filter(h => h.dia_semana === dia);
                        if (horariosDelDia.length === 0) return null;
                        return (
                          <div key={dia} className="mb-2">
                            <small className="fw-bold text-capitalize" style={{ color: '#e94560' }}>
                              📅 {dia}
                            </small>
                            {horariosDelDia.map(h => (
                              <div key={h.id} className="d-flex justify-content-between align-items-center mt-1 p-2"
                                style={{ backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <span className="small">🕐 {h.hora_inicio.slice(0, 5)} - {h.hora_fin.slice(0, 5)}</span>
                                <span className="small text-muted">
                                  {h.aforo_maximo - h.plazas_ocupadas} plazas
                                </span>
                                {usuario ? (
                                  <button
                                    className="btn btn-sm text-white"
                                    style={{ backgroundColor: h.plazas_ocupadas >= h.aforo_maximo ? '#999' : '#e94560', fontSize: '11px' }}
                                    onClick={() => reservar(h.id)}
                                    disabled={reservando === h.id || h.plazas_ocupadas >= h.aforo_maximo}
                                  >
                                    {h.plazas_ocupadas >= h.aforo_maximo ? 'Completo' : reservando === h.id ? '...' : 'Reservar'}
                                  </button>
                                ) : (
                                  <Link to="/login" className="btn btn-sm" style={{ backgroundColor: '#e94560', color: 'white', fontSize: '11px' }}>
                                    Acceder
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}