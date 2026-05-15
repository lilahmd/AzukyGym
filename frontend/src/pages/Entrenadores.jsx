 
import { Link } from 'react-router-dom';

const entrenadores = [
  {
    nombre: 'Carlos García',
    especialidad: 'Ciclismo Indoor y Cardio',
    experiencia: '8 años',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    descripcion: 'Especialista en entrenamiento cardiovascular y ciclismo indoor. Te ayudará a mejorar tu resistencia y quemar calorías de forma efectiva.',
    clases: ['Spinning'],
    precio: '40€/sesión',
    disponibilidad: 'L-V: 8:00 - 14:00',
    logros: ['Certificado RPM', 'Triatleta amateur', 'Especialista en pérdida de peso']
  },
  {
    nombre: 'Ana Martínez',
    especialidad: 'Yoga y Mindfulness',
    experiencia: '10 años',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    descripcion: 'Profesora de yoga certificada en yoga Hatha y Vinyasa. Te guiará hacia el equilibrio físico y mental con técnicas de respiración y meditación.',
    clases: ['Yoga'],
    precio: '45€/sesión',
    disponibilidad: 'L-J: 9:00 - 13:00',
    logros: ['Certificada en India', 'Especialista en yoga terapéutico', 'Instructora de meditación']
  },
  {
    nombre: 'Laura Sánchez',
    especialidad: 'Pilates y Rehabilitación',
    experiencia: '6 años',
    foto: 'https://randomuser.me/api/portraits/women/68.jpg',
    descripcion: 'Fisioterapeuta especializada en Pilates clínico. Ideal para personas con lesiones o problemas de espalda que quieren recuperarse y fortalecerse.',
    clases: ['Pilates'],
    precio: '50€/sesión',
    disponibilidad: 'L-V: 10:00 - 15:00',
    logros: ['Fisioterapeuta titulada', 'Pilates clínico certificado', 'Especialista en suelo pélvico']
  },
  {
    nombre: 'María López',
    especialidad: 'Baile Fitness y Zumba',
    experiencia: '7 años',
    foto: 'https://randomuser.me/api/portraits/women/26.jpg',
    descripcion: 'Bailarina profesional e instructora de Zumba. Te enseñará a moverte con ritmo mientras te pones en forma de la forma más divertida posible.',
    clases: ['Zumba'],
    precio: '35€/sesión',
    disponibilidad: 'M-S: 10:00 - 14:00',
    logros: ['Instructora Zumba B1', 'Bailarina profesional', 'Especialista en danza latina']
  },
  {
    nombre: 'Pedro Ruiz',
    especialidad: 'CrossFit y Fuerza',
    experiencia: '5 años',
    foto: 'https://randomuser.me/api/portraits/men/85.jpg',
    descripcion: 'Entrenador CrossFit Level 2 y ex-atleta de competición. Te llevará al límite con entrenamientos funcionales de alta intensidad para transformar tu cuerpo.',
    clases: ['CrossFit'],
    precio: '45€/sesión',
    disponibilidad: 'L-V: 7:00 - 12:00',
    logros: ['CrossFit Level 2', 'Ex-atleta de competición', 'Especialista en halterofilia']
  },
  {
    nombre: 'Diego Fernández',
    especialidad: 'Musculación y Nutrición',
    experiencia: '9 años',
    foto: 'https://randomuser.me/api/portraits/men/52.jpg',
    descripcion: 'Entrenador personal especializado en hipertrofia y pérdida de grasa. Combina el entrenamiento con planes nutricionales personalizados para maximizar tus resultados.',
    clases: ['Musculación', 'Entrenamiento Personal'],
    precio: '55€/sesión',
    disponibilidad: 'L-S: 9:00 - 20:00',
    logros: ['Grado en CCAFD', 'Nutricionista deportivo', 'Especialista en composición corporal']
  }
];

export default function Entrenadores() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #1a0a0a, #0a0a1a)', padding: '60px 0', borderBottom: '3px solid #e94560' }}>
        <div className="container text-center">
          <h1 className="fw-bold display-5 mb-3">
            Nuestros <span style={{ color: '#e94560' }}>Entrenadores</span>
          </h1>
          <p style={{ color: '#aaaaaa', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            El mejor equipo de profesionales para ayudarte a alcanzar tus objetivos
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          {entrenadores.map((e, i) => (
            <div key={i} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', transition: 'transform 0.2s' }}
                onMouseEnter={el => el.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={el => el.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ background: 'linear-gradient(135deg, #1a0a0a, #0a0a2a)', padding: '30px', textAlign: 'center' }}>
                  <img
                    src={e.foto}
                    alt={e.nombre}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #e94560', objectFit: 'cover' }}
                  />
                  <h5 className="fw-bold text-white mt-3 mb-1">{e.nombre}</h5>
                  <p style={{ color: '#e94560', fontSize: '13px', fontWeight: 'bold' }}>{e.especialidad}</p>
                  <span className="badge" style={{ backgroundColor: '#e94560' }}>{e.experiencia} de experiencia</span>
                </div>

                <div className="card-body p-3">
                  <p style={{ color: '#aaaaaa', fontSize: '13px', marginBottom: '12px' }}>{e.descripcion}</p>

                  <div className="mb-3">
                    {e.logros.map((logro, j) => (
                      <div key={j} className="d-flex align-items-center mb-1">
                        <span style={{ color: '#e94560', marginRight: '6px' }}>✓</span>
                        <small style={{ color: '#cccccc' }}>{logro}</small>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #333', paddingTop: '12px' }}>
                    <div className="d-flex justify-content-between mb-2">
                      <small style={{ color: '#aaaaaa' }}>💰 Precio</small>
                      <small className="fw-bold text-white">{e.precio}</small>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <small style={{ color: '#aaaaaa' }}>🕐 Disponibilidad</small>
                      <small className="fw-bold text-white">{e.disponibilidad}</small>
                    </div>
                    <Link to="/registro" className="btn w-100 fw-bold text-white" style={{ backgroundColor: '#e94560' }}>
                      Contratar entrenador
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}