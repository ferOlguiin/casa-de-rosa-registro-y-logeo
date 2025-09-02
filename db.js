import mongoose from "mongoose";
import { URI_MONGODB } from "./config.js";


mongoose.connect(URI_MONGODB);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error de conexión:"));

db.on("disconnected", function () {
  console.log("Desconectado de la base de datos");
  mongoose.connect(URI_MONGODB);
});

db.once("open", function () {
  console.log("Conectado a la base de datos");
});

export default mongoose;