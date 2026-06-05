require('dotenv').config();
const { sequelize, Usuario } = require('../src/models/index');
const bcrypt = require('bcrypt');

async function run() {
  await sequelize.authenticate();
  const passHash = await bcrypt.hash('123456', 10);
  
  const [r1] = await sequelize.query(
    `INSERT IGNORE INTO usuarios (nombre, email, password, telefono, tipo, activo, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'profesor', 1, NOW(), NOW())`,
    { replacements: ['María López', 'maria@azukygym.com', passHash, '+34600000004'] }
  );
  console.log('María insertada');

  const [r2] = await sequelize.query(
    `INSERT IGNORE INTO usuarios (nombre, email, password, telefono, tipo, activo, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'profesor', 1, NOW(), NOW())`,
    { replacements: ['Pedro Ruiz', 'pedro@azukygym.com', passHash, '+34600000005'] }
  );
  console.log('Pedro insertado');

  console.log('¡Hecho!');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });