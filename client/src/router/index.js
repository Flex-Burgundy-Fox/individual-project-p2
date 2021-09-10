import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RecipeDetail from '../views/RecipeDetail.vue'
import Profile from '../views/Profile.vue'
import YourRecipe from '../views/YourRecipe.vue'
import PurchasedRecipe from '../views/PurchasedRecipe.vue'
import FormRecipe from '../views/FormRecipe.vue'
import FormIntro from '../views/FormIntro.vue'
import FormComponents from '../views/FormComponents.vue'
import FormMethods from '../views/FormMethods.vue'
import RecipeNotFound from '../views/RecipeNotFound.vue'
import SearchRecipe from '../views/SearchRecipe.vue'

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
    path: '/search',
    name: 'SearchRecipe',
    component: SearchRecipe
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
      {
        path: 'purchased',
        name: 'PurchasedRecipe',
        component: PurchasedRecipe
      },
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
        name: 'FormEditRecipe',
        component: FormIntro
      },
      {
        path: 'components/:recipeId',
        name: 'FormEditComponents',
        component: FormComponents
      },
      {
        path: 'methods/:recipeId',
        name: 'FormEditMethods',
        component: FormMethods
      },
    ]
  },
  {
    path: '/notFound',
    name: 'RecipeNotFound',
    component: RecipeNotFound
  },
  {
    path: '*',
    name: 'PageNotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // let prevPath = from.name // jika bingung dengan "window.location.pathname" disini bisa juga menggunakan from.name atau from.path
  if( (to.name !== 'Home' && to.name !== 'RecipeDetail'  && to.name !== 'SearchRecipe' && to.name !== 'PageNotFound' && to.name !== 'RecipeNotFound') && !localStorage.getItem('access_token')) {
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
    if(from.name !== 'Home') next({ path: '/' })
  }
  else next()
})

export default router
