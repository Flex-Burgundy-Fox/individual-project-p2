<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideNav />
      <div class="col py-3">
        <div class="card-header">
          <h3 class="card-title">Covid News Indonesia</h3>
          <hr class="my-0" />
        </div>
          <div v-for="data in news" :key="data.source.id" class="row sm-6">
            <div class="col-md-6 mb-4 mt-4">
              <div
                class="bg-image hover-overlay ripple shadow-2-strong rounded-5"
                data-mdb-ripple-color="light"
              >
                <img :src="data.urlToImage" class="img-fluid" />
                <a :href="data.url">
                  <div
                    class="mask"
                    style="background-color: rgba(251, 251, 251, 0.15)"
                  ></div>
                </a>
              </div>
            </div>

            <div class="col-md-6 mb-4">
              <span class="badge bg-info px-2 py-1 shadow-1-strong mb-3">{{
                data.source.name
              }}</span>
              <h4>
                <strong>{{ data.title }}</strong>
              </h4>
              <p class="text-muted">{{ data.description }}</p>
              <a :href="data.url"> >> read more </a>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";

export default {
  name: "NewsCat",
  data() {
    return {
      news: [],
    };
  },
  components: {
    SideNav,
  },
  mounted() {
    console.log(this.news, "here");
  },
};
</script>

<style>
</style>