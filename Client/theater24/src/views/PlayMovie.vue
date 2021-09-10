<template>
   <div class="container text-center">
      <div class="row justify-content-center">
         <div class="col-1 mt-5">
            <button
               @click.prevent="$router.go(-1)"
               type="button"
               class="btn btn-secondary"
            >
               Back
            </button>
         </div>
         <div class="col d-flex justify-content-center mt-5">
            <iframe
               v-if="newRoleUser === 'basic'"
               class="justify-content-center"
               width="420"
               height="315"
               frameborder="0"
               :src="
                  `https://www.youtube.com/embed/${$route.params.videoId}?start=0&end=15&autoplay=1&mute=0&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&autohide=0&controls=0&disablekb=1 
                `
               "
            ></iframe>
            <iframe
               v-else
               class="justify-content-center"
               width="420"
               height="315"
               frameborder="0"
               allowfullscreen
               :src="
                  `https://www.youtube-nocookie.com/embed/${$route.params.videoId}?modestbranding=1&showinfo=0&cc_load_policy=1
                `
               "
            ></iframe>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios"

const baseURL = "https://theater24.herokuapp.com"

export default {
   name: "PlayMovie",
   data() {
      return {
         newRoleUser: ""
      }
   },
   methods: {
      getNewRoleUser() {
         axios({
            method: "GET",
            url: `${baseURL}/users`,
            headers: {
               id: localStorage.getItem("id")
            }
         })
            .then(({ data }) => {
               this.newRoleUser = data.role
            })
            .catch(err => console.log(err))
      }
   },
   created() {
      this.getNewRoleUser()
   }
}
</script>

<style></style>
