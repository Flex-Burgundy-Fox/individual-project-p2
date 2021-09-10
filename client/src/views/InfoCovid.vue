<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideNav />
      <div class="col py-3">
        <div class="card-header">
              <chart-weekly />
        </div>
        <div class="container-fluid mt-2">
          <div class="card card-border-primary">
            <div class="card-header">
          <WeeklyTable />
              <!--Title-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import WeeklyTable from "../components/WeeklyTable.vue";
import ChartWeekly from "../components/ChartWeekly.vue";

export default {
  name: "InfoCovid",
  components: {
    SideNav,
    WeeklyTable,
    ChartWeekly,
  },
  methods: {
    meninggal() {
      this.$router.push("/covid/meninggal");
    },
  },
};
</script>

<style>
</style>