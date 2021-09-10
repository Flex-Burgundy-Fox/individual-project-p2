<template>
   <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
         <div class="container-fluid">
            <router-link to="/" class="navbar-brand">
               THEATER24
            </router-link>
            <button
               class="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarSupportedContent"
               aria-controls="navbarSupportedContent"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
               <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                     <router-link to="/account/profile" class="nav-link">
                        My Account
                     </router-link>
                  </li>
               </ul>
               <form id="search" class="d-flex">
                  <input
                     v-model="search"
                     class="form-control me-2"
                     type="search"
                     placeholder="Search for a movie..."
                     aria-label="Search"
                  />
                  <router-link
                     :to="{ path: '/search', query: { search: search } }"
                     class="btn btn-outline-success"
                     type="submit"
                  >
                     Search
                  </router-link>
               </form>
               <!-- Button trigger modal -->
               <button
                  v-show="!loginSuccess"
                  type="button"
                  class="btn btn-primary ms-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
               >
                  Login
               </button>
            </div>
         </div>
      </nav>

      <!-- Modal -->
      <div
         class="modal fade"
         id="exampleModal"
         tabindex="-1"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
      >
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                  <button
                     type="button"
                     class="btn-close"
                     data-bs-dismiss="modal"
                     aria-label="Close"
                  ></button>
               </div>
               <div class="modal-body">
                  <form>
                     <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                           Email address
                        </label>
                        <input
                           v-model="email"
                           type="email"
                           class="form-control"
                           id="exampleInputEmail1"
                           aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" class="form-text">
                           We'll never share your email with anyone else.
                        </div>
                     </div>
                     <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                           Password
                        </label>
                        <input
                           v-model="password"
                           type="password"
                           class="form-control"
                           id="exampleInputPassword1"
                        />
                     </div>
                     <button
                        id="successLogin"
                        @click.prevent="login"
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                     >
                        Login
                     </button>
                  </form>
                  <hr />
                  <GoogleLogin
                     :params="params"
                     :onSuccess="onSuccess"
                     :onFailure="onFailure"
                     id="google-login"
                     data-bs-dismiss="modal"
                  >
                     <img
                        src="../assets/google-icon.png"
                        alt="Google Icon"
                        style="width: 25px; margin-right: 3px"
                     />
                     Sign up using Google
                  </GoogleLogin>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios"
const baseURL = "https://theater24.herokuapp.com"

// It can also be imported as { GoogleLogin }
import GoogleLogin from "vue-google-login"

import Swal from "sweetalert2/dist/sweetalert2.js"

export default {
   name: "NavbarSearch",
   components: {
      GoogleLogin
   },
   data() {
      return {
         email: "",
         password: "",
         loginSuccess: "",
         search: "",
         // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
         params: {
            client_id:
               "716402632818-tm799insg8d26m4mdbvho4o1ca5unr6v.apps.googleusercontent.com"
         }
      }
   },
   methods: {
      login() {
         axios({
            method: "POST",
            url: `${baseURL}/users/login`,
            data: {
               email: this.email,
               password: this.password
            }
         })
            .then(({ data }) => {
               const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: toast => {
                     toast.addEventListener("mouseenter", Swal.stopTimer)
                     toast.addEventListener("mouseleave", Swal.resumeTimer)
                  }
               })

               Toast.fire({
                  icon: "success",
                  title: "Signed in successfully"
               })

               localStorage.setItem("id", data.id)
               localStorage.setItem("email", data.email)
               localStorage.setItem("role", data.role)
               localStorage.setItem("access_token", data.access_token)

               this.$router.push("/account/profile")
            })
            .catch(_ => {
               Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:
                     "The username and password you entered did not match our records. Please double-check and try again"
               })
            })
            .finally(_ => {
               this.email = ""
               this.password = ""
            })
      },
      onSuccess(googleUser) {
         // This only gets the user information: id, name, imageUrl and email

         const id_token = googleUser.getAuthResponse().id_token

         axios({
            method: "POST",
            url: `${baseURL}/users/google-login`,
            data: {
               token: id_token
            }
         })
            .then(({ data }) => {
               const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: toast => {
                     toast.addEventListener("mouseenter", Swal.stopTimer)
                     toast.addEventListener("mouseleave", Swal.resumeTimer)
                  }
               })

               Toast.fire({
                  icon: "success",
                  title: "Signed in successfully"
               })

               localStorage.setItem("id", data.id)
               localStorage.setItem("email", data.email)
               localStorage.setItem("role", data.role)
               localStorage.setItem("access_token", data.access_token)

               this.$router.push("/account/profile")
            })
            .catch(err => {
               Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:
                     "The username and password you entered did not match our records. Please double-check and try again"
               })
            })
      },
      onFailure(error) {
         // `error` contains any error occurred.
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error
         })
      }
   },
   created() {
      this.loginSuccess = localStorage.getItem("access_token")
   }
}
</script>

<style scoped>
#google-login {
   display: inline-block;
   background: white;
   color: #444;
   width: 100%;
   height: 38px;
   border-radius: 5px;
   border: thin solid #888;
   box-shadow: 1px 1px 1px grey;
   white-space: nowrap;
   font-size: 16px;
   padding: 6px 12px;
   display: flex;
   align-items: center;
   justify-content: center;
}

#google-login:hover {
   background: rgb(240, 240, 240);
}
</style>
