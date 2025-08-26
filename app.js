import express from 'express'
import cors from 'cors'
import router from './routes/index.routes.js'

const app = express();


//middlewares
app.use(express.json());
// app.use(cors({origin: ["https://www.casaderosaonline.com.ar", "https://casaderosaonline.com.ar"]}));
  
app.use(router);


export default app
