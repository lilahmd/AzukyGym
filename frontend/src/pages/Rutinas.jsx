 
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const rutinasDiasPares = [
  {
    nombre: 'Press de banca',
    musculo: 'Pecho',
    series: '4',
    repeticiones: '10-12',
    descanso: '90 seg',
    imagen: '🏋️',
    descripcion: 'Tumbado en el banco, baja la barra hasta el pecho y empuja hacia arriba.'
  },
  {
    nombre: 'Remo con barra',
    musculo: 'Espalda',
    series: '4',
    repeticiones: '10-12',
    descanso: '90 seg',
    imagen: '💪',
    descripcion: 'Inclinado hacia adelante, tira de la barra hacia el abdomen.'
  },
  {
    nombre: 'Press militar',
    musculo: 'Hombros',
    series: '3',
    repeticiones: '10-12',
    descanso: '75 seg',
    imagen: '🔝',
    descripcion: 'De pie o sentado, empuja la barra desde los hombros hacia arriba.'
  },
  {
    nombre: 'Curl de bíceps',
    musculo: 'Bíceps',
    series: '3',
    repeticiones: '12-15',
    descanso: '60 seg',
    imagen: '💪',
    descripcion: 'De pie, flexiona los codos subiendo las mancuernas hasta los hombros.'
  },
  {
    nombre: 'Tríceps en polea',
    musculo: 'Tríceps',
    series: '3',
    repeticiones: '12-15',
    descanso: '60 seg',
    imagen: '🔱',
    descripcion: 'De pie frente a la polea, extiende los brazos hacia abajo.'
  },
  {
    nombre: 'Plancha abdominal',
    musculo: 'Core',
    series: '3',
    repeticiones: '45 seg',
    descanso: '45 seg',
    imagen: '⚡',
    descripcion: 'Mantén el cuerpo recto apoyado en antebrazos y puntas de los pies.'
  },
];

const rutinasDiasImpares = [
  {
    nombre: 'Sentadilla',
    musculo: 'Cuádriceps',
    series: '4',
    repeticiones: '10-12',
    descanso: '90 seg',
    imagen: '🦵',
    descripcion: 'Con la barra en los hombros, baja flexionando las rodillas hasta 90°.'
  },
  {
    nombre: 'Peso muerto',
    musculo: 'Isquios y Glúteos',
    series: '4',
    repeticiones: '8-10',
    descanso: '120 seg',
    imagen: '🏋️',
    descripcion: 'Con la barra en el suelo, mantén la espalda recta y levanta hasta quedar erguido.'
  },
  {
    nombre: 'Prensa de piernas',
    musculo: 'Piernas',
    series: '3',
    repeticiones: '12-15',
    descanso: '90 seg',
    imagen: '💺',
    descripcion: 'Sentado en la máquina, empuja la plataforma extendiendo las rodillas.'
  },
  {
    nombre: 'Extensión de cuádriceps',
    musculo: 'Cuádriceps',
    series: '3',
    repeticiones: '15',
    descanso: '60 seg',
    imagen: '🦿',
    descripcion: 'En la máquina de extensiones, extiende las piernas completamente.'
  },
  {
    nombre: 'Curl femoral',
    musculo: 'Isquiotibiales',
    series: '3',
    repeticiones: '12-15',
    descanso: '60 seg',
    imagen: '🦵',
    descripcion: 'Tumbado boca abajo, flexiona las rodillas llevando los talones hacia los glúteos.'
  },
  {
    nombre: 'Gemelos en máquina',
    musculo: 'Gemelos',
    series: '4',
    repeticiones: '20',
    descanso: '45 seg',
    imagen: '👟',
    descripcion: 'De pie en la máquina, elévate sobre las puntas de los pies.'
  },
];

