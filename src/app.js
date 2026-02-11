import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';
import helmet from 'helmet';


const app = express();

app.use(express.json());
app.use(cors());

// Configuração CSP personalizada
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "https://www.gstatic.com"],
    connectSrc: ["'self'", "http://127.0.0.1:3000"],
    // Adicione outros conforme necessário
  }
}));


// Rotas
app.use('/api', routes);
app.use(errorMiddleware);

export default app;