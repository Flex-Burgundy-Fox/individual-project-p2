<template>
  <div class="container mb-5 mt-3">
    <div class="card card-border-primary">
      <div class="card-header">
          <h5 class="card-title">Weekly Case In Indonesia (Table)</h5>
        </div>
      <div class="card-body">
        <table class="table table-striped table-hover h-auto" id="dataTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Positif</th>
              <th>Sembuh</th>
              <th>Dirawat</th>
              <th>Meninggal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="covid in covidsData" :key="covid.key_as_string">
              <td>{{ new Date(covid.key_as_string).toLocaleDateString() }}</td>
              <td>{{ covid.jumlah_positif.value.toLocaleString() }}</td>
              <td>{{ covid.jumlah_sembuh.value.toLocaleString() }}</td>
              <td>{{ (-1*covid.jumlah_dirawat.value).toLocaleString() }}</td>
              <td>{{ covid.jumlah_meninggal.value.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeeklyTable",
  created() {
    this.getWeekly();
  },
  computed: {
    covidsData() {
      return this.$store.state.getWeekly;
    },
  },
  methods: {
    getWeekly() {
      this.$store.dispatch("getWeekly")
      .then(({data}) => {
        this.$store.commit('get_total_today', data.data[5])
        this.$store.commit('get_weekly', data.data)
      })
      .catch((err) => console.log(err))
    },
  },
};
</script>

<style>
</style>