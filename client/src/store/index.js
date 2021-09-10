import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blablas: [],
    access_token: '',
    // userAvatar: '',
    // UserId : ''
  },
  mutations: {
    SHOW_BLABLAS (state, blablas) {
      state.blablas = blablas
    },
    FILL_ACCESS_TOKEN (state, token) {
      state.access_token = token
    },
    // GET_USER(state, payload) {
    //   state.userAvatar = payload.avatar
    //   state.UserId = payload.UserId
    // }
  },
  actions: {
    showBlablas(context) {
      axios({
        method: 'GET',
        url: 'https://anon-app-h8-phase2.herokuapp.com/blablas',
        headers: {
          access_token : localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
        context.commit('SHOW_BLABLAS', data.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteBlablas(context, id) {
      axios({
        method: 'DELETE',
        url: `https://anon-app-h8-phase2.herokuapp.com/blablas/${id}`,
        headers: {
          access_token : localStorage.getItem('access_token')
        }
      })
      .then(() => {
        this.dispatch('showBlablas')
      })
      .catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "It's not your blablas, you can't delete it!"
        })
      })
    }

  }
})
