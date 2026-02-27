import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';
import helmet from 'helmet';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS oficial (lib chamada corretamente)
app.use(cors());

app.use(helmet());

app.use('/api', routes);

app.use(errorMiddleware);

export default app;
