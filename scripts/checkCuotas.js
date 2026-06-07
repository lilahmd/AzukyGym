require('dotenv').config();
const { sequelize, Usuario, Cuota } = require('../src/models/index');

async function run() {
  await sequelize.authenticate();
  
  const mesActual = new Date().getMonth() + 1;
  const anioActual = new Date().getFullYear();
  
  console.log('Mes actual:', mesActual, 'Año:', anioActual);
  
  const cuotas = await Cuota.findAll();
  console.log('TODAS LAS CUOTAS:', JSON.stringify(cuotas, null, 2));
  
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });