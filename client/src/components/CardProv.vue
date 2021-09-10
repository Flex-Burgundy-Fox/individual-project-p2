<template>
<div class="container">
    <div class="row">
      <div class="col-md-3 mt-2">
        <div class="card-body bg-secondary text-white">
          <!--Title-->
          <div class="d-flex justify-content-between mb-2">
          <i class="fas fa-frown-open" style="font-size: 20px"></i>
            <p class="small">Positif:</p>
            <p >{{ positif.toLocaleString('id-in') }} Orang</p>
          </div>
          <hr class="my-0" />
        </div>
      </div>
      <div class="col-md-3 mt-2">
        <div class="card-body bg-warning text-white">
          <!--Title-->
          <div class="d-flex justify-content-between mb-2 ">
          <i class="fas fa-sad-tear" style="font-size: 20px"></i>
            <p class="small">Dirawat:</p>
            <p >{{ dirawat.value }}</p>
          </div>
          <hr class="my-0" />
        </div>
      </div>
      <div class="col-md-3 mt-2">
        <div class="card-body bg-danger text-white">
          <!--Title-->
          <div class="d-flex justify-content-between mb-2">
          <i class="fas fa-sad-cry" style="font-size: 20px"></i>
            <p class="small">Meninggal :</p>
            <p >
              {{ meninggal.toLocaleString('id-in') }} Orang
            </p>
          </div>
          <hr class="my-0" />
        </div>
      </div>
      <div class="col-md-3 mt-2">
        <div class="card-body bg-success text-white">
          <!--Title-->
          <div class="d-flex justify-content-between mb-2">
           <i class="fas fa-grin" style="font-size: 20px"></i>
            <p class="small">Sembuh:</p>
            <p >{{ sembuh.toLocaleString('id-in') }} Orang</p>
          </div>
          <hr class="my-0" />
        </div>
      </div>
    </div>
    <div>
</template>

<script>
export default {
  name: "CardProv",
  data() {
    return {
      meninggal: "",
      positif: "",
      dirawat: "",
      sembuh: "",
      nameProv: "",
    };
  },
  created() {
    this.nameProv == this.$store.state.nameProv;
    this.$store
      .dispatch("getDataProv")
      .then(({ data }) => {
        let dataProv = data.data.list_data;
        dataProv.forEach((el) => {
          if (el.key === this.nameProv) {
            this.meninggal = el.jumlah_meninggal
            this.positif = el.jumlah_kasus
            this.dirawat = el.jumlah_dirawat
            this.sembuh = el.jumlah_sembuh
          }
        });
      })
      .catch((err) => console.log(err));
  },
  computed: {
    covidData() {
      return this.$store.state.getTotal;
    },
  },
};
</script>

<style>
</style>