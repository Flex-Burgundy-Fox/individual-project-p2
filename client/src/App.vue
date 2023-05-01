<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <LoginModal />
    <RegisterModal></RegisterModal>
    @ <!-- to remove unkonw gap -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import LoginModal from '@/components/LoginModal.vue'
import RegisterModal from '@/components/RegisterModal.vue'

export default{
  name: 'Home',
  components: {
    Navbar, LoginModal, RegisterModal
  },
  created(){
    if(localStorage.access_token){ 
      this.$store.commit('SET_TOKEN', localStorage.access_token)
      this.$store.dispatch('fetchUserData', {access_token : localStorage.access_token})
      this.$store.dispatch('fetchUserRecipe')
      this.$store.dispatch('fetchPurchasedRecipe')
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-image: url('https://img.wallpapersafari.com/desktop/1440/900/26/92/0KH5pV.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
  /* height: 100%; */
}

</style>
