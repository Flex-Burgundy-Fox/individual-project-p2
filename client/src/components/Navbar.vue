<template>
    <nav class="navbar navbar-expand-lg bg-light py-0">
        <a class="navbar-brand" href="#">
            <img
                src="https://i.imgur.com/eGBP6mp.png"
                width="100"
                height="100"
                class="d-inline-block align-center"
                alt=""
        /></a>

        <div class="navbar-nav">
            <router-link class="nav-item nav-link" to="/" href="#"
                ><i class="bi-house fs-1"></i
            ></router-link>
            <router-link class="nav-item nav-link" to="/mentions" href="#"
                ><i class="bi-bell fs-1"></i
            ></router-link>
              <router-link class="nav-item nav-link" to="/publicchat" href="#"
                ><i class="bi-chat-dots fs-1"></i
            ></router-link>
            <div class="dropdown">
                <a
                    href="#"
                    class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                    id="dropdownUser3"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i class="bi-person-circle h2"></i>
                </a>
                <ul
                    class="dropdown-menu text-small shadow"
                    aria-labelledby="dropdownUser3"
                >
                    <li>
                        <router-link
                        class="nav-item nav-link" 
                      
                        to="/profile"
                        href="#"
                        >YOUR PROFILE</router-link
                        >
                    </li>
                    <li>
                        <router-link
                            class="nav-item nav-link"
                            
                            to="/login"
                            href="#"
                            >LOGIN</router-link
                        >
                    </li>
                    <li>
                        <router-link
                            class="nav-item nav-link"
                            to="/register"
                           
                            href="#"
                            >REGISTER</router-link
                        >
                    </li>
                    <li>
                        <a
                            class="nav-item nav-link"
                            @click="logout()"
                          
                            href="#"
                            >LOGOUT</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('/login')
            this.$store.commit('FILL_ACCESS_TOKEN', '')
        }
    }
}
</script>

<style scoped>
a {
    font-family: 'Nunito', sans-serif;
    color: black;
}
</style>
