const express = require('express');
const router = express.Router();
const { misReservas, crearReserva, cancelarReserva, todasReservas } = require('../controllers/reservaController');
const { verificarToken } = require('../middleware/auth');

router.get('/mis-reservas', verificarToken, misReservas);
router.post('/', verificarToken, crearReserva);
router.put('/:id/cancelar', verificarToken, cancelarReserva);
router.get('/todas', verificarToken, todasReservas);

module.exports = router;