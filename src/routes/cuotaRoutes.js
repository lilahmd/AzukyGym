 
const express = require('express');
const router = express.Router();
const { misCuotas, todasCuotas, crearCuota, pagarCuota, generarCuotasMensuales } = require('../controllers/cuotaController');
const { verificarToken } = require('../middleware/auth');

router.get('/mis-cuotas', verificarToken, misCuotas);
router.get('/todas', verificarToken, todasCuotas);
router.post('/', verificarToken, crearCuota);
router.put('/:id/pagar', verificarToken, pagarCuota);
router.post('/generar-mensuales', verificarToken, generarCuotasMensuales);

module.exports = router;