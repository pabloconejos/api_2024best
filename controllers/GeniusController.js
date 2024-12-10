
import { responseExample } from "../utils/responseExample.js";

export class GeniusController {
    constructor({ genius }) {
      this.genius = genius; // Dependencia inyectada
    }
  
    getSearch = async (req, res) => {
        const searchTerm = req.query.name; // Obtiene el valor del parámetro 'q' en la URL
        console.log(searchTerm)
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
        const searchTerm = req.query.name; // Obtiene el valor del parámetro 'q' en la URL
        console.log(searchTerm)
        try {
            const response = await this.genius.artist('378195');
            res.json(response);
        } catch (error) {
            console.error('Error fetching song data:', error);
            res.status(500).json({ error: 'Error fetching song data' });
        }
    }
  }
  