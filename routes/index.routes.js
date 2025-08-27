import { Router } from "express";
import { ActualizarToken, DeslogearUsuario, LogearUsuario, RegistrarUsuario } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to backend cdr")
})

router.post("/login", LogearUsuario);
router.post("/register", RegistrarUsuario);
router.post("/refresh-token", ActualizarToken);
router.post("/logout", DeslogearUsuario);

export default router