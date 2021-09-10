<template>
   <div>
      <Navbar></Navbar>
      <div class="container text-center mt-3">
         <div class="row">
            <div class="col">
               <input
                  v-model="search"
                  @keyup="getAllSearch"
                  type="text"
                  class="form-control"
                  placeholder="Search for a movie..."
               />
            </div>
         </div>
         <div class="row justify-content-center">
            <div class="d-flex justify-content-center">
               <div
                  class="spinner-border m-5"
                  role="status"
                  :style="{ display: activeDisplay }"
               >
                  <span class="visually-hidden">Loading...</span>
               </div>
            </div>
            <router-link
               v-for="movie in searchMovies"
               :key="movie.id"
               :to="`/detail/${movie.id}`"
               class="col-2 d-flex justify-content-center mt-4"
               style="color: black; text-decoration: none"
            >
               <div class="card justify-content-center">
                  <img
                     :src="
                        'https://image.tmdb.org/t/p/original' +
                           movie.poster_path
                     "
                     class="card-img-top poster"
                     :alt="movie.title"
                  />
                  <div class="card-body">
                     <p class="card-title">
                        {{ movie.title }} ({{ movie.release_date.slice(0, 4) }})
                     </p>
                     <i class="fas fa-star text-warning ">
                        {{ movie.vote_average }}
                     </i>
                  </div>
               </div>
            </router-link>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios"

import Navbar from "../components/Navbar.vue"

const TMDB_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = process.env.VUE_APP_TMDB_TOKEN

export default {
   name: "Search",
   components: { Navbar },
   data() {
      return {
         searchMovies: [],
         search: "",
         activeDisplay: "block"
      }
   },
   methods: {
      getAll() {
         axios({
            method: "GET",
            url: `${TMDB_URL}/search/movie?api_key=${TMDB_TOKEN}&language=en-US&query=${this.$route.query.search}`,
            headers: {
               Authorization: `Bearer ${TMDB_TOKEN}`
            }
         })
            .then(({ data }) => {
               setTimeout(() => {
                  this.activeDisplay = "none"
                  this.searchMovies = data.results
               }, 2500)
            })
            .catch(err => console.log(err))
      },
      getAllSearch() {
         axios({
            method: "GET",
            url: `${TMDB_URL}/search/movie?api_key=${TMDB_TOKEN}&language=en-US&query=${this.search}`,
            headers: {
               Authorization: `Bearer ${TMDB_TOKEN}`
            }
         })
            .then(({ data }) => {
               this.searchMovies = data.results
            })
            .catch(err => console.log(err))
      }
   },
   created() {
      this.getAll()
   }
}
</script>

<style></style>
