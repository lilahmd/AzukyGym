import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import API_URL from '../config';
import { EMAILJS_CONFIG } from '../config/emailjs';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', telefono: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return 'El email no tiene un formato válido';
    return null;
  };

  const validarTelefono = (telefono) => {
    if (!telefono) return null;
    const regex = /^[6789]\d{8}$/;
    if (!regex.test(telefono.replace(/\s/g, ''))) {
      return 'El teléfono debe ser español: 9 dígitos empezando por 6, 7, 8 o 9';
    }
    return null;
  };

  const validarPassword = (password) => {
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!/[A-Z]/.test(password)) return 'La contraseña debe tener al menos una letra mayúscula';
    if (!/[0-9]/.test(password)) return 'La contraseña debe tener al menos un número';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const errorEmail = validarEmail(form.email);
    if (errorEmail) { setError(errorEmail); return; }

    const errorTelefono = validarTelefono(form.telefono);
    if (errorTelefono) { setError(errorTelefono); return; }

    const errorPassword = validarPassword(form.password);
    if (errorPassword) { setError(errorPassword); return; }

    setCargando(true);
    try {
      await axios.post(`${API_URL}/api/auth/registro`, form);

      emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateBienvenida,
        { nombre: form.nombre, email_destino: form.email },
        EMAILJS_CONFIG.publicKey
      ).catch(err => console.error('Error email:', err));

      setExito('¡Cuenta creada correctamente! Revisa tu email. Redirigiendo...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      const mensaje = err.response?.data?.error;
      if (mensaje === 'Ya existe una cuenta con ese email') {
        setError('Este email ya está registrado. ¿Quieres iniciar sesión?');
      } else {
        setError(mensaje || 'Error al registrarse');
      }
    } finally {
      setCargando(false);
    }
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return null;
    const checks = [p.length >= 8, /[A-Z]/.test(p), /[0-9]/.test(p)];
    const passed = checks.filter(Boolean).length;
    if (passed === 1) return { text: 'Débil', color: 'danger' };
    if (passed === 2) return { text: 'Media', color: 'warning' };
    if (passed === 3) return { text: 'Fuerte', color: 'success' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{ border: '2px solid #e94560' }}>
            <div className="card-body p-4">
              <h2 className="text-center fw-bold mb-4" style={{ color: '#1a1a2e' }}>
                <span style={{ color: '#e94560' }}>Azuky</span>Gym
              </h2>
              <h5 className="text-center mb-4">Crear cuenta</h5>
              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  ⚠️ {error}
                  {error.includes('ya está registrado') && (
                    <Link to="/login" className="ms-2 fw-bold" style={{ color: '#e94560' }}>
                      Iniciar sesión
                    </Link>
                  )}
                </div>
              )}
              {exito && <div className="alert alert-success">✅ {exito}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tu nombre completo"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <small className="text-muted">Introduce un email válido</small>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Teléfono <span className="text-muted fw-normal">(opcional)</span></label>
                  <div className="input-group">
                    <span className="input-group-text">🇪🇸 +34</span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="600 000 000"
                      value={form.telefono}
                      onChange={e => setForm({ ...form, telefono: e.target.value })}
                      maxLength={9}
                    />
                  </div>
                  <small className="text-muted">9 dígitos empezando por 6, 7, 8 o 9</small>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mínimo 8 caracteres"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  {strength && (
                    <div className="mt-1">
                      <small className={`text-${strength.color} fw-bold`}>
                        Seguridad: {strength.text}
                      </small>
                      <div className="progress mt-1" style={{ height: '4px' }}>
                        <div
                          className={`progress-bar bg-${strength.color}`}
                          style={{ width: strength.text === 'Débil' ? '33%' : strength.text === 'Media' ? '66%' : '100%' }}
                        />
                      </div>
                    </div>
                  )}
                  <small className="text-muted">Mínimo 8 caracteres, una mayúscula y un número</small>
                </div>
                <button
                  type="submit"
                  className="btn w-100 text-white fw-bold"
                  style={{ backgroundColor: '#e94560' }}
                  disabled={cargando}
                >
                  {cargando ? 'Creando cuenta...' : 'Registrarse'}
                </button>
              </form>
              <p className="text-center mt-3">
                ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#e94560' }}>Inicia sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}