 
const express = require('express');
const router = express.Router();
const { obtenerClases, obtenerClase, crearClase, actualizarClase, eliminarClase } = require('../controllers/claseController');
const { verificarToken } = require('../middleware/auth');

// Rutas públicas (sin login)
router.get('/', obtenerClases);
router.get('/:id', obtenerClase);

// Rutas privadas (solo admin)
router.post('/', verificarToken, crearClase);
router.put('/:id', verificarToken, actualizarClase);
router.delete('/:id', verificarToken, eliminarClase);

module.exports = router;