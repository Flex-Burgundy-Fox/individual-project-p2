<template>
   <div class="row">
      <div class="col-3">
         <nav
            class="navbar navbar-expand d-flex flex-column align-items-start bg-black"
            id="sidebar"
         >
            <ul class="navbar-nav d-flex flex-column mt-5 w-100">
               <li class="nav-item w-100">
                  <router-link to="/" class="nav-link text-light pl-4">
                     Dashboard
                  </router-link>
               </li>
               <hr />
               <li class="nav-item w-100">
                  <router-link
                     to="/account/profile"
                     class="nav-link text-light pl-4"
                  >
                     Account
                  </router-link>
               </li>
               <hr />
               <li class="nav-item w-100">
                  <router-link
                     to="/account/favorite-movie"
                     class="nav-link text-light pl-4"
                  >
                     Favorite Movie
                  </router-link>
               </li>
               <hr />
               <li class="nav-item w-100">
                  <router-link
                     to="/account/history-bills"
                     class="nav-link text-light pl-4"
                  >
                     History Bill
                  </router-link>
               </li>
               <hr />
               <li class="nav-item w-100">
                  <a
                     @click.prevent="logout"
                     class="nav-link text-light pl-4"
                     style="cursor: pointer"
                  >
                     Logout
                  </a>
               </li>
            </ul>
         </nav>
      </div>
      <div class="col">
         <section class="my-container p-4">
            <router-view></router-view>
         </section>
      </div>
   </div>
</template>

<script>
export default {
   name: "Sidebar",
   methods: {
      logout() {
         localStorage.clear()
         const auth2 = gapi.auth2.getAuthInstance()
         auth2.signOut().then(function() {
            console.log("User signed out.")
         })
         this.$router.push({ name: "Dashboard" })
      }
   }
}
</script>

<style scoped>
body {
   min-height: 100vh;
   background-color: #fff;
}

.navbar {
   width: 250px;
   height: 100vh;
   position: fixed;
   background-color: #7952b3;
   transition: 0.4s;
}

.nav-link {
   font-size: 1.25em;
}

.nav-link:active,
.nav-link:focus,
.nav-link:hover {
   background-color: #ffffff26;
}

.my-container {
   transition: 0.4s;
}

.active-nav {
   margin-left: 0;
}
</style>
