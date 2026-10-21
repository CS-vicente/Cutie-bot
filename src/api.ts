import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as chatbot from './bot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/mensagem', async (req, res) => {
  try {
    const mensagemDoUsuario = req.body.texto;
    if (!mensagemDoUsuario) {
      return res.status(400).json({ resposta: "Digite uma mensagem válida!" });
    }

    const respostaDoBot = await chatbot.responderUsuario(mensagemDoUsuario);
    return res.json({ resposta: respostaDoBot });
  } catch (erro) {
    console.error("Erro na API:", erro);
    return res.status(500).json({ resposta: "Ops, ocorreu um erro interno." });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/inicio.html'));
});

app.get('/cardapio', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/cardapio.html'));
});

app.get('/lojas', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/lojas.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/conversa.html'));
});

app.listen(PORT, () => {
  console.log(`☕ StarRobux rodando em http://localhost:${PORT}`);
});