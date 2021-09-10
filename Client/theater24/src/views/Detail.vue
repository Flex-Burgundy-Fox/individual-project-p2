<template>
   <div
      class="jumbotron jumbotron-fluid d-flex justify-content-center align-item-center bg-transparent"
      :style="
         `background-image: url(https://image.tmdb.org/t/p/w1280${detailMovie.backdrop_path})`
      "
   >
      <div class="container">
         <div class="row justify-content-center pt-5">
            <div class="col-2">
               <img
                  :src="
                     'https://image.tmdb.org/t/p/original' +
                        detailMovie.poster_path
                  "
                  class="poster mb-3"
                  style="border-radius: 3px; width: 13rem; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
               />
               <div class="d-flex justify-content-evenly mb-2">
                  <i
                     class="fas fa-star text-warning d-flex align-items-center d-inline-block"
                  >
                     <span class="ms-1 text-white">
                        {{ detailMovie.vote_average }}
                     </span>
                  </i>
               </div>
               <div class="d-flex flex-wrap justify-content-center">
                  <button
                     v-for="genre in detailMovie.genres"
                     :key="genre.id"
                     class="btn btn-outline-light rounded-pill m-1"
                     style="font-size: 10px"
                  >
                     {{ genre.name }}
                  </button>
               </div>
            </div>
            <div class="col-8" style="color: white">
               <div class="row justify-content-center">
                  <div class="col-10">
                     <h1 class="text-start" style="text-shadow: #fff 0 0 5px">
                        {{ detailMovie.title }} ({{
                           detailMovie.release_date
                              ? detailMovie.release_date.slice(0, 4)
                              : ""
                        }})
                     </h1>
                     <p class="text-start">
                        {{
                           detailMovie.original_language
                              ? detailMovie.original_language.toUpperCase()
                              : ""
                        }}
                        | {{ detailMovie.runtime }} min
                     </p>
                     <blockquote
                        v-show="detailMovie.tagline"
                        class="blockquote text-start fst-italic"
                     >
                        <p>"{{ detailMovie.tagline }}"</p>
                     </blockquote>
                     <p class="text-start">
                        {{ detailMovie.overview }}
                     </p>

                     <button
                        @click.prevent="$router.go(-1)"
                        type="button"
                        class="btn btn-light me-3"
                     >
                        Back
                     </button>

                     <button
                        v-if="!favMovie && roleUser === 'pro'"
                        @click.prevent="addFavMovie"
                        type="button"
                        class="btn btn-primary me-3"
                     >
                        Add to Favorite
                     </button>
                     <button
                        v-else-if="favMovie && roleUser === 'pro'"
                        @click.prevent="cancelFavMovie"
                        type="button"
                        class="btn btn-danger me-3"
                     >
                        Cancel to Favorite
                     </button>
                     <router-link
                        :to="`/play-movie/${detailMovie.videos.results[0].key}`"
                        type="button"
                        class="btn btn-success"
                     >
                        Play Movie
                     </router-link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios"

const baseURL = "https://theater24.herokuapp.com"

const TMDB_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = process.env.VUE_APP_TMDB_TOKEN

export default {
   name: "DetailMovie",
   data() {
      return {
         detailMovie: [],
         MovieId: "",
         favMovie: false,
         roleUser: ""
      }
   },
   methods: {
      getDetailMovie() {
         axios({
            method: "GET",
            url: `${TMDB_URL}/movie/${this.$route.params.id}?api_key=e682726cd15fa8d75b833d9544e347ca&append_to_response=videos`,
            headers: {
               Authorization: `Bearer ${TMDB_TOKEN}`
            }
         })
            .then(({ data }) => {
               this.detailMovie = data
               this.MovieId = data.id
            })
            .catch(err => console.log(err))
      },
      checkFavMovie() {
         axios({
            method: "GET",
            url: `${baseURL}/favoriteMovies`,
            headers: {
               access_token: localStorage.getItem("access_token"),
               MovieId: this.$route.params.id,
               UserId: localStorage.getItem("id")
            }
         })
            .then(({ data }) => {
               if (data.message) {
                  this.favMovie = true
               } else {
                  this.favMovie = false
               }
            })
            .catch(err => console.log(err))
      },
      addFavMovie() {
         axios({
            method: "POST",
            url: `${baseURL}/favoriteMovies`,
            data: {
               MovieId: this.MovieId,
               UserId: localStorage.getItem("id")
            },
            headers: {
               access_token: localStorage.getItem("access_token")
            }
         })
            .then(data => {
               if (data.statusText === "Created") {
                  this.favMovie = true
               } else {
                  this.favMovie = false
               }
            })
            .catch(err => console.log(err))
      },
      cancelFavMovie() {
         axios({
            method: "DELETE",
            url: `${baseURL}/favoriteMovies/${this.MovieId}`,
            headers: {
               access_token: localStorage.getItem("access_token"),
               UserId: localStorage.getItem("id")
            }
         })
            .then(({ data }) => {
               if (
                  data.success_message === "Cancel favorite movie successfully"
               ) {
                  this.favMovie = false
               }
            })
            .catch(err => console.log(err))
      },
      fetchUser() {
         axios({
            method: "GET",
            url: `${baseURL}/users`,
            headers: {
               id: localStorage.getItem("id")
            }
         })
            .then(({ data }) => {
               this.roleUser = data.role
            })
            .catch(err => console.log(err))
      }
   },
   created() {
      this.checkFavMovie()
      this.getDetailMovie()
      this.fetchUser()
   }
}
</script>

<style scoped>
.jumbotron {
   background-size: cover;
   min-height: 100vh;
   text-align: center;
   position: relative;
   overflow: hidden;
}

.jumbotron .row {
   z-index: 1;
   position: relative;
}

.jumbotron::after {
   content: "";
   display: block;
   width: 100%;
   height: 100%;
   background-image: radial-gradient(circle, rgba(0, 0, 0, 0.5) 0%, #000 100%);
   position: absolute;
   bottom: 0;
}

.poster {
   box-shadow: 0 0 30px 1px #000;
   transition: all 50ms ease;
}

.poster:hover {
   transform: scale(1.1);
}

.icon-play {
   color: #41b883;
   transition: all 50ms ease;
}

.icon-play:hover {
   transform: scale(1.3);
}
</style>
