const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const enviarBienvenida = async (nombre, email) => {
  try {
    await resend.emails.send({
      from: 'AzukyGym <onboarding@resend.dev>',
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
              <li>Seguimiento de tu actividad</li>
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

module.exports = { enviarBienvenida };