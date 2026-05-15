 
import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('La contraseña debe tener al menos una mayúscula');
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError('La contraseña debe tener al menos un número');
      return;
    }
    if (password !== confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setCargando(true);
    try {
      await axios.post(`${API_URL}/api/password/reset`, { token, password });
      setExito(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al restablecer la contraseña');
    } finally {
      setCargando(false);
    }
  };

  if (!token) {
    return (
      <div className="container mt-5 text-center">
        <h4>Enlace inválido</h4>
        <Link to="/login" style={{ color: '#e94560' }}>Volver al login</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow" style={{ border: '2px solid #e94560' }}>
            <div className="card-body p-4">
              <h2 className="text-center fw-bold mb-2" style={{ color: '#1a1a2e' }}>
                <span style={{ color: '#e94560' }}>Azuky</span>Gym
              </h2>
              <h5 className="text-center mb-4">Nueva contraseña</h5>

              {exito ? (
                <div className="text-center">
                  <div style={{ fontSize: '60px' }}>✅</div>
                  <h5 className="fw-bold mt-3">¡Contraseña restablecida!</h5>
                  <p className="text-muted">Redirigiendo al login...</p>
                </div>
              ) : (
                <>
                  {error && <div className="alert alert-danger">⚠️ {error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Nueva contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                      <small className="text-muted">Mínimo 8 caracteres, una mayúscula y un número</small>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Confirmar contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Repite la contraseña"
                        value={confirmar}
                        onChange={e => setConfirmar(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn w-100 text-white fw-bold"
                      style={{ backgroundColor: '#e94560' }}
                      disabled={cargando}
                    >
                      {cargando ? 'Guardando...' : 'Guardar nueva contraseña'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}