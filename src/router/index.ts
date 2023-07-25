import { createRouter, createWebHistory } from 'vue-router'
import WorkspaceView from '../views/WorkspaceView.vue'
import LibraryView from '../views/LibraryView.vue'
import PaperView from '../components/PaperView.vue'
import MainBar from '../components/chat-components/MainBar.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import EmptyMainBar from '../components/EmptyMainBar.vue'
import PaperSearch from '../components/PaperSearch.vue'
import userState from '../composables/store.ts' 
import authentication_api from '../api/authentication_api.ts'




const routes = [
  {
    path: '/workspace/:workspace_id',
    name: 'WorkspaceView',
    component: WorkspaceView,
    children: [
      {
        path: '',
        name: 'EmptyMainBar',
        component: EmptyMainBar,

      },
      {
        path: 'paper/:paper_id/:source_id?',
        name: 'PaperView',
        component: PaperView,
      },
      {
        path: 'chat/:chat_id/:convo_id?',
        name: 'MainBar',
        component: MainBar,
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/workspace/:workspace_id/library',
    name: 'LibraryView',
    component: LibraryView,
    children: [
      {
        path: 'search',
        name: 'SearchView',
        component: PaperSearch,
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
]




const router = createRouter({
  history: createWebHistory("/"),
  routes
})





router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
      if (to.path !== '/') {
          authentication_api.getUser(next);
      } 
      else{
          next();
      }
  } else {
      next();
  }
  //  if ( authentication_api.temp !== null && to.path == '/') {
  //      next('/workspace/0/chat/0');
  // }

});





export default router