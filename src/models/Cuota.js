 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cuota = sequelize.define('Cuota', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  importe: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 30.00
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'pagada', 'vencida'),
    defaultValue: 'pendiente'
  },
  fecha_pago: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'cuotas',
  timestamps: true
});

module.exports = Cuota;