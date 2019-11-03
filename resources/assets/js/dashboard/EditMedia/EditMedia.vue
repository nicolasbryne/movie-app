<template>

  <div class="container-fluid">

    <div class="card bg-dark mb-5">
      <div class="card-header text-light">
        <i class="fas fa-edit mr-2"></i>Edit Media
      </div>
      <div class="card-body">
        <div class="form-wrapper mt-4 mb-4">
          <ul class="nav nav-tabs bg-dark">
            <li class="active text-center">
              <a @click="handleClick(1)" href="#" :class="type === 1 ? 'active' : ''"><i class="fas fa-film mr-1"></i>Media</a>
            </li>
            <li class="text-center">
              <a @click="handleClick(2)" href="#" :class="type === 2 ? 'active' : ''"><i class="fas fa-align-center mr-1"></i>Metadata</a>
            </li>
          </ul>


          <div class="tab-content mt-1 p-2">
            <form ref="form" @submit.prevent 
              class="tab-pane login100-form validate-form pb-5 active show" 
              :class="type===2 ? 'px-0': ''"
              novalidate="">
              <input type="hidden" :value="media.type_id" name="type_id" />
              <edit-form v-show="type===1" :media="media"></edit-form>
              <tmdb-form v-show="type===2" :tmdb="tmdb"></tmdb-form>
              <div class="d-flex justify-content-start align-items-center mt-4">
                <button class="btn btn-info font-weight-light mr-3" :class="type===2 ? 'ml-3' : ''" id="moviebtnSubmit" @click="update">
                  <i class="fas fa-check mr-1"></i>Update
                </button>
                <p v-if="formStatus==='success'" class="text-success"><i class="fa fa-check-circle mr-2"></i>Successfully updated</p>
                <p v-if="formStatus==='error'" class="text-danger"><i class="fa fa-times-circle mr-2"></i>Error occoured! Please try again later</p>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { TMDB_API_KEY, TMDB_SEARCH_URL, MEDIA_ITEMS_URL } from '@/config.js';
  import EditMediaForm from './EditMediaForm';
  import TmdbForm from './TmdbForm';

  export default {
    name : 'edit-media',
    components : {
      TmdbForm,
      'edit-form' : EditMediaForm
    },
    props : ['media', 'tmdb'],
    data : function(){
      return { 
        type : 1,
        formStatus : null
      }
    },
    methods : {
      handleClick : function(type){
        this.type = type;
      },

      update(){
        const form = this.$refs['form'];
        form.classList.add('was-validated');

        if (form.checkValidity() === false) {
            console.log(form.reportValidity())
            return
        }
        const formData = new FormData(form);
        axios.put(`${MEDIA_ITEMS_URL}/${this.media.id}`, formData).then(
          resp => { 
            form.classList.remove('was-validated');
            this._serverFeedback(true)
          }
        ).catch(e => this._serverFeedback(false));

      },
      _serverFeedback(status){
        this.formStatus = status ? 'success' : 'error';
        setTimeout(()=> this.formStatus = null, 2500)
      },
    }
  }
</script>
