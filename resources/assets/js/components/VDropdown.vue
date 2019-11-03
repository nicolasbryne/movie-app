<template>
  <component :is="tag" class="" :class="[{ show : isOpened }, classes]">
    <component :is="btnTag" 
        :class="btnClasses" 
        href="#" 
        role="button" 
        aria-haspopup="true" 
        :aria-expanded="isOpened"
        @click="isOpened=!isOpened"
        v-click-outside="closeDropdown"
    >
      <slot name="image"></slot>
      <span v-if="title" class="text-secondary small text-uppercase font-weight-light">{{title}}</span>
      <i v-if="icon" class="fa" :class="`fa-${icon}`"></i>
      <span v-if="badge" class="badge badge-pill badge-warning">{{badge}}</span>
    </component>
    <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg" :class="{ show : isOpened }">
      <div class="dropdown-header text-center" v-if="header">
        <strong>{{header}}</strong>
      </div>

      <slot name="dropdown-items"></slot>

      <a class="dropdown-item text-center" href="#" v-if="endbutton">
        <strong>{{endbutton}}</strong>
      </a>
    </div>
  </component>
</template>

<script>

import clickOutside from '@/directives/click-outside';
export default {
  name: 'v-dropdown',
  props : ['tag', 'classes', 'btnTag', 'btnClasses', 'title', 'icon', 'badge', 'header', 'endbutton'],
  directives : {
    'click-outside' : clickOutside
  },
  data(){
    return {
      isOpened : false
    }
  },
  methods : {
    closeDropdown : function(){
      this.isOpened = false;
    }
  }
}
</script>

