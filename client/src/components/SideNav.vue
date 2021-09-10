<template>
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 nav">
    <div
      class="
        d-flex
        flex-column
        align-items-center align-items-sm-start
        px-3
        pt-2
        min-vh-100
      "
    >
      <!-- Dashboard -->
      <a
        href="/"
        class="
          d-flex
          align-items-center
          pb-3
          mb-md-0
          me-md-auto
          text-black text-decoration-none
        "
      >
        <i class="fas fa-home" style="font-size: 30px"> Dashboard </i>
      </a>
      <hr />
      <ul
        class="
          nav nav-pills
          flex-column
          mb-sm-auto mb-0
          align-items-center align-items-sm-start
        "
        id="menu"
      >
        <!-- Covid Info -->
        <li @click.prevent="infoCovid" class="nav-li">
          <i class="fas fa-info-circle"></i>
          <span class="ms-1 d-none d-sm-inline">Covid Info</span>
          <hr />
        </li>
        <li v-if="isLogin" @click.prevent="covidMap" class="nav-li">
          <i class="fas fa-map-marked-alt"></i>
          <span class="d-none d-sm-inline"> Map</span>
          <hr />
        </li>
        <!-- News -->
        <li class="nav-li" @click.prevent="covidNews">
          <i class="far fa-newspaper"></i>
          <span class="ms-1 d-none d-sm-inline"> News</span>
          <hr />
        </li>
        <li class="log">
          <span v-if="!isLogin" class="log px-0 text-black">
            <i class="fas fa-sign-in-alt"></i>
            <span @click.prevent="login" class="d-none d-sm-inline">
              Login</span
            >
          </span>
          <span v-else-if="isLogin" class="log px-0 text-black">
            <i class="fas fa-sign-out-alt"></i>
            <span @click.prevent="logout" class="d-none d-sm-inline">
              Logout</span
            >
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      isLogin: true,
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    infoCovid() {
      this.$router.push("/covid");
    },
    covidNews() {
      this.$router.push("/covid-news");
    },
    covidMap() {
      this.$router.push("/covid-map");
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
  created() {
    if (!localStorage.getItem("access_token")) {
      this.isLogin = false;
    }
  },
};
</script>

<style>
.nav {
  background: rgb(90, 88, 88);
  color: white;
  border-radius: 10px;
}
.nav-li {
  text-align: center;
  cursor: pointer;
  color: black;
}
.nav-li:hover {
  font-size: 25px;
  transition: 0.5s;
}
.log {
  margin-top: 40px;
  text-align: right;
}
.log:hover {
  cursor: pointer;
  font-size: 20px;
  transition: 0.5s;
}
</style>
