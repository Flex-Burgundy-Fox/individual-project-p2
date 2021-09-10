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
            <h1>Register to Covid And News</h1>
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
                  <button @click.prevent="register" class="btn-reg">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";

export default {
  name: "register",
  components: {
    SideNav,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.user);
    },
  },
};
</script>

<style>
</style>
