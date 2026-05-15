 
const express = require('express');
const router = express.Router();
const { solicitarReset, resetPassword } = require('../controllers/resetController');

router.post('/solicitar', solicitarReset);
router.post('/reset', resetPassword);

module.exports = router;