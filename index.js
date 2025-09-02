import app from "./app.js";
import { PORT } from "./config.js";
import mongoose from './db.js'

mongoose.connection.on("open", function () {
  console.log("La base de datos está conectada");
});

app.listen(PORT, console.log("Servidor listo y funcionando en el puerto"));