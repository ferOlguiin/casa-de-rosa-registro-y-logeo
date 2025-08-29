import nodemailer from 'nodemailer'
import { EMAIL_OWNER, EMAIL_PASS, EMAIL_ADMINISTRACION } from "../config.js";

export const administracionCasaDeRosaAviso = async (info) => {

    let productos = info.productos_pedidos;
    const message = {
        from: EMAIL_OWNER,
        to: EMAIL_ADMINISTRACION,
        subject: "Datos de un nuevo pedido en Casa de Rosa",
        html: `<!DOCTYPE html>
        <html lang="es">
              <head>
                <title>Datos de un nuevo pedido en Casa de Rosa</title>
              </head>
              <body style="margin-bottom:20px; margin-top:20px; padding-top:20px; padding-bottom:20px">
                <header>
                  <img src="https://casaderosaonline.com.ar/assets/logo-hgI3Y4uD.png" style="margin-top:45px; margin-bottom:15px" alt="Casa De Rosa" width="250px">
                </header>
                <main>
                  <h1>Detalles del pedido</h1>
                  <p style="font-size:15px"><strong>Nombre:</strong> ${info.nombre}</p>
                  <p style="font-size:15px"><strong>Razón social:</strong> ${info.razon_social}</p>
                  <p style="font-size:15px"><strong>Email:</strong> ${info.mail}</p>
                  <p style="font-size:15px"><strong>Teléfono:</strong> ${info.telefono}</p>
                  <p style="font-size:15px"><strong>DNI:</strong> ${info.dni}</p>
                  <p style="font-size:15px"><strong>Dirección de envío:</strong> ${info.direccion_de_entrega}</p>
                  <p style="font-size:15px"><strong>Horario de entrega seleccionado:</strong> ${info.horario_de_entrega}</p>
                  <p style="font-size:15px"><strong>Método de pago seleccionado:</strong> ${info.metodo_de_pago}</p>
                  <p style="font-size:15px"><strong>Vendedor elegido:</strong> ${info.vendedor_seleccionado}</p>
                  <p style="font-size:15px"><strong>Precio Total del pedido:</strong> $${(info.precio_total).toLocaleString()}</p>
                  <p style="margin-top:45px; font-size:15px; text-decoration:underline"><strong>PRODUCTOS SOLICITADOS:</strong></p>
                  ${productos.map((item) => `<ul>
                      <li style="font-size:14px"><strong>Nombre del producto: </strong>${item.nombre}</li>
                      <li style="font-size:14px"><strong>Cantidad comprada: </strong>${item.cantidad}</li>
                      <li style="font-size:14px"><strong>Precio total de este producto: </strong>$${(item.cantidad * item.punit).toLocaleString()}</li>
                    </ul>`)}
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