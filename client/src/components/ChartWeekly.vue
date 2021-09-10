<template>
  <div class="container mb-5 mt-3">
    <div class="card card-border-primary">
      <div class="card-header">
        <h5 class="card-title">Weekly Case In Indonesia (Chart)</h5>
        <hr class="mt-0" />
        <div class="card-body">
          <div id="ChartWeekly">
            <line-chart
              :chartData="chartData"
              :options="chartOptions"
            ></line-chart>
            <!-- <button @click="getWeekly()">Get Data</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueCharts from "vue-chartjs";
import { Bar, mixins } from "vue-chartjs";

var LineChart = Vue.component("line-chart", {
  extends: VueCharts.Line,
  mixins: [mixins.reactiveProp],
  // Props need to be called chartData and options because of reactive mixins.
  props: ["options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
});

export default {
  name: "ChartWeekly",
  components: {
    LineChart,
  },
  data() {
    return {
      chartData: {},
      chartOptions: { responsive: true, maintainAspectRatio: false },
    };
  },
  mounted() {
    this.getWeekly();
  },
  methods: {
    fillData(label, newData) {
      this.chartData = {
        labels: label,
        datasets: [
          {
            label: "meninggal",
            backgroundColor: "#D6A4B3",
            data: newData.meninggal,
          },
          {
            label: "positif",
            backgroundColor: "LightSkyBlue",
            data: newData.positif,
          },
          {
            label: "dirawat",
            backgroundColor: "#DABCA1",
            data: newData.dirawat,
          },
          {
            label: "sembuh",
            backgroundColor: "#D2D9CF",
            data: newData.sembuh,
          },
        ],
      };
    },
    getWeekly() {
      this.$store
        .dispatch("getWeekly")
        .then(({ data }) => {
          this.$store.commit("get_weekly", data.data);
          let date = [];
          let newData = {
            meninggal: [],
            positif: [],
            dirawat: [],
            sembuh: [],
          };
          data.data.forEach((el) => {
            newData.meninggal.push(el.jumlah_meninggal.value);
            newData.positif.push(el.jumlah_positif.value);
            newData.dirawat.push(-1 * el.jumlah_dirawat.value);
            newData.sembuh.push(el.jumlah_sembuh.value);
            date.push(new Date(el.key_as_string).toLocaleDateString());
          });
          console.log(date, data.data);
          this.fillData(date, newData);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>