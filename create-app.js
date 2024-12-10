import { createApp } from './app.js'
import Genius from 'genius-api';
import { GeniusController } from './controllers/GeniusController.js'

createApp({Genius, GeniusController})