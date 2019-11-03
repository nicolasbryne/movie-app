'use strict'
const Env = use('Env');
const axios = require('axios');
class Tmdb {

    static get BASE_API_URL(){
        return `https://api.themoviedb.org/3`;
    }
    static get API_KEY(){
        return Env.get('TMDB_KEY');
    }
    static get axios(){
        return axios;
    }

}

module.exports = Tmdb;