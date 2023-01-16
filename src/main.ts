import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import axios from 'axios'
// import idSrvAuth from './idSrvAuth'

// axios.defaults.baseURL = 'http://localhost:3000'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

createApp(App).use(router).use(store).component('QuillEditor', QuillEditor).mount('#app');

// idSrvAuth.startup().then((ok:any) => {
//     if (ok) {
//         const app:any = createApp(App).use(router).use(store).component('QuillEditor', QuillEditor);

//         app.config.globalProperties.$oidc = idSrvAuth

//         app.mount('#app')
//     } else {
//         console.log(`Startup was not okay`)
//     }
// });
