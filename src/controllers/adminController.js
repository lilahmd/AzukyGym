 
const { Usuario, Reserva, Cuota, Clase, Horario } = require('../models/index');

const obtenerSocios = async (req, res) => {
  try {
    const socios = await Usuario.findAll({
      where: { tipo: 'socio' },
      attributes: ['id', 'nombre', 'email', 'telefono', 'activo', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    res.json(socios);
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

module.exports = { obtenerSocios, toggleSocio, resumenAdmin };