const dietaBajarPeso = [
  { comida: 'Desayuno', alimentos: 'Avena con leche desnatada + 1 fruta + café sin azúcar', calorias: '350 kcal' },
  { comida: 'Media mañana', alimentos: 'Yogur griego 0% + puñado de frutos secos', calorias: '200 kcal' },
  { comida: 'Comida', alimentos: '150g pollo a la plancha + ensalada grande + 1 rebanada pan integral', calorias: '450 kcal' },
  { comida: 'Merienda', alimentos: '1 manzana + 2 tortitas de arroz', calorias: '150 kcal' },
  { comida: 'Cena', alimentos: '150g merluza al horno + verduras salteadas + 1 huevo', calorias: '350 kcal' },
];

const dietaAumentarMasa = [
  { comida: 'Desayuno', alimentos: 'Tortilla 3 huevos + avena con leche entera + plátano + zumo naranja', calorias: '650 kcal' },
  { comida: 'Media mañana', alimentos: 'Batido proteico + 2 tostadas con aguacate y pavo', calorias: '450 kcal' },
  { comida: 'Comida', alimentos: '200g ternera + 150g arroz + ensalada + pan integral', calorias: '700 kcal' },
  { comida: 'Merienda', alimentos: 'Yogur griego + 40g avena + miel + frutos secos', calorias: '350 kcal' },
  { comida: 'Cena', alimentos: '200g salmón + 200g patata cocida + brócoli + aceite oliva', calorias: '550 kcal' },
  { comida: 'Antes de dormir', alimentos: 'Batido caseína o queso cottage', calorias: '200 kcal' },
];

