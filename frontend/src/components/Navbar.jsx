import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#0a0a0a', borderBottom: '2px solid #e94560' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/logo_azuky_sin_fondo.png" alt="AzukyGym" style={{ height: '45px', width: '45px', objectFit: 'contain' }} />
         <span className="fw-bold fs-4" style={{ color: '#e94560' }}>Azuky<span className="text-white">Gym</span></span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ms-4">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/clases">Clases</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/entrenadores">Entrenadores</Link>
            </li>
            {usuario && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/mis-reservas">Mis Reservas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/mis-cuotas">Mis Cuotas</Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {usuario ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link" style={{ color: '#e94560' }}>👤 {usuario.nombre}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link className="nav-link text-white" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-danger btn-sm fw-bold" to="/registro">Únete ahora</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}