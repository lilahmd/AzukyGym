require('dotenv').config();
const { sequelize, Clase, Horario } = require('../src/models/index');

const clases = [
  {
    nombre: 'Spinning',
    descripcion: 'Clase de ciclismo indoor de alta intensidad. Quema hasta 600 calorías por sesión con música motivadora y ritmos que te harán superar tus límites.',
    instructor: 'Carlos García',
    instructor_foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    instructor_bio: 'Instructor certificado con 8 años de experiencia. Especialista en ciclismo indoor y entrenamiento cardiovascular.',
    duracion_minutos: 45,
    aforo_maximo: 20,
    imagen_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    nombre: 'Yoga',
    descripcion: 'Clase de yoga para todos los niveles. Mejora tu flexibilidad, equilibrio y bienestar mental con técnicas de respiración y meditación.',
    instructor: 'Ana Martínez',
    instructor_foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    instructor_bio: 'Profesora de yoga certificada con 10 años de experiencia. Especialista en yoga Hatha y Vinyasa.',
    duracion_minutos: 60,
    aforo_maximo: 15,
    imagen_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'
  },
  {
    nombre: 'Pilates',
    descripcion: 'Ejercicios de control corporal y flexibilidad. Fortalece tu core, mejora tu postura y elimina dolores de espalda.',
    instructor: 'Laura Sánchez',
    instructor_foto: 'https://randomuser.me/api/portraits/women/68.jpg',
    instructor_bio: 'Fisioterapeuta y especialista en Pilates clínico. Más de 6 años ayudando a personas con lesiones.',
    duracion_minutos: 50,
    aforo_maximo: 12,
    imagen_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400'
  },
  {
    nombre: 'Zumba',
    descripcion: 'Baile fitness con ritmos latinos. La forma más divertida de quemar calorías mientras bailas salsa, merengue y reggaeton.',
    instructor: 'María López',
    instructor_foto: 'https://randomuser.me/api/portraits/women/26.jpg',
    instructor_bio: 'Instructora de Zumba certificada y bailarina profesional con 7 años de experiencia.',
    duracion_minutos: 60,
    aforo_maximo: 25,
    imagen_url: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400'
  },
  {
    nombre: 'CrossFit',
    descripcion: 'Entrenamiento funcional de alta intensidad. Combina ejercicios de fuerza, resistencia y velocidad para transformar tu cuerpo.',
    instructor: 'Pedro Ruiz',
    instructor_foto: 'https://randomuser.me/api/portraits/men/85.jpg',
    instructor_bio: 'Entrenador CrossFit Level 2 con 5 años de experiencia. Ex-atleta de competición.',
    duracion_minutos: 60,
    aforo_maximo: 15,
    imagen_url: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=400'
  }
];

const horarios = [
  { clase_nombre: 'Spinning', dia_semana: 'lunes', hora_inicio: '09:00', hora_fin: '09:45', aforo_maximo: 20 },
  { clase_nombre: 'Spinning', dia_semana: 'miercoles', hora_inicio: '18:00', hora_fin: '18:45', aforo_maximo: 20 },
  { clase_nombre: 'Spinning', dia_semana: 'viernes', hora_inicio: '10:00', hora_fin: '10:45', aforo_maximo: 20 },
  { clase_nombre: 'Yoga', dia_semana: 'martes', hora_inicio: '10:00', hora_fin: '11:00', aforo_maximo: 15 },
  { clase_nombre: 'Yoga', dia_semana: 'jueves', hora_inicio: '19:00', hora_fin: '20:00', aforo_maximo: 15 },
  { clase_nombre: 'Pilates', dia_semana: 'lunes', hora_inicio: '11:00', hora_fin: '11:50', aforo_maximo: 12 },
  { clase_nombre: 'Pilates', dia_semana: 'miercoles', hora_inicio: '20:00', hora_fin: '20:50', aforo_maximo: 12 },
  { clase_nombre: 'Zumba', dia_semana: 'martes', hora_inicio: '18:00', hora_fin: '19:00', aforo_maximo: 25 },
  { clase_nombre: 'Zumba', dia_semana: 'sabado', hora_inicio: '11:00', hora_fin: '12:00', aforo_maximo: 25 },
  { clase_nombre: 'CrossFit', dia_semana: 'lunes', hora_inicio: '07:00', hora_fin: '08:00', aforo_maximo: 15 },
  { clase_nombre: 'CrossFit', dia_semana: 'miercoles', hora_inicio: '07:00', hora_fin: '08:00', aforo_maximo: 15 },
  { clase_nombre: 'CrossFit', dia_semana: 'viernes', hora_inicio: '07:00', hora_fin: '08:00', aforo_maximo: 15 },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');

    for (const c of clases) {
      const [clase, created] = await Clase.findOrCreate({
        where: { nombre: c.nombre },
        defaults: c
      });
      if (!created) {
        await clase.update(c);
      }
      console.log(`Clase ${created ? 'creada' : 'actualizada'}: ${c.nombre}`);

      const horariosClase = horarios.filter(h => h.clase_nombre === c.nombre);
      for (const h of horariosClase) {
        await Horario.findOrCreate({
          where: { clase_id: clase.id, dia_semana: h.dia_semana, hora_inicio: h.hora_inicio },
          defaults: { clase_id: clase.id, ...h }
        });
      }
    }

    console.log('Datos actualizados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

seed();