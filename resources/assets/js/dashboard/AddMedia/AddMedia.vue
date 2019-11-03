<template>

  <div class="container-fluid">

    <div class="card bg-dark mb-5">
      <div class="card-header text-light">
        <i class="fas fa-video mr-2"></i>Add Media
      </div>
      <div class="card-body">
        <div class="form-wrapper mt-4 mb-4">
          <ul class="nav nav-tabs bg-dark">
            <li class="active text-center">
              <a @click="handleClick(1)" href="#" :class="type === 1 ? 'active' : ''"><i class="fas fa-film mr-1"></i>Movies</a>
            </li>
            <li class="text-center">
              <a @click="handleClick(2)" href="#" :class="type === 2 ? 'active' : ''"><i class="fas fa-tv mr-1"></i>TV Shows</a>
            </li>
          </ul>


          <div class="tab-content mt-1 p-2">
            
            <media-form :type="type" v-show="type===1"></media-form>

            <media-form :type="type" v-show="type===2"></media-form>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import AddMediaForm from './AddMediaForm';

  export default {
    name : 'add-media',
    components : {
      'media-form' : AddMediaForm
    },
    data : function(){
      return { 
        currentTab : 'movie',
        type : 1
      }
    },
    methods : {
      handleClick : function(type){
        this.type = type;
      }
    }
  }
</script>
