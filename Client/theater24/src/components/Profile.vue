<template>
   <div>
      <h2 class="text-center">My Account</h2>
      <hr />
      <div class="row justify-content-center">
         <div class="col-sm-6">
            <div class="card text-center">
               <img
                  src="https://avatars.githubusercontent.com/u/74331750?v=4"
                  class="card-img-top rounded-circle mx-auto d-block"
                  alt="https://github.com/panjinmaulana"
                  style="width: 9rem"
               />
               <div class="card-body">
                  <h5 class="card-title">{{ emailUser.toUpperCase() }}</h5>
                  <a
                     v-show="roleUser === 'pro'"
                     class="btn btn-outline-primary"
                  >
                     {{ roleUser.toUpperCase() }}
                  </a>
                  <a
                     v-show="roleUser === 'basic'"
                     class="btn btn-outline-warning"
                  >
                     {{ roleUser.toUpperCase() }}
                  </a>
                  <p v-show="roleUser === 'basic'" class="card-text">
                     Would you like to subscribe with us ?
                     <button
                        @click.prevent="subscribe"
                        type="button"
                        class="btn btn-success"
                     >
                        Subscribe
                     </button>
                  </p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios"

const baseURL = "https://theater24.herokuapp.com"

export default {
   name: "Profile",
   data() {
      return {
         idUser: localStorage.getItem("id"),
         emailUser: "",
         roleUser: ""
      }
   },
   methods: {
      fetchUser() {
         axios({
            method: "GET",
            url: `${baseURL}/users`,
            headers: {
               id: localStorage.getItem("id")
            }
         })
            .then(({ data }) => {
               this.emailUser = data.email
               this.roleUser = data.role
            })
            .catch(err => console.log(err))
      },
      subscribe() {
         const data = {
            transaction_details: {
               order_id: `THEATER-24-${new Date().getTime()}-${this.idUser}`,
               gross_amount: 49900
            },
            credit_card: {
               secure: true
            }
         }

         axios({
            method: "POST",
            url: `${baseURL}/bills`,
            data: data,
            headers: {
               access_token: localStorage.getItem("access_token")
            }
         })
            .then(({ data }) => (window.location.href = data.data.redirect_url))
            .catch(err => console.log(err))
      }
   },
   created() {
      this.fetchUser()
   }
}
</script>

<style></style>
