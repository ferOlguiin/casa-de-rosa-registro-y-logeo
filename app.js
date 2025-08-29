import express from 'express'
import cors from 'cors'
import router from './routes/index.routes.js'
import cookieParser from 'cookie-parser';

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: ["https://www.casaderosaonline.com.ar", "https://casaderosaonline.com.ar", "https://*.casaderosaonline.com.ar",], credentials: true, exposedHeaders: ["set-cookie"]}));
  
app.use(router);


export default app
