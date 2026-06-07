const { Usuario, Reserva, Cuota, Clase, Horario } = require('../models/index');

const obtenerSocios = async (req, res) => {
  try {
    const mesActual = new Date().getMonth() + 1;
    const anioActual = new Date().getFullYear();

    const socios = await Usuario.findAll({
      where: { tipo: 'socio' },
      attributes: ['id', 'nombre', 'email', 'telefono', 'activo', 'createdAt'],
      include: [{
        model: Cuota,
        where: { mes: mesActual, anio: anioActual },
        required: false
      }],
      order: [['createdAt', 'DESC']]
    });

    // Añadir campo cuotaMes directamente en cada socio
    const resultado = socios.map(s => {
      const socioJson = s.toJSON();
      const cuota = socioJson.Cuota || (socioJson.Cuotas && socioJson.Cuotas[0]) || null;
      return { ...socioJson, cuotaMesActual: cuota };
    });

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener socios' });
  }
};

const toggleSocio = async (req, res) => {
  try {
    const { id } = req.params;
    const socio = await Usuario.findByPk(id);
    if (!socio) return res.status(404).json({ error: 'Socio no encontrado' });

    await socio.update({ activo: !socio.activo });
    const estado = socio.activo ? 'activado' : 'desactivado';
    res.json({ mensaje: `Socio ${estado} correctamente` });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el socio' });
  }
};

const resumenAdmin = async (req, res) => {
  try {
    const totalSocios = await Usuario.count({ where: { tipo: 'socio', activo: true } });
    const totalClases = await Clase.count({ where: { activo: true } });
    const cuotasPendientes = await Cuota.count({ where: { estado: 'pendiente' } });
    const reservasHoy = await Reserva.count({
      where: {
        fecha: new Date().toISOString().split('T')[0],
        estado: 'confirmada'
      }
    });

    res.json({
      totalSocios,
      totalClases,
      cuotasPendientes,
      reservasHoy
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener resumen' });
  }
};

const obtenerMisClases = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const profesor = await Usuario.findByPk(usuarioId, {
      attributes: ['nombre']
    });

    if (!profesor) return res.status(404).json({ error: 'Profesor no encontrado' });

    const clases = await Clase.findAll({
      where: { instructor: profesor.nombre, activo: true },
      include: [{
        model: Horario,
        where: { activo: true },
        required: false,
        include: [{
          model: Reserva,
          where: { estado: 'confirmada' },
          required: false,
          include: [{ model: Usuario, attributes: ['id', 'nombre', 'email'] }]
        }]
      }]
    });

    res.json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener clases del profesor' });
  }
};

module.exports = { obtenerSocios, toggleSocio, resumenAdmin, obtenerMisClases };