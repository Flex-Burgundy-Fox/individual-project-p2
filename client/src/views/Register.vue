<template>
    <section id="register-page">
                <div class="register-page-right">
                     <h1 class="font-weight-bold">Register</h1>
                    <form @submit.prevent="register()">
                        <label >First Name: </label>
                        <input type="first_name" id="first_name" v-model="first_name" required>
                        <label>last Name: </label>
                        <input type="last_name" id="last_name" v-model="last_name" required>
                        <label >Email</label>
                        <input type="email" id="email" v-model="registerEmail" required>
                        <label>Password</label>
                        <input type="password" id="password" v-model="registerPassword" required>
                        <button class="register-btn" type="submit">Register</button>
                    </form>
                </div>
                <div class="register-page-left">
                   <h1 class="text-light">Welcome to Anon.</h1>
                    <img src="https://i.imgur.com/YfO6bwo.png" class="img-fluid">
                    <h1 class="text-light">Where YOU can be YOU.</h1>
                </div>
    </section>
</template>

<script>
export default {

}
</script>

<style>
#register-page {
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    overflow: hidden;
}

.register-page-left {
    width: 60%;
    background-color: black;
    height: 100%;
    display: block;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.register-page-left img {
    width: 60%;
    z-index: 999;
}

.register-page-right {
    width: 40%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.register-page-right h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.register-page-right form {
    display: flex;
    width: 90%;
    flex-direction: column;
    z-index: 99;
}

.register-page-right input {
    margin: 1rem 0;
    height: 30px;
}

.register-btn {
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px 0;
}
</style>