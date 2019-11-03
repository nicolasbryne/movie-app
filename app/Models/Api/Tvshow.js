const Tmdb = require('./Tmdb');

class Tvshow extends Tmdb {

    static async fetch(tmdb_id){
        const key = this.API_KEY
        const url = `${this.BASE_API_URL}/tv/${tmdb_id}?api_key=${key}&language=en-US`;
        const resp = await this.axios.get(url);
        return resp.data;
    }
}

module.exports = Tvshow;