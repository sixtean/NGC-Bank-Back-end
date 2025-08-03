import { Connection } from './database/database';
import express from 'express';
import cors from 'cors';
import login from './routes/login';

const app = express();

app.use(cors({
    credentials: true
}));

app.use(express.json());

app.use('/user', login);

const PORT = 5000;

Connection.initialize()
    .then(() => {
        console.log('🟢 Banco de dados conectado com sucesso!');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('🔴 Erro ao se conectar no banco: ', error)
    });