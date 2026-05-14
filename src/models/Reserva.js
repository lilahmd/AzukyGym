 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estado: {
    type: DataTypes.ENUM('confirmada', 'cancelada', 'asistida'),
    defaultValue: 'confirmada'
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'reservas',
  timestamps: true
});

module.exports = Reserva;