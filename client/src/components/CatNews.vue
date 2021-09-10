<template>
  <div class="row mt-2 row-cols-md-2">
    <div v-for="(cat, index) in cats" :key="index" class="col-sm-2">
        <div @click.prevent="toCat(cat)" class="card-body cat">
          <h5 class="card-title">{{ cat }}</h5>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatNews",
  data() {
    return {
      cats: ['business', 'entertainment', 'health', 'science', 'sports', 'technology']
    }
  },
  methods: {
    toCat(cat) {
      this.$store.dispatch("catNews", cat)
    }
  }
}
</script>

<style>
.cat:hover{
  background: rgb(42, 56, 56);
  transition: 0.5s;
  color: white;
  font-size: 50px;
  border-radius: 50px;
  cursor: pointer;
}
</style>
