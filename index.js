import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/gpt4', async (req, res) => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: req.body.messages,
    });
    res.json(completion.data);
  } catch (error) {
    console.error('Erro ao conectar com a API da OpenAI:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));