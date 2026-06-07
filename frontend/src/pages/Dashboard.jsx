import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API_URL from '../config';

const frasesSayayin = [
  '⚡ ¡El poder del Super Sayayin ha despertado! ¡Bienvenido al dojo, guerrero!',
  '🔥 ¡Tu ki se ha disparado! ¡Ya eres parte del AzukyGym!',
  '💪 ¡Has superado tus límites! ¡El camino del guerrero comienza ahora!',
  '🌟 ¡La transformación ha comenzado! ¡Eres un verdadero guerrero anime!',
  '⚔️ ¡El dojo te da la bienvenida! ¡Entrena duro y supera tus límites!',
];

const fraseSayayin = frasesSayayin[Math.floor(Math.random() * frasesSayayin.length)];

export default function Dashboard() {
  const { usuario, token } = useAuth();
  const [resumen, setResumen] = useState(null);
  const [, setCuotas] = useState([]);
  const [abonado, setAbonado] = useState(false);
  const [mostrarPlanes, setMostrarPlanes] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [pago, setPago] = useState({ titular: '', numero: '', fecha: '', cvv: '' });
  const [pagando, setPagando] = useState(false);
  const [pagoExito, setPagoExito] = useState(false);
  const [mostrarSayayin, setMostrarSayayin] = useState(false);
  const [generando, setGenerando] = useState(false);

  const planes = [
    { nombre: 'Básico', precio: 25, features: ['Acceso sala de musculación', 'Vestuarios', 'App de gestión'] },
    { nombre: 'Premium', precio: 30, features: ['Todo lo del Básico', 'Clases dirigidas ilimitadas', 'Reserva online'], destacado: true },
    { nombre: 'Familiar', precio: 50, features: ['2 personas', 'Todo lo del Premium', 'Descuento en tienda'] },
  ];

  const cargarResumen = async () => {
    const res = await axios.get(`${API_URL}/api/admin/resumen`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setResumen(res.data);
  };

  useEffect(() => {
    if (usuario?.tipo === 'admin') {
      cargarResumen();
    }

    if (usuario?.tipo === 'socio') {
      axios.get(`${API_URL}/api/cuotas/mis-cuotas`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setCuotas(res.data);
        const mesActual = new Date().getMonth() + 1;
        const anioActual = new Date().getFullYear();
        const cuotaActual = res.data.find(c => c.mes === mesActual && c.anio === anioActual && c.estado === 'pagada');
        setAbonado(!!cuotaActual);
      }).catch(() => {});
    }
  }, [pagoExito]);

  const handleGenerarCuotas = async () => {
    setGenerando(true);
    try {
      const mes = new Date().getMonth() + 1;
      const anio = new Date().getFullYear();
      const res = await axios.post(`${API_URL}/api/cuotas/generar-mensuales`,
        { mes, anio, importe: 30 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.mensaje);
      await cargarResumen();
    } catch (e) {
      alert(e.response?.data?.error || 'Error al generar cuotas');
    } finally {
      setGenerando(false);
    }
  };

  const handlePago = async (e) => {
    e.preventDefault();
    setPagando(true);

    setTimeout(async () => {
      try {
        const mesActual = new Date().getMonth() + 1;
        const anioActual = new Date().getFullYear();

        await axios.post(`${API_URL}/api/cuotas`, {
          usuario_id: usuario.id,
          mes: mesActual,
          anio: anioActual,
          importe: planSeleccionado.precio
        }, { headers: { Authorization: `Bearer ${token}` } });

        const cuotasRes = await axios.get(`${API_URL}/api/cuotas/mis-cuotas`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const cuotaCreada = cuotasRes.data.find(c => c.mes === mesActual && c.anio === anioActual);
        if (cuotaCreada) {
          await axios.put(`${API_URL}/api/cuotas/${cuotaCreada.id}/pagar`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        setPagando(false);
        setPagoExito(true);
        setMostrarPago(false);
        setMostrarPlanes(false);
        setAbonado(true);
        setMostrarSayayin(true);
        setPago({ titular: '', numero: '', fecha: '', cvv: '' });
        setTimeout(() => setMostrarSayayin(false), 10000);
      } catch {
        setPagando(false);
      }
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-4">
        <h2 className="fw-bold mb-4">
          Hola, <span style={{ color: '#e94560' }}>{usuario?.nombre}</span> 👋
        </h2>

        {/* MENSAJE SAYAYIN */}
        {mostrarSayayin && (
          <div className="mb-4 p-4 text-center text-white anime-pulse"
            style={{
              position: 'fixed',
              top: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              width: '90%',
              maxWidth: '600px',
              background: 'linear-gradient(135deg, #1a0a0a, #0a0a1a)',
              border: '2px solid #e94560',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>⚡🔥⚡</div>
            <p className="mb-0 anime-glow">{fraseSayayin}</p>
            <p className="mb-0 mt-2" style={{ fontSize: '14px', color: '#aaaaaa' }}>
              ¡Hola <strong style={{ color: '#e94560' }}>{usuario?.nombre}</strong>! El poder del guerrero anime ahora corre por tus venas.
            </p>
          </div>
        )}

        {/* ESTADO ABONADO */}
        {usuario?.tipo === 'socio' && (
          <div className={`alert d-flex justify-content-between align-items-center mb-4 ${abonado ? 'alert-success' : 'alert-warning'}`}>
            <div>
              {abonado ? (
                <span>✅ <strong>Estás abonado</strong> – Puedes reservar clases y acceder a todas las funcionalidades</span>
              ) : (
                <span>⚠️ <strong>No estás abonado</strong> – Activa tu membresía para reservar clases</span>
              )}
            </div>
            {!abonado && (
              <button className="btn btn-danger btn-sm fw-bold" onClick={() => setMostrarPlanes(true)}>
                Activar membresía
              </button>
            )}
          </div>
        )}

        {pagoExito && !mostrarSayayin && (
          <div className="alert alert-success mb-4">
            🎉 <strong>¡Pago realizado correctamente!</strong> Ya eres socio activo de AzukyGym. ¡Bienvenido!
          </div>
        )}

        {/* SELECTOR DE PLANES */}
        {mostrarPlanes && !mostrarPago && (
          <div className="card shadow mb-4" style={{ border: '2px solid #e94560' }}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 text-center">Elige tu plan 💪</h4>
              <div className="row justify-content-center">
                {planes.map((plan, i) => (
                  <div key={i} className="col-md-4 mb-3">
                    <div
                      className="card h-100 text-center"
                      style={{
                        cursor: 'pointer',
                        border: planSeleccionado?.nombre === plan.nombre ? '3px solid #e94560' : '1px solid #dee2e6',
                        transform: plan.destacado ? 'scale(1.03)' : 'scale(1)',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => setPlanSeleccionado(plan)}
                    >
                      <div className="card-body p-3">
                        {plan.destacado && <span className="badge bg-warning text-dark mb-2">MÁS POPULAR</span>}
                        <h5 className="fw-bold">{plan.nombre}</h5>
                        <h3 className="fw-bold" style={{ color: '#e94560' }}>{plan.precio}€<small style={{ fontSize: '14px' }}>/mes</small></h3>
                        <ul className="list-unstyled text-start mt-2">
                          {plan.features.map((f, j) => (
                            <li key={j} className="mb-1 small">✅ {f}</li>
                          ))}
                        </ul>
                        {planSeleccionado?.nombre === plan.nombre && (
                          <span className="badge bg-danger">Seleccionado</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-3 d-flex gap-3 justify-content-center">
                <button className="btn btn-outline-secondary" onClick={() => { setMostrarPlanes(false); setPlanSeleccionado(null); }}>
                  Cancelar
                </button>
                <button
                  className="btn btn-danger fw-bold px-4"
                  disabled={!planSeleccionado}
                  onClick={() => setMostrarPago(true)}
                >
                  Continuar con {planSeleccionado ? `plan ${planSeleccionado.nombre}` : '...'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FORMULARIO DE PAGO */}
        {mostrarPago && (
          <div className="card shadow mb-4" style={{ border: '2px solid #e94560' }}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-1 text-center">💳 Datos de pago</h4>
              <p className="text-center text-muted mb-4">Plan {planSeleccionado?.nombre} – {planSeleccionado?.precio}€/mes</p>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <form onSubmit={handlePago}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Titular de la tarjeta</label>
                      <input type="text" className="form-control" placeholder="Nombre Apellidos" value={pago.titular} onChange={e => setPago({ ...pago, titular: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Número de tarjeta</label>
                      <input type="text" className="form-control" placeholder="1234 5678 9012 3456" maxLength={19} value={pago.numero}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                          const formatted = val.replace(/(.{4})/g, '$1 ').trim();
                          setPago({ ...pago, numero: formatted });
                        }} required />
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label fw-bold">Fecha de caducidad</label>
                        <input type="text" className="form-control" placeholder="MM/AA" maxLength={5} value={pago.fecha}
                          onChange={e => {
                            let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
                            setPago({ ...pago, fecha: val });
                          }} required />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label fw-bold">CVV</label>
                        <input type="password" className="form-control" placeholder="123" maxLength={3} value={pago.cvv}
                          onChange={e => setPago({ ...pago, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })} required />
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <button type="button" className="btn btn-outline-secondary w-50" onClick={() => setMostrarPago(false)}>Volver</button>
                      <button type="submit" className="btn btn-danger fw-bold w-50" disabled={pagando}>
                        {pagando ? '⏳ Procesando...' : `Pagar ${planSeleccionado?.precio}€`}
                      </button>
                    </div>
                    <p className="text-center text-muted small mt-3">
                      🔒 Pago seguro simulado. No se realizará ningún cargo real.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL ADMIN */}
        {usuario?.tipo === 'admin' && resumen && (
          <>
            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <div className="card text-white text-center" style={{ backgroundColor: '#e94560' }}>
                  <div className="card-body">
                    <h1 className="fw-bold">{resumen.totalSocios}</h1>
                    <p className="mb-0">Socios activos</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-white text-center" style={{ backgroundColor: '#1a1a2e' }}>
                  <div className="card-body">
                    <h1 className="fw-bold">{resumen.totalClases}</h1>
                    <p className="mb-0">Clases disponibles</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-white text-center" style={{ backgroundColor: '#e94560' }}>
                  <div className="card-body">
                    <h1 className="fw-bold">{resumen.cuotasPendientes}</h1>
                    <p className="mb-0">Cuotas pendientes</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-white text-center" style={{ backgroundColor: '#1a1a2e' }}>
                  <div className="card-body">
                    <h1 className="fw-bold">{resumen.reservasHoy}</h1>
                    <p className="mb-0">Reservas hoy</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="card shadow h-100" style={{ border: '2px solid #1a1a2e' }}>
                  <div className="card-body text-center">
                    <h1>📋</h1>
                    <h5 className="fw-bold">Alumnos por clase</h5>
                    <p className="text-muted">Ver quién está apuntado a cada clase</p>
                    <Link to="/admin/clases" className="btn text-white fw-bold" style={{ backgroundColor: '#1a1a2e' }}>
                      Ver alumnos
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card shadow h-100" style={{ border: '2px solid #1a1a2e' }}>
                  <div className="card-body text-center">
                    <h1>👥</h1>
                    <h5 className="fw-bold">Gestión de socios</h5>
                    <p className="text-muted">Activar o desactivar socios</p>
                    <Link to="/admin/socios" className="btn text-white fw-bold" style={{ backgroundColor: '#1a1a2e' }}>
                      Ver socios
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card shadow h-100" style={{ border: '2px solid #1a1a2e' }}>
                  <div className="card-body text-center">
                    <h1>💰</h1>
                    <h5 className="fw-bold">Generar cuotas</h5>
                    <p className="text-muted">Generar cuotas del mes actual para todos los socios</p>
                    <button
                      className="btn text-white fw-bold"
                      style={{ backgroundColor: '#1a1a2e' }}
                      disabled={generando}
                      onClick={handleGenerarCuotas}
                    >
                      {generando ? 'Generando...' : 'Generar cuotas junio'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ACCESOS RÁPIDOS */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card shadow h-100">
              <div className="card-body text-center">
                <h1>🏋️</h1>
                <h5 className="fw-bold">Clases</h5>
                <p className="text-muted">Ver todas las clases disponibles</p>
                <Link to="/clases" className="btn text-white" style={{ backgroundColor: '#e94560' }}>Ver clases</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow h-100">
              <div className="card-body text-center">
                <h1>📅</h1>
                <h5 className="fw-bold">Mis reservas</h5>
                <p className="text-muted">Gestiona tus reservas de clases</p>
                <Link to="/mis-reservas" className="btn text-white" style={{ backgroundColor: '#e94560' }}>Ver reservas</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow h-100">
              <div className="card-body text-center">
                <h1>💳</h1>
                <h5 className="fw-bold">Mis cuotas</h5>
                <p className="text-muted">Consulta el estado de tus pagos</p>
                <Link to="/mis-cuotas" className="btn text-white" style={{ backgroundColor: '#e94560' }}>Ver cuotas</Link>
              </div>
            </div>
          </div>
          {abonado && (
            <div className="col-md-4 mb-3">
              <div className="card shadow h-100" style={{ border: '2px solid #e94560' }}>
                <div className="card-body text-center">
                  <h1>💪</h1>
                  <h5 className="fw-bold">Rutinas y Dietas</h5>
                  <p className="text-muted">Accede a tu plan de entrenamiento</p>
                  <Link to="/rutinas" className="btn text-white fw-bold" style={{ backgroundColor: '#e94560' }}>Ver rutinas</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}