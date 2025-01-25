import express from 'express';
import cors from 'cors';
import { configureDependencies } from '../infrastructure/utils/config';
import { connectDB } from '../infrastructure/database/connection';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();
connectDB();
app.use(express.json());

const corsOptions = {
  origin: "https://projeto-final-fab-pretalab.vercel.app",
  //origin: 'http://localhost:5174',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const { despesaController, chatController } = configureDependencies();

app.post('/despesas', (req, res) => despesaController.create(req, res));
app.get('/despesas/:userId', (req, res) => despesaController.getById(req, res));
app.get('/despesas', (req, res) => despesaController.getAll(req, res));
app.patch('/despesas/:id', (req, res) => despesaController.update(req, res));
app.delete('/despesas/:id', (req, res) => despesaController.delete(req, res));
app.post('/chat', (req, res) => chatController.open(req, res));

if (require.main === module) {
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
