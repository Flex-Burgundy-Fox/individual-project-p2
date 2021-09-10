<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3 mt-2">
        <div class="card-body bg-secondary text-white">
          <!--Title-->
          <i class="fas fa-frown-open" style="font-size: 30px"></i>
          <hr class="my-0" />
          <div class="d-flex justify-content-between mb-2">
            <p class="small">Positif:</p>
            <p >{{ covidData.jumlah_positif_kum.value.toLocaleString('id-in') }} Orang</p>
          </div>
          <hr class="my-0" />
        </div>
      </div>
      <div class="col-md-3 mt-2">
        <div class="card-body bg-warning text-white">
          <!--Title-->
          <i class="fas fa-sad-tear" style="font-size: 30px"></i>
          <hr class="my-0" />
          <div class="d-flex justify-content-between mb-2 ">
            <p class="small">Dirawat:</p>
            <p >{{ covidData.jumlah_dirawat_kum.value }}</p>
          </div>
          <hr class="my-0" />
        </div>
      </div>
      <div class="col-md-3 mt-2">
        <div class="card-body bg-danger text-white">
          <!--Title-->
          <i class="fas fa-sad-cry" style="font-size: 30px"></i>
          <hr class="my-0" />
          <div class="d-flex justify-content-between mb-2">
            <p class="small">Meninggal :</p>
            <p >
              {{ covidData.jumlah_meninggal_kum.value.toLocaleString('id-in') }} Orang
            </p>
          </div>
          <hr class="my-0" />
        </div>
      </div>
      <div class="col-md-3 mt-2">
        <div class="card-body bg-success text-white">
          <!--Title-->
          <i class="fas fa-grin" style="font-size: 30px"></i>
          <hr class="my-0" />
          <div class="d-flex justify-content-between mb-2">
            <p class="small">Sembuh:</p>
            <p >{{ covidData.jumlah_sembuh_kum.value.toLocaleString('id-in') }} Orang</p>
          </div>
          <hr class="my-0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardInfoCovid",
  created() {
    this.$store
      .dispatch("getWeekly")
      .then(({ data }) => {
        this.$store.commit("get_total_today", data.data[5]);
      })
      .catch((err) => console.log(err));
  },
  computed: {
    covidData() {
      return this.$store.state.getTotal;
    },
  }
};
</script>

<style>
</style>