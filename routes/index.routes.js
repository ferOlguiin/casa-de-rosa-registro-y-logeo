import { Router } from "express";
import { LogearUsuario } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    console.log("welcome to backend cdr")
})

router.post("/logearusuario", LogearUsuario);

export default router