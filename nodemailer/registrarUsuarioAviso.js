import nodemailer from 'nodemailer'
import { EMAIL_OWNER, EMAIL_PASS } from "../config.js";

export const registrarUsuarioAviso = async (data) => {

    const message = {
        from: EMAIL_OWNER,
        to: data.email,
        subject: "Usuario generado correctamente en www.casaderosaonline.com.ar",
        html: `<!DOCTYPE html>
        <html lang="es">
              <head>
                <title>Usuario generado correctamente en www.casaderosaonline.com.ar</title>
              </head>
              <body style="display:flex; flex:direction:column; width:100%; align-items:center; justify-content:center">
                <header>
                  <img src="https://casaderosaonline.com.ar/assets/logo-hgI3Y4uD.png" style="margin-top:45px; margin-bottom:15px" alt="Casa De Rosa" width="250px">
                </header>
                <main>
                  
                    <h1>Datos de tu usuario</h1>
                    
                    <p style="font-size:15px"><strong>Email:</strong> ${data.email}</p>
                    <p style="font-size:15px"><strong>Contraseña:</strong> ${data.contrasena}</p>
                    <p style="font-size:15px; margin-top:15px"><strong>Descuento:</strong> Cada vez que ingreses a nuestra web con tu usuario y contraseña, podrás ver aplicado un descuento del ${data.descuento}% en cada uno de nuestros productos</p>

                    <p style="font-size:15px; margin-top:25px">Para acceder a tu cuenta, ingresa en <a href="https://casaderosaonline.com.ar"> casaderosaonline.com.ar</a> y luego inicia sesión clickeando el ícono de usuario.</p>

                </main>
              </body>
            </html>`
    };

    const config = {
        host: "smtp.hostinger.com",
        secure: true, 
        secureConnection: false,
        tls: {
          ciphers: "SSLv3",
        },
        requireTLS: true,
        port: 465,
        debug: true,
        connectionTimeout: 10000,
        auth : {
            user: EMAIL_OWNER,
            pass: EMAIL_PASS
        }
    };

    const transport = nodemailer.createTransport(config);
    const mailInfo = await transport.sendMail(message);

    if(mailInfo.messageId){
        return mailInfo;
    } else {
        return {message: "error"};
    }
}