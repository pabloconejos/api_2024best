
import { getAlbumArt, getLyrics } from 'genius-lyrics-api';
import { AUTHTOKEN } from '../config.js'

export class GeniusController {
    constructor({ genius }) {
      this.genius = genius; // Dependencia inyectada
    }

    createOptions(title, artist) {
        return {
            apiKey: AUTHTOKEN,
            title: title,
            artist: artist,
            optimizeQuery: true
        };
    }
  
    getSearch = async (req, res) => {
        const searchTerm = req.query.name; // Obtiene el valor del parámetro 'q' en la URL
        try {
            // Realiza la búsqueda con el término de consulta
            const response = await this.genius.search(searchTerm);
            res.json(response);
        } catch (error) {
            console.error('Error fetching song data:', error);
            res.status(500).json({ error: 'Error fetching song data' });
        }
    };

    getSong = async (req, res) => {
        const {song} = req.query
        try {
            const response = await this.genius.song(song);
            res.json(response);
        } catch (error) {
            console.error('Error fetching song data:', error);
            res.status(500).json({ error: 'Error fetching song data' });
        }
    }

    getCover = async (req, res) => {
        const {artist, song} = req.query
        const options = this.createOptions(song, artist);
        
        try {
            const cover = await getAlbumArt(options);
            res.json({
                artist: options.artist,
                title: options.title,
                url: cover
            });
        } catch (error) {
            console.error('Error al buscar la cover:', error);
            res.status(500).json({ message: 'Hubo un error al buscar la cover' });
        }
    };

    getLyrics = async (req, res) => {
        const {artist, song} = req.query
        const options = this.createOptions(song, artist);
        
        try {
            const lyrics = await getLyrics(options);
            res.json({
                artist: options.artist,
                title: options.title,
                lyrics: lyrics
            });
        } catch (error) {
            console.error('Error al buscar la lyrics:', error);
            res.status(500).json({ message: 'Hubo un error al buscar la lyrics' });
        }
    }
}
  