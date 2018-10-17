const axios = require('axios');
const Tmdb = require('./Tmdb');

class Movie extends Tmdb {

    static async fetch(tmdb_id){
        const key = this.API_KEY
        const url = `${this.BASE_API_URL}/movie/${tmdb_id}?api_key=${key}&language=en-US`;
        const resp = await axios.get(url);
        return resp.data;
    }
}

module.exports = Movie;