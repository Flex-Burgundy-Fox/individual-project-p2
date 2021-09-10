<template>
<div id="page" class="container-sm mt-0" style="min-height: 80vh">
    <h3 class="mb-5">Search Recipe</h3>
    <div class="row mb-5">
        <div class="col-sm-2">
            <select v-model='preference' class="form-select">
                <option selected value="All">All</option>
                <option value="GT">Gourmet Tavern</option>
                <option value="MealDB">MealDB</option>
            </select>
        </div>
        <div class="col-sm-5">
            <input v-model='searchData' type="text" class="form-control">
        </div>
        <button type="button" class="col-sm-1 btn btn-primary" @click='search'>Search</button>
    </div>
    <hr>
    <div class="container mt-5">
        <div v-if='searchOutput.length' class="row row-cols-6 align-items-start g-4">
            <RecipeCard v-for='recipe in searchOutput' :key="recipe.idMeal || recipe.id" :recipe='recipe'/>
        </div>
        <div v-else class="fst-italic text-muted">
            <h4>No recipe found </h4>
        </div>
    </div>
    

</div>
  
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue";
export default {
    name : 'SearchRecipe',
    data(){
        return {
            searchData: '',
            preference: 'All',
            searchOutput: []
        }

    },
    methods: {
        search(){
            switch (this.preference) {
                case 'All':
                    this.$store.dispatch('searchGourmetTavern', {search: this.searchData })
                    .then(({data}) => {
                        this.searchOutput = data
                        this.$store.dispatch('searchMealDB', {search: this.searchData })
                        .then(({data}) => {
                            this.searchOutput = this.searchOutput.concat(data.meals);
                        }).catch((err) => {
                            console.log(err);
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                    
                    break;
                case 'GT':
                    this.$store.dispatch('searchGourmetTavern', {search: this.searchData })
                    .then(({data}) => {
                        this.searchOutput = data
                    }).catch((err) => {
                        console.log(err);
                    });
                    break;
                case 'MealDB':
                    this.$store.dispatch('searchMealDB', {search: this.searchData })
                    .then(({data}) => {
                        this.searchOutput = data.meals
                    }).catch((err) => {
                        console.log(err);
                    });
                    break;
            
                default:
                    break;
            }
        }
    },
    components: {
        RecipeCard,
    },

}
</script>

<style>

</style>