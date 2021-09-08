<template>
  <div class="home container-fluid mb-5">
    <div>
      <!-- Latest Container -->
    </div>
    <div id="recipeContainer" class="container-sm d-flex justify-content-between">
      <!-- Meal DB Container -->

      <div class="container border p-4 mt-5" style="background-color: rgba(245, 245, 245); width:500px">
        <h2 class="mb-4">Meal DB Recipes</h2>
        <div class="row row-cols-3 align-items-start g-3">
          <RecipeCard v-for='recipe in $store.state.mealDB_recipes' :key="recipe.idMeal" :recipe='recipe'/>
        </div>
      </div>

      <div class="container border p-4 mt-5" style="background-color: rgba(245, 245, 245); width: 500px">
        <h2 class="mb-4">Gourmet Tavern Recipes</h2>
        <div class="row row-cols-3 align-items-start g-3">
          <RecipeCard v-for='recipe in $store.state.gourmetTavern_recipes' :key="recipe.idMeal" :recipe='recipe'/>
        </div>
      </div>

      <!-- User Recipe Container -->

      <!-- <div class="container-sm mt-5" style="background-color: rgba(245, 245, 245); width:500px">
        <h2 class="mb-4">User Recipes</h2>
        <div id="userRecipe_container" class="border p-0 row row-cols-3 align-items-start">
          <RecipeCard class="col shadow card p-0" v-for='recipe in $store.state.mealDB_recipes' :key="recipe.idMeal" :recipe='recipe' style="width:150px; cursor:pointer;"/>
        </div>
      </div> -->
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "Home",
  components: {
    RecipeCard,
  },
  created(){
    this.$store.dispatch('seedMealDB')
    this.$store.dispatch('seedGourmetTavern')
  }
};
</script>
<style>
/* .home {
  border: 3px;
  border-style: solid;
} */

/* .card{
  width: 150px;
} */

/* #recipeContainer img{
  width: 140px;
  height: 150px;
} */
/* 
#recipeContainer{
  margin: 0 10%
} */
</style>
