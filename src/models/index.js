const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Clase = require('./Clase');
const Horario = require('./Horario');
const Reserva = require('./Reserva');
const Cuota = require('./Cuota');
const TokenReseteo = require('./TokenReseteo');

// Una clase tiene muchos horarios
Clase.hasMany(Horario, { foreignKey: 'clase_id' });
Horario.belongsTo(Clase, { foreignKey: 'clase_id' });

// Un usuario tiene muchas reservas
Usuario.hasMany(Reserva, { foreignKey: 'usuario_id' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un horario tiene muchas reservas
Horario.hasMany(Reserva, { foreignKey: 'horario_id' });
Reserva.belongsTo(Horario, { foreignKey: 'horario_id' });

// Un usuario tiene muchas cuotas
Usuario.hasMany(Cuota, { foreignKey: 'usuario_id' });
Cuota.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un usuario tiene muchos tokens de reseteo
Usuario.hasMany(TokenReseteo, { foreignKey: 'usuario_id' });
TokenReseteo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Sincronizar base de datos
sequelize.sync({ alter: true })
  .then(() => console.log('Tablas creadas y sincronizadas correctamente'))
  .catch(err => console.error('Error al sincronizar tablas:', err));

module.exports = {
  sequelize,
  Usuario,
  Clase,
  Horario,
  Reserva,
  Cuota,
  TokenReseteo
};