<template>
  <form ref="form" @submit.prevent id="movie" class="tab-pane login100-form validate-form pb-5 active show">
    <input type="hidden" :value=type name="type_id">
    <div class="row mt-0">
      <div :class="type===2 ? 'col-7' : 'col-12'">
        <div class="wrap-input100 validate-input m-b-26 mr-4" v-on-clickaway="hideSearch">
          <span class="label-input100">{{ type===1 ? 'Movie Title' : 'Series Title' }}</span>
          <input autocomplete="off" id="movie_title" @focus="searchShow=true" @keydown.enter.prevent="fetchTmdb($event)" v-model="searchTerm" class="form-control input100 text-light"
            type="text" name="title" :placeholder="type === 1 ? 'Enter movie title' : 'Enter series title'" required>
          <span class="focus-input100"></span>
          <div class="valid-feedback pb-1">Finished</div>
          <div class="invalid-feedback pb-1">Movie title is required</div>
          <search v-if="searchShow" v-bind:loading="searchLoading" v-bind:term="searchTerm" v-bind:results="searchResult" v-on:setTmdb="setTmdb"></search>
        </div>
      </div>
      <div class="col-3 offset-2" v-if="type===2">
        <div class="wrap-input100 validate-input m-b-26">
          <span class="label-input100">Episode No</span>
          <input class="form-control input100 text-light" type="number" name="episode" placeholder="Enter episode no" required>
          <span class="focus-input100"></span>
          <div class="valid-feedback pb-1">Finished</div>
          <div class="invalid-feedback pb-1">Episode number is required</div>
        </div>
      </div>
    </div>

    <div class="row mt-0 mr-0">
      <div class="col">
        <div class="wrap-input100 validate-input m-b-18">
          <span class="label-input100">Tmdb ID</span>
          <input :readonly="tmdb_id_lock ? true : false" class="form-control input100 text-light" type="number" name="tmdb_id" placeholder="Enter tmdb Id"
            required v-model="tmdb_id">
          <span class="focus-input100"></span>
        </div>
      </div>
      <div class="col-1 d-flex align-items-center justify-content-center mb-3">
        <a @click="tmdb_id_lock=!tmdb_id_lock" class="btn lock-btn text-warning" :class="tmdb_id_lock ? 'text-trans' : ''">
          <i class="fa fa-lock"></i>
        </a>
      </div>
    </div>

    <div class="wrap-input100 validate-input m-b-18">
      <span class="label-input100">File location</span>
      <input class="form-control input100 text-light" type="text" name="drive" placeholder="Enter drive url" required>
      <span class="focus-input100"></span>
      <div class="valid-feedback pb-1">Finished</div>
      <div class="invalid-feedback pb-1">Google Drive URL is required</div>
    </div>

    <div class="wrap-input100 validate-input m-b-18">
      <span class="label-input100">Size</span>
      <input class="form-control input100 text-light" type="text" name="size" placeholder="Enter file size">
      <span class="focus-input100"></span>
    </div>

    <div class="wrap-input100 validate-input m-b-18">
      <span class="label-input100">Encoded by</span>
      <input class="form-control input100 text-light" type="text" name="encoded_by" placeholder="Enter encoder name">
      <span class="focus-input100"></span>
    </div>


    <div class="wrap-input100 validate-input m-b-18 border-bottom-0">
      <span class="label-input100">Resolution</span>
      <select class="form-control rounded-0" name="resolution">
        <option>1080p</option>
        <option>720p</option>
        <option>480p</option>
      </select>
    </div>

    <div class="wrap-input100 validate-input m-b-18 border-bottom-0">
      <span class="label-input100">Audio</span>
      <select class="form-control rounded-0" name="audio_channels">
        <option value="2.1">2.1 Channels</option>
        <option value="5.1">5.1 Channels</option>
        <option value="7.1">7.1 Channels</option>
      </select>
    </div>


    <div class="wrap-input100 validate-input m-b-18 border-bottom-0">
      <span class="label-input100">Subtitle</span>
      <select class="form-control rounded-0" name="subtitle">
        <option>Burmese</option>
        <option>English</option>
        <option>Others</option>
      </select>
    </div>
    <div class="d-flex justify-content-end align-items-center mt-4">
      <p v-if="formStatus==='success'" class="text-success"><i class="fa fa-check-circle mr-2"></i>Successfully added</p>
      <p v-if="formStatus==='error'" class="text-danger"><i class="fa fa-times-circle mr-2"></i>Error occoured! Please try again later</p>
      <button class="btn btn-info font-weight-light ml-3" id="moviebtnSubmit" @click="submit">
        <i class="fas fa-check mr-1"></i>Submit
      </button>
    </div>
  </form>

</template>

<script>
  import { TMDB_API_KEY, TMDB_SEARCH_URL, MEDIA_ITEMS_URL } from '@/config.js';
  import { mixin as clickaway } from 'vue-clickaway';
  import AddMediaSearch from './AddMediaSearch';

  export default {
    components : {
      'search' : AddMediaSearch
    },
    mixins : [clickaway],
    props : ['type'],
    data : function() {
      return {
        searchTerm : '',
        searchShow : false,
        searchResult : null,
        searchLoading : false,
        title : '',
        tmdb_id : '',
        tmdb_id_lock : true,
        formStatus : null
      }
    },
    methods : {
      hideSearch : function() {
        this.searchShow = false
      },
      fetchTmdb : async function(event){
        this.searchLoading = true;
        this.API_URL = `${TMDB_SEARCH_URL}/${this.type===1 ? 'movie' : 'tv'}?api_key=${TMDB_API_KEY}&page=1&query=`;
        const resp = await axios.get(`${this.API_URL}${encodeURIComponent(this.searchTerm)}`, { transformRequest: [(data, headers) => {
          delete headers.common['X-Requested-With'];
          delete headers.common['X-XSRF-TOKEN'];
          return data;
        }]});
        console.log(resp);
        this.searchLoading = false;
        this.searchResult = resp.data['results'];
        console.log(new FormData(this.el))
      },
      setTmdb({ id, title }){
        this.searchTerm = title;
        this.tmdb_id = id;
        this.searchShow = false;
      },
      submit(){

        this.show = true;
        const form = this.$refs['form'];
        form.classList.add('was-validated');

        if (form.checkValidity() === false) {
            return
        }
        const formData = new FormData(form);
        axios.post(MEDIA_ITEMS_URL, formData).then(
          resp => { 
            form.reset();
            form.classList.remove('was-validated');
            this._serverFeedback(true)
            this._resetSearch();
          }
        ).catch(e => this._serverFeedback(false));

      },
      _serverFeedback(status){
        this.formStatus = status ? 'success' : 'error';
        setTimeout(()=> this.formStatus = null, 2500)
      },
      _resetSearch(){
        this.searchTerm = '';
        this.searchResult = null;
        this.tmdb_id = null;
      }
    }
  };

</script>
