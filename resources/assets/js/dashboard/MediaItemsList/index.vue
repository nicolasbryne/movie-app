<template>

  <div class="container-fluid mt-4">


    <div class="card bg-dark mb-2">
      <div class="card-body pb-1 pt-1">
        <div class="container-fluid">
          <div class="filter-wrapper d-flex align-items-center">
            <span class="font-weight-light">Filter</span>
            <div class="ml-auto" style="flex-basis: 200px">
              <div class="row align-items-center">
                <div class="col-4 pr-0">
                  <label for="sort_by" class="small text-muted text-right"><i class="fa fa-sort mr-1"></i>Sort by</label>
                </div>
                <div class="col-8">
                  <select name="sort_by" class="sort_by form-control rounded-0 select-transparent text-trans">
                    <option>Date</option>
                    <option>Name</option>
                    <option>Most view</option>
                  </select>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card bg-dark mb-4">
      <div class="card-header">
        <span class="small text-trans">Showing 20 results of 240</span>
      </div>
      <div class="card-body px-0 pt-0">
        <table class="table table-dark font-weight-light media-table">
          <tbody>
            <tr class="position-relative t-row t-head">
              <td class="icon text-muted"><i class="fa fa-square"></i></td>
              <td class="id font-weight-bold text-uppercase">ID</td>
              <td class="title font-weight-bold text-uppercase">
                <div>Title</div>
              </td>
              <td class="year font-weight-bold text-uppercase">Year</td>
              <td class="resolution font-weight-bold text-uppercase">Video</td>
              <td class="audio font-weight-bold text-uppercase">Audio</td>
              <td class="size font-weight-bold text-uppercase">Size</td>
              <td class="views font-weight-bold text-uppercase">Views</td>
              <td class="td-timestamp mr-2 font-weight-bold text-uppercase">Date</td>

            </tr>

            <tr class="position-relative t-row" v-for="(mediaItem, index) in mediaitems" :key="mediaItem.id">
              <td class="icon text-muted"><i class="fas fa-ellipsis-v"></i></td>
              <td class="id">{{mediaItem.id}}</td>
              <td class="title">
                <div>{{mediaItem.title}}</div>
              </td>
              <td class="year">2016</td>
              <td class="resolution">{{mediaItem.resolution}}</td>
              <td class="audio">{{mediaItem.audio_channels}}</td>
              <td class="size">{{mediaItem.size}}</td>
              <td class="views">9245</td>
              <td class="td-timestamp font-weight-normal mr-2">Oct 10</td>
              <td class="action-wrapper">
                <a :href="`/view/movies/${mediaItem.id}`" target="_blank" class="btn-action mr-1" data-toggle="tooltip" data-placement="bottom" title="Open"><i class="fa fa-external-link-alt"></i></a>
                <span class="btn-action mr-1" data-toggle="tooltip" data-placement="bottom" title="Copy link"><i class="fa fa-copy"></i></span>
                <span class="btn-action mr-1" data-toggle="tooltip" data-placement="bottom" title="View"><i class="fa fa-eye"></i></span>
                <a :href="`${MEDIA_ITEMS_URL}/${mediaItem.id}/edit`" class="btn-action mr-1" data-toggle="tooltip" data-placement="bottom" title="Edit"><i class="fa fa-edit"></i></a>
                <span class="btn-action mr-1" data-toggle="tooltip" data-placement="bottom" title="Delete" 
                  @click="confirmation(index, mediaItem.id)"
                ><i class="fa fa-trash"></i></span>
              </td>
            </tr>

          </tbody>
        </table>
        <b-modal v-model="modalShow"
                 centered
                 header-bg-variant="danger"
                 body-text-variant="dark"
                 title="DELETE?"
                 @ok="remove">
          Are you sure that you want to delete <strong>{{ (delIndex >= 0 && modalShow) ? mediaitems[delIndex].title : 'Unknown'}}</strong> ? <br>
          This cannot be undo.
        </b-modal>
        <div class="container-fluid">
            <v-paginator :paginate="paginate"></v-paginator>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { MEDIA_ITEMS_URL } from '@/config.js';
import bModal from 'bootstrap-vue/es/components/modal/modal'
import VPaginator from '@/components/VPaginator'
export default {
  components : {
    VPaginator,
    "b-modal" : bModal
  },
  props : ['mediaitems', 'paginate'],
  data() {
    return {
      MEDIA_ITEMS_URL,
      modalShow : false,
      delIndex : null,
      modalData : {}
    }
  },

  methods : {
    confirmation: function(index) {
      this.modalShow = true;
      this.delIndex = index;
    },

    remove : async function() {
      const id = this.mediaitems[this.delIndex].id;
      axios.delete(`${MEDIA_ITEMS_URL}/${id}`)
        .then(resp => {
          this.mediaitems.splice(this.delIndex, 1);
          this.delIndex = null;
        }).catch(e=>{

        })
    }
  }
}
</script>

