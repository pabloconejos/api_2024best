
import { responseExample } from "../utils/responseExample.js";
import { AUTHTOKEN } from '../config.js'
import { getLyrics, getAlbumArt } from 'genius-lyrics-api';

export class GeniusController {
    constructor({ genius }) {
      this.genius = genius; // Dependencia inyectada
    }
  
    getSearch = async (req, res) => {
        res.json(true)
    };

    getSong = async (req, res) => {
        const options = {
            apiKey: AUTHTOKEN,
            title: 'Buenas noches',
            artist: 'quevedo',
            optimizeQuery: true
        };
        
        //getLyrics(options).then((lyrics) => console.log(lyrics));
        getAlbumArt(options).then((lyrics) => console.log(lyrics));
        res.json(true)
    }
  }
  