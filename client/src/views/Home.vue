<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideNav />
      <div class="col py-3">
        <div class="card-header">
          <h3 class="card-title">Indonesian Covid Case Total</h3>
          <hr class="my-0" />
          <CardInfoCovid />
        </div>
        <div class="col py-3">
        <div class="card-header">
        <h3 class="card-title mt-3">Random Indonesian Covid News</h3>
        <hr class="my-0" />
        <CarouselNews />
      </div>
      </div>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideNav from "../components/SideNav.vue";
import CarouselNews from "../components/CarouselNews.vue";
import CardInfoCovid from "../components/CardInfoCovid.vue";

export default {
  name: "Home",
  components: {
    SideNav,
    CarouselNews,
    CardInfoCovid,
  },
  created() {},
};
</script>

<style>
.double-nav .breadcrumb-dn {
  color: #fff;
}
</style>
