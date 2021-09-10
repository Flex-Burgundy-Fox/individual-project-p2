import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NewsCat from '../views/NewsCat.vue'
import InfoCovid from '../views/InfoCovid.vue'
import CovidNews from '../views/CovidNews.vue'
import CovidMap from '../views/CovidMap.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/covid',
    name: 'InfoCovid',
    component: InfoCovid
  },
  {
    path: '/covid-map',
    name: 'CovidMap',
    component: CovidMap
  },
  {
    path: '/covid-news',
    name: 'CovidNews',
    component: CovidNews,
  },
  {
    path: '/news-category/:cat',
    name: 'NewsCat',
    component: NewsCat
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const prevPath = from.path
  if (to.name !== 'Login' && to.name !== 'Home' && to.name !== 'InfoCovid' && to.name !== 'Register' && to.name !== 'CovidNews' && !localStorage.getItem('access_token')) next({ name: 'Login', query: {from: prevPath}})
  else if (to.name == 'Login' && to.name == 'Home'  && to.name == 'Register'  && to.name !== 'InfoCovid' && to.name == 'CovidNews' && localStorage.getItem('access_token')) next({ name: 'Home', query: {from: prevPath}})
  else next()
})

export default router
