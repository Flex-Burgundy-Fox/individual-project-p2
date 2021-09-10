<template>
   <div class="container">
      <NavbarSearch></NavbarSearch>
      <h1>Top Rated</h1>
      <div class="row justify-content-center">
         <div class="col" v-if="topRatedMovies.length > 0">
            <carousel
               :margin="10"
               :loop="true"
               :center="true"
               :nav="false"
               :autoplay="true"
               :autoplayHoverPause="true"
               :autoWidth="true"
               :dots="false"
               :autoplayTimeout="3000"
            >
               <router-link
                  v-for="topRated in topRatedMovies"
                  :key="topRated.id"
                  :to="`/detail/${topRated.id}`"
                  class="card my-card "
                  style="width: 9.5rem"
               >
                  <img
                     :src="
                        'https://image.tmdb.org/t/p/original' +
                           topRated.poster_path
                     "
                     :alt="topRated.title"
                     class="card-img-top"
                  />
               </router-link>
            </carousel>
         </div>
      </div>
      <h1>Trending Week</h1>
      <div class="row justify-content-center ">
         <div class="col" v-if="trendingWeekMovies.length > 0">
            <carousel
               :margin="10"
               :loop="true"
               :center="true"
               :nav="false"
               :autoplay="true"
               :autoplayHoverPause="true"
               :autoWidth="true"
               :dots="false"
               :autoplayTimeout="3000"
            >
               <router-link
                  v-for="trendingWeek in trendingWeekMovies"
                  :key="trendingWeek.id"
                  :to="`/detail/${trendingWeek.id}`"
                  class="card my-card"
                  style="width: 9.5rem"
               >
                  <img
                     :src="
                        'https://image.tmdb.org/t/p/original' +
                           trendingWeek.poster_path
                     "
                     :alt="trendingWeek.title"
                     class="card-img-top"
                  />
               </router-link>
            </carousel>
         </div>
      </div>
      <h1>Trending Day</h1>
      <div class="row justify-content-center ">
         <div class="col" v-if="trendingDayMovies.length > 0">
            <carousel
               :margin="10"
               :loop="true"
               :center="true"
               :nav="false"
               :autoplay="true"
               :autoplayHoverPause="true"
               :autoWidth="true"
               :dots="false"
               :autoplayTimeout="3000"
            >
               <router-link
                  v-for="trendingDay in trendingDayMovies"
                  :key="trendingDay.id"
                  :to="`/detail/${trendingDay.id}`"
                  class="card my-card"
                  style="width: 9.5rem"
               >
                  <img
                     :src="
                        'https://image.tmdb.org/t/p/original' +
                           trendingDay.poster_path
                     "
                     :alt="trendingDay.title"
                     class="card-img-top"
                  />
               </router-link>
            </carousel>
         </div>
      </div>
      <h1>Upcoming</h1>
      <div class="row justify-content-center ">
         <div class="col" v-if="upcomingMovies.length > 0">
            <carousel
               :margin="10"
               :loop="true"
               :center="true"
               :nav="false"
               :autoplay="true"
               :autoplayHoverPause="true"
               :autoWidth="true"
               :dots="false"
               :autoplayTimeout="3000"
            >
               <router-link
                  v-for="upcoming in upcomingMovies"
                  :key="upcoming.id"
                  :to="`/detail/${upcoming.id}`"
                  class="card my-card"
                  style="width: 9.5rem"
               >
                  <img
                     :src="
                        'https://image.tmdb.org/t/p/original' +
                           upcoming.poster_path
                     "
                     :alt="upcoming.title"
                     class="card-img-top"
                  />
               </router-link>
            </carousel>
         </div>
      </div>
   </div>
</template>

<script>
import carousel from "vue-owl-carousel"

import NavbarSearch from "../components/NavbarSearch.vue"

export default {
   name: "Dashboard",
   components: { carousel, NavbarSearch },
   computed: {
      topRatedMovies() {
         return this.$store.state.topRatedMovies
      },
      trendingWeekMovies() {
         return this.$store.state.trendingWeekMovies
      },
      trendingDayMovies() {
         return this.$store.state.trendingDayMovies
      },
      upcomingMovies() {
         return this.$store.state.upcomingMovies
      }
   },
   created() {
      this.$store.dispatch("getTopRated")
      this.$store.dispatch("getTrendingWeekMovies")
      this.$store.dispatch("getTrendingDayMovies")
      this.$store.dispatch("getUpcomingMovies")
   }
}
</script>

<style scoped>
a.card.my-card:hover {
   border: 5px solid #41b883;
}
</style>
