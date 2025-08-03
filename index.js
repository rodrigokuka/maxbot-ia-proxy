import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: req.body.messages,
    });

    res.status(200).json(completion.data);
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
