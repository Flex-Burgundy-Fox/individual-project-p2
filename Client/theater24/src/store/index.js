import Vue from "vue"
import Vuex from "vuex"

import axios from "axios"

const TMDB_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = process.env.VUE_APP_TMDB_TOKEN

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      topRatedMovies: [],
      trendingWeekMovies: [],
      trendingDayMovies: [],
      upcomingMovies: []
   },
   mutations: {
      SET_RATED_MOVIES(state, payload) {
         state.topRatedMovies = payload
      },
      SET_TRENDING_WEEK(state, payload) {
         state.trendingWeekMovies = payload
      },
      SET_TRENDING_DAY(state, payload) {
         state.trendingDayMovies = payload
      },
      SET_UPCOMING_MOVIES(state, payload) {
         state.upcomingMovies = payload
      }
   },
   actions: {
      getTopRated({ commit }) {
         axios({
            method: "GET",
            url: `${TMDB_URL}/movie/top_rated`,
            headers: {
               Authorization: `Bearer ${TMDB_TOKEN}`
            }
         })
            .then(({ data }) => {
               commit("SET_RATED_MOVIES", data.results)
            })
            .catch(err => console.log(err))
      },
      getTrendingWeekMovies({ commit }) {
         axios({
            method: "GET",
            url: `${TMDB_URL}/trending/movie/week`,
            headers: {
               Authorization: `Bearer ${TMDB_TOKEN}`
            }
         })
            .then(({ data }) => {
               commit("SET_TRENDING_WEEK", data.results)
            })
            .catch(err => console.log(err))
      },
      getTrendingDayMovies({ commit }) {
         axios({
            method: "GET",
            url: `${TMDB_URL}/trending/movie/day`,
            headers: {
               Authorization: `Bearer ${TMDB_TOKEN}`
            }
         })
            .then(({ data }) => {
               commit("SET_TRENDING_DAY", data.results)
            })
            .catch(err => console.log(err))
      },
      getUpcomingMovies({ commit }) {
         axios({
            method: "GET",
            url: `${TMDB_URL}/movie/upcoming?api_key=${TMDB_TOKEN}`,
            headers: {
               Authorization: `Bearer ${TMDB_TOKEN}`
            }
         })
            .then(({ data }) => {
               commit("SET_UPCOMING_MOVIES", data.results)
            })
            .catch(err => console.log(err))
      }
   },
   modules: {}
})
