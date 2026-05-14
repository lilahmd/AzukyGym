 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const sequelize = require('./config/database');
require('./models/index');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
const claseRoutes = require('./routes/claseRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const cuotaRoutes = require('./routes/cuotaRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clases', claseRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/cuotas', cuotaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'AzukyGym API funcionando correctamente' });
});

// Conectar a la base de datos y arrancar el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a MySQL establecida correctamente');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con MySQL:', err);
  });