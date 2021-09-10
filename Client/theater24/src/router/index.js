import Vue from "vue"
import VueRouter from "vue-router"
import Profile from "../components/Profile.vue"
import MyFavoriteMovie from "../components/FavoriteMovie.vue"
import HistoryBills from "../components/HistoryBills.vue"

Vue.use(VueRouter)

const routes = [
   {
      path: "/",
      name: "Dashboard",
      component: () =>
         import(/* webpackChunkName: "about" */ "../views/Dashboard.vue")
   },
   {
      path: "/account",
      name: "Account",
      component: () =>
         import(/* webpackChunkName: "about" */ "../views/Account.vue"),
      children: [
         {
            path: "profile",
            component: Profile
         },
         {
            path: "favorite-movie",
            component: MyFavoriteMovie
         },
         {
            path: "history-bills",
            component: HistoryBills
         }
      ]
   },
   {
      path: "/search",
      name: "Search",
      component: () =>
         import(/* webpackChunkName: "about" */ "../views/Search.vue")
   },
   {
      path: "/detail/:id",
      name: "DetailMovie",
      component: () =>
         import(/* webpackChunkName: "about" */ "../views/Detail.vue")
   },
   {
      path: "/play-movie/:videoId",
      name: "PlayMovie",
      component: () =>
         import(/* webpackChunkName: "about" */ "../views/PlayMovie.vue")
   },
   {
      path: "/bill/finish",
      name: "FinishBill",
      component: () =>
         import(/* webpackChunkName: "about" */ "../views/FinishBill.vue")
   },
   {
      path: "/bill/unfinish",
      name: "UnfinishBill",
      component: () =>
         import(/* webpackChunkName: "about" */ "../views/UnfinishBill.vue")
   },
   {
      path: "/bill/error",
      name: "ErrorBill",
      component: () =>
         import(/* webpackChunkName: "about" */ "../views/ErrorBill.vue")
   },
   {
      path: "*",
      name: "NotFound",
      component: () =>
         import(/* webpackChunkName: "about" */ "../views/NotFound.vue")
   }
]

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes
})

router.beforeEach((to, from, next) => {
   if (
      (to.name === "DetailMovie" && !localStorage.getItem("access_token")) ||
      (to.name === "Search" && !localStorage.getItem("access_token"))
   ) {
      next()
   } else if (
      to.name !== "Dashboard" &&
      !localStorage.getItem("access_token")
   ) {
      next({ name: "Dashboard" })
   } else {
      next()
   }
})

export default router
