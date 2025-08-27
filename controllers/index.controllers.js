import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { comparePassword, encryptPassword } from "../bcrypt/bcrypt.js";
import {PRIVATE_KEY} from '../config.js'
import crypto from 'crypto'


//POST PETITION
export const RegistrarUsuario = async (req, res) => {
    try {
        const {email} = req.body;
        const contraseñaAutogenerada = crypto.randomBytes(8).toString('base64');
        let descuentoParaClientes = 15;

        //chequeo que no exista otro mail
        const chequeoDeEmail = await User.findOne({email}).lean();
        if(chequeoDeEmail !== null){
            return res.status(400).send("Error hay un mail duplicado")
        }
            
        //encripto contraseña 
        const passwordEncrypted = await encryptPassword(contraseñaAutogenerada);
        
        //creo nuevo usuario
        const newUser = new User({email: email, password: passwordEncrypted, descuento: descuentoParaClientes});
        await newUser.save();

        return res.send({_id: newUser._id, email: newUser.email, descuento: newUser.descuento});
        
    } catch (error) {
        return res.status(400).send("Algo salió mal que no pudo completarse el proceso de registro del usuario");
    }
}

//POST PETITION
export const LogearUsuario = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Credenciales inválidas");
        }
        
        const confirmation = await comparePassword(password, user.password);
        if (!confirmation) {
            return res.status(400).send("Credenciales inválidas");
        }

        const accessToken = jwt.sign({ userId: user._id }, PRIVATE_KEY, { expiresIn: "3h" });
        const refreshToken = jwt.sign({ userId: user._id }, PRIVATE_KEY, { expiresIn: "7d" });

        //envio el refreshtoken en una cookie segura
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, //PONER EN TRUE CUANDO VAYA A PRODUCCIÓN
            secure: true, // solo HTTPS PONER EN TRUE CUANDO VAYA A PRODUCCIÓN
            sameSite: "sameSite", //PONER EN sameSite EN PRODUCCION
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });

        return res.send({
            user: {
                _id: user._id,
                email: user.email,
                descuento: user.descuento
            },
            accessToken
        });
    } catch (error) {
        return res.status(400).send("Algo salió mal, vuelve a logear")
    }
}


//POST PETITION
export const ActualizarToken = async (req, res) => {

    console.log(req.cookies.refreshToken);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).send("Refresh token requerido");
    
    try {
        const payload = jwt.verify(refreshToken, PRIVATE_KEY);
        
        const user = await User.findById(payload.userId).lean();
        if (!user) return res.status(404).send("Usuario no encontrado");

        const newAccessToken = jwt.sign(
            { userId: user._id },
            PRIVATE_KEY,
            { expiresIn: "3h" }
        );
        return res.send({
            accessToken: newAccessToken,
            user: {
                _id: user._id,
                email: user.email,
                descuento: user.descuento
            }
        });
    } catch (error) {
        return res.status(403).send("Refresh token inválido o expirado");
    }

}

//POST PETITION
export const DeslogearUsuario = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true, //PONER EN TRUE PARA DESARROLLO
        sameSite: "strict"
    });
    return res.send({ message: "Sesión cerrada correctamente" });
}