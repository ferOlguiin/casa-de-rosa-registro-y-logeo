import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { comparePassword, encryptPassword } from "../bcrypt/bcrypt.js";
import {PRIVATE_KEY} from '../config.js'


//POST PETITION
export const RegistrarUsuario = async (req, res) => {
    try {
        const {email, password} = req.body;

        //chequeo que no exista otro mail
        const chequeoDeEmail = await User.findOne({email}).lean();
        if(chequeoDeEmail !== null){
            return res.status(400).send("Error hay un mail duplicado")
        }
            
        //encripto contraseña 
        const passwordEncrypted = await encryptPassword(password);
        
        //creo nuevo usuario
        const newUser = new User({email: email, password: passwordEncrypted});
        await newUser.save();

        return res.send(newUser);
        
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

        const accessToken = jwt.sign({ userId: user._id, email: user.email }, PRIVATE_KEY, { expiresIn: "3h" });
        const refreshToken = jwt.sign({ userId: user._id, email: user.email }, PRIVATE_KEY, { expiresIn: "72h" });

        //envio el refreshtoken en una cookie segura
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true, // solo HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });

        return res.send({
            user: {
                _id: user._id,
                email: user.email
            },
            accessToken
        });
    } catch (error) {
        return res.status(400).send("Algo salió mal, vuelve a logear")
    }
}


//GET PETITION
export const ActualizarToken = async (req, res) => {
    
    const { refreshToken } = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).send("Refresh token requerido");
    
    try {
        const payload = jwt.verify(refreshToken, PRIVATE_KEY);
        
        const user = await User.findById(payload.userId).lean();
        if (!user) return res.status(404).send("Usuario no encontrado");

        const newAccessToken = jwt.sign(
            { userId: user._id, email: user.email },
            PRIVATE_KEY,
            { expiresIn: "3h" }
        );
        return res.send({
            accessToken: newAccessToken,
            user: {
                _id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(403).send("Refresh token inválido o expirado");
    }

}