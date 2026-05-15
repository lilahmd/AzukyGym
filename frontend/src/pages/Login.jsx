 
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    try {
     const res = await axios.post(`${API_URL}/api/auth/login`, form);
      login(res.data.token, res.data.usuario);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow" style={{ border: '2px solid #e94560' }}>
            <div className="card-body p-4">
              <h2 className="text-center fw-bold mb-4" style={{ color: '#1a1a2e' }}>
                <span style={{ color: '#e94560' }}>Azuky</span>Gym
              </h2>
              <h5 className="text-center mb-4">Iniciar sesión</h5>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100 text-white fw-bold"
                  style={{ backgroundColor: '#e94560' }}
                  disabled={cargando}
                >
                  {cargando ? 'Entrando...' : 'Iniciar sesión'}
                </button>
              </form>
              <p className="text-center mt-3">
  ¿No tienes cuenta? <Link to="/registro" style={{ color: '#e94560' }}>Regístrate</Link>
</p>
<p className="text-center">
  <Link to="/olvido-password" style={{ color: '#e94560', fontSize: '14px' }}>¿Olvidaste tu contraseña?</Link>
</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}