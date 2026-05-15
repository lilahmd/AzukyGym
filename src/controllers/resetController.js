 
const crypto = require('crypto');
const { Usuario, TokenReseteo } = require('../models/index');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const bcrypt = require('bcrypt');

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

    await resend.emails.send({
      from: 'AzukyGym <onboarding@resend.dev>',
      to: email,
      subject: 'Restablecer contraseña – AzukyGym',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0a0a0a; padding: 30px; text-align: center;">
            <img src="https://azuky-gym.vercel.app/logo_azuky_sin_fondo.png" alt="AzukyGym" style="width: 100px; height: 100px;" />
            <h1 style="color: #e94560; margin: 10px 0 0 0;">AzukyGym</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>Hola ${usuario.nombre} 👋</h2>
            <p>Has solicitado restablecer tu contraseña. Pulsa el botón para crear una nueva:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${enlace}" style="background-color: #e94560; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Restablecer contraseña
              </a>
            </div>
            <p style="color: #666; font-size: 13px;">Este enlace caduca en 1 hora. Si no has solicitado el cambio ignora este email.</p>
          </div>
        </div>
      `
    });

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