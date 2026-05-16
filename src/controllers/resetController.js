const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Usuario, TokenReseteo } = require('../models/index');
const { enviarResetPassword } = require('../config/email');

const solicitarReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'El email es obligatorio' });

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.json({ mensaje: 'Si el email existe recibirás un correo con las instrucciones' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expira_en = new Date(Date.now() + 60 * 60 * 1000);

    await TokenReseteo.create({
      usuario_id: usuario.id,
      token,
      expira_en,
      usado: false
    });

    const enlace = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await enviarResetPassword(usuario.nombre, email, enlace);

    res.json({ mensaje: 'Si el email existe recibirás un correo con las instrucciones' });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: 'Token y contraseña son obligatorios' });
    }

    const tokenReseteo = await TokenReseteo.findOne({
      where: { token, usado: false }
    });

    if (!tokenReseteo) {
      return res.status(400).json({ error: 'Token inválido o ya utilizado' });
    }

    if (new Date() > new Date(tokenReseteo.expira_en)) {
      return res.status(400).json({ error: 'El enlace ha caducado. Solicita uno nuevo.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await Usuario.update({ password: passwordHash }, { where: { id: tokenReseteo.usuario_id } });
    await tokenReseteo.update({ usado: true });

    res.json({ mensaje: 'Contraseña restablecida correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
};

module.exports = { solicitarReset, resetPassword };