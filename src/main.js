import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/css/main.css'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab)
dom.watch();

createApp(App)
	.use(router)	
	.use(store)
	.use(VueAxios, axios)
	.component('font-awesome-icon', FontAwesomeIcon)
	.mount("#app");
