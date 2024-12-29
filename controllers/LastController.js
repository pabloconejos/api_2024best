import dotenv from 'dotenv';
dotenv.config();

export class LastFmController {

    helloWorld = (req, res) => {
        res.json({res: 'hello world'})
    }

    searchTrack = async (req, res) => {
        const searchTerm = req.query.name;
        const apiKey = process.env.APIKEY_LAST_FM
        const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=${apiKey}&format=json`
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            res.json(this.createObj(data))
        } catch (error) {
            console.error('Error fetching song data:', error.message);
            res.status(500).json({ error: 'Error fetching song data', ddd: apiKey });
        }
    };



    createObj(data) {
        let newArray = []
        const firstTen = data.results.albummatches.album.slice(0, 10);
        for (let album of firstTen) {
            newArray.push({
                artist: album.artist,
                title: album.name,
                url: album.image[3]['#text']
            })
        }

        return newArray
    }
    
}
