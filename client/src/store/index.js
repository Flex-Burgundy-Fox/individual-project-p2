import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Toasted from 'vue-toasted'

Vue.use(Toasted)
Vue.use(Vuex)

let path = 'http://localhost:3000/'

export default new Vuex.Store({
  state: {
    getTotal: {},
    getWeekly: [],
    newsData: [],
    randomNews: {
      source: '',
      title: '',
      description: '',
      urlToImage: '',
      url: '',
      content: ''
    },
    nameProv: '',
  },
  mutations: {
    get_total_today(state, payload) {
      state.getTotal = payload
    },
    get_weekly(state, payload) {
      state.getWeekly = payload
    },
    change_news(state, payload) {
      state.newsData = payload
    },
    random_news(state, payload) {
      state.randomNews = payload
    },
    name_prov(state, payload) {
      state.nameProv = payload
    }
  },
  actions: {
    login(context, payload) {
      axios({
        method: 'post',
        url: path + 'users/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push('/')
          Vue.toasted.show(`Logged in, please enjoy!!`, {
            type: 'success',
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        })
        .catch((err) => {
          Vue.toasted.show(`${err.response.data.error} !!`, {
            type: 'error',
            theme: "bubble",
            position: "top-center",
            duration: 5000
          });
        })
    },
    logout() {
      localStorage.clear()
      Vue.toasted.show(`Successfully Logout !!!`, {
        type: 'success',
        theme: "bubble",
        position: "top-right",
        duration: 5000
      });
      router.push('/login')
    },
    register(context, payload) {
      axios({
        method: 'post',
        url: path + 'users/register',
        data: payload
      })
        .then(({ data }) => {
          Vue.toasted.show(`Registered ${data.email}, please Login First!!`, {
            type: 'success',
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
          router.push('/login')
        })
        .catch((err) => {
          Vue.toasted.show(`${err.response.data.error[0]} !!`, {
            type: 'error',
            theme: "bubble",
            position: "top-center",
            duration: 5000
          });
        })
    },
    covidNews(context, payload) {
      axios({
        method: 'get',
        url: path + 'covids/covid-news',
      })
        .then(({ data }) => {
          let randNews = data.data[Math.floor(Math.random() * data.data.length)]
          context.commit('random_news', randNews)
          context.commit('change_news', data.data)
        })
        .catch((err) => console.log(err));
    },
    getWeekly(context, payload) {
      return axios({
        method: 'get',
        url: path + 'covids/weekly',
      })
    },
    getDataProv(context, payload) {
      return axios({
        method: 'get',
        url: path + 'covids/prov',
        headers: {
          access_token: localStorage.getItem('access_token'),
        }
      })
    },
    catNews(context, payload) {
      return axios({
        method: 'get',
        url: path + 'news-category/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token'),
        }
      })
        .then(({ data }) => {
          context.commit('change_news', data.data)
          Vue.toasted.show(`Changing   to ${payload} News, enjoy reading!!`, {
            type: 'success',
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        })
        .catch((err) => console.log(err));

    },

  },
  modules: {
  }
})
