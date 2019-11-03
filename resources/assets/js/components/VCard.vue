<template>
    <div class="card text-white mb-4" :class="`bg-${color || 'primary'}`">
        <div class="card-body">
            <div class="btn-group float-right" v-if="$slots['action']">
              <button class="btn btn-transparent dropdown-toggle p-0" type="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-cog"></i>
              </button>
              <slot name="action"></slot>              
            </div>
            <slot name="dropdown"></slot>
            <div class="text-value font-weight-bold">{{counts}}</div>
            <div class="text-label">{{label}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props : ['color', 'counts', 'label']
}
</script>

