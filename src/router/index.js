import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import Login from '@/views/Login'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Web',
    component: Index
  },

  //后台页面router
  {
    path: '/hello',
    name: 'Index',
    component: Index,
    // redirect: '/login',
    children: [
        {
          meta: {history: true, title: "我的消息"},
          path: '/hello/chat',
          name: 'chat',
          component: () => import('../components/chat/ChatList.vue')
        },
        {
          meta: {history: true, title: "管理员"},
          path: '/hello/codeying/admin',
          name: 'admin',
          component: () => import('../views/admin/Index.vue')
        },
        {
          meta: {history: true, title: "医生"},
          path: '/hello/codeying/doctor',
          name: 'doctor',
          component: () => import('../views/doctor/Index.vue')
        },
        {
          meta: {history: true, title: "患者"},
          path: '/hello/codeying/patient',
          name: 'patient',
          component: () => import('../views/patient/Index.vue')
        },
        {
          meta: {history: true, title: "医生建议"},
          path: '/hello/codeying/doctorAdvice',
          name: 'doctorAdvice',
          component: () => import('../views/doctorAdvice/Index.vue')
        },
        {
          meta: {history: true, title: "PHQ量表"},
          path: '/hello/codeying/phq',
          name: 'phq',
          component: () => import('../views/phq/Index.vue')
        },
        {
          meta: {history: true, title: "MADRS量表"},
          path: '/hello/codeying/madrs',
          name: 'madrs',
          component: () => import('../views/madrs/Index.vue')
        },
        {
          meta: {history: true, title: "CES-D量表"},
          path: '/hello/codeying/cesd',
          name: 'cesd',
          component: () => import('../views/cesd/Index.vue')
        },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if(to.meta.history === true) {
    Cache.dispatch("menu", 'addHistory', to);
  }
  next()
})

export default router

