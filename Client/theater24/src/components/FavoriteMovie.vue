<template>
   <div class="container text-center">
      <div class="row">
         <div class="col">
            <h2>My Favorite Movies</h2>
         </div>
      </div>
      <div class="d-flex justify-content-center">
         <div
            class="spinner-border m-5"
            role="status"
            :style="{ display: activeDisplay }"
         >
            <span class="visually-hidden">Loading...</span>
         </div>
      </div>
      <div class="row justify-content-center">
         <router-link
            v-for="movie in favMovies"
            :key="movie.id"
            :to="`/detail/${movie.id}`"
            class="col-3 d-flex justify-content-center mt-4"
         >
            <div class="card justify-content-center" style="width: 18rem;">
               <img
                  :src="
                     'https://image.tmdb.org/t/p/original' + movie.poster_path
                  "
                  class="card-img-top poster"
                  alt="https://avatars.githubusercontent.com/u/74331750?v=4"
               />
            </div>
         </router-link>
      </div>
   </div>
</template>

<script>
import axios from "axios"

const baseURL = "https://theater24.herokuapp.com"

const TMDB_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = process.env.VUE_APP_TMDB_TOKEN

export default {
   name: "MyFavoriteMovie",
   data() {
      return {
         favMovies: [],
         activeDisplay: "block"
      }
   },
   methods: {
      fetchFavMovie() {
         axios({
            method: "GET",
            url: `${baseURL}/favoriteMovies/showFavMovie`,
            headers: {
               access_token: localStorage.getItem("access_token")
            }
         })
            .then(({ data }) => {
               data.data.forEach(favMovie => {
                  axios({
                     method: "GET",
                     url: `${TMDB_URL}/movie/${favMovie.MovieId}?api_key=e682726cd15fa8d75b833d9544e347ca&append_to_response=videos`,
                     headers: {
                        Authorization: `Bearer ${TMDB_TOKEN}`
                     }
                  })
                     .then(({ data }) => {
                        setTimeout(() => {
                           this.activeDisplay = "none"
                           this.favMovies.push(data)
                        }, 2500)
                     })
                     .catch(err => console.log(err))
               })
            })
            .catch(err => console.log(err))
      }
   },
   created() {
      this.fetchFavMovie()
   }
}
</script>

<style scoped>
.poster {
   box-shadow: 0 0 30px 1px rgb(187, 187, 187);
   transition: all 50ms ease;
}

.poster:hover {
   transform: scale(1.1);
}
</style>
