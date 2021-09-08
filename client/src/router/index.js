import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RecipeDetail from '../views/RecipeDetail.vue'
import Profile from '../views/Profile.vue'
import YourRecipe from '../views/YourRecipe.vue'
import FormRecipe from '../views/FormRecipe.vue'
import FormIntro from '../views/FormIntro.vue'
import FormComponents from '../views/FormComponents.vue'
import FormMethods from '../views/FormMethods.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipe/:recipeId',
    name: 'RecipeDetail',
    component: RecipeDetail
  },
  {
    path: '/profile',
    component: Profile,
    children: [
      {
        path: '/',
        name: 'Profile',
        component: YourRecipe
      },
      // {
      //   path: '/purchased',
      //   name: 'Profile',
      //   component: YourRecipe
      // },
    ]
  },
  {
    path: '/addRecipe',
    component: FormRecipe,
    children: [
      {
        path: '/',
        name: 'FormRecipe',
        component: FormIntro
      },
      {
        path: 'components/:recipeId',
        name: 'FormComponents',
        component: FormComponents
      },
      {
        path: 'methods/:recipeId',
        name: 'FormMethods',
        component: FormMethods
      },
    ]
  },
  {
    path: '/editRecipe',
    component: FormRecipe,
    children: [
      {
        path: ':recipeId',
        name: 'FormRecipe',
        component: FormIntro
      },
      {
        path: 'components/:recipeId',
        name: 'FormComponents',
        component: FormComponents
      },
      {
        path: 'methods/:recipeId',
        name: 'FormMethods',
        component: FormMethods
      },
    ]
  },
  {
    path: '*',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let prevPath = window.location.pathname // jika bingung dengan "window.location.pathname" disini bisa juga menggunakan from.name atau from.path

  if( (to.name == 'Profile' || to.name == 'FormRecipe' || to.name == 'FormComponents' || to.name == 'FormMethods') && !localStorage.getItem('access_token')) {
    Vue.toasted.info('Please Login First', {
      icon: 'info',
      action: {
        text: 'Close',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        },
      },
      duration: 5000
    })
    // if(prevPath == '/userProfile') prevPath = '/'
    // next({ path: prevPath })
    next({ path: '/' })
  }
  // else if (to.name == 'Login' && localStorage.getItem('access_token')) next({name: 'Home'})
  else next()
})

export default router
