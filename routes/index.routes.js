import { Router } from "express";
import { ActualizarToken, DeslogearUsuario, enviarPedido, LogearUsuario, RegistrarUsuario } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to backend cdr")
})

router.post("/login", LogearUsuario);
router.post("/register", RegistrarUsuario);
router.post("/refresh-token", ActualizarToken);
router.post("/logout", DeslogearUsuario);
router.post("/send-order", enviarPedido)

export default router