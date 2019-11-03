<template>
  <div id="autocomplete" class="autocomplete-container dark-scrollbar">
    <div class="search-text-display d-flex align-items-center">
      Search &nbsp;{{ term || 'on Tmdb' }}
      <div class="ml-auto search-icon text-dark">
        Enter &crarr;
      </div>
    </div>
    <ul class="autocomplete-list" id="search">
      <li class="autocomplete-list-item" v-if="loading">
          <div class="autocomplete-display-holder mb-3">
              <span class="w-100 text-center"><i class="fa fa-spinner fa-spin"></i></span>
          </div>
      </li>
      <li class="autocomplete-list-item" v-if="results && results.length === 0 && !loading">
        <div class="autocomplete-display-holder">
            <div class="list-item-block text">
                Title is not found!
            </div>
        </div>
      </li>
      <a class="autocomplete-item" :key="res.id" v-for="res in results" v-on:click.stop="$emit('setTmdb', { id : res.id, title : res.title || res.name })">
        <li class="autocomplete-list-item">
          <div class="autocomplete-display-holder">
            <div class="list-item-block poster" v-bind:style="`background-image: url('https://image.tmdb.org/t/p/w92${res.poster_path}')`"></div>
              <div class="list-item-block text p-2">
                <div class="title">
                    {{res.title || res.name}}
                </div>
                <div class="year text-dark mt-1">
                    ( {{ new Date(res.release_date || res.first_air_date).getFullYear() }} )
                </div>
            </div>
          </div>
        </li>
      </a>
    </ul>
  </div>
</template>

<script>

    export default {
        props : ['term', 'loading', 'results']
    }
</script>