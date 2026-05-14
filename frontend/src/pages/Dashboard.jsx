 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { usuario, token } = useAuth();
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    if (usuario?.tipo === 'admin') {
      axios.get('http://localhost:3001/api/admin/resumen', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setResumen(res.data));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        Hola, <span style={{ color: '#e94560' }}>{usuario?.nombre}</span> 👋
      </h2>

      {usuario?.tipo === 'admin' && resumen && (
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
      )}

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h1>🏋️</h1>
              <h5 className="fw-bold">Clases</h5>
              <p className="text-muted">Ver todas las clases disponibles</p>
              <Link to="/" className="btn text-white" style={{ backgroundColor: '#e94560' }}>
                Ver clases
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h1>📅</h1>
              <h5 className="fw-bold">Mis reservas</h5>
              <p className="text-muted">Gestiona tus reservas de clases</p>
              <Link to="/mis-reservas" className="btn text-white" style={{ backgroundColor: '#e94560' }}>
                Ver reservas
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h1>💳</h1>
              <h5 className="fw-bold">Mis cuotas</h5>
              <p className="text-muted">Consulta el estado de tus pagos</p>
              <Link to="/mis-cuotas" className="btn text-white" style={{ backgroundColor: '#e94560' }}>
                Ver cuotas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}