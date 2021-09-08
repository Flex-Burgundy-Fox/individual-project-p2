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
                        <input type="email" id="login-email" v-model="loginEmail" required>
                        <label>Password :</label>
                        <input type="password" id="login-password" v-model="loginPassword" required>
                        <button class="login-btn" type="submit">Login</button>
                        <p class="text-center mt-3">or sign in with Google:</p>
                        <center>
                        <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Google Login</GoogleLogin>
                        </center>
                    </form>
                </div>
    </section>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    name: 'Login',
    data () {
        return {

        }
    },
    
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