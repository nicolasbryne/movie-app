/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import AddMedia from '@/dashboard/AddMedia/AddMedia.vue';
import EditMedia from '@/dashboard/EditMedia/EditMedia.vue';
import HomeComponent from '@/dashboard/Home/Home';
import MediaItemPage from '@/dashboard/MediaItemsList';
import UsersPage from '@/dashboard/Users/list';

import TheHeaderbar from '@/components/TheHeaderbar';
import TheBreadcrumb from '@/components/TheBreadcrumb';
import TheSidebar from '@/components/TheSidebar';
import TheContent from '@/components/TheContent';
import TheFooter from '@/components/TheFooter';


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('add-media', AddMedia);
Vue.component('edit-media', EditMedia);
Vue.component('home-component', HomeComponent);
Vue.component('mediaitem-component', MediaItemPage);
Vue.component('users-list', UsersPage);
Vue.component('header-bar', TheHeaderbar);
Vue.component('bread-crumb', TheBreadcrumb);
Vue.component('side-bar', TheSidebar);
Vue.component('dashboard-content', TheContent);
Vue.component('footer-bar', TheFooter);
const app = new Vue({
  el: '#app'
});