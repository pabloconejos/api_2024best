import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

export const createApp = ({Genius, GeniusController}) => {
  const app = express();
  app.disable('x-powered-by');

  app.use(cors({
    origin: '*'
  }))

  // Inicializa la dependencia de Genius con la clave API
  const genius = new Genius(process.env.AUTHTOKEN);

  // Crea el controlador con la dependencia inyectada
  const geniusController = new GeniusController({ genius });

  // Define las rutas
  app.get('/', (req, res) => res.json({ okey: true }));
  app.get('/search', geniusController.getSearch);
  app.get('/song', geniusController.getSong);
  app.get('/lyrics', geniusController.getLyrics);
  app.get('/cover', geniusController.getCover);


  // Configuración del puerto
  const PORT = process.env.PORT ?? 1234;

  // Inicia el servidor
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  return app;
};
