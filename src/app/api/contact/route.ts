import { NextResponse } from 'next/server';
import { EmailClient } from '@azure/communication-email';

// Configuración de Azure Communication Services
const connectionString = process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
const senderEmail = process.env.AZURE_SENDER_EMAIL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, asunto, mensaje } = body;

    // Validar campos requeridos
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Intentar enviar con Azure Email
    if (connectionString && senderEmail) {
      try {
        const emailClient = new EmailClient(connectionString);
        
        const emailMessage = {
          senderAddress: senderEmail,
          recipients: {
            to: [
              {
                address: 'alejandor@orbitalprime.com.co',
                displayName: 'Equipo Orbital Prime'
              }
            ],
            cc: [
              {
                address: email, // Copia al remitente
                displayName: nombre
              }
            ]
          },
          content: {
            subject: asunto || 'Nueva consulta desde el sitio web',
            plainText: `
Nueva consulta desde el formulario de contacto de Orbital Prime:

Nombre: ${nombre}
Email: ${email}
Asunto: ${asunto || 'Sin asunto'}

Mensaje:
${mensaje}

---
Este mensaje fue enviado desde el formulario de contacto de orbitalprime.com.co
Fecha: ${new Date().toLocaleString('es-CO')}
            `,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f8fafc; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0284c7; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #0ea5e9; margin: 15px 0; }
        .footer { background: #e2e8f0; padding: 15px; text-align: center; font-size: 12px; color: #64748b; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📬 Nuevo Contacto - Orbital Prime</h1>
    </div>
    <div class="content">
        <div class="field">
            <span class="label">👤 Nombre:</span> ${nombre}
        </div>
        <div class="field">
            <span class="label">📧 Email:</span> ${email}
        </div>
        <div class="field">
            <span class="label">📌 Asunto:</span> ${asunto || 'Sin asunto'}
        </div>
        <div class="message-box">
            <span class="label">💬 Mensaje:</span>
            <p>${mensaje.replace(/\n/g, '<br>')}</p>
        </div>
    </div>
    <div class="footer">
        <p>Enviado desde el formulario de contacto de orbitalprime.com.co</p>
        <p>Fecha: ${new Date().toLocaleString('es-CO')}</p>
    </div>
</body>
</html>
            `
          }
        };

        // Enviar email
        const poller = await emailClient.beginSend(emailMessage);
        
        // Esperar resultado
        const result = await poller.pollUntilDone();
        
        if (result.status === 'Succeeded') {
          return NextResponse.json({
            success: true,
            message: '✅ ¡Mensaje enviado exitosamente!',
            messageId: result.id,
            details: 'Hemos recibido tu consulta y nos pondremos en contacto contigo pronto.'
          });
        } else {
          throw new Error('Failed to send email');
        }

      } catch (azureError) {
        console.error('Error con Azure Email:', azureError);
        // Fallback a método anterior
        const emailContent = `
Nueva consulta desde el formulario de contacto de Orbital Prime:

Nombre: ${nombre}
Email: ${email}
Asunto: ${asunto || 'Sin asunto'}

Mensaje:
${mensaje}

---
Este mensaje fue enviado desde el formulario de contacto de orbitalprime.com.co
Fecha: ${new Date().toLocaleString('es-CO')}
        `.trim();

        const mailtoLink = `mailto:alejandor@orbitalprime.com.co?subject=${encodeURIComponent(asunto || 'Consulta desde la web')}&body=${encodeURIComponent(emailContent)}&cc=${encodeURIComponent(email)}`;
        
        return NextResponse.json({
          success: true,
          message: '📧 Cliente de correo abierto',
          fallback: true,
          mailtoLink: mailtoLink,
          details: 'Se ha preparado tu mensaje. Solo haz clic en enviar desde tu cliente de correo.'
        });
      }
    } else {
      // Fallback si no hay configuración de Azure
      const emailContent = `
Nueva consulta desde el formulario de contacto de Orbital Prime:

Nombre: ${nombre}
Email: ${email}
Asunto: ${asunto || 'Sin asunto'}

Mensaje:
${mensaje}

---
Este mensaje fue enviado desde el formulario de contacto de orbitalprime.com.co
Fecha: ${new Date().toLocaleString('es-CO')}
      `.trim();

      const mailtoLink = `mailto:alejandor@orbitalprime.com.co?subject=${encodeURIComponent(asunto || 'Consulta desde la web')}&body=${encodeURIComponent(emailContent)}&cc=${encodeURIComponent(email)}`;
      
      return NextResponse.json({
        success: true,
        message: '📧 Cliente de correo abierto',
        fallback: true,
        mailtoLink: mailtoLink,
        details: 'Se ha preparado tu mensaje. Solo haz clic en enviar desde tu cliente de correo.'
      });
    }

  } catch (error) {
    console.error('Error en API de contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}