 
const { Clase, Horario } = require('../models/index');

const obtenerClases = async (req, res) => {
  try {
    const clases = await Clase.findAll({
      where: { activo: true },
      include: [{ model: Horario, where: { activo: true }, required: false }]
    });
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las clases' });
  }
};

const obtenerClase = async (req, res) => {
  try {
    const { id } = req.params;
    const clase = await Clase.findByPk(id, {
      include: [{ model: Horario, where: { activo: true }, required: false }]
    });
    if (!clase) return res.status(404).json({ error: 'Clase no encontrada' });
    res.json(clase);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la clase' });
  }
};

const crearClase = async (req, res) => {
  try {
    const { nombre, descripcion, instructor, duracion_minutos, aforo_maximo, imagen_url } = req.body;
    if (!nombre || !instructor) {
      return res.status(400).json({ error: 'Nombre e instructor son obligatorios' });
    }
    const clase = await Clase.create({
      nombre, descripcion, instructor,
      duracion_minutos: duracion_minutos || 60,
      aforo_maximo: aforo_maximo || 20,
      imagen_url: imagen_url || null
    });
    res.status(201).json({ mensaje: 'Clase creada correctamente', clase });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la clase' });
  }
};

const actualizarClase = async (req, res) => {
  try {
    const { id } = req.params;
    const clase = await Clase.findByPk(id);
    if (!clase) return res.status(404).json({ error: 'Clase no encontrada' });
    await clase.update(req.body);
    res.json({ mensaje: 'Clase actualizada correctamente', clase });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la clase' });
  }
};

const eliminarClase = async (req, res) => {
  try {
    const { id } = req.params;
    const clase = await Clase.findByPk(id);
    if (!clase) return res.status(404).json({ error: 'Clase no encontrada' });
    await clase.update({ activo: false });
    res.json({ mensaje: 'Clase eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la clase' });
  }
};

module.exports = { obtenerClases, obtenerClase, crearClase, actualizarClase, eliminarClase };