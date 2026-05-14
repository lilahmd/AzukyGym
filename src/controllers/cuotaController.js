 
const { Cuota, Usuario } = require('../models/index');

const misCuotas = async (req, res) => {
  try {
    const cuotas = await Cuota.findAll({
      where: { usuario_id: req.usuario.id },
      order: [['anio', 'DESC'], ['mes', 'DESC']]
    });
    res.json(cuotas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cuotas' });
  }
};

const todasCuotas = async (req, res) => {
  try {
    const cuotas = await Cuota.findAll({
      include: [{ model: Usuario, attributes: ['id', 'nombre', 'email'] }],
      order: [['anio', 'DESC'], ['mes', 'DESC']]
    });
    res.json(cuotas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cuotas' });
  }
};

const crearCuota = async (req, res) => {
  try {
    const { usuario_id, mes, anio, importe } = req.body;
    if (!usuario_id || !mes || !anio) {
      return res.status(400).json({ error: 'Usuario, mes y año son obligatorios' });
    }

    const existe = await Cuota.findOne({ where: { usuario_id, mes, anio } });
    if (existe) {
      return res.status(400).json({ error: 'Ya existe una cuota para ese mes y usuario' });
    }

    const cuota = await Cuota.create({
      usuario_id,
      mes,
      anio,
      importe: importe || 30.00,
      estado: 'pendiente'
    });

    res.status(201).json({ mensaje: 'Cuota creada correctamente', cuota });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cuota' });
  }
};

const pagarCuota = async (req, res) => {
  try {
    const { id } = req.params;
    const cuota = await Cuota.findByPk(id);
    if (!cuota) return res.status(404).json({ error: 'Cuota no encontrada' });

    await cuota.update({
      estado: 'pagada',
      fecha_pago: new Date()
    });

    res.json({ mensaje: 'Cuota marcada como pagada', cuota });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cuota' });
  }
};

const generarCuotasMensuales = async (req, res) => {
  try {
    const { mes, anio, importe } = req.body;
    if (!mes || !anio) {
      return res.status(400).json({ error: 'Mes y año son obligatorios' });
    }

    const socios = await Usuario.findAll({
      where: { tipo: 'socio', activo: true }
    });

    let creadas = 0;
    for (const socio of socios) {
      const existe = await Cuota.findOne({
        where: { usuario_id: socio.id, mes, anio }
      });
      if (!existe) {
        await Cuota.create({
          usuario_id: socio.id,
          mes,
          anio,
          importe: importe || 30.00,
          estado: 'pendiente'
        });
        creadas++;
      }
    }

    res.json({ mensaje: `${creadas} cuotas generadas correctamente` });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar cuotas' });
  }
};

module.exports = { misCuotas, todasCuotas, crearCuota, pagarCuota, generarCuotasMensuales };