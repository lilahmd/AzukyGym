import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import API_URL from '../config';
import { EMAILJS_CONFIG } from '../config/emailjs';

export default function OlvidoPassword() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    try {
      const res = await axios.post(`${API_URL}/api/password/solicitar`, { email });
      const token = res.data.token || '';
      const enlace = `https://azuky-gym.vercel.app/reset-password?token=${token}`;

      emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateReset,
        { nombre: email, email_destino: email, enlace },
        EMAILJS_CONFIG.publicKey
      ).catch(err => console.error('Error email reset:', err));

      setEnviado(true);
    } catch {
      setError('Error al procesar la solicitud. Inténtalo de nuevo.');
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
              <h2 className="text-center fw-bold mb-2" style={{ color: '#1a1a2e' }}>
                <span style={{ color: '#e94560' }}>Azuky</span>Gym
              </h2>
              <h5 className="text-center mb-4">¿Olvidaste tu contraseña?</h5>

              {enviado ? (
                <div className="text-center">
                  <div style={{ fontSize: '60px' }}>📧</div>
                  <h5 className="fw-bold mt-3">¡Email enviado!</h5>
                  <p className="text-muted">Si el email está registrado recibirás un enlace para restablecer tu contraseña. Revisa también la carpeta de spam.</p>
                  <Link to="/login" className="btn btn-danger fw-bold w-100 mt-3">
                    Volver al login
                  </Link>
                </div>
              ) : (
                <>
                  <p className="text-muted text-center mb-4">
                    Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
                  </p>
                  {error && <div className="alert alert-danger">⚠️ {error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn w-100 text-white fw-bold"
                      style={{ backgroundColor: '#e94560' }}
                      disabled={cargando}
                    >
                      {cargando ? 'Enviando...' : 'Enviar enlace'}
                    </button>
                  </form>
                  <p className="text-center mt-3">
                    <Link to="/login" style={{ color: '#e94560' }}>Volver al login</Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}