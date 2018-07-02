
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './components/App.vue'
import UploadArea from './components/UploadArea.vue'
import Navbar from './components/Navbar.vue'
import Diagnostic from './components/Diagnostic.vue'
import DataTable from './components/DataTable';
import DataVizList from './components/dataVizList';
import Histogram from './components/Histogram';
import Donut from './components/Donut';

import store from './models/store'

Vue.use(BootstrapVue);

Vue.component('uploadArea', UploadArea);
Vue.component('navbar', Navbar);
Vue.component('diagnostic', Diagnostic);
Vue.component('dataTable', DataTable);
Vue.component('dataVizList', DataVizList);
Vue.component('histogram', Histogram);
Vue.component('donut', Donut);

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})