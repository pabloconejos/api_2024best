import { createApp } from './app.js'
import Genius from 'genius-api';
import { GeniusController } from './controllers/GeniusController.js'
import { LastFmController } from './controllers/LastController.js';

createApp({Genius, GeniusController, LastFmController})