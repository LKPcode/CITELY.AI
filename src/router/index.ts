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

import View404 from '../views/View404.vue';

import PaperReaderView from '../components/PaperReaderView.vue'
import Settings from '../views/Settings.vue'
import BillingSettings from '../components/settings-components/BillingSettings.vue';
import AccountSettings from '../components/settings-components/AccountSettings.vue';


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
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/workspace/:workspace_id/paper/:paper_id',
    name: 'PaperReaderView',
    component: PaperReaderView,
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    name: 'HomeView',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    children: [
      {
        path: '',
        name: 'AccountSettings',
        component: AccountSettings,
      },
      {
        path: 'billing',
        name: 'BillingSettings',
        component: BillingSettings,
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/workspace/:workspace_id/chat/:chat_id?',
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
  // 404 View
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: View404,
  }
]




const router = createRouter({
  history: createWebHistory("/"),
  routes
})





router.beforeEach( async (to, from, next) => {
  let user = await authentication_api.getUser();
  // console.log(user.data.session);

  if ((to.name == 'Login' || to.name=='Register') && user.data.session) {
    next({ name: 'HomeView' })
  }
  else if (to.meta.requiresAuth && !user.data.session) {
    next({ name: 'Login' })
  }


  // if (to.meta.requiresAuth) {
  //   if (user) {
  //     next();
  //   } else {
  //     next({ name: 'Login' })
  //   }
  // }

  next();
});





export default router