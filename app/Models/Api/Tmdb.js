'use strict'
const Env = use('Env');
class Tmdb {

    static get BASE_API_URL(){
        return `https://api.themoviedb.org/3`;
    }
    static get API_KEY(){
        return Env.get('TMDB_KEY');
    }

}

module.exports = Tmdb;