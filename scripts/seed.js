require('dotenv').config();
const { sequelize } = require('../src/models/index');
const { QueryTypes } = require('sequelize');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');

    const clases = [
      { nombre: 'Spinning', descripcion: 'Clase de ciclismo indoor de alta intensidad. Quema hasta 600 calorías por sesión con música motivadora y ritmos que te harán superar tus límites.', instructor: 'Carlos García', instructor_foto: 'https://randomuser.me/api/portraits/men/32.jpg', instructor_bio: 'Instructor certificado con 8 años de experiencia. Especialista en ciclismo indoor y entrenamiento cardiovascular.', duracion_minutos: 45, aforo_maximo: 20, imagen_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400' },
      { nombre: 'Yoga', descripcion: 'Clase de yoga para todos los niveles. Mejora tu flexibilidad, equilibrio y bienestar mental con técnicas de respiración y meditación.', instructor: 'Ana Martínez', instructor_foto: 'https://randomuser.me/api/portraits/women/44.jpg', instructor_bio: 'Profesora de yoga certificada con 10 años de experiencia. Especialista en yoga Hatha y Vinyasa.', duracion_minutos: 60, aforo_maximo: 15, imagen_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400' },
      { nombre: 'Pilates', descripcion: 'Ejercicios de control corporal y flexibilidad. Fortalece tu core, mejora tu postura y elimina dolores de espalda.', instructor: 'Laura Sánchez', instructor_foto: 'https://randomuser.me/api/portraits/women/68.jpg', instructor_bio: 'Fisioterapeuta y especialista en Pilates clínico. Más de 6 años ayudando a personas con lesiones.', duracion_minutos: 50, aforo_maximo: 12, imagen_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400' },
      { nombre: 'Zumba', descripcion: 'Baile fitness con ritmos latinos. La forma más divertida de quemar calorías mientras bailas salsa, merengue y reggaeton.', instructor: 'María López', instructor_foto: 'https://randomuser.me/api/portraits/women/26.jpg', instructor_bio: 'Instructora de Zumba certificada y bailarina profesional con 7 años de experiencia.', duracion_minutos: 60, aforo_maximo: 25, imagen_url: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400' },
      { nombre: 'CrossFit', descripcion: 'Entrenamiento funcional de alta intensidad. Combina ejercicios de fuerza, resistencia y velocidad para transformar tu cuerpo.', instructor: 'Pedro Ruiz', instructor_foto: 'https://randomuser.me/api/portraits/men/85.jpg', instructor_bio: 'Entrenador CrossFit Level 2 con 5 años de experiencia. Ex-atleta de competición.', duracion_minutos: 60, aforo_maximo: 15, imagen_url: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=400' },
    ];

    const horarios = [
      { clase: 'Spinning', dia: 'lunes', inicio: '09:00:00', fin: '09:45:00', aforo: 20 },
      { clase: 'Spinning', dia: 'miercoles', inicio: '18:00:00', fin: '18:45:00', aforo: 20 },
      { clase: 'Spinning', dia: 'viernes', inicio: '10:00:00', fin: '10:45:00', aforo: 20 },
      { clase: 'Yoga', dia: 'martes', inicio: '10:00:00', fin: '11:00:00', aforo: 15 },
      { clase: 'Yoga', dia: 'jueves', inicio: '19:00:00', fin: '20:00:00', aforo: 15 },
      { clase: 'Pilates', dia: 'lunes', inicio: '11:00:00', fin: '11:50:00', aforo: 12 },
      { clase: 'Pilates', dia: 'miercoles', inicio: '20:00:00', fin: '20:50:00', aforo: 12 },
      { clase: 'Zumba', dia: 'martes', inicio: '18:00:00', fin: '19:00:00', aforo: 25 },
      { clase: 'Zumba', dia: 'sabado', inicio: '11:00:00', fin: '12:00:00', aforo: 25 },
      { clase: 'CrossFit', dia: 'lunes', inicio: '07:00:00', fin: '08:00:00', aforo: 15 },
      { clase: 'CrossFit', dia: 'miercoles', inicio: '07:00:00', fin: '08:00:00', aforo: 15 },
      { clase: 'CrossFit', dia: 'viernes', inicio: '07:00:00', fin: '08:00:00', aforo: 15 },
    ];

    for (const c of clases) {
      await sequelize.query(
        `INSERT INTO clases (nombre, descripcion, instructor, instructor_foto, instructor_bio, duracion_minutos, aforo_maximo, imagen_url, activo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
         descripcion=VALUES(descripcion), instructor=VALUES(instructor),
         instructor_foto=VALUES(instructor_foto), instructor_bio=VALUES(instructor_bio),
         imagen_url=VALUES(imagen_url)`,
        { replacements: [c.nombre, c.descripcion, c.instructor, c.instructor_foto, c.instructor_bio, c.duracion_minutos, c.aforo_maximo, c.imagen_url], type: QueryTypes.INSERT }
      );
      console.log(`Clase insertada: ${c.nombre}`);
    }

    for (const h of horarios) {
      const [clase] = await sequelize.query(
        `SELECT id FROM clases WHERE nombre = ?`,
        { replacements: [h.clase], type: QueryTypes.SELECT }
      );
      if (!clase) continue;

      await sequelize.query(
        `INSERT INTO horarios (clase_id, dia_semana, hora_inicio, hora_fin, aforo_maximo, plazas_ocupadas, activo)
         VALUES (?, ?, ?, ?, ?, 0, 1)
         ON DUPLICATE KEY UPDATE hora_fin=VALUES(hora_fin)`,
        { replacements: [clase.id, h.dia, h.inicio, h.fin, h.aforo], type: QueryTypes.INSERT }
      );
    }

    console.log('Todo insertado correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

seed();