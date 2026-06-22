import express from 'express';
import 'dotenv/config';

import alunosRoutes from './routes/alunosRoute.js';
import arquivosRoutes from './routes/arquivosRoute.js';

import { apiKey } from './lib/middlewares/apiKey.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Rotas
app.use('/api/alunos', apiKey, alunosRoutes);
app.use('/api/alunos', apiKey, arquivosRoutes);

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
