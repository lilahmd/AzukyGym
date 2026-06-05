require('dotenv').config();
const { sequelize } = require('../src/models/index');
const { QueryTypes } = require('sequelize');

async function run() {
  await sequelize.authenticate();

  // Dejar solo la clase con id más bajo de cada nombre
  await sequelize.query(`
    DELETE FROM clases 
    WHERE id NOT IN (
      SELECT MIN(id) FROM clases GROUP BY nombre
    )
  `, { type: QueryTypes.DELETE });

  console.log('Duplicados eliminados');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });