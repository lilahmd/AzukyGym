 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config';

export default function MisCuotas() {
  const [cuotas, setCuotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    axios.get(`${API_URL}/api/cuotas/mis-cuotas`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCuotas(res.data))
    .finally(() => setCargando(false));
  }, []);

  const meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const colorEstado = {
    pagada: 'success',
    pendiente: 'warning',
    vencida: 'danger'
  };

  if (cargando) return <div className="text-center mt-5"><div className="spinner-border" style={{ color: '#e94560' }}></div></div>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Mis <span style={{ color: '#e94560' }}>Cuotas</span></h2>

      {cuotas.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No tienes cuotas registradas</h4>
          <p className="text-muted">Contacta con el administrador del gimnasio</p>
        </div>
      ) : (
        <div className="row">
          {cuotas.map(cuota => (
            <div key={cuota.id} className="col-md-4 mb-3">
              <div className={`card shadow border-${colorEstado[cuota.estado]}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">
                      {meses[cuota.mes]} {cuota.anio}
                    </h5>
                    <span className={`badge bg-${colorEstado[cuota.estado]}`}>
                      {cuota.estado}
                    </span>
                  </div>
                  <h3 className="fw-bold mt-2" style={{ color: '#e94560' }}>
                    {cuota.importe}€
                  </h3>
                  {cuota.fecha_pago && (
                    <p className="text-muted small mb-0">
                      Pagado el {cuota.fecha_pago}
                    </p>
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