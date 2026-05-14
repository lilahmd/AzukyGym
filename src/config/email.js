 
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
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
          <div style="background-color: #1a1a2e; padding: 30px; text-align: center;">
            <h1 style="color: #e94560; margin: 0;">AzukyGym</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>¡Hola ${nombre}! 👋</h2>
            <p>Bienvenido a <strong>AzukyGym</strong>. Tu cuenta ha sido creada correctamente.</p>
            <p>Ya puedes acceder a todos nuestros servicios:</p>
            <ul>
              <li>Reserva de clases</li>
              <li>Control de tu cuota mensual</li>
              <li>Seguimiento de tu actividad</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:3000" 
                 style="background-color: #e94560; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;">
                Acceder a AzukyGym
              </a>
            </div>
            <p style="color: #666; font-size: 12px;">
              Si no has creado esta cuenta, ignora este email.
            </p>
          </div>
          <div style="background-color: #1a1a2e; padding: 15px; text-align: center;">
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

module.exports = { enviarBienvenida };