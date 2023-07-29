import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
import WorkspaceView from '../views/WorkspaceView.vue'
import PaperView from '../components/PaperView.vue'
import MainBar from '../components/chat-components/MainBar.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import EmptyMainBar from '../components/EmptyMainBar.vue'
import PaperSearch from '../components/PaperSearch.vue'
import userState from '../composables/store.ts' 
import authentication_api from '../api/authentication_api.ts'
import Home from '../views/Home.vue'




const routes = [
  
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
  {
    path: '/workspace/:workspace_id',
    name: 'WorkspaceView',
    component: WorkspaceView,
    children: [
      {
        path: 'search',
        name: 'SearchView',
        component: PaperSearch,
      }
    ]
  },
  {
    path: '/home',
    name: 'HomeView',
    component: Home,

  },
  {
    path: '/workspace/:workspace_id/chat/:chat_id',
    name: 'ChatView',
    component: ChatView,
    children: [
      {
        path: '',
        name: 'MainBar',
        component: MainBar,
      },
      {
        path: 'inspector/:paper_id/:source_id?',
        name: 'PaperView',
        component: PaperView,
      }
    ],
    meta: { requiresAuth: true }
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