 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TokenReseteo = sequelize.define('TokenReseteo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  expira_en: {
    type: DataTypes.DATE,
    allowNull: false
  },
  usado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'tokens_reseteo',
  timestamps: false
});

module.exports = TokenReseteo;