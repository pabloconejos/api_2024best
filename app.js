import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

export const createApp = ({Genius, GeniusController, LastFmController}) => {
  const app = express();
  app.disable('x-powered-by');

  app.use(cors({
    origin: '*'
  }))

  const token = process.env.AUTHTOKEN
  const genius = new Genius(token);

  // Crea el controlador con la dependencia inyectada
  const geniusController = new GeniusController({ genius });
  const lastFmController = new LastFmController()

  // Define las rutas
  app.get('/', (req, res) => res.json({ okey: true }));
  app.get('/search', geniusController.getSearch);
  app.get('/song', geniusController.getSong);
  app.get('/lyrics', geniusController.getLyrics);
  app.get('/cover', geniusController.getCover);
  app.get('/last', lastFmController.searchTrack);
  app.get('/hello', lastFmController.helloWorld);


  // Configuración del puerto
  const PORT = process.env.PORT ?? 1234;

  // Inicia el servidor
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  return app;
};
