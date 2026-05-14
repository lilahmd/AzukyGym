 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Clase = sequelize.define('Clase', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  instructor: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  duracion_minutos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60
  },
  aforo_maximo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20
  },
  imagen_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'clases',
  timestamps: false
});

module.exports = Clase;