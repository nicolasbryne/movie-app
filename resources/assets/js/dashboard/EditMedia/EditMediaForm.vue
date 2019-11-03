<template>
  <div>
    <div class="row mt-0">
      <div :class="media.type_id===2 ? 'col-7' : 'col-12'">
        <div class="wrap-input100 validate-input m-b-26 mr-4">
          <span class="label-input100">{{ media.type_id===1 ? 'Movie Title' : 'Series Title' }}</span>
          <input autocomplete="off" id="movie_title" @focus="searchShow=true" @keydown.enter.prevent="fetchTmdb($event)" :value="media.title" class="form-control input100 text-light"
            type="text" name="title" :placeholder="media.type_id === 1 ? 'Enter movie title' : 'Enter series title'" required>
          <span class="focus-input100"></span>
          <div class="valid-feedback pb-1">Finished</div>
          <div class="invalid-feedback pb-1">Movie title is required</div>
        </div>
      </div>
      <div class="col-3 offset-2" v-if="media.type_id===2">
        <div class="wrap-input100 validate-input m-b-26">
          <span class="label-input100">Episode No</span>
          <input class="form-control input100 text-light" :value="media.episode" type="number" name="episode" placeholder="Enter episode no" required>
          <span class="focus-input100"></span>
          <div class="valid-feedback pb-1">Finished</div>
          <div class="invalid-feedback pb-1">Episode number is required</div>
        </div>
      </div>
    </div>

    <div class="wrap-input100 validate-input m-b-18">
      <span class="label-input100">File location</span>
      <input class="form-control input100 text-light" :value="media.drive" type="text" name="drive" placeholder="Enter drive url" required>
      <span class="focus-input100"></span>
      <div class="valid-feedback pb-1">Finished</div>
      <div class="invalid-feedback pb-1">Google Drive URL is required</div>
    </div>

    <div class="wrap-input100 validate-input m-b-18">
      <span class="label-input100">Size</span>
      <input class="form-control input100 text-light" :value="media.size" type="text" name="size" placeholder="Enter file size">
      <span class="focus-input100"></span>
    </div>

    <div class="wrap-input100 validate-input m-b-18">
      <span class="label-input100">Encoded by</span>
      <input class="form-control input100 text-light" :value="media.encoded_by" type="text" name="encoded_by" placeholder="Enter encoder name">
      <span class="focus-input100"></span>
    </div>


    <div class="wrap-input100 validate-input m-b-18 border-bottom-0">
      <span class="label-input100">Resolution</span>
      <select class="form-control rounded-0" name="resolution" :value="media.resolution">
        <option>1080p</option>
        <option>720p</option>
        <option>480p</option>
      </select>
    </div>

    <div class="wrap-input100 validate-input m-b-18 border-bottom-0">
      <span class="label-input100">Audio</span>
      <select class="form-control rounded-0" name="audio_channels" :value="media.audio_channels">
        <option value="2.1">2.1 Channels</option>
        <option value="5.1">5.1 Channels</option>
        <option value="7.1">7.1 Channels</option>
      </select>
    </div>


    <div class="wrap-input100 validate-input m-b-18 border-bottom-0">
      <span class="label-input100">Subtitle</span>
      <select class="form-control rounded-0" name="subtitle" :value="media.subtitle">
        <option>Burmese</option>
        <option>English</option>
        <option>Others</option>
      </select>
    </div>

  </div>

</template>

<script>
  import { TMDB_API_KEY, TMDB_SEARCH_URL, MEDIA_ITEMS_URL } from '@/config.js';

  export default {

    props : ['media'],
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

      update(){

        this.show = true;
        const form = this.$refs['form'];
        form.classList.add('was-validated');

        if (form.checkValidity() === false) {
            return
        }
        const formData = $( form ).serialize();
        axios.put(`${MEDIA_ITEMS_URL}/${this.media.id}`, formData).then(
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
