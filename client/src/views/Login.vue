<template>
    <section id="login-page">
                <div class="login-page-left">
                    <h1 class="text-light">Welcome to Anon.</h1>
                    <img src="https://i.imgur.com/YfO6bwo.png" class="img-fluid">
                    <h1 class="text-light">Where YOU can be YOU.</h1>
                </div>
                <div class="login-page-right">
                    <h1 class="font-weight-bold">Login</h1>
                    <form @submit.prevent="login()">
                        <label >Email :</label>
                        <input type="email" id="login-email" v-model="email" required>
                        <label>Password :</label>
                        <input type="password" id="login-password" v-model="password" required>
                        <button class="login-btn" type="submit">Login</button>
                        <p class="text-center mt-3">or sign in with Google:</p>
                        <center>
                        <GoogleLogin :params="paramsGoogle" :onSuccess="onSuccess" :onFailure="onFailure">Google Login</GoogleLogin>
                        </center>
                    </form>
                </div>
    </section>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios'
export default {
    name: 'Login',
    components: {
        GoogleLogin
    },
    data () {
        return {
            email: '',
            password: '',
            paramsGoogle: {
                client_id: "385717324016-upu14jdk1hpcf9tc5sf9oicifete35p6.apps.googleusercontent.com"
            },
        }
    },
    methods: {
        login() {
            let email = this.email
            let password = this.password
            axios({
                method: 'POST',
                url: 'https://anon-app-h8-phase2.herokuapp.com/login',
                data: {
                    email,
                    password
                }
            })
            .then(({data}) => {
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })
                localStorage.setItem('access_token', data.access_token)
                this.$router.push({ path: '/' })
                this.$store.commit('FILL_ACCESS_TOKEN', data.access_token)
                localStorage.setItem('user_avatar', data.avatar)
                localStorage.setItem('user_id', data.id)
                // this.$store.commit('GET_USER_AVATAR', data.avatar )
           })
           .catch(err => {
               this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong Email / Password!',
                })
               console.log(err)
           })
           .finally(() => {
               this.email = ''
               this.password = ''
           })
        },
        onSuccess(googleUser) {
            // console.log(googleUser);
             let token = googleUser.getAuthResponse().id_token;
            //  console.log(token)
             axios({
			    method: 'POST',
			    url: 'https://anon-app-h8-phase2.herokuapp.com/login-google',
                data: {
                    token: token
                },
		    })
			.then(({ data }) => {
                // console.log(data)
                const Toast = this.$swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully with Google'
                })
                // console.log(data)
			    localStorage.setItem('access_token', data.access_token)
                this.$router.push({ path: '/' })
                this.$store.commit('FILL_ACCESS_TOKEN', data.access_token)
                localStorage.setItem('user_avatar', data.avatar)
                localStorage.setItem('user_id', data.id)
                // this.$store.commit('GET_USER', { avatar : data.avatar, UserId: data.UserId } ) 
			})
			.catch(err =>  console.log(err))
 
            // This only gets the user information: id, name, imageUrl and email
            // console.log(googleUser.getBasicProfile());
        },
        onFailure(err) {
            // console.log('halo dari failure')
            console.log(err)
        }
    }
    
}
</script>

<style scoped>
#login-page {
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    overflow: hidden;
}

.login-page-left {
    width: 60%;
    background-color: black;
    height: 100%;
    display: block;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.login-page-left img {
    width: 60%;
    z-index: 999;
}

.login-page-right {
    width: 40%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-page-right h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.login-page-right form {
    display: flex;
    width: 90%;
    flex-direction: column;
    z-index: 99;
}

.login-page-right input {
    margin: 1rem 0;
    height: 30px;
}

.login-btn {
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px 0;
}
</style>