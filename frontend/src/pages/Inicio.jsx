import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Inicio() {
  const [contacto, setContacto] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleContacto = (e) => {
    e.preventDefault();
    setEnviando(true);
    setTimeout(() => {
      setEnviado(true);
      setEnviando(false);
      setContacto({ nombre: '', email: '', mensaje: '' });
      setTimeout(() => setEnviado(false), 4000);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a1a 100%)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '3px solid #e94560'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <p className="fw-bold mb-2" style={{ color: '#e94560', fontSize: '14px', letterSpacing: '4px' }}>
                ⚡ BIENVENIDO A AZUKYGYM ⚡
              </p>
              <h1 className="display-3 fw-bold mb-3">
                ENTRENA COMO UN
                <span style={{ color: '#e94560', display: 'block' }}>GUERRERO ANIME</span>
              </h1>
              <p className="lead mb-4" style={{ color: '#aaaaaa' }}>
                El gimnasio donde la fuerza del anime se une a tu entrenamiento.
                Clases dirigidas, control de cuotas y mucho más.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
                <Link to="/registro" className="btn btn-danger btn-lg fw-bold px-4">
                  🔥 ÚNETE GRATIS
                </Link>
                <Link to="/clases" className="btn btn-outline-light btn-lg px-4">
                  Ver clases
                </Link>
              </div>
              <div className="mt-4 p-3 d-inline-block" style={{
                background: 'linear-gradient(135deg, #e94560, #ff6b35)',
                borderRadius: '10px'
              }}>
                <p className="mb-0 fw-bold fs-5">🎉 ¡MATRÍCULA GRATIS! Solo 30€/mes</p>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <img
                src="/logo_azuky_sin_fondo.png"
                alt="AzukyGym"
                style={{
                  width: '100%',
                  maxWidth: '450px',
                  filter: 'drop-shadow(0 0 30px rgba(233, 69, 96, 0.5))'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: '#e94560', padding: '30px 0' }}>
        <div className="container">
          <div className="row text-center text-white">
            <div className="col-6 col-md-3 mb-3 mb-md-0">
              <h2 className="fw-bold display-5">+500</h2>
              <p className="mb-0">Socios activos</p>
            </div>
            <div className="col-6 col-md-3 mb-3 mb-md-0">
              <h2 className="fw-bold display-5">15</h2>
              <p className="mb-0">Clases semanales</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="fw-bold display-5">5</h2>
              <p className="mb-0">Instructores</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="fw-bold display-5">3</h2>
              <p className="mb-0">Sedes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLASES DESTACADAS */}
      <section style={{ padding: '80px 0', backgroundColor: '#0a0a0a' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-2 text-white">Nuestras <span style={{ color: '#e94560' }}>Clases</span></h2>
          <p className="text-center mb-5" style={{ color: '#aaaaaa' }}>El mejor equipo de instructores te espera</p>
          <div className="row">
            {[
              { nombre: 'Spinning', desc: 'Quema hasta 600 calorías por sesión con música motivadora y el mejor instructor', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', instructor: 'Carlos García', foto: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { nombre: 'Yoga', desc: 'Mejora tu flexibilidad y bienestar mental con nuestras sesiones para todos los niveles', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', instructor: 'Ana Martínez', foto: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { nombre: 'Zumba', desc: 'La forma más divertida de ponerte en forma bailando salsa, merengue y reggaeton', img: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400', instructor: 'María López', foto: 'https://randomuser.me/api/portraits/women/26.jpg' },
              { nombre: 'Pilates', desc: 'Fortalece tu core y elimina dolores de espalda con ejercicios de control corporal', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400', instructor: 'Laura Sánchez', foto: 'https://randomuser.me/api/portraits/women/68.jpg' },
              { nombre: 'CrossFit', desc: 'Entrenamiento funcional de alta intensidad para transformar tu cuerpo en tiempo récord', img: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=400', instructor: 'Pedro Ruiz', foto: 'https://randomuser.me/api/portraits/men/85.jpg' },
            ].map((clase, i) => (
              <div key={i} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ position: 'relative' }}>
                    <img src={clase.img} alt={clase.nombre} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#e94560', color: 'white', padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                      {clase.nombre}
                    </div>
                  </div>
                  <div className="card-body p-3">
                    <p style={{ color: '#aaaaaa', fontSize: '14px', marginBottom: '12px' }}>{clase.desc}</p>
                    <div className="d-flex align-items-center" style={{ borderTop: '1px solid #333', paddingTop: '12px' }}>
                      <img src={clase.foto} alt={clase.instructor} style={{ width: '35px', height: '35px', borderRadius: '50%', border: '2px solid #e94560', objectFit: 'cover' }} />
                      <div className="ms-2">
                        <p className="mb-0 text-white fw-bold" style={{ fontSize: '13px' }}>{clase.instructor}</p>
                        <p className="mb-0" style={{ color: '#e94560', fontSize: '11px' }}>Instructor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 d-flex flex-wrap justify-content-center gap-3">
            <Link to="/clases" className="btn btn-outline-danger btn-lg px-5">Ver todos los horarios</Link>
            <Link to="/registro" className="btn btn-danger btn-lg px-5">¡Únete ahora!</Link>
          </div>
        </div>
      </section>

      {/* SEDES */}
      <section style={{ padding: '80px 0', backgroundColor: '#0d0d0d' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-2">Nuestras <span style={{ color: '#e94560' }}>Sedes</span></h2>
          <p className="text-center mb-5" style={{ color: '#aaaaaa' }}>Encuéntranos en tu ciudad</p>
          <div className="row">
            {[
              { ciudad: 'Madrid Centro', direccion: 'Calle Gran Vía 45, Madrid', horario: 'L-V: 6:00 - 23:00 | S-D: 8:00 - 21:00', tel: '910 123 456' },
              { ciudad: 'Madrid Norte', direccion: 'Av. de la Paz 12, Alcobendas', horario: 'L-V: 7:00 - 22:00 | S-D: 9:00 - 20:00', tel: '910 234 567' },
              { ciudad: 'Madrid Sur', direccion: 'Calle Real 8, Getafe', horario: 'L-V: 7:00 - 22:00 | S-D: 9:00 - 20:00', tel: '910 345 678' },
            ].map((sede, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card h-100" style={{ backgroundColor: '#1a1a1a', border: '1px solid #e94560', borderRadius: '12px' }}>
                  <div className="card-body p-4">
                    <h4 className="fw-bold" style={{ color: '#e94560' }}>📍 {sede.ciudad}</h4>
                    <p className="text-white mb-2">{sede.direccion}</p>
                    <p style={{ color: '#aaaaaa', fontSize: '14px' }}>🕐 {sede.horario}</p>
                    <p style={{ color: '#aaaaaa', fontSize: '14px' }}>📞 {sede.tel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section style={{ padding: '80px 0', backgroundColor: '#0a0a0a' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-2">Nuestros <span style={{ color: '#e94560' }}>Precios</span></h2>
          <p className="text-center mb-5" style={{ color: '#aaaaaa' }}>Sin permanencia. Sin sorpresas.</p>
          <div className="row justify-content-center">
            {[
              { plan: 'Básico', precio: '25', features: ['Acceso sala de musculación', 'Vestuarios', 'App de gestión'], destacado: false },
              { plan: 'Premium', precio: '30', features: ['Todo lo del Básico', 'Clases dirigidas ilimitadas', 'Reserva online', 'Matrícula gratis'], destacado: true },
              { plan: 'Familiar', precio: '50', features: ['2 personas', 'Todo lo del Premium', 'Descuento en tienda', 'Matrícula gratis'], destacado: false },
            ].map((plan, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card h-100 text-center" style={{
                  backgroundColor: plan.destacado ? '#e94560' : '#1a1a1a',
                  border: plan.destacado ? '2px solid #ff6b35' : '1px solid #333',
                  borderRadius: '12px',
                  transform: plan.destacado ? 'scale(1.05)' : 'scale(1)'
                }}>
                  <div className="card-body p-4">
                    {plan.destacado && <span className="badge bg-warning text-dark mb-2">MÁS POPULAR</span>}
                    <h4 className="fw-bold text-white">{plan.plan}</h4>
                    <h2 className="fw-bold text-white display-4">{plan.precio}€<small style={{ fontSize: '16px' }}>/mes</small></h2>
                    <p className="text-white opacity-75 mb-3">Matrícula gratis</p>
                    <ul className="list-unstyled text-start">
                      {plan.features.map((f, j) => (
                        <li key={j} className="mb-2 text-white">✅ {f}</li>
                      ))}
                    </ul>
                    <Link to="/registro" className={`btn fw-bold w-100 mt-3 ${plan.destacado ? 'btn-light' : 'btn-danger'}`}>
                      Empezar ahora
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section style={{ padding: '80px 0', backgroundColor: '#0d0d0d' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-2">
            <span style={{ color: '#e94560' }}>Contáctanos</span>
          </h2>
          <p className="text-center mb-5" style={{ color: '#aaaaaa' }}>Estamos aquí para ayudarte</p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card" style={{ backgroundColor: '#1a1a1a', border: '1px solid #e94560', borderRadius: '12px' }}>
                <div className="card-body p-4">
                  {enviado && (
                    <div className="alert alert-success text-center fw-bold">
                      ✅ ¡Mensaje enviado correctamente! Te responderemos en breve.
                    </div>
                  )}
                  <form onSubmit={handleContacto}>
                    <div className="mb-3">
                      <label className="form-label text-white">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ backgroundColor: '#0a0a0a', color: 'white', border: '1px solid #333' }}
                        placeholder="Tu nombre"
                        value={contacto.nombre}
                        onChange={e => setContacto({ ...contacto, nombre: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        style={{ backgroundColor: '#0a0a0a', color: 'white', border: '1px solid #333' }}
                        placeholder="tu@email.com"
                        value={contacto.email}
                        onChange={e => setContacto({ ...contacto, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Mensaje</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        style={{ backgroundColor: '#0a0a0a', color: 'white', border: '1px solid #333' }}
                        placeholder="¿En qué podemos ayudarte?"
                        value={contacto.mensaje}
                        onChange={e => setContacto({ ...contacto, mensaje: e.target.value })}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-danger w-100 fw-bold"
                      disabled={enviando}
                    >
                      {enviando ? '📨 Enviando...' : '📨 Enviar mensaje'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-4 mt-md-0">
              <div className="p-4">
                <h5 className="fw-bold mb-4" style={{ color: '#e94560' }}>Información de contacto</h5>
                <p className="text-white">📧 info@azukygym.com</p>
                <p className="text-white">📞 910 123 456</p>
                <p className="text-white">📍 Calle Gran Vía 45, Madrid</p>
                <p className="text-white">🕐 L-V: 6:00 - 23:00</p>
                <div className="mt-4">
                  <h6 className="fw-bold text-white mb-3">Síguenos</h6>
                  <div className="d-flex gap-3">
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="btn btn-outline-danger btn-sm">
                        <i className="bi bi-instagram me-1"></i> Instagram
                      </a>
                      <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="btn btn-outline-danger btn-sm">
                        <i className="bi bi-tiktok me-1"></i> TikTok
                      </a>
                      <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="btn btn-outline-danger btn-sm">
                        <i className="bi bi-youtube me-1"></i> YouTube
                      </a>
                     </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#050505', borderTop: '2px solid #e94560', padding: '20px 0' }}>
        <div className="container text-center">
          <p className="mb-0" style={{ color: '#555' }}>© 2025 AzukyGym. Todos los derechos reservados. | Desarrollado por Laila Al Moudi</p>
        </div>
      </footer>

    </div>
  );
}