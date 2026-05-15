const { Reserva, Horario, Clase, Usuario } = require('../models/index');


const misReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: { usuario_id: req.usuario.id },
      include: [{
        model: Horario,
        include: [{ model: Clase }]
      }],
      order: [['fecha', 'DESC']]
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

const crearReserva = async (req, res) => {
  try {
    const { horario_id, fecha } = req.body;
    if (!horario_id || !fecha) {
      return res.status(400).json({ error: 'Horario y fecha son obligatorios' });
    }

    // Comprobar que la fecha no es más de 7 días en el futuro
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaReserva = new Date(fecha);
    fechaReserva.setHours(0, 0, 0, 0);
    const diffDias = (fechaReserva - hoy) / (1000 * 60 * 60 * 24);

    if (diffDias < 0) {
      return res.status(400).json({ error: 'No puedes reservar para una fecha pasada' });
    }
    if (diffDias > 7) {
      return res.status(400).json({ error: 'Solo puedes reservar con un máximo de 7 días de antelación' });
    }

    const horario = await Horario.findByPk(horario_id, {
      include: [{ model: Clase }]
    });
    if (!horario) return res.status(404).json({ error: 'Horario no encontrado' });

    if (horario.plazas_ocupadas >= horario.aforo_maximo) {
      return res.status(400).json({ error: 'No hay plazas disponibles en este horario' });
    }

    // Comprobar que no tiene ya una reserva en el mismo horario y fecha
    const reservaExiste = await Reserva.findOne({
      where: { usuario_id: req.usuario.id, horario_id, fecha, estado: 'confirmada' }
    });
    if (reservaExiste) {
      return res.status(400).json({ error: 'Ya tienes una reserva en esta clase y fecha' });
    }

    // Comprobar que no tiene otra clase a la misma hora ese día
    const reservasMismoDia = await Reserva.findAll({
      where: { usuario_id: req.usuario.id, fecha, estado: 'confirmada' },
      include: [{ model: Horario }]
    });

    const horarioNuevo = horario;
    for (const r of reservasMismoDia) {
      const h = r.Horario;
      if (h && h.hora_inicio === horarioNuevo.hora_inicio) {
        return res.status(400).json({ error: 'Ya tienes una clase reservada a esa misma hora' });
      }
    }

    // Comprobar límite de 4 clases al día
    if (reservasMismoDia.length >= 4) {
      return res.status(400).json({ error: 'No puedes reservar más de 4 clases en el mismo día' });
    }

    const reserva = await Reserva.create({
      usuario_id: req.usuario.id,
      horario_id,
      fecha,
      estado: 'confirmada'
    });

    await horario.update({ plazas_ocupadas: horario.plazas_ocupadas + 1 });

    res.status(201).json({ mensaje: 'Reserva realizada correctamente', reserva });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

const cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findOne({
      where: { id, usuario_id: req.usuario.id }
    });

    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    if (reserva.estado === 'cancelada') {
      return res.status(400).json({ error: 'La reserva ya está cancelada' });
    }

    await reserva.update({ estado: 'cancelada' });

    const horario = await Horario.findByPk(reserva.horario_id);
    if (horario && horario.plazas_ocupadas > 0) {
      await horario.update({ plazas_ocupadas: horario.plazas_ocupadas - 1 });
    }

    res.json({ mensaje: 'Reserva cancelada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar la reserva' });
  }
};

const todasReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: Usuario, attributes: ['id', 'nombre', 'email'] },
        { model: Horario, include: [{ model: Clase }] }
      ],
      order: [['fecha', 'DESC']]
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

module.exports = { misReservas, crearReserva, cancelarReserva, todasReservas };