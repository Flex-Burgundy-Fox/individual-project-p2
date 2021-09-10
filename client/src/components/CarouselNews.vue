<template>
  <div class="row py-5">
    <div class="col-md-6 mb-4 mt-4">
      <div
        class="bg-image hover-overlay ripple shadow-2-strong rounded-5"
        data-mdb-ripple-color="light"
      >
        <img :src="news.urlToImage" class="img-fluid" />
        <a :href="news.url">
          <div
            class="mask"
            style="background-color: rgba(251, 251, 251, 0.15)"
          ></div>
        </a>
      </div>
    </div>

    <div class="col-md-6 mb-4">
      <span class="badge bg-info px-2 py-1 shadow-1-strong mb-3">{{
        news.source.name
      }}</span>
      <h4>
        <strong>{{ news.title }}</strong>
      </h4>
      <p class="text-muted">
        {{ news.description }}
      </p>
      <a :href="news.url">>> read more </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselNews",
  computed: {
    news() {
      return this.$store.state.randomNews
    }
  },
  created() {
    this.$store.dispatch("covidNews");
  },
};
</script>

<style>
</style>