 
const express = require('express');
const router = express.Router();
const { obtenerSocios, toggleSocio, resumenAdmin } = require('../controllers/adminController');
const { verificarToken } = require('../middleware/auth');

router.get('/resumen', verificarToken, resumenAdmin);
router.get('/socios', verificarToken, obtenerSocios);
router.put('/socios/:id/toggle', verificarToken, toggleSocio);

module.exports = router;