<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideNav />
      <div class="col py-3">
        <div class="row g-0">
          <div class="col-lg-5">
            <img
              src="https://pngimg.com/uploads/coronavirus/coronavirus_PNG35.png"
              alt=""
            />
          </div>
          <div class="col-lg-7 text-center py-4">
            <h1>Login to Covid And News</h1>
            <form>
              <div class="form-row py-2 pt-5">
                <div class="offset-1 col-lg-10">
                  <input
                    v-model="user.email"
                    type="email"
                    class="input px-4"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="form-row py-2">
                <div class="offset-1 col-lg-10">
                  <input
                    v-model="user.password"
                    type="password"
                    class="input px-4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="form-row py-2">
                <div class="offset-1 col-lg-10">
                  <button @click.prevent="login" class="btn-login">
                    Log In
                  </button>
                </div>
              </div>
            </form>
            <p>Or Login With</p>
            <GoogleLogin
              :params="params"
              :onSuccess="onSuccess"
              :onFailure="onFailure"
              ><i class="fab fa-google-plus-square"></i
            ></GoogleLogin>
            <div class="py-2">
              <p>Dont have an account?</p>
              <button @click="register" class="btn-reg">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import GoogleLogin from "vue-google-login";
import axios from "axios";
import Toasted from 'vue-toasted'

Vue.use(Toasted)

let path = "https://coke-project.herokuapp.com/";

export default {
  name: "Login",
  components: {
    SideNav,
    GoogleLogin,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      params: {
        client_id: "480202074265-l80rta3j4bfleq5pna4e3tqolgt0htaq.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.user);
    },
    register() {
      this.$router.push("/register");
    },
    onSuccess(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: path + "users/login-google",
        data: {
          token: id_token,
        },
      })
        .then((data) => {
          console.log(data);
          localStorage.setItem("access_token", data.data.access_token);
          this.$router.push("/");
          Vue.toasted.show(`Logged in, please enjoy!!`, {
            type: "success",
            theme: "bubble",
            position: "top-right",
            duration: 5000,
          });
        })
        .catch((err) => {
           Vue.toasted.show(`${err.response.data.error} !!`, {
            type: 'error',
            theme: "bubble",
            position: "top-center",
            duration: 5000
          });
          console.log('fail disini');
          console.log(err);
        });
    },
    onFailure(err) {
      console.log("ini fail");
      console.log(err);
    },
  },
};
</script>

<style>
.container {
  padding: 30px 10px;
}

.row-login {
  background: rgba(255, 255, 255, 0.568);
  border-radius: 10px;
  box-shadow: 12px 12px 22px;
}

.input {
  height: 50px;
  width: 70%;
  border: none;
  outline: none;
  border-radius: 60px;
  box-shadow: 7px 9px 21px 10px rgba(82, 68, 68, 0.37);
  -webkit-box-shadow: 7px 9px 21px 10px rgba(82, 68, 68, 0.37);
  -moz-box-shadow: 7px 9px 21px 10px rgba(82, 68, 68, 0.37);
}

.btn-login {
  height: 50px;
  width: 50%;
  border: none;
  outline: none;
  border-radius: 60px;
  font-weight: 500;
  color: white;
  background: rgb(30, 5, 172);
}

.btn-login:hover {
  background: black;
  transition: 0.5s;
  box-shadow: 7px 9px 21px 10px rgba(82, 68, 68, 0.37);
  -webkit-box-shadow: 7px 9px 21px 10px rgba(82, 68, 68, 0.37);
  -moz-box-shadow: 7px 9px 21px 10px rgba(82, 68, 68, 0.37);
}

.btn-reg {
  height: 50px;
  width: 20%;
  border: none;
  outline: none;
  border-radius: 60px;
  font-weight: 500;
  color: white;
  background: rgb(54, 26, 131);
}

.btn-reg:hover {
  background: black;
  transition: 0.5s;
  box-shadow: 7px 9px 21px 10px rgba(82, 68, 68, 0.37);
  -webkit-box-shadow: 7px 9px 21px 10px rgba(82, 68, 68, 0.37);
  -moz-box-shadow: 7px 9px 21px 10px rgba(82, 68, 68, 0.37);
}

.fa-google-plus-square {
  font-size: 2.5rem;
  color: green;
}
</style>
