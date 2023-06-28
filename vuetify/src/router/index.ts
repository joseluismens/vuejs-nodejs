import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LoginViewVue from '../views/LoginView.vue'
import tokenService from '../services/token.service'

const routes= [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),

  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue'),
    children:[
      {
        path:'',
        name:'default',
        component:()=>import('@/components/Conversion.vue')

      },
      {
        path:'conversion',
        name:'Conversion',
        component:()=>import('@/components/Conversion.vue')
      },
      {
        path:'historial',
        name:'Historial',
        meta:{isAdmin:true},
        component:()=>import('@/components/Historial.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  
  if (to.meta.requiresAuth ) {
    // this route requires auth, check if logged in
    let verify = tokenService.loggedIn();
    // if not, redirect to login page.
    if (!verify) {
      return {
        name:'login'
      }
      
    }
  }

  if (to.meta.isAdmin && !tokenService.isAdmin()) {
    return{
      name:'Conversion'
    }
  }
})

export default router
