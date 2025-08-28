import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const URI_MONGODB = process.env.URI_MONGODB;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const EMAIL_OWNER = process.env.EMAIL_OWNER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const EMAIL_ADMINISTRACION = process.env.EMAIL_ADMINISTRACION;