export default function Rutinas() {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center text-white p-5">
          <div style={{ fontSize: '80px' }}>🔒</div>
          <h2 className="fw-bold mt-3">Contenido exclusivo para socios</h2>
          <p style={{ color: '#aaaaaa' }}>Regístrate o inicia sesión para acceder a las rutinas y planes de dieta</p>
          <div className="d-flex gap-3 justify-content-center mt-4">
            <Link to="/registro" className="btn btn-danger btn-lg px-4 fw-bold">Registrarse gratis</Link>
            <Link to="/login" className="btn btn-outline-light btn-lg px-4">Iniciar sesión</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}>

      <div style={{ background: 'linear-gradient(135deg, #1a0a0a, #0a0a1a)', padding: '60px 0', borderBottom: '3px solid #e94560' }}>
        <div className="container text-center">
          <h1 className="fw-bold display-5 mb-3">
            Rutinas y <span style={{ color: '#e94560' }}>Dietas</span>
          </h1>
          <p style={{ color: '#aaaaaa', fontSize: '18px' }}>
            Hola <strong style={{ color: '#e94560' }}>{usuario.nombre}</strong>, aquí tienes tu plan personalizado 💪
          </p>
        </div>
      </div>

      <div className="container py-5">

        {/* RUTINA DÍAS PARES - TREN SUPERIOR */}
        <div className="mb-5">
          <h3 className="fw-bold mb-1">
            📅 Días Pares – <span style={{ color: '#e94560' }}>Tren Superior</span>
          </h3>
          <p style={{ color: '#aaaaaa' }} className="mb-4">Lunes, Miércoles, Viernes</p>
          <div className="row">
            {rutinasDiasPares.map((e, i) => (
              <div key={i} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '10px' }}>
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center mb-2">
                      <span style={{ fontSize: '28px', marginRight: '10px' }}>{e.imagen}</span>
                      <div>
                        <h6 className="fw-bold text-white mb-0">{e.nombre}</h6>
                        <small style={{ color: '#e94560' }}>{e.musculo}</small>
                      </div>
                    </div>
                    <p style={{ color: '#aaaaaa', fontSize: '13px' }}>{e.descripcion}</p>
                    <div className="d-flex gap-2 flex-wrap">
                      <span className="badge" style={{ backgroundColor: '#e94560' }}>{e.series} series</span>
                      <span className="badge bg-secondary">{e.repeticiones} reps</span>
                      <span className="badge bg-dark border border-secondary">⏱ {e.descanso}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RUTINA DÍAS IMPARES - TREN INFERIOR */}
        <div className="mb-5">
          <h3 className="fw-bold mb-1">
            📅 Días Impares – <span style={{ color: '#e94560' }}>Tren Inferior</span>
          </h3>
          <p style={{ color: '#aaaaaa' }} className="mb-4">Martes, Jueves, Sábado</p>
          <div className="row">
            {rutinasDiasImpares.map((e, i) => (
              <div key={i} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '10px' }}>
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center mb-2">
                      <span style={{ fontSize: '28px', marginRight: '10px' }}>{e.imagen}</span>
                      <div>
                        <h6 className="fw-bold text-white mb-0">{e.nombre}</h6>
                        <small style={{ color: '#e94560' }}>{e.musculo}</small>
                      </div>
                    </div>
                    <p style={{ color: '#aaaaaa', fontSize: '13px' }}>{e.descripcion}</p>
                    <div className="d-flex gap-2 flex-wrap">
                      <span className="badge" style={{ backgroundColor: '#e94560' }}>{e.series} series</span>
                      <span className="badge bg-secondary">{e.repeticiones} reps</span>
                      <span className="badge bg-dark border border-secondary">⏱ {e.descanso}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIETAS */}
        <h3 className="fw-bold mb-4">🥗 Planes de <span style={{ color: '#e94560' }}>Alimentación</span></h3>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card" style={{ backgroundColor: '#1a1a1a', border: '2px solid #e94560', borderRadius: '12px' }}>
              <div className="card-header text-center fw-bold text-white" style={{ backgroundColor: '#e94560', borderRadius: '10px 10px 0 0' }}>
                🔥 Dieta para Bajar Peso – 1.500 kcal/día
              </div>
              <div className="card-body p-3">
                {dietaBajarPeso.map((d, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-start mb-3 pb-3" style={{ borderBottom: i < dietaBajarPeso.length - 1 ? '1px solid #333' : 'none' }}>
                    <div>
                      <p className="fw-bold mb-1" style={{ color: '#e94560' }}>{d.comida}</p>
                      <p style={{ color: '#cccccc', fontSize: '13px', margin: 0 }}>{d.alimentos}</p>
                    </div>
                    <span className="badge ms-2" style={{ backgroundColor: '#333', whiteSpace: 'nowrap' }}>{d.calorias}</span>
                  </div>
                ))}
                <div className="text-center mt-2 p-2" style={{ backgroundColor: '#e94560', borderRadius: '8px' }}>
                  <strong>Total: 1.500 kcal/día</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card" style={{ backgroundColor: '#1a1a1a', border: '2px solid #2196F3', borderRadius: '12px' }}>
              <div className="card-header text-center fw-bold text-white" style={{ backgroundColor: '#2196F3', borderRadius: '10px 10px 0 0' }}>
                💪 Dieta para Aumentar Masa – 2.900 kcal/día
              </div>
              <div className="card-body p-3">
                {dietaAumentarMasa.map((d, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-start mb-3 pb-3" style={{ borderBottom: i < dietaAumentarMasa.length - 1 ? '1px solid #333' : 'none' }}>
                    <div>
                      <p className="fw-bold mb-1" style={{ color: '#2196F3' }}>{d.comida}</p>
                      <p style={{ color: '#cccccc', fontSize: '13px', margin: 0 }}>{d.alimentos}</p>
                    </div>
                    <span className="badge ms-2" style={{ backgroundColor: '#333', whiteSpace: 'nowrap' }}>{d.calorias}</span>
                  </div>
                ))}
                <div className="text-center mt-2 p-2" style={{ backgroundColor: '#2196F3', borderRadius: '8px' }}>
                  <strong>Total: 2.900 kcal/día</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NUTRICIONISTA */}
        <div className="text-center p-5 mt-3" style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', border: '1px solid #e94560' }}>
          <h4 className="fw-bold text-white">¿Quieres un plan personalizado? 🥗</h4>
          <p style={{ color: '#aaaaaa' }}>Nuestros nutricionistas pueden crear un plan de alimentación adaptado a tus objetivos, gustos y necesidades específicas.</p>
          <Link to="/entrenadores" className="btn btn-danger btn-lg fw-bold px-5">
            Contactar con nutricionista
          </Link>
        </div>

      </div>
    </div>
  );
}