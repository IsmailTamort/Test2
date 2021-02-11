require('./bootstrap');
window.Vue = require('vue').default;

import VueRouter from 'vue-router'
import { Form, HasError, AlertError } from 'vform';
import moment from 'moment';
import vueProgressBar from 'vue-progressbar';
import swal from 'sweetalert2';
import Gate from "./Gate";


Vue.prototype.$gate = new Gate(window.user);





window.swal = swal;

Vue.use(vueProgressBar, {
  color : ' rgb(143, 255, 199',
  failerColor : 'red',
  height : '3px'
})

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.toast = toast;



window.Fire =  new Vue();

Vue.use(VueRouter)

Vue.component('pagination', require('laravel-vue-pagination'));

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)


Vue.filter('upText', function(text){
  return text.charAt(0).toUpperCase() + text.slice(1)
});


Vue.filter('myDate',function(created){
  return moment(created).format('MMMM Do YYYY');
});

Vue.component(
  'not-found',
  require('./components/NotFound.vue').default
);

const routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '/users', component: require('./components/Users.vue').default },
    { path: '*', component: require('./components/NotFound.vue').default}

  ]

  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  }) 
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data:{
      search: ''
  },
  methods:{
    searchit: _.debounce(() => {
        Fire.$emit('searching');
    },1000),

    printme() {
        window.print();
    }
}
});
