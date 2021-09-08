<template>
<nav id='navbar' class="navbar navbar-expand-lg navbar-light px-4 sticky-top">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">
      <img alt="Vue logo" src="../assets/logo.png">
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#" >Search Recipe</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent='$router.push("/addRecipe")'>Add Recipe</a>
        </li>
        <!-- <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Action
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li></li>
            <li><a class="dropdown-item" href="#">Something</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> -->
      </ul>
      <!-- <button v-if='$route.name !== "Cart"' class='border-0 mx-2' style="background-color:transparent" @click="$router.push('/myCart')">
        <i class="fs-4 bi bi-cart2"></i>
      </button> -->

      <!-- LOGIN BUTTON AND PROFILE BUTTON -->
      <div v-if='isLogin' class="dropdown" id="profile"> 
          <a class="nav-link dropdown-toggle text-muted" id="profileDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Welcome, {{$store.state.userData.name}}
          </a>
          <ul class="dropdown-menu" aria-labelledby="profileDropdown">
            <li><router-link class="dropdown-item" to="/profile" >My Recipe</router-link></li>
            <li><a class="dropdown-item" href="#" @click.prevent='logout'>Logout</a></li>
          </ul>
      </div>
      <a v-else class='fs-4 btn btn_icon' data-bs-toggle="modal" data-bs-target="#loginModal">
        <i class="bi bi-person-square"></i>
      </a>
    </div>
  </div>
  
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout(){
      delete localStorage.access_token
      this.$store.commit('SET_TOKEN','')
      this.$store.commit('SET_USERDATA',{
        name: '',
        email: '',
        status: '',
      })
      if(this.$route.path !== '/') this.$router.push('/')
    }

  },
  computed :{
    isLogin(){
      return this.$store.state.token
    }
  }

}
</script>

<style>
/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */

#navbar {
  background: linear-gradient(180deg, rgba(217,206,214,1) 0%, rgba(254,254,254,1) 100%);
}

</style>