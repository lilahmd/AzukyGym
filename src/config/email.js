const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const enviarBienvenida = async (nombre, email) => {
  try {
    await transporter.sendMail({
      from: `"AzukyGym" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Bienvenido a AzukyGym! 💪',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0a0a0a; padding: 30px; text-align: center;">
            <img src="https://azuky-gym.vercel.app/logo_azuky_sin_fondo.png" alt="AzukyGym" style="width: 150px; height: 150px; object-fit: contain;" />
            <h1 style="color: #e94560; margin: 10px 0 0 0;">AzukyGym</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>¡Hola ${nombre}! 👋</h2>
            <p>Bienvenido a <strong>AzukyGym</strong>. Tu cuenta ha sido creada correctamente.</p>
            <p>Ya puedes acceder a todos nuestros servicios:</p>
            <ul>
              <li>Reserva de clases dirigidas</li>
              <li>Control de tu cuota mensual</li>
              <li>Rutinas y planes de dieta personalizados</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://azuky-gym.vercel.app" 
                 style="background-color: #e94560; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;">
                Acceder a AzukyGym
              </a>
            </div>
          </div>
          <div style="background-color: #0a0a0a; padding: 15px; text-align: center;">
            <p style="color: #666; margin: 0; font-size: 12px;">
              © 2025 AzukyGym. Todos los derechos reservados.
            </p>
          </div>
        </div>
      `
    });
    console.log(`Email de bienvenida enviado a ${email}`);
  } catch (error) {
    console.error('Error al enviar email:', error.message);
  }
};

const enviarResetPassword = async (nombre, email, enlace) => {
  try {
    await transporter.sendMail({
      from: `"AzukyGym" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Restablecer contraseña – AzukyGym',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0a0a0a; padding: 30px; text-align: center;">
            <img src="https://azuky-gym.vercel.app/logo_azuky_sin_fondo.png" alt="AzukyGym" style="width: 100px; height: 100px;" />
            <h1 style="color: #e94560; margin: 10px 0 0 0;">AzukyGym</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>Hola ${nombre} 👋</h2>
            <p>Has solicitado restablecer tu contraseña. Pulsa el botón para crear una nueva:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${enlace}" style="background-color: #e94560; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Restablecer contraseña
              </a>
            </div>
            <p style="color: #666; font-size: 13px;">Este enlace caduca en 1 hora.</p>
          </div>
        </div>
      `
    });
    console.log(`Email de reset enviado a ${email}`);
  } catch (error) {
    console.error('Error al enviar email reset:', error.message);
  }
};

module.exports = { enviarBienvenida, enviarResetPassword };