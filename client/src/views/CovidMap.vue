<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideNav />
      <div class="col py-3">
        <div class="card-header">
          <h3 class="card-title">Peta Penambahan Kasus Covid</h3>
          <hr class="my-0" />
        </div>
        <l-map :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker
            v-for="(marker, index) in markers"
            :key="index"
            ref="markersRef"
            @click.prevent="showCardProv(marker.name)"
            :lat-lng="marker.position"
          >
            <l-tooltip>
              {{ marker.name }} = <br> <br>
              Positif: {{marker.positif}} Case<br> 
              Sembuh: {{ marker.sembuh }} Case <br>
              Meninggal: {{marker.meninggal}} Case
            </l-tooltip>
            <!-- <l-popup :content="marker.name"> -->
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from "vue2-leaflet";
import SideNav from "../components/SideNav.vue";

export default {
  name: "MyMap",
  components: {
    SideNav,
    "l-map": LMap,
    "l-tile-layer": LTileLayer,
    "l-marker": LMarker,
    "l-tooltip": LTooltip,
    "l-popup": LPopup,
  },
  data() {
    return {
      nameProv: "",
      zoom: 5,
      center: { lat: -4.227575, lng: 116.860522 },
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [],
      markerObjects: null,
    };
  },
  mounted() {
    console.log(this.nameProv);
    this.getData();
    L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";
    // this.$nextTick(() => {
    //   this.markerObjects = this.$refs.markersRef.Lmap((ref) => ref.mapObject);
    // });
  },
  methods: {
    displayTooltip(selectedIndex) {
      for (let markerObject of this.markerObjects) {
        markerObject.closeTooltip();
      }
      this.markerObjects[selectedIndex].toggleTooltip();
    },
    getData() {
      this.$store
        .dispatch("getDataProv")
        .then(({ data }) => {
          let dataProv = data.data.list_data;
          dataProv.forEach((el, i) => {
            if (el.lokasi !== null) {
              this.markers.push({
                id: i,
                name: el.key,
                position: { lat: el.lokasi.lat, lng: el.lokasi.lon },
                positif: el.penambahan.positif,
                sembuh: el.penambahan.sembuh,
                meninggal: el.penambahan.meninggal,
              });
            }
          });
        })
        .catch((err) => console.log(err));
    },
    showCardProv(name) {
      this.store.commit("name_prov", name);
    },
  },
};
</script>

<style scoped>
@import "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css";
@import "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css";

.leaflet-container {
  height: 97vh;
}
</style>