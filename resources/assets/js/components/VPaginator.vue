<template>
  <nav class="paginate mt-5">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>

      <li class="page-item" :class="link.active ? 'active' : '' " v-for="link in paginate.links" :key="link.url">
        <a class="page-link" :href="link.active ? '' : link.url ">{{link.page}}</a>
      </li>

      <!--  <li class="page-item"><a class="page-link" href="#">...</a></li>
            <li class="page-item"><a class="page-link" href="#">{{ mediaItems.lastPage }}</a></li>  -->

      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
      name : 'v-paginator',
      props : ['paginate']
  }

</script>
